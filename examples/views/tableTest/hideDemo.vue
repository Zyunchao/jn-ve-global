<template>
    <div class="examples-base-wrapper">
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
    },
    {
        prop: 'opertion',
        label: '操作',
        width: 300,
        fixed: 'right',
        render(row) {
            return (
                <>
                    <el-button
                        type='text'
                        onClick={() => {
                            tableColumns.find((column) => column.prop === 'instituName').hide =
                                false

                            nextTick(() => {
                                tableConfig.instance.doLayout()
                            })
                        }}>
                        显示
                    </el-button>
                    <el-button
                        type='text'
                        class='btn-danger'
                        onClick={() => {
                            tableColumns.find((column) => column.prop === 'instituName').hide = true
                            nextTick(() => {
                                tableConfig.instance.doLayout()
                            })
                        }}>
                        隐藏
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
        total: 26,
        onChange: (page, pageSize) => {
            tableConfig.data = mockData[`data${page}`]
        }
    },
    data: mockData.data1
})

watch(
    () => tableConfig.selectedRows,
    (arr) => {
        console.log(`%c selectedRows == `, 'color: green;', arr)
    },
    {
        deep: true
    }
)
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
