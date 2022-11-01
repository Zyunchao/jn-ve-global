<template>
    <div class="table-demo5">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableDemo5'
}
</script>

<script lang="tsx" setup>
import { watch, reactive, nextTick, ref } from 'vue'
import mockData from './data/editTableData'
import treeData from './data/treeData.json'
import {
    TableColumnProps,
    TableConfig,
    SelectControlConfig,
    SelectTreeProps,
    BaseTableDataItem
} from '@component/index'
import dayjs from 'dayjs'
import { findTargetById } from '@/utils/utils'
import { toThousands } from '@jsjn/utils'

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
        openDB: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'inputNumer',
        label: 'InputNumer',
        width: 160,
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'inputNumber',
            props: {
                min: 0
            }
        }
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
        }
    },
    {
        prop: 'selectMultiple',
        label: 'SelectMultiple',
        width: 200,
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'select',
            props: {
                multiple: true
            },
            options: Object.keys(foodsMapping).map((key) => ({
                label: foodsMapping[key],
                value: key
            }))
        },
        render(row) {
            return row.selectMultiple
                ? Array.isArray(row.selectMultiple)
                    ? row.selectMultiple.map((key) => foodsMapping[key] || key).join('，')
                    : row.selectMultiple
                : ''
        }
    },
    {
        prop: 'money',
        label: '工资-FigureInput',
        width: 180,
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'figureInput',
            props: {
                format: (val) => toThousands(val)
            }
        }
    },
    {
        prop: 'radio',
        label: 'Radio',
        width: 160,
        editable: true,
        openDB: true,
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
        width: 210,
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
        prop: 'timeSelect',
        label: 'TimeSelect',
        width: 200,
        editable: true,
        controlConfig: {
            type: 'timeSelect',
            props: {
                start: '08:30',
                step: '00:15',
                end: '18:30'
            }
        }
    },
    {
        prop: 'datePicker',
        label: 'DatePicker',
        width: 220,
        editable: true,
        controlConfig: {
            type: 'datePicker',
            props: {
                valueFormat: 'YYYY-MM-DD'
            }
        },
        render(row) {
            return dayjs(row.datePicker).format('YYYY-MM-DD')
        }
    },
    {
        prop: 'dateTimePicker',
        label: 'DateTimePicker',
        width: 220,
        editable: true,
        controlConfig: {
            type: 'dateTimePicker',
            props: {
                valueFormat: 'YYYY-MM-DD HH:mm:ss'
            }
        },
        render(row) {
            return dayjs(row.dateTimePicker).format('YYYY-MM-DD HH:mm:ss')
        }
    },
    {
        prop: 'daterange',
        label: 'Daterange',
        width: 260,
        editable: true,
        controlConfig: {
            type: 'datePicker',
            props: {
                type: 'daterange',
                valueFormat: 'YYYY-MM-DD'
            }
        },
        render(row) {
            return Array.isArray(row.daterange)
                ? `${row.daterange[0]} 至 ${row.daterange[1]}`
                : row.daterange
        }
    },
    {
        prop: 'checkbox',
        label: 'Checkbox',
        minWidth: 200,
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
        }
    },
    {
        prop: 'colorPicker',
        label: 'ColorPicker',
        width: 200,
        editable: true,
        controlConfig: {
            type: 'colorPicker'
        },
        render(row) {
            return (
                <span
                    style={`width: 100%; height: 28px; display: block; background-color: ${row.colorPicker}; color: #fff;`}>
                    {row.colorPicker}
                </span>
            )
        }
    },
    {
        prop: 'rate',
        label: 'Rate',
        width: 160,
        editable: true,
        controlConfig: {
            type: 'rate'
        },
        render(row) {
            return <el-rate model-value={row.rate} disabled />
        }
    },
    {
        prop: 'slider',
        label: 'Slider',
        width: 360,
        editable: true,
        controlConfig: {
            type: 'slider',
            props: {
                step: 10,
                showStops: true,
                marks: {
                    0: '0°C',
                    8: '8°C',
                    37: '37°C',
                    50: {
                        style: {
                            color: '#1989FA'
                        },
                        label: '50%'
                    }
                }
            }
        },
        render(row) {
            return <el-slider model-value={row.slider} show-tooltip={false} disabled></el-slider>
        }
    },
    {
        prop: 'selectTree',
        label: 'SelectTree',
        width: 260,
        editable: true,
        controlConfig: {
            type: 'selectTree',
            treeData: treeData
        },
        render(row) {
            return <span>{findTargetById(treeData, row.selectTree)?.name || row.selectTree}</span>
        }
    },
    {
        prop: 'selectTreeMultiple',
        label: 'SelectTreeMultiple',
        width: 260,
        editable: true,
        controlConfig: {
            type: 'selectTree',
            treeData: treeData,
            props: {
                multiple: true
            }
        },
        render(row) {
            return (
                <span>
                    {row.selectTreeMultiple
                        .map((item) => findTargetById(treeData, item)?.name || item)
                        .join('，')}
                </span>
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
            ...item,
            selectMultiple: item.selectMultiple?.split(','),
            checkbox: item.checkbox?.split(','),
            selectTreeMultiple: item.selectTreeMultiple?.split(',')
        }
        return obj
    })
}
</script>

<style lang="scss" scoped>
.table-demo5 {
    height: 500px;
}
</style>
