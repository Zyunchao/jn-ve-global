<template>
    <div :class="!isComponent ? 'examples-base-wrapper' : ''">
        <el-scrollbar>
            <g-form :config="formConfig" />
            <g-button-group v-if="!isComponent" :btns="btns" />
        </el-scrollbar>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FormTest'
}
</script>

<script lang="tsx" setup>
import { BtnProps, SelectControlConfig } from '@component/index'
import getInfoSelectColumns from './component/infoSelectColumns'
import getFormConfig from './component/formConfig'

const props = defineProps({
    isComponent: {
        type: Boolean,
        default: false
    }
})

const infoSelectColumns = getInfoSelectColumns()
const formConfig = getFormConfig()

const btns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c model == `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '重置',
        onClick() {
            formConfig.instance?.resetFields()
        }
    },
    {
        label: '数据回填',
        type: 'success',
        onClick() {
            formConfig.model.selectMValue = ['m', 'f']
            ;(
                formConfig.formItems.find((item) => item.prop === 'selectMValue')
                    .controlConfig as SelectControlConfig
            ).options = [
                {
                    label: 'M',
                    value: 'm'
                },
                {
                    label: 'F',
                    value: 'f'
                }
            ]
        }
    }
]
</script>

<style lang="scss">
.form-test-custom-label {
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
</style>
