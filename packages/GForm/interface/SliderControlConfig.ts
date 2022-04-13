export interface SliderProps {
    /**
     * 最小值
     * default: 0
     */
    min?: number
    /**
     * 最大值
     * default: 100
     */
    max?: string
    /**
     * 是否禁用
     * default: false
     */
    disabled?: boolean
    /**
     * 步长
     * default: 1
     */
    step?: number
    /**
     * 是否显示输入框，仅在非范围选择时有效
     * default: false
     */
    showInput?: boolean
    /**
     * 在显示输入框的情况下，是否显示输入框的控制按钮
     * default: true
     */
    showInputControls?: boolean
    /**
     * 滑块的大小
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 输入框的尺寸
     * default: small
     */
    inputSize?: 'large' | 'default' | 'small'
    /**
     * 是否显示间断点
     * default: false
     */
    showStops?: boolean
    /**
     * 是否显示 tooltip
     * default: true
     */
    showTooltip?: boolean
    /**
     * 格式化 tooltip
     */
    formatTooltip?: (value: string) => any
    /**
     * 是否为范围选择
     * default: false
     */
    range?: boolean
    /**
     * 是否竖向模式	boolean
     * default: false
     */
    vertical?: boolean
    /**
     * 	Slider 高度，竖向模式时必填
     */
    height?: string
    /**
     * 屏幕阅读器标签
     */
    label?: string
    /**
     * 输入时的去抖延迟，毫秒，仅在show-input等于true时有效
     * default: 300
     */
    debounce?: number
    /**
     * tooltip 的自定义类名
     */
    tooltipClass?: string
    /**
     * 标记， key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式
     */
    marks?: object

    /**
     * 值改变时触发（使用鼠标拖曳时，只在松开鼠标后触发）
     */
    onChange?: (newVal: string) => void
    /**
     * 数据改变时触发（使用鼠标拖曳时，活动过程实时触发）
     */
    onInput?: (newVal: string) => void
}

export default interface SliderControlConfig {
    type: 'slider'
    props?: SliderProps
}
