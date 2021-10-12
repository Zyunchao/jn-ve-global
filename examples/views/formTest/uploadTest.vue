<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'UploadTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps } from '@component/index'

const formConfig = reactive<FormProps>({
    instance: null,
    model: {
        imageUrl: '',
        fileUrl: ''
    },
    formItems: [
        {
            prop: 'imageUrl',
            label: '图片',
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/upload',
                    accept: 'image/*'
                }
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
