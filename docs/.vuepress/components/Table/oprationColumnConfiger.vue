<template>
    <div class="table-demo1">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableDemo1'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, nextTick } from 'vue'
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { TableConfig } from 'jn-ve-global/packages/GTable
import { TableConfig, TableColumnProps, BaseTableDataItem } from '@component/GTable'

const columns = reactive<TableColumnProps[]>([
    {
        prop: 'date',
        label: '日期'
    },
    {
        prop: 'name',
        label: '姓名'
    }
])

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
        date: '2016-05-06',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1515 弄'
    },
    {
        id: '4',
        date: '2016-05-08',
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
        total: 2
    },
    rowBtnConfig: {
        width: 480,
        maxCount: 5,
        btns: [
            {
                label: '禁用',
                disabled: (row, index) => {
                    return index % 2 === 1
                }
            },
            {
                label: '条件显示的按钮',
                hide: (row, index) => {
                    return index % 2 === 0
                },
                style: {
                    color: 'green'
                },
                onClick(row, index) {}
            },
            {
                label: '显示',
                onClick(row, index) {
                    tableConfig.rowBtnConfig.btns[3].hide = false
                }
            },
            {
                label: '隐藏',
                class: 'btn-danger',
                onClick(row, index) {
                    tableConfig.rowBtnConfig.btns[3].hide = true
                }
            },
            {
                label: '被隐藏按钮',
                hide: false,
                loading: true
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
    }
})
</script>

<style lang="scss" scoped>
.table-demo1 {
    height: 400px;
}
</style>
