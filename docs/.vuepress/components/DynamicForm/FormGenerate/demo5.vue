<template>
    <div v-loading="loadingFlag" class="examples-base-wrapper">
        <GFormGenerate ref="formGenerateRef" :config="formConfigJson" />
        <g-button-group :btns="btns" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormGenerateDemo5'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, BtnProps, FormGenerateItemProps } from '@component/index'
import mockData from './data/demo5.json'

const formConfigJson = ref<string>('')
const loadingFlag = ref<boolean>(true)

const formGenerateRef = ref<FormProps>(null)

setTimeout(() => {
    formConfigJson.value = JSON.stringify(mockData)
    loadingFlag.value = false
}, 500)

const btns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c model === `, 'color: #67c23a;', formGenerateRef.value.model)
        }
    },
    {
        label: '校验',
        onClick() {
            formGenerateRef.value.instance.validate()
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formGenerateRef.value.instance.resetFields()
        }
    },
    {
        label: '回填',
        type: 'success',
        onClick() {
            formGenerateRef.value.model['name'] = '比克'
        }
    }
]
</script>

<style lang="scss" scoped></style>
