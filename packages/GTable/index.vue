<template>
    <div
        v-if="localConfig && refreshLoad"
        class="g-table-root"
        :class="{
            'hide-pagination': !localConfig.pagination || localConfig.pagination.show === false
        }"
        @paste.stop="tablePaste"
    >
        <!-- 表格 -->
        <div class="g-table-main">
            <el-table
                v-bind="tableProps"
                ref="localInstance"
                height="100%"
                @select="localSelect"
                @select-all="localSelectAll"
            >
                <!-- 一键开启多选 -->
                <el-table-column v-if="localConfig.showSelection" type="selection" width="55" />

                <template
                    v-for="(columnConfig, index) in localConfig.columns"
                    :key="`${columnConfig.label}-${index}`"
                >
                    <!-- 排除多选 + 隐藏列 -->
                    <TableColumn
                        v-if="
                            !(localConfig.showSelection && columnConfig.type === 'selection') &&
                                !columnConfig.hide
                        "
                        :column-config="columnConfig"
                    />
                </template>

                <template #empty>
                    <LGIcon icon="ali-icon-wushuju" />
                    <p>暂无数据</p>
                </template>
            </el-table>
        </div>

        <!-- 分页 -->
        <div
            v-if="
                localConfig.pagination &&
                    (localConfig.pagination.show === true || localConfig.pagination.show === undefined)
            "
            class="g-table-pagination"
        >
            <el-pagination
                v-model:page-size="localConfig.pagination.pageSize"
                v-model:current-page="localConfig.pagination.currentPage"
                :total="localConfig.pagination.total"
                :page-sizes="[10, 20, 50]"
                prev-text="上一页"
                next-text="下一页"
                background
                layout="prev, pager, next, jumper, total, sizes"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GTable'
}
</script>

<script lang="ts" setup>
import { PropType, watch, nextTick, computed, ref, reactive, toRaw, provide, readonly } from 'vue'
import { TableConfig, TableMethods as TableInstance, TableColumnProps } from './index'
import { getTableProps } from './utils'
import LGIcon from '../GIcon/index.vue'
import { onCellEditKey, tableInstanceKey } from './constant/InjectionKeys'
import { ElMessage } from 'element-plus'
import Schema, { ValidateError, ValidateFieldsError, Rules } from 'async-validator'
import TableColumn from './component/TableColumn.vue'
import AddOperationColumn from './component/OperationColumn/index'

interface Props {
    config: TableConfig<any>
}

const props = withDefaults(defineProps<Props>(), {
    config: null
})

const localInstance = ref<TableInstance | null>(null)
const refreshLoad = ref(true)
// 提取 TbaleProps
const tableProps = computed(() => getTableProps(props.config))
// 本地关联 Config，关联引用
const localConfig = computed(() => props.config)

// 追加操作按钮列
AddOperationColumn(localConfig.value)

// 提供表格的 onCellEdited 事件
provide(onCellEditKey, props.config?.onCellEdited)
// 表格实例
provide(tableInstanceKey, localInstance)

// 监听配置对象的 !"引用"! 更改，重建表格
watch(
    () => props.config,
    () => {
        refreshLoad.value = false
        nextTick(() => {
            refreshLoad.value = true
        })
    }
)

// 将实例赋值给当前的配置对象
watch(
    () => localInstance.value,
    (instance) => {
        if (!instance) return
        localConfig.value.instance = instance
        /**
         * 较少情况下会有布局错乱，使用 ele 提供的方法重新布局
         */
        nextTick(() => {
            instance.doLayout()
        })
    }
)

// 监听分页部分的变化，向外抛出
if (localConfig.value.pagination) {
    watch(
        () => localConfig.value.pagination.pageSize,
        () => {
            localConfig.value.pagination.onChange?.(
                localConfig.value.pagination.currentPage,
                localConfig.value.pagination.pageSize
            )

            toggleTableRowSelection()
        }
    )

    watch(
        () => localConfig.value.pagination.currentPage,
        () => {
            localConfig.value.pagination.onChange?.(
                localConfig.value.pagination.currentPage,
                localConfig.value.pagination.pageSize
            )

            toggleTableRowSelection()
        }
    )
}

// *********************↓ 表格多选，跨页多选 ↓**************************************************************************************
/**
 * 如果表格没有传递 config.selectedRows 将被理解为不维护所选行
 */
watch(
    () => localConfig.value.selectedRows,
    (rows, oldRows) => {
        if (!localConfig.value.showSelection || !rows) {
            return
        }

        nextTick(() => {
            localInstance.value.clearSelection()
            nextTick(() => {
                rows.forEach((row) => {
                    localInstance.value.toggleRowSelection(row, true)
                })
            })
        })
    },
    {
        // 外部可能会有数组的 push、splice 等不改引用改原数组的操作
        deep: true,
        immediate: true
    }
)

/**
 * 点击复选框，向外抛出已选数组
 */
const localSelect = (selection: any[], row: any) => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) {
        return
    }
    localConfig.value.selectedRows = selection
}

/**
 * 要理解两个概念：
 *  1. 全局维护的选中数组：外部传递的 selectedRows
 *  2. 事件维护的选中数组：table实例.toggleRowSelection(row, true) 的数组
 *
 * 在 watch 中，将这两者进行的等效设置
 *
 * 在内部选中行发生变化时，将选中数据抛出，实际由外部维护了选中行
 * 在内部无论当前页中的 data 是否存在这个选中的数据，！选中维护数组！都包含了这一项
 *  - 当前页 data 中存在于 选中数组，就选中
 *  - 不存在，就无显示
 *
 * 而在外部维护的这个状态数组，会传递给组件的任意事件，（select、select-all）
 * 事件会对这个数组进行维护，无论谁（单选框 or 全选框）维护这个这个数组，都只能基于当前页面的 data 中的数据进行维护
 * 也就是说，非当前页的数据，事件是维护不到的
 * 故，能够实现当前页的勾选数据，只能在他自己的页码（data）中维护
 */
