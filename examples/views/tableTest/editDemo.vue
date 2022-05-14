<template>
    <BusLayout>
        <g-table :config="tableConfig" />
    </BusLayout>
</template>

<script lang="tsx">
export default {
    name: 'TableTest'
}
</script>

<script lang="tsx" setup>
import { reactive, nextTick, ref } from 'vue'
import mockData from './editTableData'
import { TableConfig, BaseTableDataItem } from '@component/index'
import EditTableData from './component/editTableColumns'
import BusLayout from '@/components/businessLayout/index.vue'

const tableColumns = EditTableData()

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
    },
    rowBtnConfig: {
        width: 460,
        btns: [
            {
                label: '编辑',
                hide(row) {
                    return row.edit
                },
                onClick(row, index) {
                    row.edit = true
                    console.log(`%c 编辑，数据：`, 'color: #f56c6c;', row)
                }
            },
            {
                label: '保存',
                hide(row) {
                    return !row.edit
                },
                onClick(row, index) {
                    row.edit = false
                    console.log(`%c 保存，数据：`, 'color: #67c23a;', row)
                }
            },
            {
                label: '删除2',
                type: 'danger'
            },
            {
                label: '删除3',
                type: 'primary'
            },
            {
                label: '删除4',
                type: 'success'
            },
            {
                label: '删除5',
                type: 'warning'
            },
            {
                label: '删除6',
                type: 'info'
            },
            {
                label: '删除7',
                type: 'default'
            }
        ]
    }
})

/**
 * 转换数据
 */
function mapData(source): BaseTableDataItem[] {
    return source.map((item: BaseTableDataItem) => {
        const obj: BaseTableDataItem = {
            edit: false,
            ...item,
            selectMultiple: item.selectMultiple?.split(','),
            checkbox: item.checkbox?.split(','),
            selectTreeMultiple: item.selectTreeMultiple?.split(',')
        }
        return obj
    })
}
</script>

<style lang="scss" scoped></style>
