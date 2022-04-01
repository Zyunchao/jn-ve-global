<template>
    <div :class="!isComponent ? 'examples-base-wrapper' : ''">
        <el-scrollbar>
            <g-form :config="formConfig" />

            <div v-if="!isComponent" class="btn-wrapper">
                <el-button type="primary" @click="getData">
                    获取数据
                </el-button>
                <el-button type="primary" @click="resetForm">
                    重置
                </el-button>
            </div>
        </el-scrollbar>
    </div>
</template>

<script lang="tsx">
import { reactive, toRefs, ref } from 'vue'
import { FormProps, InfoColumnProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { UploadControlConfig } from '@component/GForm'
import FileSource from './fileList.json'
import infoSelectData from './data/infoSelectData.json'

export default {
    name: 'FormTest',
    props: {
        isComponent: {
            type: Boolean,
            default: false
        }
    },
    setup(props, context) {
        const state = reactive({
            checked: '1234',
            flag: false
        })

        const infoSelectColumns = ref<InfoColumnProps[]>([
            {
                prop: 'name',
                label: '客户端名称',
                width: 100
            },
            {
                prop: 'clientId',
                label: '客户端编码',
                width: 200,
                align: 'center'
            },
            {
                prop: 'type',
                label: '客户端类型',
                width: 100
            },
            {
                prop: 'category',
                label: '授权类型',
                width: 100
            },
            {
                prop: 'certSystem',
                label: '授权服务器来源',
                width: 150
            },
            {
                prop: 'secret',
                label: '客户端secret',
                width: 140
            },
            {
                prop: 'scopes',
                label: '可授权资源',
                width: 80
            },
            {
                prop: 'authorizedGrantTypes',
                label: '授权模式',
                width: 150
            },
            {
                prop: 'redirectUri',
                label: '认证成功后的回调URI',
                width: 140,
                showOverflowTooltip: true
            },
            {
                prop: 'accessTokenValidity',
                label: '登录维持时间(秒)',
                width: 80
            },
            {
                prop: 'refreshTokenValidity',
                label: '刷新Token有效时间(秒)',
                width: 80
            },
            {
                prop: 'trusted',
                label: '是否信赖',
                width: 80
            },
            {
                prop: 'autoApprove',
                label: '是否自动授权',
                width: 80
            },
            {
                prop: 'enabled',
                label: '状态',
                width: 80,
                render(item, index) {
                    return (
                        <el-tag
                            size='small'
                            class='ml-2'
                            type={item.enabled === '0' ? 'success' : 'danger'}>
                            {item.enabled === '0' ? '正常' : '禁用'}
                        </el-tag>
                    )
                }
            }
        ])

        let formConfig = ref<FormProps>({
            instance: null,
            labelPosition: 'right',
            labelWidth: '180px',
            // disabled: true,
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
                avatar: '',
                clientChannel: ''
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
                },
                {
                    prop: 'food2',
                    label: 'CheckBoxButton',
                    span: 12,
                    controlConfig: {
                        type: 'checkBoxButton',
                        options: [
                            { label: '青椒肉丝', value: '0' },
                            { label: '豆角焖面', value: '1' },
                            { label: '夫妻肺片', value: '2' },
                            { label: '地三鲜', value: '3' }
                        ]
                    }
                },
                {
                    prop: 'slider',
                    label: 'Slider',
                    span: 24,
                    controlConfig: {
                        type: 'slider',
                        props: {
                            showStops: true,
                            step: 10
                        }
                    }
                },
                {
                    prop: 'selectTreeActive',
                    label: 'SelectTree',
                    span: 12,
                    controlConfig: {
                        type: 'selectTree',
                        treeData: treeData
                    }
                },
                {
                    prop: 'selectTreeActiveM',
                    label: 'SelectTreeMultiple',
                    span: 12,
                    controlConfig: {
                        type: 'selectTree',
                        treeData: treeData,
                        props: {
                            multiple: true,
                            treeProps: {
                                children: 'children',
                                label: 'name'
                                // disabled: (data) => true
                            },
                            treeConfig: {
                                checkStrictly: true
                            }
                        }
                    }
                },
                {
                    prop: 'customLabel',
                    label: () => {
                        return (
                            <span class='form-test-custom-label'>
                                <span>自</span>
                                <span>定</span>
                                <span>义</span>
                                <span>标</span>
                                <span>签</span>
                            </span>
                        )
                    },
                    span: 12,
                    controlConfig: {
                        type: 'input',
                        props: {
                            placeholder: '自定义 label 需要传递 placeholder'
                        }
                    }
                },
                {
                    prop: 'avatar',
                    label: '附件',
                    span: 24,
                    controlConfig: {
                        type: 'upload',
                        props: {
                            action: '/api/kinso-basic-open-server/v1/document/file/upload',
                            fileList: FileSource.map((item) => {
                                return {
                                    name: item.fileRName,
                                    url: item.filePath,
                                    ...item
                                }
                            }),
                            name: 'file',
                            size: 2,
                            listType: 'picture-card',
                            disabled: false,
                            onSuccess(res) {
                                if (res.code === '000000') {
                                    const config = formConfig.value.formItems.find(
                                        (item) => item.prop === 'avatar'
                                    ).controlConfig as UploadControlConfig

                                    const fileList = config.props.fileList

                                    console.log(
                                        `%c onSuccess fileList == `,
                                        'color: #67c23a;',
                                        fileList
                                    )
                                }
                            },
                            onRemove() {
                                const config = formConfig.value.formItems.find(
                                    (item) => item.prop === 'avatar'
                                ).controlConfig as UploadControlConfig

                                const fileList = config.props.fileList

                                console.log(`%c onRemove fileList == `, 'color: #67c23a;', fileList)
                            }
                        }
                    }
                }
            ]
        })

        // watch(() => formConfig)

        const getData = () => {
            console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)
        }

        const resetForm = () => {
            formConfig.value.instance?.resetFields()
        }

        return {
            ...toRefs(state),
            formConfig,
            resetForm,
            getData
        }
    }
}
</script>

<style lang="scss">
.form-test-custom-label {
    span {
        &:first-of-type {
            color: red;
        }
        &:nth-of-type(2) {
            color: orange;
        }
        &:nth-of-type(3) {
            color: blue;
        }
        &:nth-of-type(4) {
            color: green;
        }
        &:nth-of-type(5) {
            color: purple;
        }
    }
}
</style>
