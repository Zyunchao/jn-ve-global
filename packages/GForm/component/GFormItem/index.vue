<template>
    <el-form-item
        v-if="formConfig && formItemConfig"
        :class="{ 'no-colon': formConfig.colon === false, 'g-form-item': true }"
        v-bind="elFormItemProps"
        :label-width="labelWidth"
    >
        <!-- 自定义 label -->
        <template v-if="formItemConfig.label" #label>
            <span v-if="typeof formItemConfig.label === 'string'">
                {{ formItemConfig.label }}
            </span>

            <!-- tsx -->
            <FunctionalComponent
                v-if="typeof formItemConfig.label === 'function'"
                :render="formItemConfig.label()"
            />
        </template>

        <!-- 优先级1：自定义 Render 控件 -->
        <template v-if="formItemConfig.render">
            <FunctionalComponent
                :render="formItemConfig.render(toRef(formConfig.model, formItemConfig.prop))"
            />
        </template>

        <!-- 优先级2：配置式控件（组） -->
        <template
            v-else-if="formItemConfig.controlConfigs && formItemConfig.controlConfigs.length > 0"
        >
            <FormItemControlGroup
                :form-item-config="formItemConfig"
                :control-configs="formItemConfig.controlConfigs"
                :source-model="formConfig.model"
                :prop-key="formItemConfig.prop"
            />
        </template>

        <!-- 优先级3：配置式控件（单） -->
        <template v-else-if="formItemConfig.controlConfig">
            <FormItemControl
                :form-item-config="formItemConfig"
                :control-config="formItemConfig.controlConfig"
                :prop="toRef(formConfig.model, formItemConfig.prop)"
            />
        </template>
    </el-form-item>
</template>

<script lang="ts">
export default {
    name: 'GFormItem'
}
</script>

<script lang="ts" setup>
import { toRef, computed } from 'vue'
import type { FormProps, FormItemProps } from '../../index'

// 组件
import FunctionalComponent from '../../../FunctionalComponent'
import FormItemControl from '../formItemControl.vue'
import FormItemControlGroup from '../formItemControlGroup.vue'

interface Props {
    formConfig: FormProps
    formItemConfig: FormItemProps
}

const props = withDefaults(defineProps<Props>(), {
    formConfig: null,
    formItemConfig: null
})

const labelWidth = computed(() => {
    if (!props.formItemConfig.label) return '0px'
    if (props.formItemConfig.labelWidth) return props.formItemConfig.labelWidth
    if (props.formConfig?.labelWidth) return props.formConfig.labelWidth
    return 'auto'
})

// el-form-item 的配置
const elFormItemProps = computed(() => {
    const {
        label,
        hide,
        group,
        render,
        controlConfigs,
        controlConfig,
        span,
        offset,
        xs,
        sm,
        md,
        lg,
        xl,
        selected,
        ...formItemProps
    } = props.formItemConfig
    return formItemProps
})
</script>

<style lang="scss" scoped></style>
