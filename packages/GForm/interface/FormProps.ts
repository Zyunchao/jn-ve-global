import { ValidateFieldsError, RuleItem } from 'async-validator'
import FormItemProps from './FormItemProps'

interface Callback {
    (isValid?: boolean, invalidFields?: ValidateFieldsError): void
}

export interface ExtendRuleItem extends RuleItem {
    /**
     * 触发方式
     */
    trigger?: 'blur' | 'change'
    /**
     * 低码平台：自定义校验的处理函数字符串
     */
    _validator_source_?: string
    /**
     * 低码平台：异步自定义校验的处理函数字符串
     */
    _async_validator_source_?: string
}

export interface FormInstance {
    /**
     * el-plus：全量校验
     */
    validate: (callback?: Callback) => Promise<boolean>
    /**
     * el-plus：重置（创建前）
     */
    resetFields: () => void
    /**
     * el-plus：清理校验消息
     */
    clearValidate: (props?: string | string[]) => void
    /**
     * el-plus：校验单个字段
     */
    validateField: (
        props: string | string[],
        cb: (isValid?: string, invalidFields?: ValidateFieldsError) => void
    ) => void
    /**
     * custom：重置表单 mode（创建前）
     */
    initModel: () => void
    /**
     * custom：重置表单 mode（创建前）并初始化校验信息
     */
    init: () => void
    /**
     * custom：主动缓存 model
     */
    cacheModel: () => void
    /**
     * custom：校验是否自上次缓存后改变 model
     */
    isChangeByCache: () => boolean
}

interface ElFormProps {
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
     * 表单域标签的位置，如果值为 left 或者 right 时，则需要设置 label-width
     * default：'right'
     */
    labelPosition?: 'right' | 'left' | 'top'
    /**
     * 	表单域标签的宽度，例如 '50px'。作为 Form 直接子元素的 form-item 会继承该值。支持 auto。
     */
    labelWidth?: string
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
     * 是否禁用该表单内的所有组件。若设置为 true，则表单内组件上的 disabled 属性不再生效
     * default?: false
     */
    disabled?: boolean
    /**
     * 是否在 rules 属性改变后立即触发一次验证
     * default?: true
     */
    validateOnRuleChange?: boolean
}

/**
 * 自定义的表单配置字段
 */
export default interface FormProps extends ElFormProps {
    /**
     * 多个表单的主键
     */
    id?: string
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
     * default: 20
     */
    gutter?: number
    /**
     * 表示是否显示 label 后面的冒号
     */
    colon?: boolean
    /**
     * 带有 CollapseItem 时，Collapse 模式选择
     */
    collapseMode?: 'card' | 'panel'
    /**
     * 扩展字段
     */
    [k: string]: any
}
