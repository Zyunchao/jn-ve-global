/**
 * 单选框
 */
export interface RadioOptionProps {
    /**
     * Radio 的 label
     */
    label: string
    /**
     * Radio 的 value
     */
    value: string | number | boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 	是否显示边框
     */
    border?: boolean
    /**
     * 原生 name 属性
     */
    name?: string
}

/**
 * 单选框按钮模式
 */
export interface RadioButtonOptionProps {
    /**
     * Radio 的 label
     */
    label: string
    /**
     * Radio 的 value
     */
    value: string | number | boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 原生 name 属性
     */
    name?: string
}

/**
 * 按钮组
 */
export interface RadioGroupProps {
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 按钮形式的 Radio 激活时的文本颜色
     */
    textColor?: string
    /**
     * 按钮形式的 Radio 激活时的填充色和边框色
     */
    fill?: string
    /**
     * Radio-group Events
     */
    onChange?: (value: any) => void
}

/**
 * Radio 控件
 */
export interface RadioControlConfig {
    type: 'radio'
    options: RadioOptionProps[]
    props?: RadioGroupProps
}

/**
 * Radio 按钮模式
 */
export interface RadioButtonControlConfig {
    type: 'radioButton'
    options: RadioButtonOptionProps[]
    props?: RadioGroupProps
}
