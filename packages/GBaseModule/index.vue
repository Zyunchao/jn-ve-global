<template>
    <!-- 
        容器的 pading 需要在传递 searchFormProps 的前提下
        noSearchLabel = true 去除 padding
        moreSearchMode 的权重比 noSearchLabel 高，如果传递了 moreSearchMode 则必然显示 “搜索条件 + 更多查询” 并添加 padding
     -->
    <div
        class="base-module-root"
        :class="[
            $attrs.class,
            {
                'no-padding': (noSearchLabel && !moreSearchMode) || !searchFormProps,
                'tabs-layout': !!tabs.length
            }
        ]"
    >
        <!-- 搜索 -->
        <TableSearch
            v-if="searchFormProps"
            :search-form-props="searchFormProps"
            :search-btns-config="searchBtnsConfig"
            :no-search-label="noSearchLabel"
            :search-btn-horizontal="searchBtnHorizontal"
            :more-search-mode="moreSearchMode"
        />

        <!-- 中间操作区域 -->
        <div v-if="(btns && btns.length) || $slots['middle-right']" class="middle-opertion-wrapper">
            <!-- 左 -->
            <div class="middle-left-wrapper">
                <!-- 按钮组 -->
                <div v-if="btns && btns.length > 0" class="btns-wrapper">
                    <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                        <!-- 按钮权限 Code -->
                        <el-button
                            v-if="btn.authCode"
                            v-show="!btn.hide"
                            v-auth="btn.authCode"
                            :type="btn.type || 'primary'"
                            v-bind="btn"
                            size="small"
                            @click="btn.onClick"
                        >
                            {{ btn.label }}
                        </el-button>

                        <!-- 无权限校验的 -->
                        <el-button
                            v-else
                            v-show="!btn.hide"
                            :type="btn.type || 'primary'"
                            v-bind="btn"
                            size="small"
                            @click="btn.onClick"
                        >
                            {{ btn.label }}
                        </el-button>
                    </template>
                </div>
            </div>

            <!-- 右 -->
            <div class="middle-right-wrapper">
                <slot name="middle-right" />
            </div>
        </div>

        <!-- 表格 -->
        <div class="core-wrapper">
            <slot name="core">
                <!-- tab页 -->
                <div v-if="!!tabs.length" class="core-tab-wrapper">
                    <el-tabs v-model="localActiveTab">
                        <template v-for="(tab, index) in tabs" :key="`${tab.value}-${index}`">
                            <el-tab-pane :label="tab.label" :name="tab.value" />
                        </template>
                    </el-tabs>
                </div>

                <!-- 表格 -->
                <div class="core-table-wrapper">
                    <LGTable v-loading="tableLoading" :config="localTableConfig" />
                </div>
            </slot>
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'GBaseModule',
    inheritAttrs: false
}
</script>

<script lang="tsx" setup>
import { useAttrs, PropType, reactive, watch, ref, computed, getCurrentInstance } from 'vue'
import { BtnProps } from './index'
import { FormProps, FormItemProps } from '../GForm'
import { TableColumnProps, BaseTableDataItem, TableConfig, PaginationProps } from '../GTable'
import LGForm from '../GForm/index.vue'
import LGTable from '../GTable/index.vue'
import TableSearch from './component/TableSearch.vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue'

const props = defineProps({
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
    },
    /**
     * 更多查询展示方式
     * pullDown：下拉
     * popup：弹出
     */
    moreSearchMode: {
        type: String as PropType<'pull-down' | 'popup'>,
        default: undefined
    },
    /**
     * 表格操作列
     */
    rowBtnConfig: {
        type: Object as PropType<TableConfig<any>['rowBtnConfig']>,
        default: null
    },
    /**
     * tab 切换
     */
    tabs: {
        type: Array as PropType<Array<{ lable: string; value: string }>>,
        default: () => []
    },
    /**
     * 激活的 tab
     */
    activeTab: {
        type: String,
        default: ''
    }
})

const emits = defineEmits(['getTableInstance', 'update:activeTab'])
const attrs = useAttrs()

// 激活的 tab 页
const localActiveTab = computed({
    get: () => {
        if (props.activeTab) return props.activeTab
        if (!!props.tabs.length && props.tabs?.[0].value) {
            emits('update:activeTab', props.tabs?.[0].value)
        }
        return ''
    },
    set: (val) => {
        emits('update:activeTab', val)
    }
})

