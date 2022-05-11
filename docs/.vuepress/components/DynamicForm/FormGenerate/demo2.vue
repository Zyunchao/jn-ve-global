<template>
    <div v-loading="loadingFlag">
        <g-button-group :btns="btns" style="margin-bottom: 20px" />
        <GFormGenerate :config="formConfigJson" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormGenerateDemo2'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { FormGenerateProps, BtnProps } from '@component/index'
import mockData from './data/demo1.json'

const formConfigJson = ref<FormGenerateProps>(null)
const loadingFlag = ref<boolean>(false)

const btns: BtnProps[] = [
    {
        label: '获取配置-异步',
        onClick() {
            loadingFlag.value = true
            setTimeout(() => {
                formConfigJson.value = mockData as any

                console.log(`%c formConfigJson.value == `, 'color: #67c23a;', formConfigJson.value)

                loadingFlag.value = false
            }, 500)
        }
    }
]
</script>

<style lang="scss" scoped></style>
