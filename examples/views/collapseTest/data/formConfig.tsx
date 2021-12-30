import { ref, reactive } from 'vue'
import { FormProps } from '@component/index'

export default () => {
    return reactive<FormProps>({
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
            }
        ]
    })
}