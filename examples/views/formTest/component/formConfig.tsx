import {
    UploadControlConfig,
    BtnProps,
    SelectControlConfig,
    FormProps,
    InfoColumnProps
} from '@component/index'
import treeData from '../../selectTreeTest/data.json'
import FileSource from '../fileList.json'
import { reactive } from 'vue'

const prefix = '/api'

export default () => {
    const formConfig: FormProps = reactive<FormProps>({
        instance: null,
        labelPosition: 'right',
        labelWidth: '180px',
        // disabled: true,
        model: {
            name: '',
            region: '',
            sex1: '',
            selectMValue: [],
            radio: 'f',
            switch: '2',
            time1: '',
            time2: '',
            date1: '',
            date2: [],
            color: '#ff3040',
            food: ['0', '2'],
            food2: ['1', '3'],
            rate: 3,
            slider: 50,
            selectTreeActive: '1425374958969872386',
            selectTreeActiveM: ['1425374667260223489'],
            icon: '111',
            customLabel: `测试文本-${+new Date()}`,
            avatar: `测试文本-${+new Date()}`,
            clientChannel: `测试文本-${+new Date()}`,
            arr: [],
            address: [],
            html: '<h1>Hello Tiny</h1>'
        },
        formItems: [
            {
                prop: 'name',
                label: 'Input',
                span: 12,
                required: true,
                controlConfig: {
                    type: 'input',
                    props: {
                        append: <g-icon icon='ali-icon-riqi' />,
                        prepend: <g-icon icon='ali-icon-riqi' />
                    }
                }
            },
            {
                prop: '',
                label: 'placeholder',
                span: 12,
                controlConfig: {
                    type: 'placeholder'
                }
            },
            {
                prop: 'sex1',
                label: 'Select',
                span: 12,
                controlConfig: {
                    type: 'select',
                    options: [
                        { label: '男', value: 'm' },
                        { label: '女', value: 'f' },
                        { label: '中', value: 'z' }
                    ]
                }
            },
            {
                prop: 'selectMValue',
                label: 'Select',
                span: 12,
                class: 'tip2222',
                tip: '这是一个多选下拉',
                controlConfig: {
                    type: 'select',
                    options: [
                        { label: '男', value: 'm' },
                        { label: '女', value: 'f' },
                        { label: '中', value: 'z' }
                    ],
                    props: {
                        multiple: true,
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
                tip: '性别',
                controlConfig: {
                    type: 'radio',
                    options: [
                        { label: '男', value: 'm' },
                        { label: '女', value: 'f' },
                        { label: '中', value: 'z' }
                    ]
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
                label: '时间',
                span: 12,
                required: true,
                tip: () => (
                    <div style='background-color: #fff; color: #000;'>'这是一个时间选择器'</div>
                ),
                tipPosition: 'label',
                tipIcon: 'jg-jgxx-gantanhao',
                tipPopperClass: 'qwer',
                tipPlacement: 'bottom',
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
                prop: 'date1',
                label: 'DatePicker',
                span: 12,
                controlConfig: {
                    type: 'datePicker'
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
                        unlinkPanels: true,
                        startPlaceholder: '请选择开始日期',
                        endPlaceholder: '请选择结束日期',
                        rangeSeparator: '至'
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
                label: (
                    <span class='form-test-custom-label'>
                        <span>自</span>
                        <span>定</span>
                        <span>义</span>
                        <span>标</span>
                        <span>签</span>
                    </span>
                ),
                span: 12,
                controlConfig: {
                    type: 'input',
                    props: {
                        placeholder: '自定义 label 需要传递 placeholder'
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
                render() {
                    return (
                        <div style='display: flex;'>
                            <el-input />
                            <el-button>按钮</el-button>
                        </div>
                    )
                }
            },
            {
                prop: 'arr',
                label: () => {
                    return (
                        <span class='form-test-custom-label'>
                            <span>控</span>
                            <span>件</span>
                            <span>组</span>
                        </span>
                    )
                },
                span: 12,
                controlConfigs: [
                    {
                        type: 'input',
                        after: '至',
                        props: {
                            placeholder: '自定义 label 需要传递 placeholder'
                        }
                    },
                    {
                        type: 'select',
                        options: [
                            { label: '男', value: 'm' },
                            { label: '女', value: 'f' },
                            { label: '中', value: 'z' }
                        ],
                        props: {
                            multiple: true,
                            onChange: (value) => {
                                console.log(`%c value === `, 'color: #e6a23c;', value)
                            }
                        },
                        after: ''
                    }
                ]
            },
            {
                prop: 'address',
                label: '地址',
                span: 12,
                controlConfig: {
                    type: 'address'
                }
            },
            {
                prop: 'avatar',
                label: '附件',
                span: 24,
                controlConfig: {
                    type: 'upload',
                    props: {
                        action: `${prefix}/kinso-basic-open-server/v1/document/file/upload`,
                        downloadUrl: `${prefix}/kinso-basic-open-server/v1/document/file/download`,
                        fileList: FileSource as any,
                        name: 'file',
                        size: 2,
                        listType: 'picture-card',
                        onSuccess(res) {
                            if (res.code === '000000') {
                                const config = formConfig.formItems.find(
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
                            const config = formConfig.formItems.find(
                                (item) => item.prop === 'avatar'
                            ).controlConfig as UploadControlConfig

                            const fileList = config.props.fileList

                            console.log(`%c onRemove fileList == `, 'color: #67c23a;', fileList)
                        }
                    }
                }
            },
            {
                prop: 'html',
                label: '',
                span: 24,
                controlConfig: {
                    type: 'jnEditor',
                    props: {
                        // disabled: true,
                        // uploadUrl: `${prefix}/kinso-basic-open-server/v1/document/file/upload`,
                        // downloadUrl: `${prefix}/kinso-basic-open-server/v1/document/file/download`,
                        onSetup(editor) {
                            console.log(`%c setup run......`, 'color: #67c23a;', +new Date())
                        },
                        onInit() {
                            console.log(`%c init run......`, 'color: #67c23a;', +new Date())
                        },
                        onInitInstanceCallback(editor) {
                            console.log(
                                `%c initInstanceCallback run......`,
                                'color: #67c23a;',
                                +new Date()
                            )
                        },
                        onChange(e) {
                            console.log(`%c onChange == `, 'color: #f56c6c;', e)
                        },
                        onInput(e) {
                            console.log(`%c input == `, 'color: #f56c6c;', e)
                        },
                        onUndo(e) {
                            console.log(`%c onUndo == `, 'color: #f56c6c;', e)
                        },
                        onRedo(e) {
                            console.log(`%c onRedo == `, 'color: #f56c6c;', e)
                        }
                    }
                }
            }
        ]
    })

    return formConfig
}
