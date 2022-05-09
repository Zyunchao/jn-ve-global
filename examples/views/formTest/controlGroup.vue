<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
        <g-button-group :btns="btns" />
    </div>
</template>

<script lang="tsx" setup>
import { reactive, watch, ref, toRef, watchEffect } from 'vue'
import { FormProps, BtnProps } from '@component/index'
import treeData from '../selectTreeTest/data.json'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'
import { v4 as uuidv4 } from 'uuid'

let formConfig1 = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        name: '2222',
        group: ['33qwer', 0],
        group2: [],
        selectM: []
    },
    formItems: [
        {
            prop: 'group',
            label: '金额范围',
            span: 24,
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
        },
        {
            prop: 'selectM',
            label: '性别',
            span: 12,
            controlConfig: {
                type: 'select',
                options: [
                    {
                        label: '男',
                        value: 'm'
                    },
                    {
                        label: '女',
                        value: 'f'
                    }
                ],
                props: {
                    multiple: true
                }
            }
        }
    ]
})

let formConfig2 = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        name: '',
        group: [],
        selectM: []
    },
    formItems: [
        {
            prop: 'name',
            label: '姓名2',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'selectM',
            label: '性别2',
            span: 12,
            controlConfig: {
                type: 'select',
                options: [
                    {
                        label: '男',
                        value: 'm'
                    },
                    {
                        label: '女',
                        value: 'f'
                    }
                ],
                props: {
                    multiple: true
                }
            }
        }
    ]
})

let formConfig = ref<FormProps>(formConfig1)

const flag = ref<boolean>(false)

watch(
    () => flag.value,
    (val) => {
        formConfig.value = val ? formConfig2 : formConfig1
    }
)

let arr = reactive<any[]>([])

let index1 = toRef(arr, 1)
let index2 = toRef(arr, 2)

const btns = reactive<BtnProps[]>([
    {
        label: '获取数据',
        type: 'primary',
        onClick() {
            formConfig.value.instance.validate().then((res) => {
                console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)

                console.log(
                    `%c group ==== `,
                    'color: #67c23a;',
                    JSON.stringify(formConfig.value.model.group)
                )
            })
        }
    },
    {
        label: '数据回填',
        type: 'primary',
        onClick() {
            // formConfig1.model = {
            //     name: '3333',
            //     group: ['33qwer', 99],
            //     group2: [],
            //     selectM: []
            // }

            formConfig.value.model.name = 'qwer'
            formConfig.value.model.group[1] = 999
            console.log(`%c formConfig1.model == `, 'color: #67c23a;', formConfig1.model)
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.value.instance?.resetFields()
            // formConfig.model.group = []
        }
    },
    {
        label: '切换表单',
        type: 'success',
        onClick() {
            flag.value = !flag.value
        }
    },
    {
        label: '数据测试-修改数据',
        type: 'default',
        onClick() {
            index1.value = +new Date()
            index2.value = uuidv4()

            console.log(`%c index1 === `, 'color: #f56c6c;', index1, index1.value)
            console.log(`%c index2 === `, 'color: #f56c6c;', index2.value)
        }
    },
    {
        label: '数据测试-断开链接',
        type: 'default',
        onClick() {
            arr = reactive([])
        }
    },
    {
        label: '获取测试数据',
        type: 'default',
        onClick() {
            console.log(`%c arr === `, 'color: #67c23a;', arr)
            console.log(`%c index1 === `, 'color: #f56c6c;', index1.value)
            console.log(`%c index2 === `, 'color: #f56c6c;', index2.value)

            console.group(`%c ObjectRefImpl`, 'color: skyblue;')
            console.log(`%c index1 === `, 'color: #f56c6c;', index1)
            console.log(`%c index2 === `, 'color: #f56c6c;', index2)
            console.groupEnd()
        }
    },
    {
        label: '建立链接',
        type: 'default',
        onClick() {
            index1 = toRef(arr, 1)
            index2 = toRef(arr, 2)
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
