<template>
    <div class="examples-base-wrapper">
        <el-button type="success" size="small" @click="updateFileList">
            更新列表
        </el-button>

        <g-upload
            v-model="fileIds"
            v-model:fileList="fileList"
            action="/api/kinso-basic-open-server/v1/document/file/upload"
            list-type="picture-card"
            :on-remove="onRemove"
        />

        <g-upload
            v-model="avatarId"
            :img-url="imgUrl"
            action="/api/kinso-basic-open-server/v1/document/file/upload"
            list-type="avatar"
            :on-remove="onRemove"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'FileList'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive } from 'vue'
import source from './fileList.json'

const fileIds = ref<string[]>([])
const fileList = ref<any[]>([])

// 头像
const avatarId = ref<string>('')
const imgUrl = ref('')

watch(
    () => avatarId.value,
    (avatarId) => {
        console.log(`%c avatarId == `, 'color: #f56c6c;', avatarId)
    }
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
    },
    {
        deep: true
    }
)

const updateFileList = () => {
    fileList.value = source.map((item) => {
        return {
            name: item.fileRName,
            url: item.filePath,
            ...item
        }
    })
}

const onPreview = (file) => {
    console.group(`%c onPreview`, 'color: #000;', +new Date())
    console.log(`%c file == `, 'color: #67c23a;', file)
    console.groupEnd()
}

const onProgress = (event, file, fileList) => {
    console.group(`%c onProgress`, 'color: #000;', +new Date())
    console.log(`%c event == `, 'color: #000;', event)
    console.log(`%c fileList == `, 'color: #f56c6c;', fileList)
    console.log(`%c file == `, 'color: #67c23a;', file)
    console.groupEnd()
}

const onError = (err, file, fileList) => {
    console.group(`%c onError`, 'color: red;', +new Date())
    console.log(`%c err == `, 'color: #f56c6c;', err)
    console.log(`%c fileList == `, 'color: #f56c6c;', fileList)
    console.log(`%c file == `, 'color: #67c23a;', file)
    console.groupEnd()
}

const onChange = (file, fileList) => {
    console.group(`%c onChange`, 'color: #000;', +new Date())
    console.log(`%c fileList == `, 'color: #f56c6c;', fileList)
    console.log(`%c file == `, 'color: #67c23a;', file)
    console.groupEnd()
}

const onSuccess = (response, file, fileList2) => {
    console.group(`%c onSuccess`, 'color: #000;')
    console.log(`%c response == `, 'color: #67c23a;', response)
    console.log(`%c fileList2 == `, 'color: #f56c6c;', fileList2)
    console.log(`%c file == `, 'color: #67c23a;', file)
    console.groupEnd()
}

const onRemove = (file, fileList) => {
    console.group(`%c onRemove`, 'color: #000;')
    console.log(`%c response == `, 'color: #67c23a;', file)
    console.log(`%c fileList2 == `, 'color: #f56c6c;', fileList)
    console.groupEnd()
}
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
