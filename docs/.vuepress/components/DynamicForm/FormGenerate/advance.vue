<template>
    <g-form :config="formConfig" />
    <g-button-group :btns="btns" />
</template>

<script lang="ts">
export default {
    name: 'FormGenerateAdvanceTest'
}
</script>

<script lang="ts" setup>
import { reactive } from 'vue'
import { FormProps, BtnProps, FormGenerateProps } from '@component/index'
import mockData from './data/demo1.json'
import AdvanceFormConfig from '@component/GFormGenerate/implements/AdvanceFormConfig'

const formConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '150px',
    model: {
        weight: ''
    },
    formItems: [
        {
            prop: 'weight',
            label: '体重',
            span: 24,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

const advanceFormConfig = new AdvanceFormConfig({
    formConfigRef: formConfig as FormGenerateProps
})

const btns: BtnProps[] = [
    {
        label: '追加配置数据',
        type: 'default',
        onClick() {
            advanceFormConfig.parseJson(JSON.stringify(mockData))
        }
    },
    {
        label: '获取数据',
        type: 'default',
        onClick() {
            console.log(`%c model === `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '校验',
        type: 'default',
        onClick() {
            formConfig.instance.validate()
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.instance.resetFields()
        }
    },
    {
        label: '回填',
        type: 'default',
        onClick() {
            formConfig.model['name'] = 'qwer'
        }
    }
]
</script>

<style lang="scss" scoped></style>
