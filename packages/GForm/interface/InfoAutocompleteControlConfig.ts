import { InfoColumnProps } from '../../index'
import { VNode } from 'vue'

export interface InfoAutocompleteProps {
    /**
     * 占位文本
     */
    placeholder?: string
    /**
     * 是否可清空
     * false
     */
    clearable?: boolean
    /**
     * 是否禁用
     * false
     */
    disabled?: boolean
    /**
     * 图标组件
     */
    icon?: string | VNode
    /**
     * 获取输入建议的防抖延时
     * 300
     */
    debounce?: number
    /**
     * 菜单弹出位置
     */
    placement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'bottom-start'
    /**
     * Autocomplete 下拉列表的类名
     */
    popperClass?: string
    /**
     * 是否在输入框 focus 时显示建议列表
     * true
     */
    triggerOnFocus?: boolean
    /**
     * 原生属性 name 属性
     */
    name?: string
    /**
     * 在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件
     * false
     */
    selectWhenUnmatched?: boolean
    /**
     * 输入框关联的 label 文字
     */
    label?: string
    /**
     * 输入框头部图标
     */
    prefixIcon?: string
    /**
     * 输入框尾部图标
     */
    suffixIcon?: string
    /**
     * 是否隐藏远程加载时的加载图标
     * false
     */
    hideLoading?: boolean
    /**
     * 是否默认突出显示远程搜索建议中的第一项
     * false
     */
    highlightFirstItem?: boolean
}

export interface InfoAutocompleteEvents {
    /**
     * 在 Input 失去焦点时触发
     */
    onBlur?: (event: Event) => void
    /**
     * 在 Input 获得焦点时触发
     */
    onFocus?: (event: Event) => void
    /**
     * 在 Input 值改变时触发
     */
    onInput?: (value: string | number) => void
    /**
     * 在点击由 clearable 属性生成的清空按钮时触发
     */
    onClear?: () => void
    /**
     * 点击选中建议项时触发	选中的建议项
     */
    onSelect?: (select?: any) => void
    /**
     * 在 Input 值改变时触发
     */
    onChange?: (value: string | number) => void
}

export default interface InfoSelectControlConfig {
    /**
     * 类型
     */
    type: 'infoAutocomplete'
    /**
     * option 展示的列
     */
    columns: InfoColumnProps[]
    /**
     * 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[])  来返回它
     */
    fetchSuggestions: (queryString?: string, callback?: (arg: any) => void) => void
    /**
     * 输入建议对象中用于显示的键名	
     * 默认值：'value'
     */
    valueKey: string
    /**
     * autocomplete 的额外参数
     */
    props?: InfoAutocompleteProps & InfoAutocompleteEvents
}
