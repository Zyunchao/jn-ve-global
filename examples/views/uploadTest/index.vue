<template>
    <div class="examples-base-wrapper upload-demo-wrapper">
        <h3>图片预览：</h3>
        <g-form :config="formConfig" />

        <h3>文字列表：</h3>
        <g-form :config="formConfigText" />

        <h3>卡片式列表：</h3>
        <g-form :config="formConfigPicture" />

        <h3>照片墙：</h3>
        <g-form :config="formConfigPictureCard" />
    </div>
</template>

<script lang="ts" setup>
import { watch, reactive, toRefs, ref } from 'vue'
import { FormProps } from '@component/index'
import ErCodeImg from '@/assets/images/jn-er-code.png'

// 图片预览
let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        uploadDemo: ''
    },
    formItems: [
        {
            prop: 'uploadDemo',
            label: '上传文件',
            span: 12,
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/api/kinso-basic-open-server/v1/document/image/upload',
                    accept: 'image/*',
                    size: 2,
                    drag: false,
                    listType: 'picture-card',
                    name: 'file',
                    showFileList: false,
                    imgUrl: '',
                    onSuccess(res) {
                        console.log(`%c this == `, 'color: #67c23a;', this)

                        this.imgUrl = ErCodeImg

                        console.log(`%c this == `, 'color: #67c23a;', this)

                        console.log(`%c onSuccess res === `, 'color: #e6a23c;', res)
                    }
                }
            }
        }
    ]
})

// 文件列表
let formConfigText = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        uploadDemo: ''
    },
    formItems: [
        {
            prop: 'uploadDemo',
            label: '上传文件',
            span: 12,
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/api/kinso-basic-open-server/v1/document/image/upload',
                    accept: 'image/*',
                    size: 2,
                    drag: false,
                    name: 'file'
                }
            }
        }
    ]
})

// 卡片列表
let formConfigPicture = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        uploadDemo: ''
    },
    formItems: [
        {
            prop: 'uploadDemo',
            label: '上传文件',
            span: 12,
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/api/kinso-basic-open-server/v1/document/image/upload',
                    accept: 'image/*',
                    size: 2,
                    drag: false,
                    name: 'file',
                    listType: 'picture'
                }
            }
        }
    ]
})

// 照片墙
let formConfigPictureCard = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        uploadDemo: ''
    },
    formItems: [
        {
            prop: 'uploadDemo',
            label: '上传文件',
            span: 12,
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/api/kinso-basic-open-server/v1/document/image/upload',
                    accept: 'image/*',
                    size: 2,
                    drag: false,
                    name: 'file',
                    listType: 'picture-card'
                }
            }
        }
    ]
})

watch(
    () => formConfig.value,
    (model) => {
        console.log(`%c 表单 model === `, 'color: #67c23a;', model)
    },
    {
        deep: true
    }
)
</script>

<style lang="scss" scoped></style>
