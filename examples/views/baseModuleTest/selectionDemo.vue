<template>
    <el-button type="primary" @click="handleAdd">
        点击添加选中
    </el-button>
    <el-button type="success" @click="handleCheck">
        点击切换选中
    </el-button>
    <el-button type="warning" @click="handleSub">
        点击减少选中
    </el-button>
    <div class="examples-base-wrapper">
        <GBaseModule
            v-model:selected-rows="selectedRows"
            :show-selection="showSelection"
            :search-form-props="searchFormConfig"
            :btns="btns"
            :load-table-methods="loadTable"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="tablePagination"
            :table-loading="false"
            :row-btn-config="rowBtnConfig"
            @reset="loadTable"
            @search="loadTable"
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
const showSelection = ref<boolean>(true)

const selectedRows = ref<any[]>([])

watch(
    () => selectedRows.value,
    (list) => {
        console.log(`%c 父级 selectionRow ==== `, 'color: #f56c6c;', list)
    },
    {
        deep: true
    }
)

const tablePagination = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 30,
    onChange(page, size) {
        tableData.value = mockData[`data${page}`]

        console.log(`%c 选中行 === `, 'color: #67c23a;', selectedRows.value)
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
    showSelection.value = !showSelection.value
}

let count = 0
const handleAdd = () => {
    selectedRows.value.push(mockData['data1'][count++])
}

const handleSub = () => {
    console.log(`%c count ==== `, 'color: #67c23a;', count, selectedRows.value)

    selectedRows.value.splice(--count, 1)

    console.log(`%c count ==== `, 'color: #67c23a;', count, selectedRows.value)
}

const handleCheck = () => {
    selectedRows.value = [mockData['data1'][4], mockData['data1'][5]]
}
</script>

<style lang="scss" scoped></style>
