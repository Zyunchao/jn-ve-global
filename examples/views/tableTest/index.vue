<template>
    <BusinessLayout>
        <el-button @click="hideColumn">
            隐藏列
        </el-button>
        <g-table :config="tableConfig" />
    </BusinessLayout>
</template>

<script lang="tsx">
export default {
    name: 'TableTest'
}
</script>

<script lang="tsx" setup>
import { watch, reactive, ref } from 'vue'
import mockData from './data.json'
import { TableColumnProps, TableConfig } from '@component/index'
import BusinessLayout from '@/components/businessLayout/index.vue'

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'sex',
        label: '性别',
        rules: [
            {
                required: true
            }
        ]
    },
    {
        prop: 'height',
        label: '身高'
    },
    {
        prop: 'hobby',
        label: '爱好'
    }
])

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'index',
    stripe: true,
    data: mockData.data1,
    rowBtnConfig: {
        label: 'qwer',
        hide: false,
        btns: [
            {
                label: '编辑'
            },
            {
                label: '人员设置'
            },
            {
                label: '删除',
                style: {
                    color: 'red'
                }
            }
        ]
    }
})

const hideColumn = () => {
    tableConfig.rowBtnConfig.hide = !tableConfig.rowBtnConfig.hide
}
</script>

<style lang="scss" scoped></style>
