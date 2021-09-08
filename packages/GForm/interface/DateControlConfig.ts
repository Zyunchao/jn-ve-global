/**
 * 通用属性 13
 */
interface BaseProps {
    /**
     * 完全只读
     * default: false
     */
    readonly?: boolean
    /**
     * 禁用
     * default: false
     */
    disabled?: boolean
    /**
     * 文本框可输入
     * default: true
     */
    editable?: boolean
    /**
     * 是否显示清除按钮
     * default: true
     */
    clearable?: boolean
    /**
     * 输入框尺寸
     * default: large
     */
    size?: 'large' | 'medium' | 'small' | 'mini'
    /**
     * 非范围选择时的占位内容
     */
    placeholder?: string
    /**
     * 显示在输入框中的格式
     */
    format?: string
    /**
     * 可选，绑定值的格式。不指定则绑定值为 Date 对象
     */
    valueFormat?: string
    /**
     * 下拉框的类名
     */
    popperClass?: string
    /**
     * 	原生属性
     */
    name?: string
    /**
     * 可选，选择器打开时默认显示的时间
     * 可被new Date() 解析(TimePicker) / 可选值(TimeSelect)
     */
    defaultValue?: Date
    /**
     * 自定义头部图标的类名
     */
    prefixIcon?: string
    /**
     * 自定义清空图标的类名
     */
    clearIcon?: string

    // 事件 ---------------------------------------------------
    onChange?: (value: string) => void
    onBlur?: (ele) => void
    onFocus?: (ele) => void
}

/**
 * 范围选择的属性 3
 */
interface RangeProps {
    /**
     * 范围选择时开始日期的占位内容
     */
    startPlaceholder?: string
    /**
     * 范围选择时结束日期的占位内容
     */
    endPlaceholder?: string
    /**
     * 选择范围时的分隔符
     */
    rangeSeparator?: string
}

/**
 * 日期选择器公用 5
 */
interface DateBaseProps {
    /**
     * 显示类型
     * default: date
     */
    type?:
        | 'year'
        | 'month'
        | 'date'
        | 'dates'
        | 'week'
        | 'datetime'
        | 'datetimerange'
        | 'daterange'
        | 'monthrange'
    /**
     * 选中日期后的默认具体时刻
     * Date / 范围选择时：Date[]
     *
     * 非范围选择时：Date 对象；
     * 范围选择时：数组，长度为 2，每项值为 Date 对象，第一项指定开始日期的时刻，第二项指定结束日期的时刻。不指定会使用时刻 00:00:00
     */
    defaultTime?: Date | Date[]
    /**
     * 在范围选择器里取消两个日期面板之间的联动
     */
    unlinkPanels?: boolean
    /**
     * 设置快捷选项，需要传入数组对象
     */
    shortcuts?: { text: string; value: Date | Function }[]
    /**
     * 设置禁用状态，参数为当前日期，要求返回 Boolean
     */
    disabledDate?: Function
}

/**
 * 时间选择器
 */
export interface TimePickerProps extends BaseProps, RangeProps {
    /**
     * 是否为时间范围选择
     */
    isRange?: boolean
    /**
     * 是否使用箭头进行时间选择
     */
    arrowControl?: boolean
    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 禁止选择部分小时选项
     */
    disabledHours?: Function
    /**
     * 禁止选择部分分钟选项
     */
    disabledMinutes?: Function
    /**
     * 禁止选择部分秒选项
     */
    disabledSeconds?: Function
}

/**
 * 时间选择（下拉）
 */
export interface TimeSelectProps {
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 文本框可输入
     */
    editable?: boolean
    /**
     * 是否显示清除按钮
     */
    clearable?: boolean
    /**
     * 输入框尺寸
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 非范围选择时的占位内容
     */
    placeholder?: string
    /**
     * 原生属性
     */
    name?: string
    /**
     * 自定义头部图标的类名
     */
    prefixIcon?: string
    /**
     * 自定义清空图标的类名
     */
    clearIcon?: string
    /**
     * 开始时间
     * default: 09:00
     */
    start?: string
    /**
     * 结束时间
     * default: 18:00
     */
    end?: string
    /**
     * 间隔时间
     * default: 00:30
     */
    step?: string
    /**
     * 最小时间，小于该时间的时间段将被禁用
     * default: 00:00
     */
    minTime?: string
    /**
     * 最大时间，大于该时间的时间段将被禁用
     */
    maxTime?: string

    // 事件 ---------------------------------------------------
    onChange?: (value: string) => void
    onBlur?: (ele) => void
    onFocus?: (ele) => void
}

/**
 * 日期选择器
 */
export interface DatePickerProps extends BaseProps, RangeProps, DateBaseProps {
    /**
     * 输入时是否触发表单的校验
     * default: true
     */
    validateEvent?: boolean
}

/**
 * 日期时间选择器
 */
export interface DateTimePickerProps extends BaseProps, RangeProps, DateBaseProps {
    /**
     * 设置日期的 className
     */
    cellClassName?: (date: Date) => string
}

export interface TimePickerControlConfig {
    type: 'timePicker'
    props?: TimePickerProps
}

export interface TimeSelectControlConfig {
    type: 'timeSelect'
    props?: TimeSelectProps
}

export interface DatePickerControlConfig {
    type: 'datePicker'
    props?: DatePickerProps
}

export interface DateTimePickerControlConfig {
    type: 'dateTimePicker'
    props?: DateTimePickerProps
}
