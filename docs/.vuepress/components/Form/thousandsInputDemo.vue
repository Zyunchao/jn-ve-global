<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
        <el-button type="primary" @click="getData">
            获取数据
        </el-button>
        <el-button type="primary" @click="resetForm">
            重置
        </el-button>
    </div>
</template>

<script lang="ts" setup>
import { reactive, watch, ref } from 'vue'
import { FormProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '60px',
    model: {
        money: ''
    },
    formItems: [
        {
            prop: 'money',
            label: '金额',
            span: 12,
            controlConfig: {
                type: 'thousands'
            }
        }
    ]
})

watch(
    () => formConfig.value.model,
    (model) => {
        console.log(`%c model onChange === `, 'color: #67c23a;', model)
    },
    {
        deep: true
    }
)

const getData = () => {
    console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)
}

const resetForm = () => {
    formConfig.value.instance?.resetFields()
}
</script>

<style lang="scss" scoped></style>