const localSelectAll = (selection: any[], row) => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return
    localConfig.value.selectedRows = selection
}

/**
 * 切换分页情况下：依据所有已选行进行表格行选中状态的切换
 */
const toggleTableRowSelection = () => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return
    localInstance.value.clearSelection()
    nextTick(() => {
        localConfig.value.selectedRows.forEach((row) => {
            localInstance.value.toggleRowSelection(row, true)
        })
    })
}
// *********************↑ 表格多选，跨页多选 ↑**************************************************************************************

// *********************↓ 粘贴 ↓***************************************************************************************************
const tablePaste = async (e: ClipboardEvent) => {
    if (!props.config.pastable) return
    // 粘贴源数据
    const pasteData = e.clipboardData.getData('Text').trim()
    // 每一行
    const rowArr = pasteData.split('\r\n')
    // 每一行分割列得到粘贴的表格 源数据
    const excelDataSource = rowArr.map((row) => row.split('\t'))
    // 表格配置的有效数据列（包含 prop 且 type 不为 ['selection', 'index', 'expand'] 的列皆为有效列）
    const localColumns = props.config.columns.filter(
        (column) =>
            !['selection', 'index', 'expand'].includes(column.type) &&
            column.prop &&
            column.prop !== 'opertion'
    )

    // 判断表格配置的 label 是否与粘贴得到的 label 一致（顺序无关）
    const localColumnsLabels = localColumns.map((column) => column.label)
    const excelFirstRow = excelDataSource[0]
    let disaffinity = localColumnsLabels.some((label) => !excelFirstRow.includes(label))

    /**
     * 第一行不符合条件存在两种情况：
     *  1. 表头本身不符合
     *  2. 未粘贴表头（依据列数判断数据是否合理）
     */
    if (disaffinity && excelDataSource.some((row) => row.length !== localColumnsLabels.length)) {
        ElMessage.error('粘贴的数据不符合，请核对')
        return
    }

    /**
     * 拼装数据
     *  1. 存在表头
     *  2. 不存在表头
     */
    const rowsSource = !disaffinity
        ? excelDataSource
            .filter((_, rowI) => rowI > 0)
            .map((rowSource) => {
                let sourceRow = {}
                excelFirstRow.forEach((key, keyI) => {
                    sourceRow[key] = rowSource[keyI]
                })

                return sourceRow
            })
        : excelDataSource.map((row) => {
            let temp = {}
            localColumnsLabels.forEach((label, labelI) => {
                temp[label] = row[labelI]
            })
            return temp
        })

    /**
     * 获取 columns 配置的 rules
     */
    const descriptor: Rules = {}
    localColumns.forEach((column) => {
        column.rules && (descriptor[column.prop] = column.rules)
    })
    const validator: Schema = new Schema(descriptor)

    /**
     * 格式化
     */
    const tableDataFormatted = []
    for (let rowI = 0; rowI < rowsSource.length; rowI++) {
        let rowData = {}
        let rowSource = rowsSource[rowI]

        localColumns.forEach((column, columnIndex) => {
            if (column.excelValueFormat) {
                const preField = rowI > 0 ? tableDataFormatted[rowI - 1][column.prop] : null

                const currentField = column.excelValueFormat(
                    rowSource[column.label],
                    preField,
                    rowI
                )
                rowData[column['prop']] = currentField
            } else {
                rowData[column['prop']] = rowSource[column.label]
            }
        })

        tableDataFormatted.push(rowData)
    }

    /**
     * 过滤符合校验规则的（一般粘贴和可编辑结合使用，可编辑处校验，故返回所有数据）
     * 校验规则应该是适用于可编辑表格的，所以要在转换数据过后，再进行数据的校验工作
     */
    const tableDataValidated = []
    for (let rowI = 0; rowI < tableDataFormatted.length; rowI++) {
        const rowData = tableDataFormatted[rowI]

        const res: boolean | ValidateError[] = await validator
            .validate(rowData)
            .then((res) => {
                return true
            })
            .catch((errProps: { errors: ValidateError[]; fields: ValidateFieldsError }) => {
                return errProps.errors
            })

        // res 不为空，说明 catch 有返回，校验出错
        if (res !== true) {
            ElMessage({
                type: 'error',
                dangerouslyUseHTMLString: true,
                message: `<p style="margin-bottom: 6px;">第 ${
                    rowI + 1
                } 行校验失败 ------------ </p>${(res as ValidateError[])
                    .map(
                        (errInfo) =>
                            '<p style="margin-bottom: 6px;">' +
                            '<strong>' +
                            (props.config.columns.find((column) => column.prop === errInfo.field)
                                ?.label || errInfo.field) +
                            '</strong>' +
                            ': ' +
                            errInfo.message +
                            '</p>'
                    )
                    .join('')}`,
                duration: 0,
                showClose: true
            })
            // continue
        }

        tableDataValidated.push(rowData)
    }

    // 将处理过的数据抛出
    props.config.onPasted?.(tableDataValidated)
}
// *********************↑ 粘贴 ↑***************************************************************************************************
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
