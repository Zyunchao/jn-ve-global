<template>
    <div class="examples-base-wrapper">
        <GBaseModule
            :search-form-props="searchFormProps"
            :load-table-methods="loadTable"
            :btns="btns"
            :table-columns="tableColumns"
            :table-data="tableData"
            :table-pagination="flag ? tablePagination : tablePagination2"
            :table-loading="false"
        />
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, toRefs } from 'vue'
import { BtnProps, FormProps, TableColumnProps, PaginationProps } from '@component/index'

export default defineComponent({
    name: 'BaseModuleTest',
    setup() {
        const state = reactive({
            flag: true
        })

        const searchFormProps = reactive<FormProps>({
            instance: null,
            model: {
                name: ''
            },
            formItems: [
                {
                    prop: 'name',
                    label: '姓名',
                    controlConfig: {
                        type: 'input'
                    }
                }
            ]
        })

        const tableColumns = reactive<TableColumnProps[]>([
            {
                prop: 'component',
                label: '组件',
                width: 300
            },
            {
                prop: 'url',
                label: '功能路径',
                width: 800
            },
            {
                prop: 'sortNo',
                label: '排序',
                width: 800
            }
        ])

        const tableData = reactive<any[]>([])

        const tablePagination = {
            currentPage: 1,
            pageSize: 10,
            total: 50
        }

        const tablePagination2 = reactive<PaginationProps>({
            currentPage: 1,
            pageSize: 10,
            total: 100
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

        return {
            ...toRefs(state),
            searchFormProps,
            tableColumns,
            tableData,
            tablePagination,
            tablePagination2,
            loadTable,
            btns
        }
    }
})
</script>

<style lang="scss" scoped></style>
