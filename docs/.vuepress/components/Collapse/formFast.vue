<template>
    <div class="examples-base-wrapper">
        <g-button-group :btns="btns" />
        <g-form :config="formConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FormFast'
}
</script>

<script lang="tsx" setup>
import { reactive } from 'vue'
import FormConfig from './data/formConfig'
import { BtnProps } from '@component/index'
import _ from 'lodash'

const formConfig = FormConfig()

const btns = reactive<BtnProps[]>([
    {
        label: '改变 label',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.label = `${+new Date()}`
        }
    },
    {
        label: '隐藏',
        type: 'danger',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.hide = true
        }
    },
    {
        label: '显示',
        type: 'success',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            firstCollapase.hide = false
        }
    },
    {
        label: '上移',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            const firstCollapaseIndex = formConfig.formItems.findIndex(
                (item) => item.group && item.group === 'first'
            )

            const preIndex = firstCollapaseIndex - 1

            if (preIndex === -1) {
                return
            }

            formConfig.formItems[firstCollapaseIndex] = formConfig.formItems[preIndex]
            formConfig.formItems[preIndex] = firstCollapase
        }
    },
    {
        label: '下移',
        onClick() {
            const firstCollapase = formConfig.formItems.find(
                (item) => item.group && item.group === 'first'
            )
            const firstCollapaseIndex = formConfig.formItems.findIndex(
                (item) => item.group && item.group === 'first'
            )

            const nextIndex = firstCollapaseIndex + 1

            if (nextIndex === formConfig.formItems.length) {
                return
            }

            formConfig.formItems[firstCollapaseIndex] = formConfig.formItems[nextIndex]
            formConfig.formItems[nextIndex] = firstCollapase
        }
    }
])
</script>

<style lang="scss" scoped></style>
