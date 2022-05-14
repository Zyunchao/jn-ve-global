<template>
    <div class="examples-base-wrapper">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableTest'
}
</script>

<script lang="tsx" setup>
import { watch, reactive, nextTick } from 'vue'
import mockData from './data.json'
import { TableColumnProps, TableConfig } from '@component/index'

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'instituName',
        label: '机构名称2',
        hide: false,
        width: 200
    },
    {
        prop: 'postId',
        label: '职务编码',
        width: 200
    },
    {
        prop: 'name',
        label: '职务名称'
    },
    {
        prop: 'createBy',
        label: '创建者'
    },
    {
        prop: 'createTime',
        label: '创建时间'
    }
])

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    data: mockData.data1,
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 26,
        onChange: (page, pageSize) => {
            tableConfig.data = mockData[`data${page}`]
        }
    },
    rowBtnConfig: {
        width: 440,
        maxCount: 4,
        btns: [
            {
                label: '条件创建',
                authCode: '...',
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
                authCode: '...',
                onClick(row, index) {
                    console.log(`%c 第 ${index + 1} 行 == `, 'color: #67c23a;', row)

                    tableColumns.find((column) => column.prop === 'instituName').hide = false

                    nextTick(() => {
                        tableConfig.instance.doLayout()
                    })

                    tableConfig.rowBtnConfig.btns[2].hide = false
                }
            },
            {
                label: '隐藏',
                authCode: '...',
                class: 'btn-danger',
                onClick(row, index) {
                    tableColumns.find((column) => column.prop === 'instituName').hide = true
                    nextTick(() => {
                        tableConfig.instance.doLayout()
                    })
                    tableConfig.rowBtnConfig.btns[2].hide = true
                }
            },
            {
                label: '可隐藏按钮',
                authCode: '...',
                hide: false,
                loading: true,
                onClick(row, index) {
                    console.log(`%c 隐藏按钮 click....`, 'color: #ff3040;', row, index)
                }
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

watch(
    () => tableConfig.instance,
    (instance) => {
        console.log(`%c instance == `, 'color: green;', instance)
    }
)
</script>

<style lang="scss" scoped></style>
