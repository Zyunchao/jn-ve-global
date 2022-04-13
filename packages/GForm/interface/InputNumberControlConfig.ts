export interface InputNumberProps {
    /**
     * 设置计数器允许的最小值
     * default: -Infinity
     */
    min?: number
    /**
     * 设置计数器允许的最大值
     * default: Infinity
     */
    max?: number
    /**
     * 计数器步长
     */
    step?: number
    /**
     * 是否只能输入 step 的倍数
     * default: false
     */
    stepStrictly?: boolean
    /**
     * 数值精度
     */
    precision?: number
    /**
     * 计数器尺寸尺寸
     * default: large
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 是否禁用
     * default: false
     */
    disabled?: boolean

    /**
     * 是否使用控制按钮
     * default：true
     */
    controls?: boolean
    /**
     * 控制按钮位置
     */
    controlsPosition?: string
    /**
     * 原生属性
     */
    name?: string

    /**
     * 输入框占位文本
     */
    placeholder?: string
    /**
     * 	输入框关联的label文字
     */
    label?: string
    /**
     * 绑定值被改变时触发
     */
    onChange?: (currentValue: number, oldValue: number) => void
}

export default interface InputNumberControlConfig {
    type: 'inputNumber'
    props?: InputNumberProps
}
