<template>
    <div class="wrapper">
        <g-collapse v-model="activeNames">
            <GCollapseItem title="表单" name="1" :form-config="formConfig" />
            <GCollapseItem title="表格" name="2" :table-config="tableConfig" :height="500" />
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
import { TableColumnProps, TableConfig, FormProps } from '@component/index'
import mockData from './data/data.json'

const activeNames = ref<string[]>(['1', '2'])

const formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '120px',
    model: {
        name: '12345',
        region: '',
        sex: '',
        radio: 'f',
        switch: '2',
        time1: new Date(),
        time2: '09:00',
        date1: new Date(),
        date2: [],
        color: '#ff3040',
        food: ['0', '2'],
        food2: ['1', '3'],
        rate: 3,
        slider: 50,
        selectTreeActive: '1425374958969872386',
        selectTreeActiveM: ['1425374667260223489'],
        icon: '',
        customLabel: '',
        avatar: ''
    },
    formItems: [
        {
            prop: 'name',
            label: 'Input',
            span: 12,
            required: true,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'sex',
            label: 'Select',
            span: 12,
            controlConfig: {
                type: 'select',
                options: [
                    { label: '男', value: 'm' },
                    { label: '女', value: 'f' },
                    { label: '中', value: 'z' }
                ],
                props: {
                    onChange: (value) => {
                        console.log(`%c value === `, 'color: #e6a23c;', value)
                    }
                }
            }
        },
        {
            prop: 'radio',
            label: 'Radio',
            span: 12,
            controlConfig: {
                type: 'radioButton',
                options: [
                    { label: '男', value: 'm' },
                    { label: '女', value: 'f' },
                    { label: '中', value: 'z' }
                ]
            }
        },
        {
            prop: 'switch',
            label: 'Switch',
            span: 12,
            controlConfig: {
                type: 'switch',
                props: {
                    activeText: '是',
                    inactiveText: '否',
                    activeValue: '1',
                    inactiveValue: '2'
                }
            }
        },
        {
            prop: 'time1',
            label: 'TimePicker',
            span: 12,
            controlConfig: {
                type: 'timePicker',
                props: {
                    // arrowControl: true
                }
            }
        },
        {
            prop: 'time2',
            label: 'TimeSelect',
            span: 12,
            controlConfig: {
                type: 'timeSelect'
            }
        },
        {
            prop: 'date1',
            label: 'DatePicker',
            span: 12,
            controlConfig: {
                type: 'datePicker',
                props: {
                    type: 'datetime'
                }
            }
        },
        {
            prop: 'date2',
            label: 'Daterange',
            span: 12,
            controlConfig: {
                type: 'datePicker',
                props: {
                    type: 'daterange',
                    unlinkPanels: true
                }
            }
        },
        {
            prop: 'rate',
            label: 'Rate',
            span: 12,
            controlConfig: {
                type: 'rate',
                props: {
                    max: 10
                }
            }
        },
        {
            prop: 'icon',
            label: 'IconPicker',
            span: 12,
            controlConfig: {
                type: 'iconPicker'
            }
        },
        {
            prop: 'color',
            label: 'ColorPicker',
            span: 12,
            controlConfig: {
                type: 'colorPicker'
            }
        },
        {
            prop: 'food',
            label: 'CheckBox',
            span: 12,
            controlConfig: {
                type: 'checkBox',
                options: [
                    { label: '肯德基', value: '0' },
                    { label: '麦当劳', value: '1' },
                    { label: '必胜客', value: '2' },
                    { label: '华莱士', value: '3' }
                ]
            }
        }
    ]
})

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

<style lang="scss" scoped>
.wrapper {
    height: 1100px;
    overflow-y: auto;
}
</style>
