<template>
    <g-form :config="formConfig" />
</template>

<script lang="ts">
export default {
    name: 'SelectTreeV2Demo2'
}
</script>

<script lang="ts" setup>
import { watch, reactive } from 'vue'
import treeData from './data/treeData.json'
import { FormProps } from '@component/index'

const formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '80px',
    model: {
        selectTree2: '',
        selectTree2M: ''
    },
    formItems: [
        {
            prop: 'selectTree2',
            label: '单选',
            span: 24,
            controlConfig: {
                type: 'selectTreeV2',
                treeData: treeData
            }
        },
        {
            prop: 'selectTree2M',
            label: '多选',
            span: 24,
            controlConfig: {
                type: 'selectTreeV2',
                treeData: treeData,
                props: {
                    multiple: true
                }
            }
        }
    ]
})

watch(
    () => formConfig.model.selectTree2,
    (val) => {
        console.log(`%c selectTree2 ==== `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped>
.box {
    width: 600px;
}
</style>
