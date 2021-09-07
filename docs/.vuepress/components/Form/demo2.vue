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
// import { FormProps } from 'jn-ve-global/packages/GForm
import { FormProps } from '@component/GForm'
import { reactive } from 'vue'

let formConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        name: '',
        status: ''
    },
    formItems: [
        {
            prop: 'name',
            label: '姓名',
            span: 24,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'status',
            label: '状态',
            span: 24,
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
            prop: 'opretion-btns',
            span: 24,
            /**
             * Form 组件内部预定义了几个特殊的 class
             * 比如：
             *      content-left：内容居左
             *      content-right：内容居右
             *      content-center：内容居中
             *      no-margin-b：消除 form-item 的下外边距
             */
            class: 'content-center no-margin-b',
            render() {
                return (
                    <>
                        <el-button onClick={onReset}>重置</el-button>
                        <el-button type='primary' onClick={onSubmit}>
                            提交
                        </el-button>
                    </>
                )
            }
        }
    ]
})

function onReset() {
    formConfig.instance.resetFields()
}

function onSubmit() {
    formConfig.instance.validate().then(() => {
        const params = { ...formConfig.model }

        console.log(`%c 校验通过.....`, 'color: #e6a23c;', params)
    })
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 700px;
}
</style>
