type AutosizeProp =
    | {
          minRows?: number
          maxRows?: number
      }
    | boolean

export interface InputEvents {
    /**
     * 在 Input 失去焦点时触发
     */
    onBlur?: (event: Event) => void
    /**
     * 在 Input 获得焦点时触发
     */
    onFocus?: (event: Event) => void
    /**
     * 仅在输入框失去焦点或用户按下回车时触发
     */
    onChange?: (value: string | number) => void
    /**
     * 在 Input 值改变时触发
     */
    onInput?: (value: string | number) => void
    /**
     * 在点击由 clearable 属性生成的清空按钮时触发
     */
    onClear?: () => void
    /**
     * 粘贴事件
     */
    onPaste?: (event: ClipboardEvent) => void
    [k: string]: any
}

export interface InputProps extends InputEvents {
    /**
     * 类型：text，textarea 和其他 原生 input 的 type 值
     * default：text
     */
    type?: 'text' | 'textarea' | 'number'
    /**
     * 原生属性，最大输入长度
     */
    maxlength?: number
    /**
     * 原生属性，最小输入长度
     */
    minlength?: number
    /**
     * 是否显示输入字数统计，只在 type = "text" 或 type = "textarea" 时有效
     * default：false
     */
    showWordLimit?: boolean
    /**
     * 输入框占位文本
     */
    placeholder?: string
    /**
     * 是否可清空
     * default：false
     */
    clearable?: boolean
    /**
     * 是否显示切换密码图标
     * default：false
     */
    showPassword?: boolean
    /**
     * 禁用
     * default：false
     */
    disabled?: boolean
    /**
     * 输入框尺寸，只在 type!="textarea" 时有效
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 输入框头部图标
     */
    prefixIcon?: string
    /**
     * 输入框尾部图标
     */
    suffixIcon?: string
    /**
     * 输入框行数，只对 type="textarea" 有效
     * default：2
     */
    rows?: number
    /**
     * 自适应内容高度，只对 type="textarea" 有效，可传入对象，如，{ minRows?: 2, maxRows?: 6 }
     * default：false
     */
    autosize?: false | AutosizeProp
    /**
     * 原生属性，自动补全
     * default：off
     */
    autocomplete?: 'on' | 'off'
    /**
     * 原生属性，是否只读
     * default：false
     */
    readonly?: boolean
    /**
     * 	控制是否能被用户缩放
     */
    resize?: 'none' | 'both' | 'horizontal' | 'vertical'
    /**
     * 原生属性，自动获取焦点
     * default：false
     */
    autofocus?: boolean
    /**
     * 输入框的tabindex
     */
    tabindex?: (string | number)[]
    /**
     * 输入时是否触发表单的校验
     * default：true
     */
    validateEvent?: boolean
    /**
     * input元素或textarea元素的style
     * default：{}
     */
    inputStyle?: object
}

export default interface InputControlConfig {
    type: 'input'
    props?: InputProps
}
