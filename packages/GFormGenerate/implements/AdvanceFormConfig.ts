import { isJSON, assignOwnProp, funStr2FuncBody } from '../../utils/utils'
import _ from 'lodash'
import FormGenerateProps, { FormGenerateItemProps } from '../interface/FormGenerateProps'
import {
    FormItemProps,
    ControlConfig,
    ExtendRuleItem,
    SelectControlConfig,
    CheckboxButtonControlConfig,
    RadioControlConfig,
    RadioButtonControlConfig,
    CheckboxControlConfig,
    SelectTreeV2ControlConfig
} from '../../index'
import {
    loadOptionsControlTyeps,
    loadTreeDataControlType
} from '../../GForm/mixins/getControlOprions'

export default class AdvanceFormConfig {
    private formConfigRef: FormGenerateProps
    private jsonConfig: FormGenerateProps

    constructor(params: {
        formConfigRef: FormGenerateProps
        jsonConfig?: string | FormGenerateProps | object
    }) {
        this.formConfigRef = params.formConfigRef

        // 如果初始化时有值，就进行解析、填充
        if (params.jsonConfig) {
            this.parseJson(params.jsonConfig)
        }
    }

    /**
     * 获取私有的 JsonConfig
     */
    public setJsonConfig(config: FormGenerateProps) {
        this.jsonConfig = config
    }

    /**
     * 设置私有的 JsonConfig
     * @param config 配置对象
     */
    public getJsonConfig() {
        return this.jsonConfig
    }

    /**
     * 解析json，并主动赋值给当前实例的 jsonConfig
     * @param data json 字符串 或 解析好的配置对象
     */
    public parseJson(data: string | object | FormGenerateProps): FormGenerateProps {
        let config: FormGenerateProps = null
        if (_.isString(data) && isJSON(data)) config = JSON.parse(data) as FormGenerateProps

        if (_.isObject(data)) config = _.cloneDeep(data) as FormGenerateProps

        if (!config || _.isEmpty(config)) return null

        const { formItems: formGenerateItems, model, instance, ...formProps } = config

        this.mergeFormProps(formProps as FormGenerateProps)
        this.fillFormItems(formGenerateItems)
        this.setJsonConfig(config)
        return config
    }

    /**
     * 合并: form 的一级配置
     * @param formProps 表单的一级配置
     */
    private mergeFormProps(formProps: FormGenerateProps): void {
        assignOwnProp(this.formConfigRef, formProps, ['instance', 'model', 'formItems'])
    }

    /**
     * 填充: formItems
     *  - 排除 defaultValue
     *  - 控件事件处理
     *  - 校验规则处理
     *  - 追加 formItem 的同时, 为数据模型 model 添加字段
     *      - 如果字段已存在，则不添加，并且不在追加控件
     *
     * formItems 改变引用
     * model 保持引用
     * @param formGenerateItems 表单 item 的配置
     */
    private fillFormItems(formGenerateItems: FormGenerateItemProps[]): void {
        this.formConfigRef.formItems = this.formConfigRef.formItems.concat(
            formGenerateItems
                .map((item) => {
                    const key = item.prop

                    // 校验是否已存在
                    if (Object.keys(this.formConfigRef.model).includes(key)) return null

                    const { defaultValue, ...formItem } = item

                    /**
                     * 数据模型添加字段
                     */
                    this.formConfigRef.model[key] = defaultValue || ''
                    // 数字选择框特殊处理
                    if (item.controlConfig.type === 'inputNumber') {
                        this.formConfigRef.model[key] = item.defaultValue || 0
                    }

                    /**
                     * 处理当前的 formItem
                     *  - 布局
                     *  - 事件转换
                     *  - 加载数据的自定义处理函数转换
                     *  - 校验规则转换
                     */
                    this.replenishLayout(formItem)
                    this.convertControlEvents(formItem.controlConfig)
                    this.convertControlMapOptionsCb(formItem.controlConfig as any)
                    this.convertRules(formItem)

                    return formItem
                })
                .filter((item) => item)
        )
    }

