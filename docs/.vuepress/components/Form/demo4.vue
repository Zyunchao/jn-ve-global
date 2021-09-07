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
    rules: {
        name: [{ required: true, message: '姓名是必填项', trigger: 'blur' }],
        status: [
            { required: true, message: '状态是必选项', trigger: 'change' },
            {
                validator(_, val) {
                    if (val !== '1') return new Error('只能选择正常')
                    return true
                }
            }
        ]
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
