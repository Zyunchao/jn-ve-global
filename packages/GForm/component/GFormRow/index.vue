<template>
    <el-row :gutter="formConfig?.gutter ?? 20">
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

<style lang="scss" scoped></style>