    /**
     * 补充：span 布局
     * 如果配置中传递的 span，则以配置中的 span 优先
     */
    private replenishLayout(formItem: FormItemProps): void {
        if (formItem.span) return

        const lastFormItemSpan =
            this.formConfigRef.formItems[this.formConfigRef.formItems.length - 1]?.span

        if (!lastFormItemSpan) return

        formItem.span = lastFormItemSpan
    }

    /**
     * 转换：控件配置
     *  - 校验规则
     *  - 事件转换（字符串 2 函数）
     *  - 事件增强（传递当前表单配置）
     * @param controlConfig
     */
    private convertControlEvents(controlConfig: ControlConfig): void {
        const props = controlConfig.props
        if (!props) return

        const eventKeys = Object.keys(props).filter((key) => key.startsWith('on'))
        const _that = this

        if (!eventKeys.length) return

        eventKeys.forEach((key) => {
            if (!props[key] || typeof props[key] !== 'string') return

            // 字符串转换函数 或 预定义的事件处理函数
            const _sourceFunStr: string = props[key]
            const handleType = _sourceFunStr.substring(0, _sourceFunStr.indexOf('('))

            // 传递自定义函数时，只能使用匿名函数（不能使用箭头函数, 内部需要使用 arguments）
            if (handleType === 'function') {
                const funcBody: Function = funStr2FuncBody(_sourceFunStr)
                if (funcBody) {
                    /**
                     * 增强
                     *  - 传递整个表单配置，基于表单配置对象进行联动等操作
                     */
                    props[key] = function () {
                        return funcBody.apply(this, [...arguments, _that.formConfigRef])
                    }
                }

                return false
            } else {
                const paramsKeys = _sourceFunStr.substring(_sourceFunStr.indexOf('('))
                const params = paramsKeys
                    .replace('(', '')
                    .replace(')', '')
                    .replace(/\s/g, '')
                    .split(',')

                props[key] = function () {
                    _that.previewEventsHandle[handleType].apply(_that, params)
                }
            }
        })
    }

    /**
     * 转换控件的数据映射自定义方法，适用于
     *  - select
     *  - checkBox
     *  - checkBoxButton
     *  - radio
     *  - radioButton
     *  - selectTreeV2
     * @param controlConfig
     */
    private convertControlMapOptionsCb(
        controlConfig:
            | SelectControlConfig
            | CheckboxControlConfig
            | CheckboxButtonControlConfig
            | RadioControlConfig
            | RadioButtonControlConfig
            | SelectTreeV2ControlConfig
    ): void {
        /**
         * 1. 不在范围内的组件
         * 2. 没有 url 的组件
         * 3. 没有 cb 的组件
         * 4. cb 不是字符串的
         * 5. 字符串不以 function 开头的
         */
        if (
            ![...loadOptionsControlTyeps, ...loadTreeDataControlType].includes(
                controlConfig.type
            ) ||
            !controlConfig.getOptionsUrl ||
            !controlConfig.mapOptionsCb ||
            !_.isString(controlConfig.mapOptionsCb) ||
            !controlConfig.mapOptionsCb.startsWith('function')
        ) {
            return
        }

        const funcBody: Function = funStr2FuncBody(controlConfig.mapOptionsCb)

        if (!funcBody) return

        controlConfig.mapOptionsCb = funcBody as any
    }

    /**
     * 转换：rules
     *  - 转换 validator（字符串 2 函数）
     *  - 增强 rules（填充整个 model）
     * @param formItem
     */
    private convertRules(formItem: FormItemProps): void {
        if (!formItem.rules) return
        if (_.isArray(formItem.rules)) {
            formItem.rules.forEach((rule) => this.convertRule(rule))
        } else if (_.isObject(formItem.rules)) {
            this.convertRule(formItem.rules)
        }
    }

