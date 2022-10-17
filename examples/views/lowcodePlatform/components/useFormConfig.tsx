import { reactive, ref } from 'vue'
import type { FormProps } from 'jn-ve-global'

// 参数类型
interface Props {}

// 初始 model
export const baseModel = {
    '6334a751b8f240e8a3d13d9b030e1444': '',
    '44029d6a9f49442b800992067087ada4': '',
    '2723bf3184cf45e596de0c24a21cc3d2': '',
    '7047bdf612a04741840f58f2a7b0ada7': '',
    'e986a8eb20bc4ff380aa27daa2ba1fae': '',
    'd55bd11469fe4946b1cbf2bd48c936c3': '',
    '154ec927e80f45e8bc3acda53f5b8f24': '',
    '85190bf1fb7848e3beadbe0e23c8b47e': '333',
    'd46bd24130b74241b1c91f808fd93371': '',
    'b799182793f843e29d6f0492bbd1391f': '',
    'cda7afa7655c4e3faaeb6bdb014a42b1': '',
    '1b86e889b7cf4de7952acc67384394da': '',
    'f8b4b4d9183e4764b94e23acc9478dbc': '',
    'dc5a8b5919c9472ba474892ef9006572': '',
    'd5cf140215234b998b56f0af7c1a95ee': '',
    '7a97b4410ca14055ac4c1925c248bf78': '22223'
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
        formItems: [
            {
                prop: '6334a751b8f240e8a3d13d9b030e1444',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 24,
                xl: 24,
                controlConfig: {
                    type: 'input'
                },
                rules: [
                    {
                        required: true,
                        message: '输入框是必填项'
                    }
                ]
            },
            {
                prop: '7a97b4410ca14055ac4c1925c248bf78',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 24,
                xl: 24,
                controlConfig: {
                    type: 'input',
                    props: {
                        onInput: function (val) {
                            // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                            // formConfig.formItems
                            console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)
                            console.log(`%c event val ===== `, 'color: #409eff;', val)
                        }
                    }
                },
                rules: [
                    {
                        required: true,
                        message: '输入框是必填项'
                    }
                ]
            },
            {
                prop: 'f8b4b4d9183e4764b94e23acc9478dbc',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 12,
                xl: 12,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: '7047bdf612a04741840f58f2a7b0ada7',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input',
                    props: {
                        suffix: 'jg-public-raw-guanbi',
                        prepend: 'jg-public-kapian-yujinghongse',
                        append: 'jg-public-kapian-yujinghuangse',
                        prefix: 'jg-public-kapian-guquanjiaoyi'
                    }
                }
            },
            {
                prop: '44029d6a9f49442b800992067087ada4',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 24,
                xl: 24,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: '2723bf3184cf45e596de0c24a21cc3d2',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 24,
                xl: 24,
                controlConfig: {
                    type: 'input'
                },
                rules: [
                    {
                        required: true,
                        message: '输入框是必填项'
                    }
                ]
            },
            {
                prop: 'e986a8eb20bc4ff380aa27daa2ba1fae',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'd55bd11469fe4946b1cbf2bd48c936c3',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: '154ec927e80f45e8bc3acda53f5b8f24',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: '85190bf1fb7848e3beadbe0e23c8b47e',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input',
                    props: {
                        onChange: function (val) {
                            // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                            // formConfig.formItems
                            console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)
                            console.log(`%c event val ===== `, 'color: #409eff;', val)
                        },
                        onInput: function (val) {
                            // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                            // formConfig.formItems
                            console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)
                            console.log(`%c event val ===== `, 'color: #409eff;', val)
                        }
                    }
                },
                rules: [
                    {
                        required: true,
                        message: '_输入框_是必填项'
                    }
                ]
            },
            {
                prop: 'd46bd24130b74241b1c91f808fd93371',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'b799182793f843e29d6f0492bbd1391f',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'cda7afa7655c4e3faaeb6bdb014a42b1',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: 'dc5a8b5919c9472ba474892ef9006572',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 16,
                xl: 16,
                controlConfig: {
                    type: 'input'
                }
            },
            {
                prop: '1b86e889b7cf4de7952acc67384394da',
                label: '_输入框_',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 8,
                xl: 8,
                controlConfig: {
                    type: 'input',
                    props: {
                        onChange: function (val) {
                            // ↓↓↓↓↓↓↓↓ 您的代码 ↓↓↓↓↓↓↓↓
                            // formConfig.formItems
                            console.log(`%c formConfig ==== `, 'color: #67c23a;', formConfig)
                            console.log(`%c event val ===== `, 'color: #409eff;', val)
                        }
                    }
                },
                rules: [
                    {
                        required: true,
                        message: '_输入框_是必填项'
                    }
                ]
            },
            {
                prop: 'd5cf140215234b998b56f0af7c1a95ee',
                label: '输入框',
                xs: 24,
                sm: 24,
                md: 12,
                lg: 16,
                xl: 16,
                controlConfig: {
                    type: 'input'
                }
            }
        ]
    })

    return {
        formConfig
    }
}
