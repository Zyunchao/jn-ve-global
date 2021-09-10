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
            <el-table v-bind="tableProps" ref="localInstance" height="100%">
                <template
                    v-for="(columnConfig, index) in localConfig.columns"
                    :key="`${columnConfig.label}-${index}`"
                >
                    <TableColumn :column-config="columnConfig" />
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
import { defineComponent, PropType, watch, nextTick, computed, ref } from 'vue'
import { TableConfig, TableMethods as TableInstance } from './index'
import TableColumn from './TableColumn.vue'
import { getTableProps } from './utils'
import LGIcon from '../GIcon/index.vue'

export default defineComponent({
    name: 'Gtable',
    components: { TableColumn, LGIcon },
    props: {
        config: {
            type: Object as PropType<TableConfig<any> | null>,
            required: true,
            default: null
        }
    },
    setup(props) {
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
                }
            )

            watch(
                () => localConfig.value.pagination.currentPage,
                () => {
                    localConfig.value.pagination.onChange?.(
                        localConfig.value.pagination.currentPage,
                        localConfig.value.pagination.pageSize
                    )
                }
            )
        }

        return {
            refreshLoad,
            localInstance,
            tableProps,
            localConfig
        }
    }
})
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
