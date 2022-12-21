<template>
    <!-- 
        容器的 pading 需要在传递 searchFormProps 的前提下
        noSearchLabel = true 去除 padding
        moreSearchMode 的权重比 noSearchLabel 高，如果传递了 moreSearchMode 则必然显示 “搜索条件 + 更多查询” 并添加 padding
     -->
    <div
        :class="[
            'base-module-root',
            $attrs.class,
            `${localMode}-mode`,
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
            :mode="localMode"
            :search-form-props="searchFormProps"
            :search-btns-config="searchBtnsConfig"
            :no-search-label="noSearchLabel"
            :search-btn-horizontal="searchBtnHorizontal"
            :more-search-mode="moreSearchMode"
        />

        <!-- 中间操作区域 -->
        <div class="middle-area">
            <span v-if="localMode === 'tabular'" class="title">查询结果</span>

            <div
                v-if="(btns && btns.length) || $slots['middle-right']"
                class="middle-opertion-wrapper"
            >
                <!-- 左 按钮组-->
                <div class="middle-left-wrapper">
                    <LGButtonGroup
                        v-if="btns && btns.length > 0"
                        class="btns-wrapper"
                        :btns="btns"
                    />
                </div>

                <!-- 右 -->
                <div v-if="$slots['middle-right']" class="middle-right-wrapper">
                    <slot name="middle-right" />
                </div>
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
import { ref, computed, watch } from 'vue'
import { BtnProps } from './index'
import { FormProps } from '../GForm'
import { TableColumnProps, BaseTableDataItem, TableConfig, PaginationProps } from '../GTable'
import TableSearch from './component/TableSearch.vue'
import LGTable from '../GTable/index.vue'
import LGButtonGroup from '../GButtonGroup/index.vue'
import { getBaseModuleMode } from '@component/_globalConstant/baseModuleMode'
import type { BaseModuleMode } from '@component/_globalConstant/baseModuleMode'
import useSearchBtnConfig from './hooks/useSearchBtnConfig'
import useMergeProps from './hooks/useMergeProps'

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
    /**
     * 布局模式，现支持两种
     */
    mode?: BaseModuleMode
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
    selectedRows: null,
    mode: undefined
})

const emits = defineEmits(['getTableInstance', 'update:activeTab', 'update:selectedRows'])
const tableSearchRef = ref<InstanceType<typeof TableSearch> | null>(null)

/**
 * 期望运行的 baseModule 的模式
 */
const localMode = computed(() => props.mode || getBaseModuleMode())

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
const { searchBtnsConfig } = useSearchBtnConfig({
    props,
    emits,
    tableSearchRef
})

// 包装本地表格配置（中转站）
const { localTableConfig } = useMergeProps({ props, emits })

// 抛出
defineExpose({
    tableConfig: localTableConfig,
    tableInstance: localTableConfig.instance,
    tableSearchRef
})
</script>

<style lang="scss" scoped>
@import './styles/classic-mode/index.scss';
@import './styles/tabular-mode/index.scss';
</style>
