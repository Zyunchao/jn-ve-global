<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />

        <g-button-group :btns="btns" />

        <h1>GFigureInput</h1>
        <div class="box">
            <span>金额：</span>

            <GFigureInput
                v-model="figureVal"
                clearable
                prefix="el-EditPen"
                prepend="el-EditPen"
                :format="figureInputFormat"
                :value-format="figureInputValueFormat"
                placeholder="请输入...."
            />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { reactive, watch, ref } from 'vue'
import { FormProps, BtnProps, InputControlConfig } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { toThousands, restrictDecimals } from '@jsjn/utils'

let formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    // disabled: true,
    model: {
        money: ''
    },
    formItems: [
        {
            prop: 'money',
            label: '输入',
            span: 24,
            controlConfig: {
                type: 'input',
                props: {
                    append: 'el-EditPen',
                    suffix: 'el-ChatLineRound'
                }
            }
        },
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
                    },
                    append: 'el-EditPen',
                    suffix: 'el-ChatLineRound'
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

const btns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c model == `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '重置',
        onClick() {
            formConfig.instance?.resetFields()
        }
    },
    {
        label: '添加 input 尾部图标',
        onClick() {
            if (!(formConfig.formItems[0].controlConfig as InputControlConfig).props['suffix']) {
                ;(formConfig.formItems[0].controlConfig as InputControlConfig).props['suffix'] =
                    'el-EditPen'
            } else {
                ;(formConfig.formItems[0].controlConfig as InputControlConfig).props['suffix'] =
                    undefined
            }
        }
    },
    {
        label: '禁用',
        onClick() {
            formConfig.disabled = !formConfig.disabled
        }
    }
]

// --------------------------- 测试单个 figureInput
const figureVal = ref<number>(123456)

const figureInputFormat = (val) => {
    return toThousands(val)
}

const figureInputValueFormat = (val) => {
    // return restrictDecimals(val as string, 4)
    return val
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
