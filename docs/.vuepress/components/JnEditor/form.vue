<template>
    <g-form :config="formConfig" />
</template>

<script lang="ts">
export default {
    name: 'EditorForm'
}
</script>

<script lang="ts" setup>
import { reactive } from 'vue'
import { FormProps } from '@component/index'

const formConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '80px',
    model: {
        name: '',
        html: ''
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
            prop: 'html',
            label: '富文本',
            span: 24,
            controlConfig: {
                type: 'jnEditor',
                props: {
                    // disabled: true,
                    onSetup(editor) {
                        console.log(`%c 表单集成 setup run......`, 'color: pink;', +new Date())
                    },
                    onInit() {
                        console.log(`%c 表单集成 init run......`, 'color: pink;', +new Date())
                    },
                    onInitInstanceCallback(editor) {
                        console.log(
                            `%c 表单集成 initInstanceCallback run......`,
                            'color: pink;',
                            +new Date()
                        )
                    },
                    onChange(e) {
                        console.log(`%c 表单集成 onChange == `, 'color: pink;', e)
                    },
                    onInput(e) {
                        console.log(`%c 表单集成 input == `, 'color: pink;', e)
                    },
                    onUndo(e) {
                        console.log(`%c 表单集成 onUndo == `, 'color: pink;', e)
                    },
                    onRedo(e) {
                        console.log(`%c 表单集成 onRedo == `, 'color: pink;', e)
                    }
                }
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
