<template>
    <div class="examples-base-wrapper">
        <GBaseModule
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="tablePagination"
            :table-loading="false"
            :row-btn-config="rowBtnConfig"
        />
    </div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue'
import { BtnProps, PaginationProps, TableConfig, FormProps } from '@component/index'
import mockData from './mock.json'
import TableColumns from './component/TableColumns'

const searchFormConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '100px',
    model: {
        name: '',
        name2: ''
    },
    formItems: [
        {
            prop: 'name',
            label: '姓名',
            span: 8,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'name2',
            label: '日期',
            span: 8,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

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
    }
]

// 表格操作列按钮组
const rowBtnConfig = reactive<TableConfig<any>['rowBtnConfig']>({
    btns: [
        {
            label: '显示',
            onClick(row, index) {}
        },
        {
            label: '隐藏',
            style: {
                color: 'red'
            },
            onClick(row, index) {}
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
</script>

<style lang="scss" scoped></style>
