<template>
    <div class="examples-base-wrapper">
        <g-button-group :btns="btns" />
        <!-- <g-form :config="formConfig" /> -->
        <g-collapse v-model="activeNames" :mode="mode" @change="handleChange">
            <GCollapseItem title="表单" name="1" :form-config="formConfig" :btns="btns" disabled />
            <GCollapseItem
                :disabled="isDisabled"
                title="表格"
                name="2"
                :table-config="tableConfig"
                :height="500"
            />
            <GCollapseItem title="自定义" name="3">
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
            </GCollapseItem>
            <GCollapseItem title="自定义2自定义2自定义2自定义2" name="4">
                <GTable :config="tableConfig" />
                <!-- <GForm :config="formConfig" /> -->
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
import { TableColumnProps, TableConfig, BtnProps } from '@component/index'
import mockData from './data/data.json'
import _ from 'lodash'

const activeNames = ref<string[]>(['1', '2', '3', '4'])
const isDisabled = ref<boolean>(false)
const mode = ref<string>('panel')

const formConfig = FormConfig()

const handleChange = (val) => {
    console.log(val)
}

const btns = reactive<BtnProps[]>([
    {
        label: '切换模式',
        onClick() {
            mode.value = mode.value === 'panel' ? 'card' : 'panel'
        }
    },
    {
        label: '禁用',
        onClick() {
            isDisabled.value = !isDisabled.value
        }
    },
    {
        label: '改变 label',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.label = `${+new Date()}`
        }
    },
    {
        label: '隐藏',
        type: 'danger',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.hide = true
        }
    },
    {
        label: '显示',
        type: 'success',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.hide = false
        }
    },
    {
        label: '上移',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            const firstCollapaseIndex = formConfig.formItems.findIndex(
                (item) => item.group && item.group === 'first'
            )

            const preIndex = firstCollapaseIndex - 1

            if (preIndex === -1) {
                return
            }

            formConfig.formItems[firstCollapaseIndex] = formConfig.formItems[preIndex]

            formConfig.formItems[preIndex] = firstCollapase
        }
    },
    {
        label: '下移',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            const firstCollapaseIndex = formConfig.formItems.findIndex(
                (item) => item.group && item.group === 'first'
            )

            const nextIndex = firstCollapaseIndex + 1

            if (nextIndex === formConfig.formItems.length) {
                return
            }

            formConfig.formItems[firstCollapaseIndex] = formConfig.formItems[nextIndex]

            formConfig.formItems[nextIndex] = firstCollapase
        }
    }
])

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
                    <el-button text={true}>编辑</el-button>
                    <el-button text={true}>人员设置</el-button>
                    <el-button text={true} type='danger'>
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
    data: mockData.data1
    // onSelectionChange(selection) {
    //     console.log(`%c 外部的 selection === `, 'color: #ff3040;', selection)
    // },
    // onSelect(selection, row) {
    //     console.log(`%c 外部的 select == `, 'color: #ff3040;')
    // },
    // onSelectAll(selection) {
    //     console.log(`%c 外部的 selectAll`, 'color: #ff3040;')
    // }
})
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    background-color: transparent !important;
    box-shadow: none;

    .g-button-group {
        margin-bottom: 20px;
    }
}
</style>
