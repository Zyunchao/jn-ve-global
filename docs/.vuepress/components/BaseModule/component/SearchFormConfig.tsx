import { reactive } from 'vue'
import { FormProps } from '@component/index'

export default () =>
    reactive<FormProps>({
        instance: null,
        labelWidth: '80px',
        model: {
            name: '',
            name2: '',
            name3: '',
            name4: '',
            name5: '',
            name6: '',
            name7: '',
            name8: '',
            name9: '',
            name10: '',
            name11: '',
            name12: ''
        },
        formItems: [
            {
                prop: 'name',
                label: '姓名',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name2',
                label: '日期',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name3',
                label: '地址',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name4',
                label: '性别',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name5',
                label: '年龄',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name6',
                label: '身高',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name7',
                label: '体重',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name8',
                label: '爱好',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name9',
                label: '身份证',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name10',
                label: '学校',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'name11',
                label: '成绩',
                span: 8,
                controlConfig: {
                    type: 'input'
                }
            }
        ]
    })