    /**
     * 转换：rule 的实际方法
     * @param rule
     */
    private convertRule(rule: ExtendRuleItem): void {
        if (!rule.validator || typeof rule.validator !== 'string') return

        // 字符串转函数
        const _sourceValidatorStr: string = rule.validator
        const funcBody: Function = funStr2FuncBody(_sourceValidatorStr)

        if (!funcBody) return

        const _that = this

        /**
         * 增强
         *  - 传递数据模型，基于数据模型进行联动校验
         */
        rule.validator = function () {
            return funcBody.apply(this, [...arguments, _that.formConfigRef.model])
        }
    }

    public previewEventsHandle = {
        /**
         * 加法：所有数相加，结果赋给最后一个 key
         * 多个字段操作一个字段
         * @param keys
         */
        sum: (...keys: string[]): void => {
            this.keyIsExist(keys)

            const resKey = keys.splice(keys.length - 1)[0]
            const resMustNumber = this.keyIsNumber(resKey)

            const res = keys
                .map((key) => {
                    const val = Number(this.formConfigRef.model[key])
                    return _.isNaN(val) ? 0 : val
                })
                .reduce((res, num) => {
                    res += num
                    return res
                }, 0)

            this.formConfigRef.model[resKey] = resMustNumber ? res : `${res}`
        },
        /**
         * 减法：第一个数为开始，减去后续的 key，结果赋给最后一个 key
         * 多个字段操作一个字段
         * @param keys
         */
        sub: (...keys: string[]): void => {
            this.keyIsExist(keys)

            const resKey = keys.splice(keys.length - 1)[0]
            const start = Number(this.formConfigRef.model[keys[0]]) || 0
            const resMustNumber = this.keyIsNumber(resKey)

            const res = keys
                .filter((item, index) => index > 0)
                .map((key) => {
                    const val = Number(this.formConfigRef.model[key])
                    return _.isNaN(val) ? 0 : val
                })
                .reduce((res, num) => {
                    res -= num
                    return res
                }, start)

            this.formConfigRef.model[resKey] = resMustNumber ? res : `${res}`
        },
        /**
         * 乘法
         * 多个字段操作一个字段
         * @param keys
         */
        mult: (...keys: string[]): void => {
            this.keyIsExist(keys)

            const resKey = keys.splice(keys.length - 1)[0]
            const start = Number(this.formConfigRef.model[keys[0]]) || 0
            const resMustNumber = this.keyIsNumber(resKey)

            const res = keys
                .filter((item, index) => index > 0)
                .map((key) => {
                    const val = Number(this.formConfigRef.model[key])
                    return _.isNaN(val) ? 0 : val
                })
                .reduce((res, num) => {
                    res *= num
                    return Number(res)
                }, start)

            this.formConfigRef.model[resKey] = resMustNumber ? res : `${res}`
        },
        /**
         * 除法
         * 多个字段操作一个字段
         * @param keys
         */
        division: (...keys: string[]): void => {
            this.keyIsExist(keys)
            const resKey = keys.splice(keys.length - 1)[0]
            const start = Number(this.formConfigRef.model[keys[0]]) || 0
            const resMustNumber = this.keyIsNumber(resKey)

            const res = keys
                .filter((item, index) => index > 0)
                .map((key) => {
                    const val = Number(this.formConfigRef.model[key])
                    return _.isNaN(val) ? 0 : val
                })
                .reduce((res, num) => {
                    res /= num
                    return Number(res)
                }, start)

            this.formConfigRef.model[resKey] = resMustNumber ? res : `${res}`
        }
    }

    /**
     * 判断目标字段的控件的绑定值是否为 number
     * @param key
     * @returns
     */
    private keyIsNumber(key: string): boolean {
        const targetItem = this.formConfigRef.formItems.find((item) => item.prop === key)
        const numberTypeControls = ['inputNumber']
        return !!targetItem && numberTypeControls.includes(targetItem.controlConfig.type)
    }

    /**
     * 检查每一个 key 是否都存在
     * @param keys
     */
    private keyIsExist(keys: string[]): void {
        keys.forEach((key) => {
            if (!Object.keys(this.formConfigRef.model).includes(key))
                throw new Error(`${key} 在 model 中不存在`)
        })
    }
}
