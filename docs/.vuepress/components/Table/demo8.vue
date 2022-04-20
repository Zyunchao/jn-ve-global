<template>
    <div class="table-demo7">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableDemo8'
}
</script>

<script lang="tsx" setup>
import { reactive, nextTick } from 'vue'
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

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'input',
        label: 'Input',
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'input',
            props: {
                onInput(val) {
                    const rowData = arguments[arguments.length - 1]
                    console.log(`%c 变化的值：`, 'color: #67c23a;', val)
                    console.log(`%c 当前行数据：`, 'color: #67c23a;', rowData)
                }
            }
        },
        rules: {
            required: true,
            message: 'Input 为必填项'
        }
    },
    {
        prop: 'inputNumer',
        label: 'InputNumer',
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'inputNumber',
            props: {
                min: 0
            }
        },
        rules: [
            {
                required: true,
                type: 'number',
                min: 0,
                max: 10,
                message: '数值在 0 - 10 之间'
            }
        ]
    },
    {
        prop: 'select',
        label: 'Select',
        width: 200,
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'select',
            options: Object.keys(foodsMapping).map((key) => ({
                label: foodsMapping[key],
                value: key
            }))
        },
        render(row) {
            return <>{foodsMapping[row.select]}</>
        },
        rules: {
            required: true,
            validator(rule, val, cb) {
                if (val === 'noodles' || val === 'coconut') {
                    return false
                }
                return true
            },
            message: '食物必选，且不能选择 “龙须面” 和 “椰子”'
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
                                nextTick(() => {
                                    console.log(`%c row.edit == `, 'color: #67c23a;', row.edit)
                                    if (row.edit) return
                                    // ...... 操作
                                })
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
    data: mapData(mockData)
})

/**
 * 转换数据
 */
function mapData(source): BaseTableDataItem[] {
    return source.map((item: BaseTableDataItem) => {
        const obj: BaseTableDataItem = {
            edit: false,
            ...item,
            checkbox: item.checkbox?.split(',')
        }
        return obj
    })
}
</script>

<style lang="scss" scoped>
.table-demo7 {
    height: 500px;
}
</style>
