<template>
    <BaseLayout>
        <g-form :config="formConfig" />

        <div class="box">
            <g-select-tree-v2
                v-model="activeValue"
                :tree-data="treeData"
                :tree-props="treeProps"
                multiple
            />
        </div>
    </BaseLayout>
</template>

<script lang="ts">
export default {
    name: 'ElSelectTreeTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data.json'
import BaseLayout from '@/components/businessLayout/index.vue'
import { SelectTreeV2ControlConfig, FormProps } from '@component/index'
import mockOrgData from './orgData.json'

const treeProps = {
    label: 'name',
    value: 'id'
}

const activeValue = ref<string[]>(['3200009521950001'])

const formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '80px',
    model: {
        selectTree: '3200009521950001'
    },
    formItems: [
        {
            prop: 'selectTree',
            label: '测试',
            span: 12,
            controlConfig: {
                type: 'selectTree',
                // treeData: mockOrgData as any, //[],
                treeData: [],
                props: {
                    treeProps: {
                        label: 'name',
                        value: 'instituId'
                    },
                    multiple: false,
                    onChange(val) {
                        console.log(`%c onChange === `, 'color: #67c23a;', val)
                    }
                }
            }
        }
    ]
})

setTimeout(() => {
    ;(formConfig.formItems[0].controlConfig as any).treeData = mockOrgData
}, 1000)

// setTimeout(() => {
//     formConfig.model.selectTree = '3200009521950001'
//     // ;(formConfig.formItems[0].controlConfig as any).treeData = mockOrgData
// }, 2000)

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
    margin-top: 200px;
}
</style>
