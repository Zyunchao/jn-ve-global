<template>
    <div class="examples-base-wrapper">
        <g-collapse v-model="activeNames" @change="handleChange">
            <GCollapseItem title="表单" name="1" :form-config="formConfig" />
            <GCollapseItem title="表格" name="2" :table-config="tableConfig" :height="500" />
            <GCollapseItem title="自定义" name="3">
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
            </GCollapseItem>
            <GCollapseItem title="自定义2自定义2自定义2自定义2" name="4">
                <GTable :config="tableConfig" />
                <GForm :config="formConfig" />
            </GCollapseItem>
        </g-collapse>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'CollapseTest'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import FormConfig from './data/formConfig'
import { TableColumnProps, TableConfig } from '@component/index'
import mockData from './data/data.json'

const activeNames = ref<string[]>(['1'])

const formConfig = FormConfig()

const handleChange = (val) => {
    console.log(val)
}

const tableColumns: TableColumnProps[] = [
    {
        label: '',
        type: 'selection'
    },
    {
        prop: 'instituName',
        label: '机构名称'
    },
    {
        prop: 'postId',
        label: '职务编码',
        width: 140
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
    },
    {
        prop: 'status',
        label: '状态',
        width: 160,
        fixed: 'right'
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
]

const tableConfig = reactive<TableConfig<any>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    showSelection: true,
    selectedRows: [mockData.data1[0], mockData.data1[1], mockData.data1[2]],
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 26,
        onChange: (page, pageSize) => {
            tableConfig.data = mockData[`data${page}`]
        }
    },
    data: mockData.data1,
    onSelectionChange(selection) {
        console.log(`%c 外部的 selection === `, 'color: #ff3040;', selection)
    },
    onSelect(selection, row) {
        console.log(`%c 外部的 select == `, 'color: #ff3040;')
    },
    onSelectAll(selection) {
        console.log(`%c 外部的 selectAll`, 'color: #ff3040;')
    }
})
</script>

<style lang="scss" scoped></style>
