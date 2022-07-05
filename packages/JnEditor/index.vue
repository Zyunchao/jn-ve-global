<template>
    <div class="jn-editor-wrapper">
        <tinymceDom ref="elementRef" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'JnEditor'
}
</script>

<script lang="ts" setup>
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
    modelValue: string
    config?: RawEditorSettings
    mode?: 'classic' | 'inline' | 'distraction-free'
    id?: string
    tagName?: string
    disabled?: boolean
    uploadUrl?: string
}

const props = withDefaults(defineProps<JnEditorProps>(), {
    modelValue: '<h1>Hello Tiny!</h1>',
    mode: 'classic',
    id: '',
    tagName: 'div',
    disabled: false,
    uploadUrl: '',
    config: () => ({})
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
const { element: tinymceDom, elementRef } = getDom(props, elementId.value)

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
