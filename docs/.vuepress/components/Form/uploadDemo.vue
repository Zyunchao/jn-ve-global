<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />
    </div>
</template>

<script lang="ts" setup>
import { watch, reactive, toRefs, ref } from 'vue'
import { FormProps } from '@component/index'
import ErCodeImg from '@/assets/images/jn-er-code.png'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    model: {
        avatar: '',
        uploadDemo: ''
    },
    formItems: [
        {
            prop: 'avatar',
            label: '图片预览',
            span: 24,
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
                    /**
                     * 在 listType === 'picture-card' 的情况下，上传触发器会自动变成卡片形式，默认情况下会显示为上传文件的回显列表
                     * 但是上传头像只需要一个回显框即可，所以需要将 showFileList 置为 false，关闭 upload 的默认行为
                     * 在以上基础之上，要手动创建 img 用于回显
                     */
                    imgUrl: '',
                    onSuccess(res) {
                        /**
                         * 测试图片赋值，实际应该将后台返回的 图片资源 赋值给imgUrl
                         */
                        this.imgUrl = ErCodeImg
                    },
                    onError(err) {
                        /**
                         * 测试图片赋值，实际应该将后台返回的 图片资源 赋值给imgUrl
                         */
                        this.imgUrl = ErCodeImg
                    }
                }
            }
        },
        {
            prop: 'uploadDemo',
            label: '文字列表',
            span: 24,
            controlConfig: {
                type: 'upload',
                props: {
                    action: '/api/kinso-basic-open-server/v1/document/image/upload',
                    accept: '*',
                    size: 2,
                    drag: false,
                    name: 'file'
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
