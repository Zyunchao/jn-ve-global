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
                @selection-change="localOnSelectionChange"
                @select="localSelect"
                @select-all="localSelectAll"
            >
                <!-- 一键开启多选 -->
                <el-table-column v-if="localConfig.showSelection" type="selection" width="55" />

                <template
                    v-for="(columnConfig, index) in localConfig.columns"
                    :key="`${columnConfig.label}-${index}`"
                >
                    <!-- 排除多选，保险措施 -->
                    <TableColumn
                        v-if="columnConfig.type !== 'selection'"
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
    name: 'Gtable'
}
</script>

<script lang="ts" setup>
import { PropType, watch, nextTick, computed, ref, reactive, toRaw, provide, readonly } from 'vue'
import { TableConfig, TableMethods as TableInstance, TableColumnProps } from './index'
import TableColumn from './TableColumn.vue'
import { getTableProps } from './utils'
import LGIcon from '../GIcon/index.vue'
import { onCellEditKey, tableInstanceKey } from './constant/InjectionKeys'
import { ElMessage } from 'element-plus'
import Schema, { ErrorList, FieldErrorList, RuleItem, Rules } from 'async-validator'

const props = defineProps({
    config: {
        type: Object as PropType<TableConfig<any> | null>,
        required: true,
        default: null
    }
})

const localInstance = ref<TableInstance | null>(null)
const refreshLoad = ref(true)
// 提取 TbaleProps
const tableProps = computed(() => getTableProps(props.config))
// 本地关联 Config（只读引用）
const localConfig = computed(() => props.config)

// 提供表格的 onCellEdited 事件
provide(onCellEditKey, props.config.onCellEdited)
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
        instance && (localConfig.value.instance = instance)
        /**
         * 较少情况下会有布局错乱，使用 ele 提供的方法重新布局
         */
        instance.doLayout()
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
 *
 * 一个规则：
 * 内部点击抛出外部，同步保存在 “内部所选数组”
 * 外部传递，先使其选中，然后再维护进内部数组
 * 这样一来，行成一个存储差，外部传递与内部存储的差集，就是要选中的数据
 */
const localSelectedRows = ref([])

// 监听外部选中行 ==> 向内配置
watch(
    () => localConfig.value.selectedRows,
    (rows) => {
        if (!rows) return

        /**
         * 通过标记本地已选行的数组，来获取新增加的数据，使新加的数据选中
         * 已选中的数据略过
         */

        if (localInstance.value) {
            if (rows.length > 0) {
                rows.forEach((row) => {
                    if (!localSelectedRows.value.some((item) => item === row)) {
                        localInstance.value.toggleRowSelection(row, true)
                    }
                })
            } else {
                localInstance.value.clearSelection()
                localSelectedRows.value = []
            }
        } else {
            nextTick(() => {
                if (rows.length > 0) {
                    rows.forEach((row) => {
                        if (!localSelectedRows.value.some((item) => item === row)) {
                            localInstance.value.toggleRowSelection(row, true)
                        }
                    })
                } else {
                    localInstance.value.clearSelection()
                    localSelectedRows.value = []
                }
            })
        }
    },
    {
        deep: true,
        immediate: true
    }
)

// 根据 selection 变化事件，保证无重复添加到数组中
const localOnSelectionChange = (selection: any[]) => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return

    selection.forEach((row) => {
        // 抛出
        if (!localConfig.value.selectedRows.some((item) => item === row)) {
            localConfig.value.selectedRows.push(toRaw(row))
        }

        // 内部存储
        if (!localSelectedRows.value.some((localItem) => localItem === row)) {
            localSelectedRows.value.push(toRaw(row))
        }
    })
}

// 点击复选框时，依据 选中 or 取消选中，在保存的已勾选数组中排除掉 “取消选中”
const localSelect = (selection: any[], row) => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return

    let selected: boolean = selection.some((item) => item === row)

    // 取消选中，进行排除
    if (!selected) {
        // 维护外部
        localConfig.value.selectedRows = localConfig.value.selectedRows.filter(
            (item) => item !== row
        )

        // 维护内部
        localSelectedRows.value = localSelectedRows.value.filter((localItem) => localItem !== row)
    }
}

/**
 * 点击 全选 Checkbox，判断 全选 or 全不选
 * 已知 Element-plus table 全选&反选 仅是对当前表格数据进行操作
 * 可以依据当前的 localConfig.data 进行已选行的排除
 */
const localSelectAll = (selection: any[], row) => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return

    // 如果当前表格的 selection 的长度大于 0，说明是全选，否则就是全不选
    let selectedAll: boolean = selection.length > 0

    // 全不选：将所有的已选行中匹配当前表格 data 的数据全部排除掉
    if (!selectedAll) {
        // 维护外部
        localConfig.value.selectedRows = localConfig.value.selectedRows.filter(
            (item) => !localConfig.value.data.some((dataItem) => dataItem === item)
        )

        // 维护内部
        localSelectedRows.value = localSelectedRows.value.filter(
            (localItem) => !localConfig.value.data.some((dataItem) => dataItem === localItem)
        )
    }
}

// 切换分页情况下：依据所有已选行进行表格行选中状态的切换
const toggleTableRowSelection = () => {
    if (!localConfig.value.showSelection || !localConfig.value.selectedRows) return

    localInstance.value.clearSelection()
    localConfig.value.selectedRows.forEach((row) => {
        localInstance.value.toggleRowSelection(row, true)
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
    const tableDataSource = rowArr.map((row) => row.split('\t'))
    // 表格配置的列
    const localColumns = props.config.columns.filter(
        (column) => column.prop && column.prop !== 'opertion'
    )

    // 判断表格配置的 label 是否与粘贴得到的 label 一致（顺序无关）
    const localColumnsLabels = localColumns.map((column) => column.label)
    const excelFirstRow = tableDataSource[0]

    let disaffinity: boolean = false
    localColumnsLabels.forEach((label) => {
        if (!excelFirstRow.includes(label)) {
            disaffinity = true
        }
    })

    if (disaffinity) {
        ElMessage.error('粘贴的数据不符合规则，请核对')
        return
    }

    // 依据 Excel 第一行作为标题，拼装数据
    const rowsSource = tableDataSource
        .filter((_, rowI) => rowI > 0)
        .map((rowSource) => {
            let sourceRow = {}
            excelFirstRow.forEach((key, keyI) => {
                sourceRow[key] = rowSource[keyI]
            })

            return sourceRow
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

        const res = await validator
            .validate(rowData)
            .catch((errProps: { errors: ErrorList; fields: FieldErrorList }) => {
                return errProps.errors
            })

        // res 不为空，说明 catch 有返回，校验出错
        if (!!res) {
            ElMessage({
                type: 'error',
                dangerouslyUseHTMLString: true,
                message: `<p style="margin-bottom: 6px;">第 ${
                    rowI + 1
                } 行校验失败 ------------ </p>${res
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
