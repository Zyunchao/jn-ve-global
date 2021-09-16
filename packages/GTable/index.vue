<template>
    <div
        v-if="localConfig && refreshLoad"
        class="g-table-root"
        :class="{
            'hide-pagination': !localConfig.pagination || localConfig.pagination.show === false
        }"
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
import { PropType, watch, nextTick, computed, ref, reactive, toRaw } from 'vue'
import { TableConfig, TableMethods as TableInstance } from './index'
import TableColumn from './TableColumn.vue'
import { getTableProps } from './utils'
import LGIcon from '../GIcon/index.vue'
import _ from 'lodash'

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
            rows.forEach((row) => {
                if (!localSelectedRows.value.some((item) => item === row)) {
                    localInstance.value.toggleRowSelection(row, true)
                }
            })
        } else {
            nextTick(() => {
                rows.forEach((row) => {
                    if (!localSelectedRows.value.some((item) => item === row)) {
                        localInstance.value.toggleRowSelection(row, true)
                    }
                })
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
</script>

<style lang="scss" scoped>
$--pagination-height: 56px;
$--pagination-item-height: 28px;
$--pagination-number-active-color: #409eff;
$--base-left-right-space: 28px;
$--base-border-color: #e8e8e8;

.g-table-root {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border: 1px solid $--base-border-color;
    border-radius: 4px 4px 0 0;

    // 无分页
    &.hide-pagination {
        .g-table-main {
            height: 100%;

            :deep(.el-table) {
                &::before {
                    display: none;
                }
            }
        }
    }

    // 表格
    .g-table-main {
        $--tr-bgc: #fafafa;
        $--font-color: #575757;

        height: calc(100% - #{$--pagination-height});

        :deep(.el-table) {
            color: $--font-color;

            &::before,
            .el-table__fixed::before,
            .el-table__fixed-right::before {
                background-color: $--base-border-color;
            }

            /* 表头 */
            thead {
                tr th {
                    background-color: $--tr-bgc;
                    color: #000000;
                    border-bottom: 1px solid $--base-border-color;
                }
            }

            /* 表体 */
            tbody {
                tr {
                    td {
                        border-bottom: 1px solid $--base-border-color;
                    }

                    &.el-table__row--striped {
                        td {
                            background-color: $--tr-bgc;
                        }
                    }

                    &.hover-row {
                        td {
                            background-color: #e8e8e8;
                        }
                    }
                }
            }

            .el-table__fixed-right-patch {
                background-color: $--tr-bgc;
                top: -1px;
                border-bottom: 1px solid $--base-border-color;
            }

            /* 一些自定义的类 */
            .btn-danger {
                color: #f56c6c;
            }

            .el-table__body-wrapper {
                position: initial;
            }

            .el-table__empty-block {
                .el-table__empty-text {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -60%);
                    width: fit-content;
                    opacity: 0.5;

                    i {
                        font-size: 120px;
                    }

                    p {
                        line-height: 20px;
                        font-size: 18px;
                    }
                }
            }
        }

        :deep(.el-table--group) {
            border: none !important;

            &::after {
                display: none;
            }
        }

        :deep(.el-table__header) {
            background-color: $--tr-bgc;
        }
    }

    // 分页
    .g-table-pagination {
        height: $--pagination-height;
        padding-left: 20px;
        padding-right: 20px;

        :deep(.el-pagination) {
            padding: 0;
            height: 100%;

            display: flex;
            align-items: center;

            /* 按钮 */
            .btn-prev,
            .btn-next {
                padding: 0 14px !important;
                height: $--pagination-item-height;
                background-color: transparent;
                border: 1px solid $--base-border-color;
                border-radius: 4px;
                transition: transform 0.3s;

                span {
                    height: $--pagination-item-height - 2px;
                    line-height: $--pagination-item-height - 2px;
                }

                &:active {
                    transform: scale(0.94);
                }
            }

            /* 页码 */
            .el-pager {
                margin: 0 10px;

                li {
                    background-color: transparent;
                    font-size: 12px;
                    margin: 0;
                    height: $--pagination-item-height;
                    line-height: $--pagination-item-height - 2px;
                    border-radius: 0;

                    &.active {
                        background-color: $--pagination-number-active-color;
                        border-color: $--pagination-number-active-color !important;

                        &:hover {
                            color: #fff;
                        }
                    }

                    &:not(.more) {
                        border: 1px solid $--base-border-color;
                    }

                    &:nth-of-type(n + 2) {
                        border-left: none;
                    }

                    &.more + .number {
                        border-left: 1px solid $--base-border-color;
                    }

                    &:hover {
                        color: $--pagination-number-active-color;
                    }
                }
            }

            .el-pagination__jump {
                overflow: hidden;
                display: inline-flex;
                align-items: center;

                .el-input {
                    height: 100%;
                    // margin-top: -1px;
                }
            }

            .el-pagination__total {
                margin-left: 10px;
            }

            .el-pagination__sizes {
                margin-top: -2px;
            }
        }
    }
}
</style>
