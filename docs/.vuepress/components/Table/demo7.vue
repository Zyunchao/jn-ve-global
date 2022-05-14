<template>
    <div class="table-demo7">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableDemo7'
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
        },
        rules: {
            required: true,
            message: 'Input 为必填项'
        }
    },
    {
        prop: 'inputNumer',
        label: 'InputNumer',
        // width: 160,
        editable: true,
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
        prop: 'checkbox',
        label: 'Checkbox',
        editable: true,
        controlConfig: {
            type: 'checkBox',
            options: Object.keys(hobbyMapping).map((key) => ({
                value: key,
                label: hobbyMapping[key]
            }))
        },
        render(row) {
            return row.checkbox
                ? Array.isArray(row.checkbox)
                    ? row.checkbox.map((key) => hobbyMapping[key] || key).join('，')
                    : row.checkbox
                : ''
        },
        rules: [
            {
                validator(rule, val: any[]) {
                    if (val.length === 0) return false
                    return true
                },
                message: 'Checkbox 至少需要一项选择'
            }
        ]
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
                            text={true}
                            onClick={() => {
                                row.edit = true
                                console.log(`%c 编辑，数据：`, 'color: #f56c6c;', row)
                            }}>
                            编辑
                        </el-button>
                    ) : (
                        <el-button
                            text={true}
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
                    <el-button text={true} type='danger'>
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
