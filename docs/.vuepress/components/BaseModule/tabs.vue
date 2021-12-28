<template>
    <div class="base-module-tab">
        <GBaseModule
            v-model:activeTab="activeTab"
            :tabs="moduleTabs"
            search-btn-horizontal
            :search-form-props="searchFormProps"
            :load-table-methods="loadTable"
            :btns="btns"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="tablePagination"
            :table-loading="false"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'BaseModuleTabTest'
}
</script>

<script lang="ts" setup>
import { watch, reactive, ref } from 'vue'
import { BtnProps, FormProps, TableColumnProps, PaginationProps } from '@component/index'

const searchFormProps = reactive<FormProps>({
    instance: null,
    model: {
        name: '',
        sex: ''
    },
    formItems: [
        {
            prop: 'name',
            label: '组件',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'sex',
            label: '功能路径',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'component',
        label: '组件'
    },
    {
        prop: 'url',
        label: '功能路径'
    }
])

const tableData = reactive<any[]>([])

const tablePagination = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 50
})

// 按钮组
const btns: BtnProps[] = [
    {
        label: '添加',
        onClick: () => {
            tablePagination.total += 10
        }
    },
    {
        label: '授权',
        type: 'success',
        onClick: () => {
            console.log(`%c 添加 === `, 'color: #e6a23c;')
        }
    }
]

// 标签页
const activeTab = ref<string>('')
const moduleTabs = reactive([
    {
        label: '全部',
        value: 'all'
    },
    {
        label: '审核中 0',
        value: 'checkout'
    },
    {
        label: '待签发 20',
        value: 'issue'
    },
    {
        label: '待领取 2',
        value: 'get'
    }
])
watch(
    () => activeTab.value,
    (val) => {
        console.log(`%c 激活的 tab ====== `, 'color: #67c23a;', val)
    }
)

const loadTable = (page: number) => {
    const params = {
        page: tablePagination.currentPage,
        size: tablePagination.pageSize,
        ...searchFormProps.model
    }

    console.log(`%c params == `, 'color: #e6a23c;', params)
}
</script>

<style lang="scss" scoped>
.base-module-tab {
    height: 800px;

    :deep(.core-tab-wrapper) {
        box-sizing: border-box;
    }
}
</style>
