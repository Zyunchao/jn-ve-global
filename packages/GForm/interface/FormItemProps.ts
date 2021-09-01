import { VNode } from 'vue'
import InputControlConfig from './InputControlConfig'
import { ExtendRuleItem } from './FormProps'
import {
    InputNumberControlConfig,
    SelectControlConfig,
    RadioControlConfig,
    RadioButtonControlConfig,
    SwitchControlConfig,
    TimePickerCotrolConfig,
    TimeSelectCotrolConfig,
    DatePickerCotrolConfig,
    DateTimePickerCotrolConfig,
    CheckboxControlConfig,
    CheckboxButtonControlConfig,
    ColorPickerControlConfig,
    RateControlConfig,
    SliderControlConfig,
    SelectTreeControlConfig
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
 */
export type ControlConfig =
    | InputControlConfig
    | InputNumberControlConfig
    | SelectControlConfig
    | RadioControlConfig
    | RadioButtonControlConfig
    | SwitchControlConfig
    | TimePickerCotrolConfig
    | TimeSelectCotrolConfig
    | DatePickerCotrolConfig
    | DateTimePickerCotrolConfig
    | CheckboxControlConfig
    | CheckboxButtonControlConfig
    | ColorPickerControlConfig
    | RateControlConfig
    | SliderControlConfig
    | SelectTreeControlConfig

type FormItemProps =
    | {
          /**
           * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
           */
          prop: string
          /**
           * 标签文本
           */
          label?: string
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
          /**
           * 用于控制该表单域下组件的尺寸
           */
          size?: 'medium' | 'small' | 'mini'

          // 自定义扩展 Props -----------------------------------------------------------------------

          /**
           * 控件配置
           */
          controlConfig: ControlConfig
          /**
           * FormItem 所占的栅格（1 - 24）
           * default：6
           */
          span?: number
          /**
           * 渲染函数
           */
          render?: (prop?: any) => JSX.Element | VNode
          /**
           * className
           */
          class?: string
          /**
           * 是否隐藏
           */
          hide?: boolean
      }
    | {
          /**
           * 表单域 model 字段，在使用 validate、resetFields 方法的情况下，该属性是必填的
           */
          prop: string
          /**
           * 标签文本
           */
          label?: string
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
          /**
           * 用于控制该表单域下组件的尺寸
           */
          size?: 'medium' | 'small' | 'mini'

          // 自定义扩展 Props -----------------------------------------------------------------------

          /**
           * 控件配置
           */
          controlConfig?: ControlConfig
          /**
           * FormItem 所占的栅格（1 - 24）
           * default：6
           */
          span?: number
          /**
           * 渲染函数
           */
          render: (prop?: any) => JSX.Element | VNode
          /**
           * className
           */
          class?: string
          /**
           * 是否隐藏
           */
          hide?: boolean
      }

export default FormItemProps
