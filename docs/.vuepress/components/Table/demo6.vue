<template>
    <div class="table-demo6">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableDemo6'
}
</script>

<script lang="tsx" setup>
import { reactive } from 'vue'
import mockData from './data/editTableData'
import { TableColumnProps, TableConfig, BaseTableDataItem } from '@component/index'
import dayjs from 'dayjs'

const foodsMapping = {
    pastries: '黄金糕',
    milk: '双皮奶',
    fried: '蚵仔煎',
    noodles: '龙须面',
    bjduck: '北京烤鸭',
    banana: '香蕉',
    apple: '苹果',
    grape: '葡萄',
    watermelon: '西瓜',
    litchi: '荔枝',
    coconut: '椰子'
}

const sexMapping = {
    m: '男',
    f: '女'
}

const hobbyMapping = {
    '1': '工作',
    '2': '学习',
    '3': '美妆',
    '4': '遛鸟',
    '5': '钓鱼'
}

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'input',
        label: 'Input',
        width: 160,
        editable: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'select',
        label: 'Select',
        width: 200,
        editable: true,
        controlConfig: {
            type: 'select',
            options: Object.keys(foodsMapping).map((key) => ({
                label: foodsMapping[key],
                value: key
            }))
        },
        render(row) {
            return <>{foodsMapping[row.select]}</>
        }
    },
    {
        prop: 'radio',
        label: 'Radio',
        width: 160,
        editable: true,
        controlConfig: {
            type: 'radio',
            options: Object.keys(sexMapping).map((key) => ({
                value: key,
                label: sexMapping[key]
            }))
        },
        render(row) {
            return sexMapping[row.radio]
        }
    },
    {
        prop: 'timePicker',
        label: 'TimePicker',
        editable: true,
        controlConfig: {
            type: 'timePicker',
            props: {
                format: 'HH:mm:ss'
            }
        },
        render(row) {
            return row.timePicker instanceof Date
                ? dayjs(row.timePicker).format('HH:mm:ss')
                : row.timePicker
        }
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 160,
        fixed: 'right',
        render(row) {
            return (
                <>
                    {!row.edit ? (
                        <el-button
                            type='text'
                            onClick={() => {
                                row.edit = true
                                console.log(`%c 编辑，数据：`, 'color: #f56c6c;', row)
                            }}>
                            编辑
                        </el-button>
                    ) : (
                        <el-button
                            type='text'
                            onClick={() => {
                                row.edit = false
                                console.log(`%c 保存，数据：`, 'color: #67c23a;', row)
                            }}>
                            保存
                        </el-button>
                    )}
                    <el-button type='text' class='btn-danger'>
                        删除
                    </el-button>
                </>
            )
        }
    }
])

const tableConfig = reactive<TableConfig<BaseTableDataItem>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 26
    },
    data: mapData(mockData),
    /**
     * 整行编辑 onCellEdited 将不再生效
     */
    onCellEdited(row, index: number, field) {
        console.group(`%c 第 ${index + 1} 行发生编辑 --`, 'color: #ff3040;')
        console.log(`%c row == `, 'color: #67c23a;', row)
        console.log(`%c ${field} 字段值 == `, 'color: #67c23a;', row[field])
        console.groupEnd()
    }
})

/**
 * 转换数据
 */
function mapData(source): BaseTableDataItem[] {
    return source.map((item: BaseTableDataItem) => {
        const obj: BaseTableDataItem = {
            /**
             * 整行编辑要为数据的每一行添加 edit 字段
             */
            edit: false,
            ...item
        }
        return obj
    })
}
</script>

<style lang="scss" scoped>
.table-demo6 {
    height: 500px;
}
</style>
