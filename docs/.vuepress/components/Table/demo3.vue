<template>
    <div class="table-demo1">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'TableDemo3'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { TableConfig } from 'jn-ve-global/packages/GTable
import { TableConfig, TableColumnProps, BaseTableDataItem } from '@component/GTable'

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
        label: '地址',
        children: [
            {
                label: '地区'
            },
            {
                label: '街道',
                children: [
                    {
                        label: '小区'
                    },
                    {
                        label: '单元'
                    }
                ]
            }
        ]
    }
])

/**
 * 注意：表格数据必须拥有 id 字段，内部 rowKey 将使用数据的 id
 */
const tableData: BaseTableDataItem[] = [
    {
        id: '1',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    },
    {
        id: '2',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    },
    {
        id: '3',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    },
    {
        id: '4',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    },
    {
        id: '5',
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
    },
    {
        id: '6',
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
    },
    {
        id: '7',
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
    },
    {
        id: '8',
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
    }
]

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: columns,
    data: tableData,
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 50
    }
})
</script>

<style lang="scss" scoped>
.table-demo1 {
    height: 400px;
}
</style>
