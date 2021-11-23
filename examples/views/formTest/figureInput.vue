<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
        <el-button type="primary" style="margin-left: 80px; margin-top: 20px" @click="getData">
            获取数据
        </el-button>
        <el-button type="primary" @click="resetForm">
            重置
        </el-button>

        <h1>GFigureInput</h1>
        <div class="box">
            <span>金额：</span>

            <GFigureInput
                v-model="figureVal"
                :format="figureInputFormat"
                :value-format="figureInputValueFormat"
                placeholder="请输入...."
            />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { reactive, watch, ref } from 'vue'
import { FormProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    disabled: true,
    model: {
        money: '1231'
    },
    formItems: [
        {
            prop: 'money',
            label: '收集的数据',
            render(prop) {
                return <h4>{prop.value}</h4>
            }
        },
        {
            prop: 'money',
            label: '千分位',
            span: 24,
            controlConfig: {
                type: 'figureInput',
                props: {
                    format: (val) => {
                        return toThousands(val)
                    }
                }
            }
        },
        {
            prop: 'money',
            label: '保留两位小数',
            span: 24,
            controlConfig: {
                type: 'figureInput',
                props: {
                    format: (val) => {
                        return val ? ((val as number) - 0).toFixed(2) : val
                    }
                }
            }
        },
        {
            prop: 'money',
            label: '保留四位小数',
            span: 24,
            controlConfig: {
                type: 'figureInput',
                props: {
                    format: (val) => {
                        return val ? ((val as number) - 0).toFixed(4) : val
                    }
                }
            }
        },
        {
            /**
             * 存储格式化
             */
            prop: 'money',
            label: '至多输入两位小数',
            span: 24,
            controlConfig: {
                type: 'figureInput',
                props: {
                    format: (val) => {
                        return val
                    },
                    valueFormat: (val) => {
                        return restrictDecimals(val as string, 2)
                    }
                }
            }
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

// --------------------------- 测试单个 figureInput
const figureVal = ref<number>(123456)

const figureInputFormat = (val) => {
    return toThousands(val)
}

const figureInputValueFormat = (val) => {
    return restrictDecimals(val as string, 4)
}

watch(
    () => figureVal.value,
    (val) => {
        console.log(`%c 单个 input val === `, 'color: #67c23a;', val)
    }
)
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
