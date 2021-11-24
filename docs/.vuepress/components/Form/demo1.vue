<template>
    <div class="wrapper">
        <g-form :config="formConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FormDemo1'
}
</script>

<script lang="tsx" setup>
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { FormProps } from 'jn-ve-global/packages/GForm'
import { FormProps } from '@component/GForm'
import { reactive } from 'vue'
import treeData from './data/treeData.json'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

/**
 * 基本表单数据模型都要发生变化的，所以在生成对象时，要定义成响应式对象
 */
let formConfig = reactive<FormProps>({
    /**
     * 第一层：配置 Form 组件
     * 请参考：https://element-plus.gitee.io/#/zh-CN/component/form#form-attributes
     * > Form Attributes
     *
     * 一些扩展的属性请参考源码 interface
     */
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    /**
     * model 是控件双向绑定数据的依赖对象，其里面的字段是自定义的
     * 也是发送给后台的参数列表
     *
     * 在 FormItems 的配置中，prop 需要制定 model 中的某一个字段，才能实现数据的绑定
     */
    model: {
        input: '',
        select: '',
        radio: 'f',
        switch: '2',
        time1: new Date(),
        time2: '09:00',
        date1: new Date(),
        date2: new Date(),
        color: '#ff3040',
        food: ['0', '2'],
        food2: ['1', '3'],
        rate: 3,
        slider: 50,
        selectTreeActive: '1425374958969872386',
        selectTreeActiveM: ['1425374667260223489'],
        icon: '',
        money: ''
    },
    /**
     * formItems 是第二层配置
     * 其是一个对象数组，每一个 item 的配置属性，请参考 Element-plus > Form > Form-Item Attributes
     */
    formItems: [
        {
            prop: 'input',
            label: 'Input',
            span: 24,
            /**
             * controlConfig 是第三层配置，用来配置每一个 item 的实际控件的
             * 其必填属性为 type，用来告诉组件应该生成哪种控件
             */
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'select',
            label: 'Select',
            span: 24,
            /**
             * 不同的控件存在不同的配置
             * 一般来说，存在待选列表的，如：select、radio 都会有一个 options 来代表待选列表
             * 具体的扩展属性，不明确的请参考源码内的 interface
             *
             * 而每个控件都会有一个通用的 props 属性，属性字段请参考各 Element-plus 组件对应的属性列表
             */
            controlConfig: {
                type: 'select',
                options: [
                    { label: '全部', value: '0' },
                    { label: '正常', value: '1' },
                    { label: '禁用', value: '2' }
                ],
                props: {
                    onChange: (value) => {
                        console.log(`%c value === `, 'color: #e6a23c;', value)
                    }
                }
            }
        },
        {
            prop: 'radio',
            label: 'Radio',
            span: 24,
            controlConfig: {
                type: 'radio',
                options: [
                    { label: '男', value: 'm' },
                    { label: '女', value: 'f' }
                ]
            }
        },
        {
            prop: 'radio',
            label: 'RadioButton',
            span: 24,
            controlConfig: {
                type: 'radioButton',
                options: [
                    { label: '男', value: 'm' },
                    { label: '女', value: 'f' }
                ]
            }
        },
        {
            prop: 'switch',
            label: 'Switch',
            span: 24,
            controlConfig: {
                type: 'switch',
                props: {
                    activeText: '是',
                    inactiveText: '否',
                    activeValue: '1',
                    inactiveValue: '2'
                }
            }
        },
        {
            prop: 'time1',
            label: 'TimePicker',
            span: 24,
            controlConfig: {
                type: 'timePicker',
                props: {}
            }
        },
        {
            prop: 'time2',
            label: 'TimeSelect',
            span: 24,
            controlConfig: {
                type: 'timeSelect'
            }
        },
        {
            prop: 'date1',
            label: 'DatePicker',
            span: 24,
            controlConfig: {
                type: 'datePicker',
                props: {
                    type: 'datetime'
                }
            }
        },
        {
            prop: 'color',
            label: 'ColorPicker',
            span: 24,
            controlConfig: {
                type: 'colorPicker'
            }
        },
        {
            prop: 'food',
            label: 'CheckBox',
            span: 24,
            controlConfig: {
                type: 'checkBox',
                options: [
                    { label: '肯德基', value: '0' },
                    { label: '麦当劳', value: '1' },
                    { label: '必胜客', value: '2' },
                    { label: '华莱士', value: '3' }
                ]
            }
        },
        {
            prop: 'food2',
            label: 'CheckBoxButton',
            span: 24,
            controlConfig: {
                type: 'checkBoxButton',
                options: [
                    { label: '青椒肉丝', value: '0' },
                    { label: '豆角焖面', value: '1' },
                    { label: '夫妻肺片', value: '2' },
                    { label: '地三鲜', value: '3' }
                ]
            }
        },
        {
            prop: 'rate',
            label: 'Rate',
            span: 24,
            controlConfig: {
                type: 'rate',
                props: {
                    max: 10
                }
            }
        },
        {
            prop: 'slider',
            label: 'Slider',
            span: 24,
            controlConfig: {
                type: 'slider',
                props: {
                    showStops: true,
                    step: 10
                }
            }
        },
        {
            prop: 'selectTreeActive',
            label: 'SelectTree',
            span: 24,
            controlConfig: {
                type: 'selectTree',
                treeData: treeData
            }
        },
        {
            prop: 'selectTreeActiveM',
            label: 'SelectTreeMultiple',
            span: 24,
            controlConfig: {
                type: 'selectTree',
                treeData: treeData,
                props: {
                    multiple: true
                }
            }
        },
        // {
        //     prop: 'icon',
        //     label: 'IconPicker',
        //     span: 24,
        //     controlConfig: {
        //         type: 'iconPicker'
        //     }
        // },
        // -----------------↓ FigureInput 样例 ↓-----------------------------------------------------------------------------
        {
            prop: 'money',
            span: 24,
            render(prop) {
                return <h4 class='data-box'>FigureInput 样例：</h4>
            }
        },
        {
            prop: 'money',
            label: '收集的数据',
            span: 24,
            render(prop) {
                return <h4 class='data-box'>{prop.value}</h4>
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
        // -----------------↑ FigureInput 样例 ↑-----------------------------------------------------------------------------
    ]
})
</script>

<style lang="scss" scoped>
.wrapper {
    width: 700px;

    :deep(.data-box) {
        margin: 0;
        line-height: 40px;
    }
}
</style>
