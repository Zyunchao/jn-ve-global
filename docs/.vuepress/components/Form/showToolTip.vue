<template>
    <g-form :config="formConfig" />
    <el-button type="primary" style="margin-left: 160px; margin-top: 20px" @click="setDisabled">
        {{ formConfig.disabled ? '解除禁用' : '禁用' }}
    </el-button>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { FormProps } from '@component/index'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '160px',
    disabled: true,
    model: {
        synopsis: '高尔基刻苦自学文化知识，并积极投身革命活动，探求改造现实的途径。'
    },
    formItems: [
        {
            prop: 'synopsis',
            label: '简介',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'synopsis',
            label: '简介',
            span: 24,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

const setDisabled = () => {
    formConfig.value.disabled = !formConfig.value.disabled
}
</script>

<style lang="scss" scoped></style>