// 搜索按钮的配置
const searchBtnsConfig = computed<FormItemProps>(() => ({
    prop: 'opertion-btn',
    class: `content-center search-btn-item`,
    span:
        props.searchBtnHorizontal || !!props.moreSearchMode
            ? 24
            : props.searchFormProps.formItems[props.searchFormProps.formItems.length - 1].span,
    render() {
        return (
            <>
                <el-button
                    icon={RefreshLeft}
                    onClick={() => {
                        // 优先执行用户传递的 reset
                        if (attrs.onReset && typeof attrs.onReset === 'function') {
                            attrs.onReset()
                            return
                        }

                        props.searchFormProps.instance.resetFields()
                        if (!props.loadTableMethods)
                            throw new Error('core load-table-methods 未找到')
                        props.loadTableMethods?.(1)
                    }}>
                    重置
                </el-button>
                {props.searchBtnAuthCode ? (
                    <el-button
                        v-auth={props.searchBtnAuthCode}
                        type='primary'
                        icon={Search}
                        onClick={() => {
                            // 优先执行用户传递的 search
                            if (attrs.onSearch && typeof attrs.onSearch === 'function') {
                                attrs.onSearch()
                                return
                            }

                            if (!props.loadTableMethods)
                                throw new Error('core load-table-methods 未找到')
                            props.loadTableMethods?.(1)
                        }}>
                        查询
                    </el-button>
                ) : (
                    <el-button
                        type='primary'
                        icon={Search}
                        onClick={() => {
                            // 优先执行用户传递的 search
                            if (attrs.onSearch && typeof attrs.onSearch === 'function') {
                                attrs.onSearch()
                                return
                            }

                            if (!props.loadTableMethods)
                                throw new Error('core load-table-methods 未找到')
                            props.loadTableMethods?.(1)
                        }}>
                        查询
                    </el-button>
                )}
            </>
        )
    }
}))

// 包装本地表格配置
const localTableConfig = reactive<TableConfig<any>>({
    instance: null,
    rowKey: 'id',
    stripe: true,
    columns: props.tableColumns,
    data: props.tableData,
    pagination: props.tablePagination,
    rowBtnConfig: props.rowBtnConfig,
    ...attrs
})

watch(
    () => localTableConfig.instance,
    (instance) => {
        emits('getTableInstance', instance)
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

// 抛出
defineExpose({
    tableInstance: localTableConfig.instance
})
</script>

<style lang="scss" scoped>
$--base-padding-lr: 24px;
$--base-borer-color: #e8e8e8;
$--tabs-height: 40px;

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

        .middle-opertion-wrapper,
        .core-wrapper {
            padding: 0 !important;
        }

        .core-wrapper {
            margin: 0 !important;
        }
    }

    /* 中间 */
    .middle-opertion-wrapper {
        padding: 0 $--base-padding-lr;
        margin-bottom: 10px;
        flex: none;
        display: flex;
        justify-content: space-between;

        /* 左 */
        .middle-left-wrapper {
            width: 60%;

            .btns-wrapper {
                .el-button {
                    padding: 0 22px;
                    font-size: 14px;
                }
            }
        }

        /* 右 */
        .middle-right-wrapper {
            width: 38%;
        }
    }

    /* 核心 */
    .core-wrapper {
        flex: 1;
        overflow: hidden;
        padding: 0 $--base-padding-lr 20px;

        .core-table-wrapper {
            height: 100%;
        }
    }

    // 带有 tab 页的表格
    &.tabs-layout {
        .middle-opertion-wrapper {
            padding: 0 calc($--base-padding-lr / 2);
        }

        .core-wrapper {
            margin: 0 calc($--base-padding-lr / 2) 20px;
            padding: 0;
            display: flex;
            flex-direction: column;
            position: relative;
            border-bottom: 1px solid $--base-borer-color;

            // 标签页
            .core-tab-wrapper {
                height: $--tabs-height;
                border-bottom: 1px solid $--base-borer-color;
                margin-bottom: 10px;
                background-color: #f4fbff;
                flex: none;

                :deep(.el-tabs) {
                    .el-tabs__nav-wrap {
                        &::after {
                            display: none;
                        }
                    }

                    .el-tabs__header {
                        margin: 0;

                        .el-tabs__active-bar {
                            display: none;
                        }

                        .el-tabs__item {
                            height: $--tabs-height;
                            padding: 0 38px;
                            font-size: 18px;
                            color: #8a8989;
                            border: 1px solid #f4fbff;
                            border-bottom: none;
                            transition: all 0.2s;

                            &.is-active {
                                border-color: $--base-borer-color;
                                background-color: #fff;
                                color: #0c0c0c;
                            }
                        }
                    }

                    .el-tabs__content {
                        display: none;
                    }
                }
            }

            // 表格容器
            .core-table-wrapper {
                padding: 0 calc($--base-padding-lr / 2) 0;
                flex: 1;
                overflow: hidden;
                height: auto;

                :deep(.g-table-root) {
                    border: none;

                    .g-table-main {
                        border: 1px solid $--base-borer-color;
                        border-radius: 4px 4px 0 0;
                        overflow: hidden;

                        .el-table,
                        .el-table__fixed-right,
                        .el-table__fixed {
                            &::before {
                                display: none;
                            }

                            tbody {
                                tr {
                                    &:last-of-type {
                                        td {
                                            border-bottom: none;
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }

            &::before,
            &::after {
                content: '';
                width: 1px;
                height: calc(100% - $--tabs-height);
                background-color: $--base-borer-color;
                position: absolute;
                top: $--tabs-height;
            }

            &::before {
                left: 0;
            }

            &::after {
                right: 0;
            }
        }
    }
}
</style>
