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
import { FormProps, BtnProps, FormGenerateProps, RadioControlConfig } from '@component/index'
import mockData from './data/mock.json'
import AdvanceFormConfig from '@component/GFormGenerate/implements/AdvanceFormConfig'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

const formConfigJson = ref<string>('')
const loadingFlag = ref<boolean>(true)

const formConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '150px',
    model: {
        weight: '',
        select: '',
        checkBox: [],
        radio: '',
        selectTreeV2: ''
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
                        advanceFormConfig.previewEventsHandle.sum(
                            'weight',
                            'name',
                            'sumRes'
                        )
                    }
                }
            }
        },
        {
            prop: 'select',
            label: 'Select',
            span: 24,
            controlConfig: {
                type: 'select',
                options: [],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/listForChanage',
                mapOptionsCb: (data) => {
                    return data.map((item) => ({
                        label: item.name,
                        value: item.id
                    }))
                }
            }
        },
        {
            prop: 'checkBox',
            label: 'CheckBox',
            span: 12,
            controlConfig: {
                type: 'checkBox',
                options: [
                    {
                        label: '第一宇宙',
                        value: '1'
                    },
                    {
                        label: '第六宇宙',
                        value: '6'
                    },
                    {
                        label: '第七宇宙',
                        value: '7'
                    }
                ],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/listForChanage'
            }
        },
        {
            prop: 'checkBox',
            label: 'CheckBoxButton',
            span: 12,
            controlConfig: {
                type: 'checkBoxButton',
                options: [
                    {
                        label: '第一宇宙',
                        value: '1'
                    },
                    {
                        label: '第六宇宙',
                        value: '6'
                    },
                    {
                        label: '第七宇宙',
                        value: '7'
                    }
                ],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/listForChanage'
            }
        },
        {
            prop: 'radio',
            label: 'Radio',
            span: 12,
            controlConfig: {
                type: 'radio',
                options: [
                    {
                        label: '第一宇宙',
                        value: '1'
                    },
                    {
                        label: '第六宇宙',
                        value: '6'
                    },
                    {
                        label: '第七宇宙',
                        value: '7'
                    }
                ],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/listForChanage'
            }
        },
        {
            prop: 'radio',
            label: 'RadioButton',
            span: 12,
            controlConfig: {
                type: 'radioButton',
                options: [
                    {
                        label: '第一宇宙',
                        value: '1'
                    },
                    {
                        label: '第六宇宙',
                        value: '6'
                    },
                    {
                        label: '第七宇宙',
                        value: '7'
                    }
                ],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/listForChanage',
                mapOptionsCb: (data) => {
                    return []
                }
            }
        },
        {
            prop: 'selectTreeV2',
            label: 'selectTreeV2',
            span: 12,
            controlConfig: {
                type: 'selectTreeV2',
                treeData: [
                    {
                        id: '1',
                        label: '第一宇宙',
                        name: '第一宇宙',
                        value: '1',
                        children: []
                    },
                    {
                        id: '6',
                        label: '第六宇宙',
                        name: '第六宇宙',
                        value: '6',
                        children: []
                    },
                    {
                        id: '7',
                        label: '第七宇宙',
                        name: '第七宇宙',
                        value: '7',
                        children: []
                    }
                ],
                getOptionsUrl:
                    '/api/kinso-basic-resources-server/v1/iam-institution-info/institutionChildTreeList'
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
    },
    {
        label: '改变请求地址',
        type: 'default',
        onClick() {
            ;(
                formConfig.formItems.find((item) => item.prop === 'radio')
                    .controlConfig as RadioControlConfig
            ).getOptionsUrl =
                '/api/kinso-basic-resources-server/v1/iam-institution-info/institutionChildTreeList'
        }
    }
]
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
}
</style>
