<template>
    <div class="examples-base-wrapper">
        <g-upload
            v-model="fileIds"
            v-model:fileList="fileList"
            action="/api/kinso-basic-open-server/v1/document/file/upload"
            list-type="picture-card"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'UploadPictureCard'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive } from 'vue'
import source from './data/fileList.json'

const fileIds = ref<string[]>([])
const fileList = ref<any[]>(
    source.map((item) => {
        return {
            name: item.fileRName,
            url: item.filePath,
            ...item
        }
    })
)

watch(
    () => fileIds.value,
    (list) => {
        console.log(`%c fileIds == `, 'color: #67c23a;', fileIds.value)
    }
)

watch(
    () => fileList.value,
    (list) => {
        console.log(
            `%c fileList onChanges *************************************** `,
            'color: #67c23a;',
            list
        )
    }
)
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
