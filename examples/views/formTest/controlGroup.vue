<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
        <g-button-group :btns="btns" />
    </div>
</template>

<script lang="tsx" setup>
import { reactive, watch, ref } from 'vue'
import { FormProps, BtnProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        name: '',
        money: []
    },
    formItems: [
        {
            prop: 'money',
            label: '金额范围',
            span: 24,
            rules: [],
            controlConfigs: [
                {
                    type: 'input',
                    after: '至'
                },
                {
                    type: 'inputNumber',
                    after: '~'
                },
                {
                    type: 'select',
                    after: '~',
                    options: [
                        { label: '双龙大道', value: 's' },
                        { label: '天隆寺', value: 't' },
                        { label: '南京南', value: 'n' }
                    ]
                },
                {
                    type: 'figureInput',
                    after: '~',
                    props: {
                        placeholder: '保留两位小数',
                        format: (val) => {
                            return val ? ((val as number) - 0).toFixed(2) : val
                        }
                    }
                },
                {
                    type: 'figureInput',
                    after: '~',
                    props: {
                        placeholder: '千分位',
                        format: (val) => {
                            return toThousands(val) || val
                        }
                    }
                },
                {
                    type: 'figureInput',
                    after: '~',
                    props: {
                        placeholder: '至多输入两位小数',
                        format: (val) => {
                            return val
                        },
                        valueFormat: (val) => {
                            return restrictDecimals(val as string, 2)
                        }
                    }
                }
            ]
        },
        {
            prop: 'name',
            label: '姓名',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})

watch(
    () => formConfig.value.model,
    (model) => {
        console.log(`%c 业务组件 model onChange === `, 'color: #67c23a;', model)
    },
    {
        deep: true
    }
)

const btns = reactive<BtnProps[]>([
    {
        label: '获取数据',
        type: 'primary',
        onClick() {
            formConfig.value.instance.validate().then((res) => {
                console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)
            })
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.value.instance?.resetFields()
        }
    }
])
</script>

<style lang="scss" scoped>
h1 {
    margin: 20px 0;
}

.box {
    display: flex;
    span {
        width: 100px;
        text-align: right;
        line-height: 40px;
        padding-right: 20px;
    }
}
</style>
