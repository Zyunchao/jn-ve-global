<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="addSelectData">
            添加 Select 数据
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
import { watch, reactive, nextTick, ref } from 'vue'
import mockData from './editTableData'
import {
    TableColumnProps,
    TableConfig,
    SelectControlConfig,
    SelectTreeProps
} from '@component/index'
import dayjs from 'dayjs'
import treeData from '../selectTreeTest/data.json'
import { findTargetById } from '@/utils/utils'

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
        label: '姓名-Input',
        width: 160,
        fixed: 'left',
        editable: true,
        align: 'right',
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'inputNumer',
        label: '年龄-InputNumer',
        width: 160,
        editable: true,
        controlConfig: {
            type: 'inputNumber'
        }
    },
    {
        prop: 'select',
        label: '食物-Select',
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
        prop: 'selectMultiple',
        label: '食物多选-Select',
        width: 200,
        editable: true,
        controlConfig: {
            type: 'select',
            options: Object.keys(foodsMapping).map((key) => ({
                label: foodsMapping[key],
                value: key
            })),
            props: {
                multiple: true
            }
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
        prop: 'radio',
        label: '性别-Radio',
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
        label: '现在时间-TimePicker',
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
        label: '上班时间-TimeSelect',
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
        label: '生日-DatePicker',
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
        label: '生日-DateTimePicker',
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
        label: '放假-Daterange',
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
        label: '爱好-Checkbox',
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
        label: '幸运色-ColorPicker',
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
        label: '评分-Rate',
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
        label: '进度-Slider',
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
        label: '组织-SelectTree',
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
        label: '组织-SelectTreeMultiple',
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
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 200,
        fixed: 'right',
        render(row) {
            return (
                <>
                    <el-button type='text'>编辑</el-button>
                    <el-button type='text'>人员设置</el-button>
                    <el-button type='text' class='btn-danger'>
                        删除
                    </el-button>
                </>
            )
        }
    }
])

const tableConfig = reactive<TableConfig<any>>({
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
function mapData(source) {
    return source.map((item) => {
        return {
            ...item,
            selectMultiple: item.selectMultiple?.split(','),
            checkbox: item.checkbox?.split(','),
            selectTreeMultiple: item.selectTreeMultiple?.split(',')
        }
    })
}

const addSelectData = () => {
    const selectOptions = Object.keys(foodsMapping).map((key) => ({
        label: foodsMapping[key],
        value: key
    }))

    ;(
        tableColumns.find((column) => column.prop === 'select')
            ?.controlConfig as SelectControlConfig
    ).options = selectOptions
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
