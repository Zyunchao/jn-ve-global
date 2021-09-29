<template>
    <g-form :config="formConfig" />
</template>

<script lang="ts">
import { watch, reactive, toRefs, ref } from 'vue'
import { FormProps } from '@component/index'
export default {
    name: 'UplaodTest',
    setup() {
        let formConfig = ref<FormProps>({
            instance: null,
            labelPosition: 'right',
            labelWidth: '180px',
            model: {
                uploadDemo: null
            },
            formItems: [
                {
                    prop: 'uploadDemo',
                    label: '上传文件',
                    span: 12,
                    controlConfig: {
                        type: 'upload',
                        props: {
                            action: 'https://jsonplaceholder.typicode.com/posts/',
                            accept: 'image/*',
                            size: 3,
                            listType: 'picture',
                            onChange(file, fileList) {}
                        }
                    }
                }
            ]
        })

        return {
            formConfig
        }
    }
}
</script>

<style lang="scss" scoped></style>
