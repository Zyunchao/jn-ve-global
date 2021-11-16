<template>
    <div class="base-module-demo1">
        <GBaseModule
            search-btn-horizontal
            :search-form-props="searchFormProps"
            :load-table-methods="loadTable"
            :btns="btns"
        >
            <!-- slot#middle-right = 按钮右侧自定义内容 -->
            <template #middle-right>
                按钮右侧自定义内容......
            </template>
            
            <!-- slot#core = 替换表格 -->
            <template #core>
                自定义核心内容
            </template>
        </GBaseModule>
    </div>
</template>

<script lang="ts">
export default {
    name: 'CoreCustom'
}
</script>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs } from 'vue'
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
            label: '姓名',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'sex',
            label: '性别',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

const tablePagination = reactive<PaginationProps>({
    currentPage: 1,
    pageSize: 10,
    total: 50
})

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
.base-module-demo1 {
    height: 500px;
}
</style>
