<template>
    <div class="examples-base-wrapper">
        <g-button-group :btns="btns" />
        <br>

        <div class="editor-wrapper">
            <jn-editor
                v-if="!isDestroy"
                ref="jnEditorRef"
                v-model="html"
                :disabled="editDisabled"
                :upload-url="uploadUrl"
                :download-url="downloadUrl"
                :config="cunstomConfig"
                @setup="editSetupHandle"
                @initInstanceCallback="initInstanceCallback"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'JnEditorDemo'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { TinyMCE, BtnProps, TabPaneProps } from '@component/index'

const prefix = '/api'

const jnEditorRef = ref<any>(null)

const html = ref<string>('')
const isDestroy = ref<boolean>(false)
const editDisabled = ref<boolean>(false)

const uploadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/upload`
const downloadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/download`

// 追加功能
const cunstomConfig = {
    toolbar: 'template mybtns',
    plugins: 'template',
    templates: [
        { 'title': 'Some title 1', 'description': '这是一个测试模板', 'content': '<h1>这是一个测试模板</h1>' },
        { 'title': 'Some title 2', 'description': 'Some desc 2', 'content': 'development.html' }
    ]
}

const btns = computed<BtnProps[]>(() => [
    {
        label: !isDestroy.value ? '销毁' : '创建',
        type: !isDestroy.value ? 'danger' : 'success',
        onClick() {
            isDestroy.value = !isDestroy.value
        }
    },
    {
        label: !editDisabled.value ? '禁用' : '解禁',
        type: !editDisabled.value ? 'danger' : 'success',
        onClick() {
            editDisabled.value = !editDisabled.value
        }
    },
    {
        label: '获取 edit 实例',
        onClick() {
            console.log(`%c jnEditorRef === `, 'color: #67c23a;', jnEditorRef.value)
        }
    }
])

watch(
    () => html.value,
    (val) => {
        console.log(`%c 编辑器内容 ==== `, 'color: yellow;', val)
    }
)

// 指定将在 TinyMCE 编辑器实例呈现之前执行的回调
const editSetupHandle = (editor) => {
    console.log(
        `%c 1. 在 TinyMCE 编辑器实例呈现之前执行的回调 === `,
        'color: #f56c6c;',
        +new Date()
    )

    editor.ui.registry.addButton('mybtns', {
        text: '新增模版变量',
        onAction: function () {
            console.log(`%c 新增模版变量 == `, 'color: #67c23a;')
        }
    })
}

// 指定每次初始化编辑器实例时要执行的函数
const initInstanceCallback = (editor) => {
    console.log(`%c 2. 每次初始化编辑器实例时要执行的函数 === `, 'color: #f56c6c;', +new Date())
}
</script>

<style lang="scss" scoped>
.editor-wrapper {
    height: calc(100% - 100px);
}
</style>
