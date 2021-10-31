<template>
    <div
        class="base-module-root"
        :class="[$attrs.class, { 'no-padding': noSearchLabel || !searchFormProps }]"
    >
        <!-- 搜索 -->
        <div v-if="searchFormProps" class="search-wrapper">
            <div v-if="!noSearchLabel" class="top">
                <span class="title">查询条件</span>
            </div>
            <div class="form-wrapper">
                <LGForm :config="localSearchFormProps" />
            </div>
        </div>

        <!-- 按钮组 -->
        <div v-if="btns.length > 0" class="btns-wrapper">
            <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                <!-- 按钮权限 Code -->
                <template v-if="btn.authCode">
                    <el-button
                        v-auth="btn.authCode"
                        :type="btn.type || 'primary'"
                        size="small"
                        :disabled="btn.disabled"
                        @click="btn.onClick"
                    >
                        {{ btn.label }}
                    </el-button>
                </template>

                <!-- 无权限校验的 -->
                <el-button
                    v-else
                    :type="btn.type || 'primary'"
                    size="small"
                    :disabled="btn.disabled"
                    @click="btn.onClick"
                >
                    {{ btn.label }}
                </el-button>
            </template>
        </div>

        <!-- 表格 -->
        <div class="table-wrapper">
            <LGTable v-loading="tableLoading" :config="localTableConfig" />
        </div>
    </div>
</template>

<script lang="tsx">
import { defineComponent, PropType, reactive, watch, ref, computed } from 'vue'
import { BtnProps } from './index'
import { FormProps, FormItemProps } from '../GForm'
import { TableColumnProps, BaseTableDataItem, TableConfig, PaginationProps } from '../GTable'
import LGForm from '../GForm/index.vue'
import LGTable from '../GTable/index.vue'

export default defineComponent({
    name: 'BaseModule',
    components: {
        LGForm,
        LGTable
    },
    inheritAttrs: false,
    props: {
        /**
         * 搜索条件表单配置
         */
        searchFormProps: {
            type: Object as PropType<FormProps>,
            default: null
        },
        /**
         * 表格列
         */
        tableColumns: {
            type: Array as PropType<TableColumnProps[]>,
            default: () => []
        },
        /**
         * 表格数据
         */
        tableData: {
            type: Array as PropType<BaseTableDataItem[]>,
            default: () => []
        },
        /**
         * 分页数据
         */
        tablePagination: {
            type: Object as PropType<PaginationProps>,
            default: null
        },
        /**
         * 按钮组
         */
        btns: {
            type: Array as PropType<BtnProps[]>,
            default: () => []
        },
        /**
         * 搜索按钮是否独占一行
         */
        searchBtnHorizontal: {
            type: Boolean,
            default: false
        },
        /**
         * 核心加载 table 数据的方法
         */
        loadTableMethods: {
            type: Function
        },
        /**
         * 表格 loading flag
         */
        tableLoading: {
            type: Boolean,
            default: false
        },
        /**
         * 去除 “查询条件” label
         */
        noSearchLabel: {
            type: Boolean,
            default: false
        },
        /**
         * 搜索按钮的鉴权 code
         */
        searchBtnAuthCode: {
            type: String,
            default: ''
        }
    },
    emits: ['getTableInstance'],
    setup(props, { attrs, emit }) {
        // 搜索表单添加搜索按钮项（可自定义搜索按钮组）
        const localSearchFormProps = computed(() => {
            if (props.searchFormProps) {
                const tempWrapper = ref(props.searchFormProps)
                if (
                    !tempWrapper.value.formItems.some(
                        (formItem) => formItem.prop === 'opertion-btn'
                    )
                ) {
                    const searchBtns: FormItemProps = {
                        prop: 'opertion-btn',
                        class: `content-center search-btn-item ${
                            props.btns.length > 0 ? 'no-margin-b' : ''
                        }`,
                        span: props.searchBtnHorizontal
                            ? 24
                            : tempWrapper.value.formItems[tempWrapper.value.formItems.length - 1]
                                .span,
                        render() {
                            return (
                                <>
                                    <el-button
                                        icon='el-icon-refresh-left'
                                        onClick={() => {
                                            localSearchFormProps.value.instance.resetFields()
                                            if (!props.loadTableMethods)
                                                throw new Error('core load-table-methods 未找到')
                                            props.loadTableMethods?.(1)
                                        }}>
                                        重置
                                    </el-button>
                                    {props.searchBtnAuthCode ? (
                                        <el-button
                                            v-auth={props.searchBtnAuthCode}
                                            icon='el-icon-search'
                                            type='primary'
                                            onClick={() => {
                                                if (!props.loadTableMethods)
                                                    throw new Error(
                                                        'core load-table-methods 未找到'
                                                    )
                                                props.loadTableMethods?.(1)
                                            }}>
                                            查询
                                        </el-button>
                                    ) : (
                                        <el-button
                                            icon='el-icon-search'
                                            type='primary'
                                            onClick={() => {
                                                if (!props.loadTableMethods)
                                                    throw new Error(
                                                        'core load-table-methods 未找到'
                                                    )
                                                props.loadTableMethods?.(1)
                                            }}>
                                            查询
                                        </el-button>
                                    )}
                                </>
                            )
                        }
                    }

                    tempWrapper.value.formItems.push(searchBtns)
                }

                return tempWrapper.value
            }

            return null
        })

        // 包装本地表格配置
        const localTableConfig = reactive<TableConfig<any>>({
            instance: null,
            rowKey: 'id',
            stripe: true,
            columns: props.tableColumns,
            data: props.tableData,
            pagination: props.tablePagination,
            ...attrs
        })

        watch(
            () => localTableConfig.instance,
            (instance) => {
                emit('getTableInstance', instance)
            }
        )

        // 表格数据初始化（与父级建立关系）
        watch(
            () => props.tableData,
            (data) => {
                localTableConfig.data = data
            }
        )

        watch(
            () => props.tableColumns,
            (columns) => {
                localTableConfig.columns = columns
            }
        )
        watch(
            () => props.tablePagination,
            (val) => {
                localTableConfig.pagination = val
                if (val && !localTableConfig.pagination['onChange']) {
                    localTableConfig.pagination['onChange'] = () => {
                        props.loadTableMethods?.()
                    }
                }
            },
            {
                immediate: true,
                deep: false
            }
        )

        return {
            localSearchFormProps,
            localTableConfig
        }
    }
})
</script>

<style lang="scss" scoped>
$--base-padding-lr: 28px;

.base-module-root {
    height: 100%;
    width: 100%;
    overflow: hidden;
    background-color: #fff;
    border-radius: 6px;
    box-shadow: 0 0 2px 2px rgba(0, 0, 0, 0.04);
    display: flex;
    flex-direction: column;

    &.no-padding {
        border-radius: 0;
        box-shadow: none;

        .btns-wrapper,
        .table-wrapper {
            padding: 0;
        }
    }

    // 查询表单
    .search-wrapper {
        padding: 17px 14px 0;

        .top {
            display: flex;
            justify-content: space-between;
            margin-bottom: 19px;

            .title {
                font-size: 20px;
                color: #333333;
            }
        }

        .form-wrapper {
            padding: 0 $--base-padding-lr;
        }
    }

    .btns-wrapper {
        flex: none;
        padding: 0 $--base-padding-lr;
        margin-bottom: 15px;

        .el-button {
            padding: 0 20px;
            font-size: 14px;
        }
    }

    .table-wrapper {
        flex: 1;
        overflow: hidden;
        padding: 0 $--base-padding-lr $--base-padding-lr;
    }
}
</style>
