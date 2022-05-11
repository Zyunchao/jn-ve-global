<template>
    <LGForm v-if="loadDataFinished" :config="localFormConfig" />
</template>

<script lang="ts">
export default {
    name: 'GFormGenerate'
}
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive, toRefs } from 'vue'
import _ from 'lodash'
import { isJSON, assignOwnProp, funStr2FuncBody } from '../utils/utils'
import {
    FormProps,
    FormGenerateProps,
    FormGenerateItemProps,
    FormItemProps,
    ExtendRuleItem
} from '../index'
import LGForm from '../GForm/index.vue'

interface Props {
    /**
     * 表单的配置，远程获取，格式：
     *  - JSON
     *  - 配置对象格式
     */
    config: string | FormGenerateProps | object
}

const props = withDefaults(defineProps<Props>(), {
    config: ''
})

// 只有在加载完远程数据，且映射完毕后，才创建表单
const loadDataFinished = ref<boolean>(false)

// 本地基础表单配置对象
const localFormConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '100px',
    model: {},
    formItems: []
})

// 远端配置对象
const localRemoteConfig = computed<FormGenerateProps>(() => {
    if (_.isString(props.config) && isJSON(props.config)) {
        return JSON.parse(props.config)
    }

    if (_.isObject(props.config)) {
        return _.cloneDeep(props.config)
    }

    return null
})

watch(
    () => localRemoteConfig.value,
    (remoteConfig) => {
        if (!remoteConfig || _.isEmpty(remoteConfig)) return
        loadDataFinished.value = false
        const { formItems: formGenerateItems, model, instance, ...formProps } = remoteConfig

        /**
         * 获取一级配置（formProps）
         * 覆盖本地的 form 初始配置
         */
        mergeFormProps(formProps as FormGenerateProps)

        /**
         * 依照 formItems 的配置，映射 model 到 formConfig
         */
        mappingModelByItems(formGenerateItems)

        /**
         * 填充表单的 formItems
         */
        fillFormItems(formGenerateItems)

        // console.log(`%c localFormConfig === `, 'color: #f56c6c;', localFormConfig)

        // 数据映射完毕
        loadDataFinished.value = true
    },
    {
        immediate: true
    }
)

/**
 * 合并: form 的一级配置
 */
function mergeFormProps(formProps: FormGenerateProps) {
    assignOwnProp(localFormConfig, formProps, ['instance', 'model', 'formItems'])
}

/**
 * 映射: model
 */
function mappingModelByItems(formGenerateItems: FormGenerateItemProps[]) {
    localFormConfig.model = formGenerateItems.reduce((model, currentItem) => {
        const key = currentItem.prop
        model[key] = currentItem.defaultValue || ''

        // 数字选择框特殊处理
        if (currentItem.controlConfig.type === 'inputNumber') {
            model[key] = currentItem.defaultValue || 0
        }
        return model
    }, {})
}

/**
 * 填充: formItems
 *  - 排除 defaultValue
 *  - 控件事件处理
 */
function fillFormItems(formGenerateItems: FormGenerateItemProps[]) {
    localFormConfig.formItems = formGenerateItems.map((item) => {
        // 排除 defaultValue，默认值以映射到 model 中
        const { defaultValue, ...formItem } = item

        // 转换事件
        convertControlConfig(formItem.controlConfig)

        // 转换自定义校验规则
        convertRules(formItem)

        return formItem
    })
}

/**
 * 转换：控件配置
 *  - 校验规则
 *  - 事件转换（字符串 2 函数）
 *  - 事件增强（传递当前表单配置）
 */
function convertControlConfig(controlConfig: FormGenerateItemProps['controlConfig']) {
    const props = controlConfig.props
    if (!props) return

    const eventKeys = Object.keys(props).filter((key) => key.startsWith('on'))

    if (!eventKeys.length) return

    eventKeys.forEach((key) => {
        if (!props[key] || typeof props[key] !== 'string') return

        // 字符串转函数
        const _sourceFunStr: string = props[key]
        const funcBody: Function = funStr2FuncBody(_sourceFunStr)

        if (!funcBody) return

        /**
         * 增强
         *  - 传递整个表单配置，基于表单配置对象进行联动等操作
         */
        props[key] = function () {
            return funcBody.apply(this, [...arguments, localFormConfig])
        }
    })
}

/**
 * 转换：rules
 *  - 转换 validator（字符串 2 函数）
 *  - 增强 rules（填充整个 model）
 */
function convertRules(formItem: FormItemProps) {
    if (!formItem.rules) return
    if (_.isArray(formItem.rules)) {
        formItem.rules.forEach((rule) => convertRule(rule))
    } else if (_.isObject(formItem.rules)) {
        convertRule(formItem.rules)
    }
}
function convertRule(rule: ExtendRuleItem) {
    if (!rule.validator || typeof rule.validator !== 'string') return

    // 字符串转函数
    const _sourceValidatorStr: string = rule.validator
    const funcBody: Function = funStr2FuncBody(_sourceValidatorStr)

    if (!funcBody) return

    /**
     * 增强
     *  - 传递数据模型，基于数据模型进行联动校验
     */
    rule.validator = function () {
        return funcBody.apply(this, [...arguments, localFormConfig.model])
    }
}

/**
 * 抛出实例
 */
defineExpose({
    ...toRefs(localFormConfig)
})
</script>

<style lang="scss" scoped></style>
