<template>
    <div class="examples-base-wrapper">
        <g-upload
            v-model="fileIds"
            :img-url="imgUrl"
            action="/api/kinso-basic-open-server/v1/document/file/upload"
            list-type="avatar"
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

const fileId = ref<string>('')
const imgUrl =
    'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.bq233.com%2Fkanqq%2Fpic%2Fupload%2F2018%2F0807%2F1533622762937587.jpg&refer=http%3A%2F%2Fimg.bq233.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1640700014&t=27fb75fefe05dd1c7f50a3f0683cbd58'

watch(
    () => fileId.value,
    (list) => {
        console.log(`%c fileIds == `, 'color: #67c23a;', fileId.value)
    }
)
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
