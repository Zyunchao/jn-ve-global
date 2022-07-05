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
                mode="inline"
                @setup="editSetupHandle"
                @initInstanceCallback="initInstanceCallback"
            />
            <!-- <MyTinyEditor v-if="!isDestroy" v-model="html" /> -->
        </div>
    </div>

    <g-modal v-model="modalShow" title="富文本测试弹框">
        <g-tabs v-model="activeName" :list="tabList" />

        <keep-alive>
            <BaseEditor v-if="activeName === 'BaseEditor'" v-model="htmlBase" />
        </keep-alive>
    </g-modal>
</template>

<script lang="ts">
export default {
    name: 'JnEditorDemo'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { TinyMCE, BtnProps, TabPaneProps } from '@component/index'
import MyTinyEditor from './Tinymce.vue'
import { JnEditor } from '@component/register'
import { JnEditor as BaseEditor, JnEditor as UserEditor } from '@component/register'
// import { JnEditor } from '@component/register'

const prefix = '/api'

const jnEditorRef = ref<any>(null)

const html = ref<string>('<h1>Hello Tiny!</h1>')
const isDestroy = ref<boolean>(false)
const modalShow = ref<boolean>(false)
const editMode = ref<string>('inline')
const editDisabled = ref<boolean>(false)
const uploadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/upload`

const btns = computed<BtnProps[]>(() => [
    {
        label: !isDestroy.value ? '销毁' : '创建',
        type: !isDestroy.value ? 'danger' : 'success',
        onClick() {
            isDestroy.value = !isDestroy.value
        }
    },
    {
        label: '打开弹框',
        type: 'primary',
        onClick() {
            modalShow.value = true
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

const activeName = ref<string>('BaseEditor')
const htmlBase = ref<string>('BaseEditor')
const htmlUser = ref<string>('UserEditor')
const tabList: TabPaneProps[] = [
    {
        label: '基本信息',
        value: 'BaseEditor'
    },
    {
        label: '用户信息',
        value: 'UserEditor'
    },
    {
        label: '角色信息',
        value: 'Role'
    }
]

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
