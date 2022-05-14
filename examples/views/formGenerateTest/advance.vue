<template>
    <g-form :config="formConfig" />
    <g-button-group :btns="btns" />
</template>

<script lang="ts">
export default {
    name: 'FormGenerateAdvanceTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, BtnProps, FormGenerateProps } from '@component/index'
import mockData from './data/mock.json'
import AdvanceFormConfig from '@component/GFormGenerate/implements/AdvanceFormConfig'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

const formConfigJson = ref<string>('')
const loadingFlag = ref<boolean>(true)

const formConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '100px',
    model: {
        weight: '',
        address: []
    },
    formItems: [
        {
            prop: 'weight',
            label: '体重',
            span: 24,
            controlConfig: {
                type: 'figureInput',
                props: {
                    format: (val) => {
                        return toThousands(val)
                    },
                    onInput() {
                        advanceFormConfig.previewEventsHandle.division(
                            'weight',
                            'name',
                            'name2',
                            'sumRes'
                        )
                    }
                }
            }
        },
        {
            prop: 'address',
            label: '地址',
            span: 24,
            controlConfig: {
                type: 'address'
            }
        }
    ]
})

const advanceFormConfig = new AdvanceFormConfig({
    formConfigRef: formConfig as FormGenerateProps
})

const btns: BtnProps[] = [
    {
        label: '追加配置数据',
        type: 'default',
        onClick() {
            advanceFormConfig.parseJson(JSON.stringify(mockData))
        }
    },
    {
        label: '获取数据',
        type: 'default',
        onClick() {
            console.log(`%c model === `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '校验',
        type: 'default',
        onClick() {
            formConfig.instance.validate()
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.instance.resetFields()
        }
    },
    {
        label: '回填',
        type: 'default',
        onClick() {
            formConfig.model['name'] = 'qwer'
        }
    },
    {
        label: '预设事件处理函数',
        type: 'default',
        onClick() {
            // formConfig.model['name'] = 'qwer'
            advanceFormConfig.previewEventsHandle.sub('weight', 'name', 'name2', 'sumRes')
        }
    }
]
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
}
</style>
