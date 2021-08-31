/**
 * Checkbox-group
 */
export interface CheckboxGroupProps {
    /**
     * 多选框组尺寸，仅对按钮形式的 Checkbox 或带有边框的 Checkbox 有效
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 可被勾选的 checkbox 的最小数量
     */
    min?: number
    /**
     * 可被勾选的 checkbox 的最大数量
     */
    max?: number
    /**
     * 按钮形式的 Checkbox 激活时的文本颜色
     * default: #ffffff
     */
    textColor?: string
    /**
     * 按钮形式的 Checkbox 激活时的填充色和边框色
     * default: #409EFF
     */
    fill?: string
    /**
     * 	当绑定值变化时触发的事件
     */
    onChange?: (val: string[] | number[]) => void
}

/**
 * 待选项的配置
 */
interface CheckboxOptionBasePeops {
    /**
     * item 的显示值
     */
    label: string | number
    /**
     * 选中状态的值（扩展）
     */
    value: string | number | boolean | object
    /**
     * 选中时的值
     */
    trueLabel?: string | number
    /**
     * 没有选中时的值
     */
    falseLabel?: string | number
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 原生 name 属性
     */
    name?: string
    /**
     * 当前是否勾选
     */
    checked?: boolean
}

export interface CheckboxBoxOptionProps extends CheckboxOptionBasePeops {
    /**
     * 是否显示边框
     */
    border?: boolean
    /**
     * Checkbox 的尺寸，仅在 border 为真时有效
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 设置 indeterminate 状态，只负责样式控制
     */
    indeterminate?: boolean
}

export interface CheckboxButtonOptionProps extends CheckboxOptionBasePeops {}

export interface CheckboxControlConfig {
    type: 'checkBox'
    options: CheckboxBoxOptionProps[]
    props?: CheckboxGroupProps
}

export interface CheckboxButtonControlConfig {
    type: 'checkBoxButton'
    options: CheckboxButtonOptionProps[]
    props?: CheckboxGroupProps
}
