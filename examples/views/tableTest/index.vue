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
import { watch, reactive, ref } from 'vue'
import mockData from './data.json'
import { TableColumnProps, TableConfig } from '@component/index'

const tableColumns = reactive<TableColumnProps[]>([
    {
        type: 'index',
        label: ''
    },
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
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 200,
        fixed: 'right',
        render(row) {
            return (
                <>
                    {row.edit ? (
                        <el-button
                            type='text'
                            onClick={() => {
                                row.edit = false
                            }}>
                            保存
                        </el-button>
                    ) : (
                        <el-button
                            type='text'
                            onClick={() => {
                                row.edit = true
                            }}>
                            编辑
                        </el-button>
                    )}
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
    rowKey: 'index',
    stripe: true,
    pastable: true,
    data: [],
    onPasted(data) {
        tableConfig.data = data.map((item, index) => {
            item.edit = false
            item.index = index
            return item
        })

        console.log(`%c tableConfig.data == `, 'color: #e6a23c;', tableConfig.data)
    }
})
</script>

<style lang="scss" scoped></style>
