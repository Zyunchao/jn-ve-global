<template>
    <BusinessLayout>
        <!-- :tabs="moduleTabs" -->
        <g-base-module
            v-model:selected-rows="selectedRows"
            :show-selection="true"
            highlight-current-row
            no-search-label
            more-search-mode="popup"
            search-btn-horizontal
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="tablePagination"
            :table-loading="false"
            :row-btn-config="rowBtnConfig"
            :row-key="undefined"
            @current-change="currentChangeHandle"
        />
    </BusinessLayout>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue'
import { BtnProps, PaginationProps, TableConfig } from '@component/index'
import mockData from './mock.json'
import SearchFormConfig from './component/SearchFormConfig'
import TableColumns from './component/TableColumns'
import BusinessLayout from '@/components/businessLayout/index.vue'
import _ from 'lodash'

const searchFormConfig = SearchFormConfig()
const tableColumns = TableColumns()
const tableData = ref([])

const tablePagination = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 30,
    onChange(page, size) {
        tableData.value = mockData[`data${page}`]
    }
})

const selectedRows = ref<any[]>([mockData.data1[0]])

setTimeout(() => {
    tableData.value = mockData.data1
    // selectedRows.value = [mockData.data1[0]]
}, 1000)

watch(
    () => selectedRows.value,
    (list) => {
        console.log(`%c selectedRows === `, 'color: #67c23a;', list)
    }
)

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
        loading: () => true,
        type: 'success',
        onClick: () => {
            console.log(`%c 加载中 === `, 'color: #e6a23c;')
        }
    },
    {
        label: '隐藏操作列',
        type: 'warning',
        onClick: () => {
            rowBtnConfig.hide = !rowBtnConfig.hide
            rowBtnConfig.label = `${+new Date()}`
            rowBtnConfig.fixed = 'left'
            rowBtnConfig.align = 'right'
            console.log(`%c rowBtnConfig.hide === `, 'color: #e6a23c;', rowBtnConfig.hide)
        }
    },
    {
        label: '切换数据',
        type: 'success',
        onClick: () => {
            const datas = _.cloneDeep(mockData['data1'])

            datas[0].date = '1234'
            datas[0].id = '123491823qwe'

            tableData.value = datas
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
    hide: false,
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
            loading: (row, index) => {
                return index % 2 === 0
            },
            onClick(row, index) {
                console.log(`%c 按钮4 click....`, 'color: #ff3040;', row, index)
            }
        },
        {
            label: '按钮5',
            hide: (row, index) => {
                return index % 2 === 0
            },
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

const currentChangeHandle = (currentRow, oldCurrentRow) => {
    console.log(`%c currentRow ??????`, 'color: #67c23a;', currentRow)
}
</script>

<style lang="scss" scoped></style>
