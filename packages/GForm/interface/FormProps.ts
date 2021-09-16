import { FieldErrorList, RuleItem } from 'async-validator'
import FormItemProps from './FormItemProps'

interface Callback {
    (isValid?: boolean, invalidFields?: FieldErrorList): void
}

export interface ExtendRuleItem extends RuleItem {
    trigger?: 'blur' | 'change'
}

export interface FormInstance {
    validate: (callback?: Callback) => Promise<boolean>
    resetFields: () => void
    clearValidate: (props?: string | string[]) => void
    validateField: (
        props: string | string[],
        cb: (isValid?: string, invalidFields?: FieldErrorList) => void
    ) => void
    [k: string]: unknown
}

export default interface FormProps {
    /**
     * 表单数据对象
     */
    model: {
        [k: string]: any
    }
    /**
     * 表单验证规则
     */
    rules?: {
        [k: string]: ExtendRuleItem | ExtendRuleItem[]
    }
    /**
     * 行内表单模式
     * default：false
     */
    inline?: boolean
    /**
     * 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     * default：'right'
     */
    labelPosition?: 'right' | 'left' | 'top'
    /**
     * 	表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
     *
     */
    labelWidth?: string
    /**
     * 表单域标签的后缀
     */
    labelSuffix?: string
    /**
     * 是否显示必填字段的标签旁边的红色星号
     * default?: false
     */
    hideRequiredAsterisk?: boolean
    /**
     * 是否显示校验错误信息
     * default?: true
     */
    showMessage?: boolean
    /**
     * 是否以行内形式展示校验信息
     * default?: false
     */
    inlineMessage?: boolean
    /**
     * 是否在输入框中显示校验结果反馈图标
     * default?: false
     */
    statusIcon?: boolean
    /**
     * 	用于控制该表单内组件的尺寸
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
     * default?: false
     */
    disabled?: boolean
    /**
     * 是否在 rules 属性改变后立即触发一次验证
     * default?: true
     */
    validateOnRuleChange?: boolean

    // 自定义扩展 Props -----------------------------------------------------------------------

    /**
     * 表单的实例（实际为 ref）
     */
    instance: FormInstance | null
    /**
     * 生成表单 item 的配置列表
     */
    formItems: FormItemProps[]
    /**
     * 栅格间隔
     */
    gutter?: number
    /**
     * 表示是否显示 label 后面的冒号
     */
    colon?: boolean
}
