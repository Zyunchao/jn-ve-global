<template>
    <div class="table-demo7">
        <div class="button-wrapper">
            <el-button type="primary" @click="handleCheckAll">
                校验全部
            </el-button>
            <el-button type="success" @click="handleCheckRow">
                校验指定行
            </el-button>
            <el-button type="success" @click="handleCheckColumn">
                校验指定列
            </el-button>
            <el-button type="success" @click="handleCheckCell">
                校验指定单元格
            </el-button>
        </div>
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableValidate'
}
</script>

<script lang="tsx" setup>
import { reactive, nextTick } from 'vue'
import mockData from './data/editTableData2'
import { TableColumnProps, TableConfig, BaseTableDataItem } from '@component/index'
import _ from 'lodash'
import { ElMessage } from 'element-plus'

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'input',
        label: 'Input',
        editable: true,
        openSC: true,
        controlConfig: {
            type: 'input',
            props: {}
        },
        rules: {
            required: true,
            message: 'Input 为必填项'
        }
    },
    {
        prop: 'money',
        label: '工资-FigureInput',
        editable: true,
        openSC: true,
        rules: [
            {
                validator(rule, value, cb, source) {
                    const sum = _.sumBy(tableConfig.data, (item) => item.money)
                    if (sum > 10) {
                        return new Error('工资总和 应该小于 10')
                    }
                    return true
                }
            }
        ],
        controlConfig: {
            type: 'inputNumber',
            props: {
                onChange() {
                    tableConfig.instance.validate()
                }
            }
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

const handleCheckAll = () => {
    tableConfig.instance
        .validate()
        .then((res) => {
            console.log(`%c 校验成功：`, 'color: #67c23a;', res)
        })
        .catch((errors) => {
            console.log(`%c 校验失败：`, 'color: #f56c6c;', errors)
            ElMessage.error('校验未通过')
        })
}
const handleCheckRow = () => {
    tableConfig.instance
        .validate({
            ri: 1
        })
        .then((res) => {
            console.log(`%c 校验成功：`, 'color: #67c23a;', res)
        })
        .catch((errors) => {
            console.log(`%c 校验失败：`, 'color: #f56c6c;', errors)
            ElMessage.error('校验未通过')
        })
}
const handleCheckColumn = () => {
    tableConfig.instance
        .validate({
            prop: 'money'
        })
        .then((res) => {
            console.log(`%c 校验成功：`, 'color: #67c23a;', res)
        })
        .catch((errors) => {
            console.log(`%c 校验失败：`, 'color: #f56c6c;', errors)
            ElMessage.error('校验未通过')
        })
}
const handleCheckCell = () => {
    tableConfig.instance
        .validate({
            ri: 1,
            prop: 'money'
        })
        .then((res) => {
            console.log(`%c 校验成功：`, 'color: #67c23a;', res)
        })
        .catch((errors) => {
            console.log(`%c 校验失败：`, 'color: #f56c6c;', errors)
            ElMessage.error('校验未通过')
        })
}

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
    height: 700px;
    display: flex;
    flex-direction: column;

    .button-wrapper {
        margin-bottom: 20px;
    }
}
</style>
