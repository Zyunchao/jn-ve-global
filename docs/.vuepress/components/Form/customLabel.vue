<template>
    <div class="wrapper">
        <g-form :config="formConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FormDemoCustomLabel'
}
</script>

<script lang="tsx" setup>
import { FormProps } from '@component/GForm'
import { reactive } from 'vue'

let formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        customLabel: ''
    },
    formItems: [
        {
            prop: 'customLabel',
            label: () => {
                return (
                    <span class='form-test-custom-label'>
                        <span>自</span>
                        <span>定</span>
                        <span>义</span>
                        <span>标</span>
                        <span>签</span>
                    </span>
                )
            },
            span: 24,
            controlConfig: {
                type: 'input',
                props: {
                    placeholder: '自定义 label 需要传递 placeholder'
                }
            }
        }
    ]
})
</script>

<style lang="scss" scoped>
.wrapper {
    width: 700px;

    :deep(.form-test-custom-label) {
        span {
            &:first-of-type {
                color: red;
            }
            &:nth-of-type(2) {
                color: orange;
            }
            &:nth-of-type(3) {
                color: blue;
            }
            &:nth-of-type(4) {
                color: green;
            }
            &:nth-of-type(5) {
                color: purple;
            }
        }
    }
}
</style>
