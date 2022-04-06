<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="addData">
            添加数据
        </el-button>
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FlowHeight'
}
</script>

<script lang="tsx" setup>
import { watch, reactive, ref } from 'vue'
import mockData from './data/userList.json'
import { TableColumnProps, TableConfig } from '@component/index'

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'sex',
        label: '性别'
    },
    {
        prop: 'avatar',
        label: '头像'
    },
    {
        prop: 'instituName',
        label: '机构'
    }
])

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    data: [],
    maxHeight: 300,
    height: false
})

let index = 0
const addData = () => {
    tableConfig.data.push(mockData[index++])
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    background-color: pink;
    overflow: auto;
}
</style>
