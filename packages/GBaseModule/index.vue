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
            ref="tableSearchRef"
            :search-form-props="searchFormProps"
            :search-btns-config="searchBtnsConfig"
            :no-search-label="noSearchLabel"
            :search-btn-horizontal="searchBtnHorizontal"
            :more-search-mode="moreSearchMode"
        />

        <!-- 中间操作区域 -->
        <div v-if="(btns && btns.length) || $slots['middle-right']" class="middle-opertion-wrapper">
            <!-- 左 按钮组-->
            <div class="middle-left-wrapper">
                <LGButtonGroup v-if="btns && btns.length > 0" class="btns-wrapper" :btns="btns" />
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
import { useAttrs, PropType, reactive, watch, ref, computed, nextTick, toRef, markRaw } from 'vue'
import { BtnProps } from './index'
import { FormProps, FormItemProps } from '../GForm'
import { TableColumnProps, BaseTableDataItem, TableConfig, PaginationProps } from '../GTable'
import TableSearch from './component/TableSearch.vue'
import { RefreshLeft, Search } from '@element-plus/icons-vue'
import { partitionObj2HumpObj, assignOwnProp } from '@jsjn/utils'
import LGTable from '../GTable/index.vue'
import LGButtonGroup from '../GButtonGroup/index.vue'
import { getBaseModuleMode } from '@component/_globalConstant/baseModuleMode'
import type { BaseModuleMode } from '@component/_globalConstant/baseModuleMode'

const baseModuleMode = getBaseModuleMode()

interface Props {
    /**
     * 表格列
     */
    tableColumns?: TableColumnProps[]
    /**
     * 表格数据
     */
    tableData?: BaseTableDataItem[]
    /**
     * 搜索条件表单配置
     */
    searchFormProps?: FormProps
    /**
     * 分页数据
     */
    tablePagination?: PaginationProps
    /**
     * 按钮组
     */
    btns?: BtnProps[]
    /**
     * 搜索按钮是否独占一行
     */
    searchBtnHorizontal?: boolean
    /**
     * 核心加载 table 数据的方法
     */
    loadTableMethods?: (page?: number) => void
    /**
     * 表格 loading flag
     */
    tableLoading?: boolean
    /**
     * 去除 “查询条件” label
     */
    noSearchLabel?: boolean
    /**
     * 搜索按钮的鉴权 code
     */
    searchBtnAuthCode?: string
    /**
     * 更多查询展示方式
     * pullDown：下拉
     * popup：弹出
     */
    moreSearchMode?: 'pull-down' | 'popup'
    /**
     * 表格操作列
     */
    rowBtnConfig?: TableConfig<any>['rowBtnConfig']
    /**
     * tab 切换
     */
    tabs?: Array<{ label: string; value: string }>
    /**
     * 激活的 tab
     */
    activeTab?: string
    /**
     * 选中行的维护数组
     */
    selectedRows?: TableConfig<any>['selectedRows']
}

const props = withDefaults(defineProps<Props>(), {
    searchBtnsConfig: null,
    tableColumns: () => [],
    tableData: () => [],
    tablePagination: null,
    btns: () => [],
    searchBtnHorizontal: false,
    tableLoading: false,
    noSearchLabel: false,
    searchBtnAuthCode: '',
    moreSearchMode: undefined,
    rowBtnConfig: null,
    tabs: () => [],
    activeTab: '',
    selectedRows: null
})

const emits = defineEmits(['getTableInstance', 'update:activeTab', 'update:selectedRows'])
const attrs = useAttrs()
const humpAttrs = computed(() => partitionObj2HumpObj(attrs, ['onReset', 'onSearch']))

const tableSearchRef = ref<InstanceType<typeof TableSearch> | null>(null)

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
            : props.searchFormProps.formItems[props.searchFormProps.formItems.length - 1]?.span ||
              24,
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

                        // 清空查询条件
                        props.searchFormProps.instance?.resetFields()

                        // 清空多选
                        emits('update:selectedRows', [])

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
                            searchHandle()
                        }}>
                        查询
                    </el-button>
                ) : (
                    <el-button
                        type='primary'
                        icon={Search}
                        onClick={() => {
                            searchHandle()
                        }}>
                        查询
                    </el-button>
                )}
            </>
        )
    }
}))

async function searchHandle() {
    // 校验
    const validateRes = await props.searchFormProps.instance.validate()

    // 更多查询条件时，查询关闭弹框
    if (props.moreSearchMode === 'popup' && tableSearchRef.value.popupShow) {
        tableSearchRef.value.closePopup()
    }

    // 优先执行用户传递的 search
    if (attrs.onSearch && typeof attrs.onSearch === 'function') {
        attrs.onSearch()
        return
    }

    if (!props.loadTableMethods) throw new Error('core load-table-methods 未找到')
    props.loadTableMethods?.(1)
}

// 包装本地表格配置（中转站）
const localTableConfig = reactive<TableConfig<any>>({
    instance: null,
    rowKey: 'id',
    stripe: true,
    columns: props.tableColumns,
    data: props.tableData,
    pagination: props.tablePagination,
    rowBtnConfig: props.rowBtnConfig,
    selectedRows: props.selectedRows,
    ...humpAttrs.value
})

/* --------------- 向外抛出 ------------------------------------------------------------------- */
// 实例
watch(
    () => localTableConfig.instance,
    (instance) => {
        emits('getTableInstance', instance)
    }
)
// 选中行
watch(
    () => localTableConfig.selectedRows,
    (list) => {
        emits('update:selectedRows', list)
    }
)

/* --------------- 向内关联 ------------------------------------------------------------------- */
// 未定义为 props 的 table 的参数
watch(
    () => humpAttrs.value,
    (obj) => {
        assignOwnProp(localTableConfig, obj, ['instance', 'columns', 'data'])
        nextTick(() => {
            localTableConfig.instance?.doLayout()
        })
    }
)
// 数据
watch(
    () => props.tableData,
    (data) => {
        localTableConfig.data = data
    }
)
// 列
watch(
    () => props.tableColumns,
    (columns) => {
        localTableConfig.columns = columns
    }
)
// 分页
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
// 选中行的状态数组
watch(
    () => props.selectedRows,
    (list) => {
        localTableConfig.selectedRows = list
    }
)

// 抛出
defineExpose({
    tableInstance: localTableConfig.instance
})
</script>

<style lang="scss" scoped>
@import './styles';
</style>
