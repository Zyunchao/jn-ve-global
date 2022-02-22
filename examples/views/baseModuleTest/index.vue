<template>
    <div class="examples-base-wrapper">
        <GBaseModule
            v-model:activeTab="activeTab"
            more-search-mode="pull-down"
            highlight-current-row
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="tablePagination"
            :table-loading="false"
            :row-btn-config="rowBtnConfig"
            :tabs="moduleTabs"
            @reset="onReset"
            @search="onSearch"
        />
    </div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue'
import { BtnProps, PaginationProps, TableConfig } from '@component/index'
import mockData from './mock.json'
import SearchFormConfig from './component/SearchFormConfig'
import TableColumns from './component/TableColumns'

const searchFormConfig = SearchFormConfig()
const tableColumns = TableColumns()
const tableData = ref(mockData.data1)

const tablePagination = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 30,
    onChange(page, size) {
        tableData.value = mockData[`data${page}`]
    }
})

// 表格外操作按钮
const btns: BtnProps[] = [
    {
        label: '添加',
        onClick: () => {}
    },
    {
        label: '授权',
        type: 'danger',
        onClick: () => {
            console.log(`%c 添加 === `, 'color: #e6a23c;')
        }
    },
    {
        label: '禁用',
        disabled: true,
        type: 'warning',
        onClick: () => {
            console.log(`%c 禁用 === `, 'color: #e6a23c;')
        }
    },
    {
        label: '加载中',
        loading: true,
        type: 'success',
        onClick: () => {
            console.log(`%c 加载中 === `, 'color: #e6a23c;')
        }
    }
]

const activeTab = ref<string>('')
const moduleTabs = reactive([
    {
        label: '全部',
        value: 'all'
    },
    {
        label: '审核中 0',
        value: 'checkout'
    },
    {
        label: '待签发 20',
        value: 'issue'
    },
    {
        label: '待领取 2',
        value: 'get'
    }
])

watch(
    () => activeTab.value,
    (val) => {
        console.log(`%c 激活的 tab === `, 'color: #67c23a;', val)
    }
)

// 表格操作列按钮组
const rowBtnConfig = reactive<TableConfig<any>['rowBtnConfig']>({
    width: 400,
    maxCount: 5,
    btns: [
        {
            label: '显示',
            disabled(row, index) {
                return index % 2 === 0
            },
            onClick(row, index) {
                rowBtnConfig.btns[3].hide = false
                rowBtnConfig.btns[5].disabled = false
            }
        },
        {
            label: '隐藏',
            style: {
                color: 'red'
            },
            onClick(row, index) {
                rowBtnConfig.btns[3].hide = true
                rowBtnConfig.btns[5].disabled = true
            }
        },
        {
            label: '按钮3',
            onClick(row, index) {
                console.log(`%c 按钮3 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮4',
            loading: true,
            onClick(row, index) {
                console.log(`%c 按钮4 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮5',
            style: {
                color: 'red'
            },
            onClick(row, index) {
                console.log(`%c 按钮5 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮6',
            onClick(row, index) {
                console.log(`%c 按钮6 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮7',
            onClick(row, index) {
                console.log(`%c 按钮7 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮8',
            onClick(row, index) {
                console.log(`%c 按钮8 click....`, 'color: #ff3040;', row, index)
            }
        }
    ]
})

const loadTable = (page: number) => {
    const params = {
        page: tablePagination.currentPage,
        size: tablePagination.pageSize,
        ...searchFormConfig.model
    }

    console.log(`%c params == `, 'color: #e6a23c;', params)
}

const onReset = () => {
    console.log(`%c onReset run.......................`, 'color: #67c23a;')
}

const onSearch = () => {
    console.log(`%c onSearch run..........................`, 'color: #f56c6c;')
}
</script>

<style lang="scss" scoped></style>
