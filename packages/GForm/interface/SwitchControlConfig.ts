export interface SwitchProps {
    /**
     * 是否禁用
     * default: false
     */
    disabled?: boolean
    /**
     * 是否显示加载中
     * default: false
     */
    loading?: boolean
    /**
     * switch 的宽度（像素）
     * default: 40
     */
    width?: number
    /**
     * switch 打开时所显示图标的类名，设置此项会忽略 active-text
     */
    activeIconClass?: string
    /**
     * switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text
     */
    inactiveIconClass?: string
    /**
     * switch 打开时的文字描述
     */
    activeText?: string
    /**
     * 	switch 关闭时的文字描述
     */
    inactiveText?: string
    /**
     * switch 打开时的值
     * default: true
     */
    activeValue?: string | boolean | number
    /**
     * switch 关闭时的值
     * default: false
     */
    inactiveValue?: string | boolean | number
    /**
     * switch 打开时的背景色
     * default: #409EFF
     */
    activeColor?: string
    /**
     * switch 关闭时的背景色
     * default: #C0CCDA
     */
    inactiveColor?: string
    /**
     * switch 对应的 name 属性
     */
    name?: string
    /**
     * 改变 switch 状态时是否触发表单的校验
     * default: true
     */
    validateEvent?: boolean
    /**
     * switch 状态改变前的钩子，返回 false 或者返回 Promise 且被 reject 则停止切换	function
     */
    beforeChange?: Function

    // 事件 ---------------------------------------------------
    onChange?: (newVal: string) => void
}

export default interface SwitchControlConfig {
    type: 'switch'
    props?: SwitchProps
}
