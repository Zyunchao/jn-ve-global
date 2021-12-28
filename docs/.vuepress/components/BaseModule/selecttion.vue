<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="handleAdd">
            点击添加选中
        </el-button>
        <el-button type="success" @click="handleCheck">
            点击切换选中
        </el-button>
        <el-button type="warning" @click="handleSub">
            点击减少选中
        </el-button>

        <div class="box">
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
                @reset="loadTable"
                @search="loadTable"
            />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { reactive, ref, watch } from 'vue'
import { BtnProps, PaginationProps, TableConfig, FormProps } from '@component/index'
import mockData from './data/mock.json'
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
    }
})

// 表格外操作按钮
const btns: BtnProps[] = [
    {
        label: '添加',
        onClick: () => {}
    }
]

const loadTable = (page: number) => {
    showSelection.value = !showSelection.value
}

let count = 0
const handleAdd = () => {
    selectedRows.value.push(mockData['data1'][count++])
}

const handleSub = () => {
    selectedRows.value.splice(--count, 1)
}

const handleCheck = () => {
    selectedRows.value = [mockData['data1'][4], mockData['data1'][5]]
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    height: 800px;

    .box {
        margin-top: 20px;
        height: calc(100% - 60px);
    }
}
</style>
