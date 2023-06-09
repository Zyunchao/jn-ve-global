import { SelectOptionProps } from './SelectControlConfig'
import { InfoColumnProps } from '../../index'
import { VNode } from 'vue'

/**
 * 下拉框参数
 */
export interface InfoSelectAllProps {
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
     * 自定义清除图标
     */
    clearIcon?: string | VNode
    /**
     * 多选时是否将选中值按文字的形式展示
     * false
     */
    collapseTags?: boolean
    /**
     * 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。
     * 要使用此属性，collapse-tags属性必须设定为 true
     * default: false
     */
    collapseTagsTooltip?: boolean
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
     * 文字提示（Tooltip）的主题，内置dark和light两种。
     */
    effect?: string
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
     * 筛选时，是否在选择选项后保留关键字
     * true
     */
    reserveKeyword?: boolean
    /**
     * 当在没有数据时显示的文字，你同时可以使用#empty插槽进行设置。
     */
    noDataText?: string
    /**
     * 选择器下拉菜单的自定义类名
     */
    popperClass?: string
    /**
     * 当下拉选择器未被激活并且persistent设置为false，选择器会被删除
     */
    persistent?: boolean
    /**
     * 自定义popper.js参数
     */
    popperOptions?: object
    /**
     * 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
     */
    automaticDropdown?: boolean
    /**
     * 控制是否总是展示滚动条
     */
    scrollbarAlwaysOn?: boolean
    /**
     * 是否从服务器搜索数据
     */
    remote?: boolean
    /**
     * 当输入值发生变化时被调用的函数。
     * 其参数是当前输入值。
     * 只有当 filterable 设置为 true 时才会生效。
     */
    remoteMethod?: (keyword: string) => void
}

/**
 * 下拉框事件
 */
export interface InfoSelectAllEvents {
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

export interface InfoSelectAllCustomProps {
    /**
     * 最大行数
     * 7
     */
    optionMaxItemNum?: number
    /**
     * 是否隐藏头
     * false
     */
    hideHeader?: boolean
}

export default interface InfoSelectAllControlConfig {
    type: 'infoSelectAll'
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
    props?: InfoSelectAllProps & InfoSelectAllEvents & InfoSelectAllCustomProps
}
