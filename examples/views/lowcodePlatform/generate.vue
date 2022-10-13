<template>
    <div class="examples-base-wrapper">
        <h2>表单生成器：</h2>
        <GFormGenerate ref="formGenerateRef" :config="json" />
        <g-button-group :btns="btns" />

        <!-- <h2>表单增强测试：</h2>
        <AdvanceTest /> -->
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormGenerateTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, BtnProps, FormGenerateItemProps } from '@component/index'
import mockData from './data/mock.json'
import AdvanceTest from './advance.vue'
import FormConfigData from './data/FormConfigData.json'

console.log(`%c FormConfigData === `, 'color: #67c23a;', JSON.stringify(FormConfigData))

const json = JSON.stringify(FormConfigData)

const formConfigJson = ref<string>('')
const loadingFlag = ref<boolean>(true)

const formGenerateRef = ref<FormProps>(null)

setTimeout(() => {
    formConfigJson.value = JSON.stringify(mockData)
    loadingFlag.value = false
}, 500)

const formItems = [
    {
        prop: 'name',
        label: 'Input',
        span: 12,
        required: true,
        defaultValue: 'Tiga',
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'name2',
        label: 'Input',
        span: 12,
        rules: [
            {
                required: true,
                message: 'name2 是必填项'
            },
            {
                validator: 'funcation() { console.log(\'arguments == \', arguments)}'
            }
        ],
        defaultValue: 'Tiga',
        controlConfig: {
            type: 'input'
        }
    },
    {
        prop: 'sex1',
        label: 'Select',
        span: 12,
        defaultValue: 'm',
        controlConfig: {
            type: 'select',
            options: [
                { label: '男', value: 'm' },
                { label: '女', value: 'f' },
                { label: '中', value: 'z' }
            ]
        }
    },
    {
        prop: 'selectMValue',
        label: 'SelectMultiple',
        span: 12,
        defaultValue: 'm',
        controlConfig: {
            type: 'select',
            options: [
                { label: '男', value: 'm' },
                { label: '女', value: 'f' },
                { label: '中', value: 'z' }
            ],
            props: {
                multiple: true,
                onChange:
                    'function(val) { console.log(val);  const formConfig = arguments[arguments.length - 1]; console.log(`%c formConfig === `, \'color: #67c23a;\', formConfig) }'
            }
        }
    },
    {
        prop: 'radio',
        label: 'Radio',
        span: 12,
        defaultValue: 'm',
        controlConfig: {
            type: 'radio',
            options: [
                { label: '男', value: 'm' },
                { label: '女', value: 'f' },
                { label: '中', value: 'z' }
            ]
        }
    },
    {
        prop: 'radio',
        label: 'Radio',
        span: 12,
        defaultValue: 'm',
        controlConfig: {
            type: 'radioButton',
            options: [
                { label: '男', value: 'm' },
                { label: '女', value: 'f' },
                { label: '中', value: 'z' }
            ]
        }
    }
]

console.log(`%c formItems JSON ==== `, 'color: yellow;', JSON.stringify(formItems))

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
            formGenerateRef.value.model['name'] = 'qwer'
        }
    }
]
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
}

h2 {
    margin: 30px 0 20px;

    &:nth-of-type(1) {
        margin-top: 0;
    }
}
</style>
