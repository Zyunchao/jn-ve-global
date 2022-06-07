<template>
    <g-form :config="formConfig" />
</template>

<script lang="tsx">
export default {
    name: 'BootstrapLayout'
}
</script>

<script lang="tsx" setup>
import { FormProps } from '@component/GForm'
import { reactive } from 'vue'

let formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '100px',
    model: {
        customLabel: ''
    },
    formItems: [
        {
            prop: 'customLabel',
            label: '固定 span',
            /**
             * span 的权重比响应式的高
             */
            span: 24,
            sm: 24,
            lg: 12,
            xl: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'customLabel',
            label: '响应式1',
            sm: 24,
            lg: 12,
            xl: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'customLabel',
            label: '响应式2',
            sm: 24,
            lg: 12,
            xl: 12,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
