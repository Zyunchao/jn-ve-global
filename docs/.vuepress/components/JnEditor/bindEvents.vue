<template>
    <jn-editor
        ref="editorRef"
        v-model="html"
        @setup="onSetup"
        @init="onInit"
        @initInstanceCallback="onInitInstanceCallback"
        @change="onChange"
        @input="onInput"
        @undo="onUndo"
        @redo="onRedo"
    />
</template>

<script lang="ts">
export default {
    name: 'BindEvents'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
/**
 * 实际开发中，请使用如下引用
 * import { Editor as TinyMCEEditor } from '@component/index'
 */
import { Editor as TinyMCEEditor, EditorEvent } from '@component/index'

const html = ref<string>('<h1>Hello Tiny!</h1>')
const editorRef = ref<any>(null)

watch(
    () => editorRef.value,
    (instance) => {
        /**
         * 绑定事件方式 1
         */
        instance.currentEditor.on('focus', (e: EditorEvent<any>) => {
            console.log(`%c 编辑器获取焦点 at ******** `, 'color: #409eff;', +new Date())
        })
    }
)

const onSetup = (editor: TinyMCEEditor) => {
    console.log(`%c JnEditor onSetup run at ******** `, 'color: #67c23a;', +new Date())

    /**
     * 绑定事件方式 2
     */
    editor.on('blur', (e: EditorEvent<any>) => {
        console.log(`%c 编辑器失去焦点 at ******** `, 'color: red;', +new Date())
    })
}

const onInit = (e: EditorEvent<any>) => {
    console.log(`%c JnEditor onInit run at ******** `, 'color: #67c23a;', +new Date())
}

const onInitInstanceCallback = (editor: TinyMCEEditor) => {
    console.log(
        `%c JnEditor onInitInstanceCallback run at ******** `,
        'color: #67c23a;',
        +new Date()
    )
}

const onChange = (e: EditorEvent<any>) => {
    console.log(`%c JnEditor onChange run at ******** `, 'color: #67c23a;', +new Date())
}

const onInput = (e: EditorEvent<any>) => {
    console.log(`%c JnEditor onInput run at ******** `, 'color: #67c23a;', +new Date())
}

const onUndo = (e: EditorEvent<any>) => {
    console.log(`%c JnEditor onUndo run at ******** `, 'color: #67c23a;', +new Date())
}

const onRedo = (e: EditorEvent<any>) => {
    console.log(`%c JnEditor onRedo run at ******** `, 'color: #67c23a;', +new Date())
}
</script>

<style lang="scss" scoped></style>
