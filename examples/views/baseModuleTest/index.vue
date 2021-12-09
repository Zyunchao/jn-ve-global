<template>
    <div class="examples-base-wrapper">
        <GBaseModule
            more-search-mode="pull-down"
            highlight-current-row
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="mockData.data1"
            :table-pagination="tablePagination"
            :table-loading="false"
            @reset="onReset"
            @search="onSearch"
        />
    </div>
</template>

<script lang="tsx" setup>
import { defineComponent, reactive, toRefs } from 'vue'
import {
    BtnProps,
    FormProps,
    TableColumnProps,
    PaginationProps,
    BaseTableDataItem
} from '@component/index'
import mockData from './mock.json'
import SearchFormConfig from './component/SearchFormConfig'
import TableColumns from './component/TableColumns'

const searchFormConfig = SearchFormConfig()
const tableColumns = TableColumns()

const tablePagination = {
    currentPage: 1,
    pageSize: 10,
    total: 50
}

const tablePagination2 = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 100
})

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
