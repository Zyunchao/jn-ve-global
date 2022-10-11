<template>
    <div class="examples-base-wrapper">
        <div class="form-wrapper">
            <el-scrollbar>
                <g-form :config="formConfig" />
            </el-scrollbar>
        </div>
        <g-button-group :btns="btns" />
    </div>
</template>

<script lang="ts" setup name="LowcodePlatform">
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import useFormConfig from './components/useFormConfig'
import { BtnProps } from '@component/index'

const { formConfig } = useFormConfig()
const btns = reactive<BtnProps[]>([
    {
        label: '校验',
        onClick() {
            formConfig.instance.validate()
        }
    },
    {
        label: '重置',
        onClick() {
            formConfig.instance.resetFields()
        }
    }
])
</script>

<style lang="scss" scoped>
.form-wrapper {
    height: calc(100% - 40px);

    :deep(.el-scrollbar__view) {
        padding-right: 20px;
    }
}

.examples-base-wrapper {
    .g-button-group {
        text-align: center;
    }
}
</style>
