<template>
    <div class="examples-base-wrapper">
        <div class="box">
            <g-form :config="formConfig" />
            <el-button type="primary" @click="setDisabled">
                {{ formConfig.disabled ? '解除禁用' : '禁用' }}
            </el-button>

            <el-button type="success" @click="addData">
                添加数据
            </el-button>
        </div>
    </div>
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
        synopsis: ''
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

const addData = () => {
    formConfig.value.model.synopsis = formConfig.value.model.synopsis
        ? ''
        : '高尔基刻苦自学文化知识，并积极投身革命活动，探求改造现实的途径。'
}
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
    padding-top: 100px;
}
</style>
