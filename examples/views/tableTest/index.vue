<template>
    <div class="examples-base-wrapper">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
import { defineComponent, watch, reactive, ref } from 'vue'
import mockData from './data.json'
import { TableColumnProps, TableConfig } from '@component/index'

export default defineComponent({
    name: 'TableTest',
    setup() {
        const tableColumns: TableColumnProps[] = [
            {
                prop: 'instituId',
                label: '机构编码',
                align: 'center',
                width: 120,
                fixed: 'left'
            },
            {
                prop: 'instituName',
                label: '机构名称',
                width: 160
            },
            {
                prop: 'loginName',
                label: '用户登陆名',
                width: 210
            },
            {
                prop: 'idNumber',
                label: '证件号码',
                width: 380
            },
            {
                prop: 'phone',
                label: '手机',
                width: 380
            },
            {
                prop: 'email',
                label: '邮箱',
                width: 380
            },
            {
                prop: 'opertion',
                label: '操作',
                width: 260,
                fixed: 'right',
                render(row) {
                    return (
                        <>
                            <el-button
                                type='text'
                                onClick={() =>
                                    console.log(`%c 编辑 row == `, 'color: #e6a23c;', row)
                                }>
                                编辑
                            </el-button>
                            <el-button
                                type='text'
                                onClick={() =>
                                    console.log(`%c 密码 row == `, 'color: #e6a23c;', row)
                                }>
                                密码
                            </el-button>
                            <el-button
                                type='text'
                                onClick={() =>
                                    console.log(`%c 详情 row == `, 'color: #e6a23c;', row)
                                }>
                                详情
                            </el-button>
                            <el-button
                                type='text'
                                onClick={() =>
                                    console.log(`%c 关联角色 row == `, 'color: #e6a23c;', row)
                                }>
                                关联角色
                            </el-button>
                            <el-button
                                type='text'
                                class='btn-danger'
                                onClick={() =>
                                    console.log(`%c 删除 row == `, 'color: #e6a23c;', row)
                                }>
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
            pagination: {
                // show: false,
                pageSize: 10,
                currentPage: 1,
                total: 500,
                onChange: (page, pageSize) => {
                    console.log(`%c pagination on change === `, 'color: #e6a23c;', page, pageSize)
                }
            },
            data: mockData.records
        })

        watch(
            () => tableConfig.instance,
            (val) => {
                console.log(`%c tableConfig.instance === `, 'color: #67c23a;', val)
            }
        )

        const flag = ref(true)

        const checkout = () => {
            flag.value = !flag.value

            // if (!flag.value) {
            //     // tableConfig.columns = tableColumns2
            //     tableConfig.data = []
            // } else {
            //     // tableConfig.columns = tableColumns
            //     tableConfig.data = mockData.records as UserInfo[]
            // }
        }

        return {
            flag,
            checkout,
            tableConfig
        }
    }
})
</script>

<style lang="scss" scoped></style>
