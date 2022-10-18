<template>
    <el-row :gutter="formConfig?.gutter ?? 20" class="form-item-row">
        <slot />
    </el-row>
</template>

<script lang="ts" setup name="GFormRow">
import type { FormProps } from '../../index'

const props = withDefaults(
    defineProps<{
        formConfig?: FormProps
    }>(),
    {
        formConfig: null
    }
)
</script>

<style lang="scss" scoped>
.form-item-row {
    &.is-collapse-layout {
        padding: 10px 20px 14px;
    }
}
</style>
