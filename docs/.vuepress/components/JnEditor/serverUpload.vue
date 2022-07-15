<template>
    <jn-editor v-model="html" :upload-url="uploadUrl" :download-url="downloadUrl" />
</template>

<script lang="ts">
export default {
    name: 'ServerUploadTest'
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'

// 假设前缀，实际需要使用：import prefix from '@/api/prefix'
const prefix = '/api'

const html = ref<string>('')
const uploadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/upload`
const downloadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/download`

watch(
    () => html.value,
    (val) => {
        console.log(`%c 编辑器内容 ==== `, 'color: yellow;', val)
    }
)
</script>

<style lang="scss" scoped></style>
