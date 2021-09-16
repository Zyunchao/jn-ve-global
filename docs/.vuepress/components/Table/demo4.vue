<template>
    <el-button type="primary" @click="addSelection">
        添加勾选项
    </el-button>
    <el-button type="primary" @click="clearSelection">
        清空勾选项
    </el-button>
    <el-button type="success" @click="getSelectRows">
        获取勾选项
    </el-button>
    <div class="table-demo1">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'TableDemo4'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { TableConfig } from 'jn-ve-global/packages/GTable
import { TableConfig, TableColumnProps, BaseTableDataItem } from '@component/GTable'
import mockData from './data/mock.json'

const columns = reactive<TableColumnProps[]>([
    {
        prop: 'date',
        label: '日期',
        width: 180
    },
    {
        prop: 'name',
        label: '姓名',
        width: 180
    },
    {
        prop: 'address',
        label: '地址'
    }
])

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: columns,
    data: mockData['data1'],
    showSelection: true,
    /**
     * 维护已选列表，不传递将被认为不维护列表
     */
    selectedRows: [mockData.data1[0], mockData.data1[1], mockData.data1[2]],
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 30,
        onChange(page, pageSize) {
            tableConfig.data = mockData[`data${page}`]
        }
    }
})

let index = ref(3)
const addSelection = () => {
    index.value < mockData.data1.length &&
        tableConfig.selectedRows.push(mockData.data1[index.value++])
}

const clearSelection = () => {
    tableConfig.selectedRows = []
    index.value = 0
}

const getSelectRows = () => {
    console.log(`%c selectRows == `, 'color: #67c23a;', tableConfig.selectedRows)
}
</script>

<style lang="scss" scoped>
.table-demo1 {
    height: 600px;
    margin-top: 10px;
}
</style>
