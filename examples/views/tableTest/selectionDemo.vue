<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="getSelection">
            获取数据
        </el-button>
        <div>
            <g-table :config="tableConfig" />
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableTest'
}
</script>

<script lang="tsx" setup>
import { watch, reactive, ref } from 'vue'
import mockData from './data.json'
import { TableColumnProps, TableConfig } from '@component/index'

const tableColumns: TableColumnProps[] = [
    {
        label: '',
        type: 'selection'
    },
    {
        prop: 'instituName',
        label: '机构名称'
    },
    {
        prop: 'postId',
        label: '职务编码',
        width: 140
    },
    {
        prop: 'name',
        label: '职务名称'
    },
    {
        prop: 'createBy',
        label: '创建者'
    },
    {
        prop: 'createTime',
        label: '创建时间'
    },
    {
        prop: 'status',
        label: '状态',
        width: 160,
        fixed: 'right'
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 200,
        fixed: 'right',
        render(row) {
            return (
                <>
                    <el-button text={true}>编辑</el-button>
                    <el-button text={true}>人员设置</el-button>
                    <el-button text={true} type='danger'>
                        删除
                    </el-button>
                </>
            )
        }
    }
]

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    showSelection: true,
    selectedRows: [mockData.data1[0], mockData.data1[1], mockData.data1[2]],
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 26,
        onChange: (page, pageSize) => {
            tableConfig.data = mockData[`data${page}`]
        }
    },
    data: mockData.data1,
    onSelectionChange(selection) {
        // console.log(`%c 外部的 selection === `, 'color: #ff3040;', selection)
    },
    onSelect(selection, row) {
        // console.log(`%c 外部的 select == `, 'color: #ff3040;')
    },
    onSelectAll(selection) {
        // console.log(`%c 外部的 selectAll`, 'color: #ff3040;')
    }
})

watch(
    () => tableConfig.selectedRows,
    (arr) => {
        console.log(`%c selectedRows == `, 'color: green;', arr)
    },
    {
        deep: true
    }
)

let index = 3
const getSelection = () => {
    tableConfig.selectedRows.push(mockData.data1[index++])
    // console.log(`%c selectedRows == `, 'color: #67c23a;', tableConfig.selectedRows)
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    display: flex;
    flex-direction: column;

    > button {
        width: 200px;
        margin-bottom: 10px;
    }

    > div {
        flex: 1;
        overflow: hidden;
    }
}
</style>
