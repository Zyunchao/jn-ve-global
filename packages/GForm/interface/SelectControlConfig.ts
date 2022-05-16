import { VNode } from 'vue'

export interface SelectProps {
    /**
     * 是否多选
     * default: false
     */
    multiple?: boolean
    /**
     * 是否禁用
     */
    disabled?: boolean
    /**
     * 作为 value 唯一标识的键名，绑定值为对象类型时必填
     */
    valueKey?: string
    /**
     * 	输入框尺寸
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 是否可以清空选项
     */
    clearable?: boolean
    /**
     * 多选时是否将选中值按文字的形式展示
     * default: false
     */
    collapseTags?: boolean
    /**
     * 当鼠标悬停于折叠标签的文本时，是否显示所有选中的标签。
     * 要使用此属性，collapse-tags属性必须设定为 true
     * default: false
     */
    collapseTagsTooltip?: boolean
    /**
     * 多选时用户最多可以选择的项目数，为 0 则不限制
     * default: 0
     */
    multipleLimit?: number
    name?: string
    /**
     * select input 的 autocomplete 属性
     * default: off
     */
    autocomplete?: 'on' | 'off'
    /**
     * 占位符
     * default: 请选择
     */
    placeholder?: string
    /**
     * 是否可搜索
     * default: false
     */
    filterable?: boolean
    /**
     * 是否允许用户创建新条目，需配合 filterable 使用
     */
    allowCreate?: boolean
    /**
     * 自定义搜索方法
     */
    filterMethod?: Function
    /**
     * 是否为远程搜索
     */
    remote?: boolean
    /**
     * 远程搜索方法
     */
    remoteMethod?: Function
    /**
     * 是否正在从远程获取数据
     * default: false
     */
    loading?: boolean
    /**
     * 远程加载时显示的文字
     * default: 加载中
     */
    loadingText?: string
    /**
     * 搜索条件无匹配时显示的文字，也可以使用#empty设置
     * default: 无匹配数据
     */
    noMatchText?: string
    /**
     * 选项为空时显示的文字，也可以使用#empty设置
     * default: 无数据
     */
    noDataText?: string
    /**
     * 	Select 下拉框的类名
     */
    popperClass?: string
    /**
     * 多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词
     */
    reserveKeyword?: string
    /**
     * 在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用
     */
    defaultFirstOption?: string
    /**
     * 是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false
     */
    teleported?: boolean
    /**
     * 对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单
     */
    automaticDropdown?: string
    /**
     * 自定义清空图标的类名
     */
    clearIcon?: string
}

/**
 * 事件
 */
export interface SelectEvents {
    /**
     * 	选中值发生变化时触发
     */
    onChange?: (value: string | number) => void
    /**
     * 下拉框出现/隐藏时触发
     */
    onVisibleChange?: (status: boolean) => void
    /**
     * 多选模式下移除tag时触发
     */
    onRemoveTag?: (tagValue: any) => void
    /**
     * 可清空的单选模式下用户点击清空按钮时触发
     */
    onClear?: () => void
    /**
     * 当 input 失去焦点时触发
     */
    onBlur?: (event: Event) => void
    /**
     * 当 input 获得焦点时触发
     */
    onFocus?: (event: Event) => void
    /**
     * 原生点击事件
     */
    onClick?: (event: Event) => void
}

export interface SelectOptionProps {
    value: string | number | boolean | object
    label: string | number
    disabled?: boolean
    [k: string]: any
}

export default interface SelectControlConfig {
    type: 'select'
    /**
     * 下拉框待选项
     */
    options: SelectOptionProps[]
    /**
     * 获取待选项列表资源的 url
     */
    getOptionsUrl?: string
    /**
     * 自定义处理映射源数据，会在请求回来后调用
     * 回调接收请求回来的源数据，需要进行数据的映射
     */
    mapOptionsCb?: (data: Array<any>) => SelectOptionProps[]
    /**
     * 自定义的 option 的 render
     */
    optionRender?: (option: any) => JSX.Element | VNode | string | number | HTMLElement
    /**
     * 其他一些下拉框的配置
     */
    props?: SelectProps & SelectEvents
}
