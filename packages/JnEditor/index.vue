<template>
    <div class="jn-editor-wrapper">
        <TinymceDom ref="elementRef" />
    </div>
</template>

<script lang="ts" setup name="JnEditor">
import {
    shallowRef,
    ref,
    computed,
    onMounted,
    onBeforeUnmount,
    watch,
    onActivated,
    onDeactivated
} from 'vue'
import { TinyMCE, Editor as TinyMCEEditor, RawEditorSettings } from './interface/tinymce'
import { getTinymce } from './constant/TinyMCE'
import { v4 as uuidv4 } from 'uuid'
import getDom from './mixins/dom'
import initCurrentTiny from './mixins/initTiny'

interface JnEditorProps {
    /**
     * 双向绑定的值
     */
    modelValue: string
    /**
     * TinyMCE 的配置
     */
    config?: RawEditorSettings
    /**
     * 模式
     */
    mode?: 'classic' | 'inline' | 'distraction-free'
    /**
     * dom Id
     */
    id?: string
    /**
     * 内联模式下，标签的名字
     */
    tagName?: string
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 上传文件的 url
     */
    uploadUrl?: string
    /**
     * 下载、展示的 url
     */
    downloadUrl?: string
    /**
     * 内容限制大小，单位：M
     */
    maxSize?: number
    /**
     * 开启图片压缩，会失帧
     * 默认开启
     */
    compress?: boolean
    /**
     * 压缩率
     */
    compressRatio?: number
}

const props = withDefaults(defineProps<JnEditorProps>(), {
    modelValue: '<h1>Hello Tiny!</h1>',
    mode: 'classic',
    id: '',
    tagName: 'div',
    disabled: false,
    uploadUrl: '',
    downloadUrl: '',
    maxSize: 100,
    config: () => ({}),
    compress: true,
    compressRatio: 0.2
})

const emits = defineEmits([
    'update:modelValue',
    'initInstanceCallback',
    'setup',
    'init',
    'change',
    'input',
    'undo',
    'redo'
])

// 静态常量
const tinymceRoot = getTinymce()
const elementId = computed(() => `${props.id}-${uuidv4()}` || uuidv4())
// 核心变量
const currentEditor = shallowRef<TinyMCEEditor | null>(null)
const editorMounted = ref<boolean>(false)
// dom 节点
const { element: TinymceDom, elementRef } = getDom(props, elementId.value)

const init = () => initCurrentTiny(elementId.value, props, emits, currentEditor, editorMounted)
onMounted(init)

// 监听 disabled 禁用
watch(
    () => props.disabled,
    (disable) => {
        if (currentEditor.value !== null) {
            if (typeof currentEditor.value.mode?.set === 'function') {
                currentEditor.value.mode.set(disable ? 'readonly' : 'design')
            } else {
                currentEditor.value.setMode(disable ? 'readonly' : 'design')
            }
        }
    }
)

// 缓存 keep-alive
if (props.mode === 'classic') {
    onActivated(() => {
        if (!editorMounted.value) init()
    })
    onDeactivated(() => {
        editorMounted.value = false
        getTinymce()?.remove(currentEditor.value)
    })
}

// 销毁移除当前创建的实例
onBeforeUnmount(() => {
    if (tinymceRoot === null) return
    tinymceRoot.remove(currentEditor.value)
})

defineExpose({
    tinymceRoot,
    elementId,
    currentEditor,
    editorMounted
})
</script>

<style lang="scss" scoped>
.jn-editor-wrapper {
    height: 100%;
}
</style>
<style>
.tox.tox-tinymce.tox-fullscreen {
    z-index: 99999999;
}
</style>
