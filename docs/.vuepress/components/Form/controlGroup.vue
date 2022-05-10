<template>
    <g-form :config="formConfig" />
    <el-button type="primary" style="margin-left: 160px;" @click="getData">
        获取数据
    </el-button>
    <el-button type="primary" @click="resetForm">
        重置
    </el-button>
</template>

<script lang="tsx" setup>
import { reactive, watch, ref } from 'vue'
import { FormProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '160px',
    model: {
        money: ['', '', '', '']
    },
    formItems: [
        {
            prop: 'money',
            label: '超级组合',
            span: 24,
            controlConfigs: [
                {
                    type: 'input',
                    after: '至'
                },
                {
                    type: 'figureInput',
                    after: '~'
                },
                {
                    type: 'figureInput',
                    after: '-'
                },
                {
                    type: 'select',
                    after: '-',
                    options: [
                        { label: '双龙大道', value: 's' },
                        { label: '天隆寺', value: 't' },
                        { label: '南京南', value: 'n' }
                    ]
                }
            ]
        }
    ]
})

watch(
    () => formConfig.value.model,
    (model) => {
        console.log(`%c model onChange === `, 'color: #67c23a;', model)
    },
    {
        deep: true
    }
)

const getData = () => {
    console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)
}

const resetForm = () => {
    formConfig.value.instance?.resetFields()
}
</script>

<style lang="scss" scoped></style>
