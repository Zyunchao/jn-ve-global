import { SelectOptionProps } from './SelectControlConfig'
import InfoColumnProps from '../../GInfoSA/interface/InfoColumnProps'

/**
 * 下拉框参数
 */
export interface InfoSelectProps {
    /**
     * 是否多选
     */
    multiple?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 作为 value 唯一标识的键名，绑定值为对象类型时必填
     * value
     */
    valueKey?: string
    /**
     * 输入框尺寸
     * default
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 是否可以清空选项
     * false
     */
    clearable?: boolean
    /**
     * 多选时是否将选中值按文字的形式展示
     * false
     */
    collapseTags?: boolean
    /**
     * 多选时用户最多可以选择的项目数， 为 0 则不限制
     * 0
     */
    multipleLimit?: number
    /**
     * 选择器的输入框的原生 name 属性
     */
    name?: string
    /**
     * 选择器的输入框的原生 autocomplete 属性
     * off
     */
    autocomplete?: string
    /**
     * 占位符
     */
    placeholder?: string
    /**
     * 是否可搜索
     * false
     */
    filterable?: boolean
    /**
     * 是否允许用户创建新条目， 只有当 filterable 设置为 true 时才会生效
     * false
     */
    allowCreate?: boolean
    /**
     * 选项为空时显示的文字，也可以使用 empty 插槽自定义该内容
     */
    noDataText?: string
    /**
     * popper.js 的参数
     */
    popperOptions?: object
    /**
     * 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
     */
    automaticDropdown?: boolean
    /**
     * 自定义清除图标
     */
    clearIcon?: string
    /**
     * 控制是否总是展示滚动条
     */
    scrollbarAlwaysOn?: boolean
}

/**
 * 下拉框事件
 */
export interface InfoSelectEvents {
    /**
     * 选中值发生变化时触发	val，目前的选中值
     */
    onChange?: (
        val?: string | number | boolean | object | Array<string | number | boolean | object>
    ) => void
    /**
     * 下拉框出现/隐藏时触发 val，出现则为 true，隐藏则为 false
     */
    onVisibleChange?: (show?: boolean) => void
    /**
     * 多选模式下移除 tag 时触发 val，移除的tag值
     */
    onRemoveTag?: (tagVal?: string) => void
    /**
     * 可清空的单选模式下用户点击清空按钮时触发
     */
    onClear?: () => void
    /**
     * 当选择器的输入框失去焦点时触发
     */
    onBlur?: (event: FocusEvent) => void
    /**
     * 当选择器的输入框获得焦点时触发
     */
    onFocus?: (event: FocusEvent) => void
}

export default interface InfoSelectControlConfig {
    type: 'infoSelect'
    /**
     * 下拉框数据
     */
    options: SelectOptionProps[]
    /**
     * option 展示的列
     */
    columns: InfoColumnProps[]
    /**
     * option item 绑定的值
     */
    optionProps?: {
        value: string
        label: string
    }
    /**
     * 下拉框的参数
     */
    props?: InfoSelectProps & InfoSelectEvents
}
