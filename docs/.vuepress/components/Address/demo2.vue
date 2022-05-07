<template>
    <g-form :config="formConfig" />
    <g-button-group :btns="btns" />
</template>

<script lang="ts">
export default {
    name: 'AddressDemo2'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, BtnProps } from '@component/index'

const formConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '100',
    model: {
        address: []
    },
    formItems: [
        {
            prop: 'address',
            label: '地址',
            span: 24,
            controlConfig: {
                type: 'address'
            }
        }
    ]
})

const btns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c 数据：`, 'color: #67c23a;', formConfig.model)
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
            formConfig.model.address = [['140000', '140400', '140406'], '上元大街88号']
        }
    }
]
</script>

<style lang="scss" scoped></style>
