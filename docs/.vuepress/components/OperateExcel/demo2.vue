<template>
    <GOperateExcel :columns-config="tableColumns" mode="template" file-name="测试模板2" />
</template>

<script lang="tsx">
export default {
    name: 'OperateExcelDemo2'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { TableConfig, TableColumnProps, BaseTableDataItem } from '@component/GTable'

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
</script>

<style lang="scss" scoped></style>
