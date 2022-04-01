<template>
    <div class="examples-base-wrapper">
        <h2>修改前</h2>
        <g-form :config="afterFormConfig" />

        <h2>修改后</h2>
        <g-form :config="beforeFormConfig" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'Dynamic'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, InfoColumnProps, FormItemProps } from '@component/index'
import { data as dynamicData } from './data/dynamicData.json'

// console.log(`%c dynamicData === `, 'color: #67c23a;', dynamicData)

const afterFormConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '180px',
    model: {},
    formItems: []
})

const beforeFormConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '180px',
    model: {},
    formItems: []
})

const beforeData = dynamicData[0].beforeDto
const afterData = dynamicData[0].afterDto

// console.log(`%c 排序后 === `, 'color: #67c23a;', afterData.sort((a, b) => b.sort - a.sort))

const controlMapping = {
    '1': 'input',
    '2': 'select'
}

beforeFormConfig.formItems = afterData
    .sort((a, b) => b.sort - a.sort)
    .map((item) => {
        const prop = item.keyName
        const label = item.fieldName
        const controlType = controlMapping[`${item.type}`]

        afterFormConfig.model[prop] = ''

        const formItem: FormItemProps = {
            prop,
            label,
            span: 6,
            controlConfig: {
                type: controlType,
                props: {

                }
            }
        }

        return formItem
    })
</script>

<style lang="scss" scoped></style>
