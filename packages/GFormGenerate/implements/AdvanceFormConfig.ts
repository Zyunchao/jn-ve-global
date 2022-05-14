import FormGenerateProps, { FormGenerateItemProps } from '../interface/FormGenerateProps'
import { isJSON, assignOwnProp, funStr2FuncBody } from '../../utils/utils'
import _ from 'lodash'
import FormItemProps, { ControlConfig } from '@component/GForm/interface/FormItemProps'
import { ExtendRuleItem } from '@component/GForm/interface/FormProps'

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
        this.mappingModelByItems(formGenerateItems)
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
     * 映射: model， 获取 formItems 的配置，提取 prop 映射成表单的 model
     * model 未改变引用
     * @param formGenerateItems 表单 item 的配置
     */
    private mappingModelByItems(formGenerateItems: FormGenerateItemProps[]): void {
        formGenerateItems.forEach((item) => {
            const key = item.prop
            this.formConfigRef.model[key] = item.defaultValue || ''

            // 数字选择框特殊处理
            if (item.controlConfig.type === 'inputNumber') {
                this.formConfigRef.model[key] = item.defaultValue || 0
            }
        })
    }

    /**
     * 填充: formItems
     *  - 排除 defaultValue
     *  - 控件事件处理
     * formItems 改变引用
     * @param formGenerateItems 表单 item 的配置
     */
    private fillFormItems(formGenerateItems: FormGenerateItemProps[]): void {
        this.formConfigRef.formItems = this.formConfigRef.formItems.concat(
            formGenerateItems.map((item) => {
                const { defaultValue, ...formItem } = item

                this.replenishLayout(formItem)
                this.convertControlConfig(formItem.controlConfig)
                this.convertRules(formItem)

                return formItem
            })
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
    private convertControlConfig(controlConfig: ControlConfig): void {
        const props = controlConfig.props
        if (!props) return

        const eventKeys = Object.keys(props).filter((key) => key.startsWith('on'))
        const _that = this

        if (!eventKeys.length) return

        eventKeys.forEach((key) => {
            if (!props[key] || typeof props[key] !== 'string') return

            // 字符串转函数
            const _sourceFunStr: string = props[key]
            const funcBody: Function = funStr2FuncBody(_sourceFunStr)

            // 如果是函数
            if (funcBody) {
                /**
                 * 增强
                 *  - 传递整个表单配置，基于表单配置对象进行联动等操作
                 */
                props[key] = function () {
                    return funcBody.apply(this, [...arguments, _that.formConfigRef])
                }
            }
        })
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
}
