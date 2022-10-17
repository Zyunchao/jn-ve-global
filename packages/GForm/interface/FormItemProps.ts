import { VNode, Ref } from 'vue'
import { ExtendRuleItem } from './FormProps'
import {
    InputControlConfig,
    InputNumberControlConfig,
    SelectControlConfig,
    RadioControlConfig,
    RadioButtonControlConfig,
    SwitchControlConfig,
    TimePickerControlConfig,
    TimeSelectControlConfig,
    DatePickerControlConfig,
    DateTimePickerControlConfig,
    CheckboxControlConfig,
    CheckboxButtonControlConfig,
    ColorPickerControlConfig,
    RateControlConfig,
    SliderControlConfig,
    SelectTreeControlConfig,
    UploadControlConfig,
    FigureInputControlConfig,
    IconPickerControlConfig,
    InfoSelectControlConfig,
    InfoAutocompleteControlConfig,
    InfoSelectAllControlConfig,
    SelectTreeV2ControlConfig,
    AddressControlConfig,
    JnEditorControlConfig,
    FormItemTableTableConfig
} from '../index'

/**
 * 控件配置：
 * - Input 输入框
 * - InputNumber 数字输入框
 * - Select 下拉选择框
 * - Radio & RadioButton 单选
 * - Switch 开关
 * - TimePicker & TimeSelect & DatePicker & DateTimePicker 时间选择类
 * - Checkbox & CheckboxButton 多选
 * - ColorPicker 颜色选择
 * - Rate 评分
 * - Slider 滑块
 * - SelectTree 下拉树
 * - iconPicker 图标选择器
 * - Upload 上传文件
 * - InfoSelect 以表格样式展示的下拉框（虚拟滚动）
 * - InfoAutocompleteControlConfig 以表格样式展示的输入建议框
 * - SelectTreeV2ControlConfig 下拉树组件版本2（基于 element-plus 提供的下拉树组件）
 * - AddressControlConfig 地址选择 + 输入
 */
export type ControlConfig =
    | InputControlConfig
    | InputNumberControlConfig
    | SelectControlConfig
    | RadioControlConfig
    | RadioButtonControlConfig
    | SwitchControlConfig
    | TimePickerControlConfig
    | TimeSelectControlConfig
    | DatePickerControlConfig
    | DateTimePickerControlConfig
    | CheckboxControlConfig
    | CheckboxButtonControlConfig
    | ColorPickerControlConfig
    | RateControlConfig
    | SliderControlConfig
    | SelectTreeControlConfig
    | UploadControlConfig
    | FigureInputControlConfig
    | IconPickerControlConfig
    | InfoSelectControlConfig
    | InfoAutocompleteControlConfig
    | InfoSelectAllControlConfig
    | SelectTreeV2ControlConfig
    | AddressControlConfig
    | JnEditorControlConfig
    | FormItemTableTableConfig

/**
 * 控件组的配置
 * 在 ControlConfig 的基础上，增加了 after 必填项
 */
export type ExtendControlConfig = ControlConfig & {
    after: string
}

// 适配低码平台的额外属性
interface _LowCodeFormItemCustomProps {
    /**
     * 表单 item 的配置项
     *  - 控件配置项
     *
     * 用来表述表单控件的可配置属性的配置对象，取值方式依赖于 g-form 的对应的控件接口
     * 每个字段都代表了源控件的一个配置属性，字段取值因为是要生成表单控件（属性配置菜单）
     *  故：属性值为控件配置对象
     */
    _control_propertys_?: FormItemProps[]
    /**
     * 可供选择的事件
     */
    _events_provide_?: string[]
    /**
     * 持有的事件
     */
    _events_holding_?: {
        [k: string]: string
    }
}

export interface FormItemCustomProps extends _LowCodeFormItemCustomProps {
    /**
     * 标签文本
     * 原生需要一个字符串，
     * 扩展可传递自定义渲染函数
     */
    label?: string | ((prop?: any) => JSX.Element | VNode | string | number) | JSX.Element | VNode
    /**
     * className
     */
    class?: string
    /**
     * 是否隐藏
     */
    hide?: boolean
    /**
     * 控件分组
     */
    group?: string | string[]
    /**
     * FormItem 所占的栅格（1 - 24）
     * default：6
     */
    span?: number
    /**
     * 栅格左侧的间隔格数
     */
    offset?: number
    /**
     * <768px 响应式栅格数或者栅格属性对象
     */
    xs?: number | { span: number; offset: number }
    /**
     * ≥768px 响应式栅格数或者栅格属性对象
     */
    sm?: number | { span: number; offset: number }
    /**
     * ≥992px 响应式栅格数或者栅格属性对象
     */
    md?: number | { span: number; offset: number }
    /**
     * ≥1200px 响应式栅格数或者栅格属性对象
     */
    lg?: number | { span: number; offset: number }
    /**
     * ≥1920px 响应式栅格数或者栅格属性对象
     */
    xl?: number | { span: number; offset: number }
    /**
     * item 是否选中（适用拖拽平台）
     */
    selected?: boolean
    /**
     * tooltip 提示信息
     */
    tip?: string | VNode | JSX.Element | (() => VNode | JSX.Element)
    /**
     * 提示图标位置
     */
    tipPosition?: 'label' | 'append'
    /**
     * 提示的图标
     */
    tipIcon?: string
    /**
     * 提示的自定义类名
     */
    tipPopperClass?: string
    /**
     * 提示出现的位置
     */
    tipPlacement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'right'
        | 'right-start'
        | 'right-end'
    /**
     * 扩展字段
     */
    [k: string]: any
}

// formItem 基础参数
export interface FormItemBaseProps extends FormItemCustomProps {
    /**
     * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
     */
    prop: string
    /**
     * 表单域标签的的宽度，例如 '50px'。支持 auto。
     */
    labelWidth?: string
    /**
     * 是否必填，如不设置，则会根据校验规则自动生成
     * default：false
     */
    required?: boolean
    /**
     * 表单验证规则, 具体配置见下表, 更多内容参考 async-validator
     */
    rules?: ExtendRuleItem | ExtendRuleItem[]
    /**
     * 表单域验证错误信息, 设置该值会使表单验证状态变为error，并显示该错误信息
     */
    error?: string
    /**
     * 是否显示校验错误信息
     * default：true
     */
    showMessage?: boolean
    /**
     * 以行内形式展示校验信息
     * default：false
     */
    inlineMessage?: (boolean | string)[]
}

// 单控件
export interface ControlFormItem extends FormItemBaseProps {
    /**
     * 渲染函数
     */
    render?: (prop?: Ref<any>) => JSX.Element | VNode | string | number
    /**
     * 控件组配置
     */
    controlConfigs?: ExtendControlConfig[]
    /**
     * 控件配置
     */
    controlConfig: ControlConfig
}

// 多控件（组）
export interface ControlsFormItem extends FormItemBaseProps {
    /**
     * 渲染函数
     */
    render?: (prop?: Ref<any>) => JSX.Element | VNode | string | number
    /**
     * 控件组配置
     */
    controlConfigs: ExtendControlConfig[]
    /**
     * 控件配置
     */
    controlConfig?: ControlConfig
}

// Render
export interface RenderFormItem extends FormItemBaseProps {
    /**
     * 渲染函数
     */
    render: (prop?: Ref<any>) => JSX.Element | VNode | string | number
    /**
     * 控件组配置
     */
    controlConfigs?: ExtendControlConfig[]
    /**
     * 控件配置
     */
    controlConfig?: ControlConfig
}

type FormItemProps = ControlFormItem | RenderFormItem | ControlsFormItem

export default FormItemProps
