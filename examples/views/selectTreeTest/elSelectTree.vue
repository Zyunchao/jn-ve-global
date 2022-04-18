<template>
    <BaseLayout>
        <div class="box">
            <g-select-tree-v2
                v-model="activeValue"
                :tree-data="treeData"
                :tree-props="treeProps"
                multiple
            />
        </div>

        <g-form :config="formConfig" />
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

const treeProps = {
    label: 'name',
    value: 'id'
}

const activeValue = ref<string[]>(['1425374958969872386', '1425375136254713858'])

const formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '80px',
    model: {
        selectTree2: ''
    },
    formItems: [
        {
            prop: 'selectTree2',
            label: '测试',
            controlConfig: {
                type: 'selectTreeV2',
                treeData: treeData,
                props: {
                    treeProps: {
                        label: 'name',
                        value: 'id',
                        disabled: 'red'
                    },
                    multiple: true,
                    onChange(val) {
                        console.log(`%c onChange === `, 'color: #67c23a;', val)
                    },
                    onNodeClick() {
                        console.log(`%c 树节点点击 ==== `, 'color: #f56c6c;')
                    }
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
