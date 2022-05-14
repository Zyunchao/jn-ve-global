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
        /**
         * 动态显隐列一定要为列添加宽度配置
         */
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
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 300,
        fixed: 'right',
        render(row) {
            return (
                <>
                    <el-button
                        text={true}
                        onClick={() => {
                            columns.find((column) => column.prop === 'date').hide = false

                            /**
                             * 注意：在使用动态显隐列时，一定要在改变列的 hide 值后，调用 table 的 doLayout 方法
                             * 否则将会有可能造成列的布局错乱
                             * 且要注意 nextTick 的使用
                             */
                            nextTick(() => {
                                tableConfig.instance.doLayout()
                            })
                        }}>
                        显示
                    </el-button>
                    <el-button
                        text={true}
                        type='danger'
                        onClick={() => {
                            columns.find((column) => column.prop === 'date').hide = true

                            /**
                             * 注意：在使用动态显隐列时，一定要在改变列的 hide 值后，调用 table 的 doLayout 方法
                             * 否则将会有可能造成列的布局错乱
                             */
                            nextTick(() => {
                                tableConfig.instance.doLayout()
                            })
                        }}>
                        隐藏
                    </el-button>
                </>
            )
        }
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
