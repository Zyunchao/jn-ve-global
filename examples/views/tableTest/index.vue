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
        prop: 'instituName',
        label: '机构名称',
        rules: [
            {
                required: true
            }
        ],
        pasteValueFormat(current, pre) {
            if (pre && current === '') {
                return pre
            }

            return current
        },
        editable: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'postId',
        label: '职务编码',
        width: 140,
        rules: [
            {
                required: true
            }
        ],
        pasteValueFormat(current, pre) {
            if (pre && current === '') {
                return pre
            }

            return current
        },
        editable: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'name',
        label: '职务名称',
        rules: [
            {
                required: true,
                message: '职务名称不能为空'
            }
        ],
        editable: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'createBy',
        label: '创建者',
        rules: [
            {
                required: true,
                message: '创建者不能为空'
            }
        ],
        editable: true,
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'sex',
        label: '创建时间',
        pasteValueFormat(current) {
            return current === '男' ? 'm' : 'f'
        },
        editable: true,
        controlConfig: {
            type: 'input'
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
