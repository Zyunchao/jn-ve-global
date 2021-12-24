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
        label: '日期',
        width: 180
    },
    {
        prop: 'name',
        label: '姓名',
        width: 180
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
        width: 440,
        maxCount: 4,
        btns: [
            {
                label: '显示',
                authCode: '...',
                onClick(row, index) {
                    tableConfig.rowBtnConfig.btns[2].hide = false
                }
            },
            {
                label: '隐藏',
                authCode: '...',
                class: 'btn-danger',
                onClick(row, index) {
                    tableConfig.rowBtnConfig.btns[2].hide = true
                }
            },
            {
                label: '被隐藏按钮',
                authCode: '...',
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
