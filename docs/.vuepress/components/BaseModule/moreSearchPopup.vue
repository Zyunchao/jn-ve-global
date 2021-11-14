<template>
    <div class="self">
        <GBaseModule
            more-search-mode="popup"
            highlight-current-row
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="mockData.data1"
            :table-pagination="tablePagination"
            :table-loading="false"
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
import mockData from './data/mock.json'
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
        type: 'success',
        onClick: () => {
            console.log(`%c 添加 === `, 'color: #e6a23c;')
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
</script>

<style lang="scss" scoped>
.self {
    height: 700px;

    :deep(.el-overlay) {
        .el-dialog {
            margin-top: 200px;
            width: 60%;
            margin-left: 500px;
        }
    }
}
</style>
