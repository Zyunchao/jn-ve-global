import { reactive, ref } from 'vue'
import type { FormProps } from '@component/index'

// 参数类型
interface Props { }

// 初始 model
export const baseModel = {
    'ee3c153e320a45f9a3d2f15e6fb7c01a': '',
    '39e8678ed67f44cf88613fb6ff8ca92d': '',
    'b7c03a802a4f45b7b29f6ac08aa940e3': '',
    '812007d66b4345819a83e53db6e4d120': '',
    'b94be899d84d4dc989569f035d9f02d8': '',
    '0425458768d9464bacf41ddb5a4a23be': '',
    'aa7dffe75b7b4e17ab1e2138a086d306': '',
    '30d76c466fc54d86abdf20325e004e9d': '',
    'e1ad7b6192944549a6ae7d62d013373b': '',
    '13e6f04b46344b1aa8026cc96164b90b': '',
    'da940aca2f25443588e2af25d3f0f957': '',
    'dbb2708879dd49c6bbc1e2e7c34afd33': ''
}

export default (props?: Props) => {
    // 表单配置对象
    const formConfig = reactive<FormProps>({
        instance: null,
        labelPosition: 'right',
        labelWidth: '1.4rem',
        disabled: false,
        model: {
            ...baseModel
        },
        formItems: [{
            prop: 'ee3c153e320a45f9a3d2f15e6fb7c01a',
            label: '输入框',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label',
            rules: [{
                validator: function (rule, value: any, callback: (error?: string | Error) => void, source) {

                    // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                    // formConfig.formItems
                    console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)

                    if (!value) {
                        callback('不能为空')
                    }

                    if (value === '2222') {
                        callback(new Error('不能是 2222'))
                    }
                }
            }]
        }, {
            prop: '30d76c466fc54d86abdf20325e004e9d',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: 'aa7dffe75b7b4e17ab1e2138a086d306',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: '39e8678ed67f44cf88613fb6ff8ca92d',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: 'b7c03a802a4f45b7b29f6ac08aa940e3',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input',
                props: {
                    onInput: function (val) {

                        // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                        // formConfig.formItems
                        console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)
                        console.log(`%c onInput event val ===== `, 'color: #409eff;', val)
                    }
                }
            },
            tipPosition: 'label',
            rules: [{
                required: true,
                message: '_输入框_是必填项'
            }, {
                min: 5,
                message: '最少需要 5 个字符'
            }]
        }, {
            prop: '812007d66b4345819a83e53db6e4d120',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: 'b94be899d84d4dc989569f035d9f02d8',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 8,
            xl: 8,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: '0425458768d9464bacf41ddb5a4a23be',
            label: '_输入框_',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 16,
            xl: 16,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: 'e1ad7b6192944549a6ae7d62d013373b',
            label: '输入框',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 24,
            xl: 24,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }, {
            prop: '13e6f04b46344b1aa8026cc96164b90b',
            label: '输入框',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 24,
            xl: 24,
            controlConfig: {
                type: 'input'
            }
        }, {
            prop: 'da940aca2f25443588e2af25d3f0f957',
            label: '输入框',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 24,
            xl: 24,
            controlConfig: {
                type: 'input'
            }
        }, {
            prop: 'dbb2708879dd49c6bbc1e2e7c34afd33',
            label: '输入框',
            xs: 24,
            sm: 24,
            md: 12,
            lg: 24,
            xl: 24,
            controlConfig: {
                type: 'input'
            },
            tipPosition: 'label'
        }]
    })

    return {
        formConfig
    }
}
