<template>
    <el-col
        v-if="formItemConfig && !formItemConfig.hide"
        :class="[
            'design-item-box',
            'form-item-col',
            {
                [`${formItemConfig.class}-col`]: formItemConfig.class
            }
        ]"
        v-bind="getElColConfigs(formItemConfig)"
    >
        <LGFormItem v-bind="props" />
    </el-col>
</template>

<script lang="ts" setup name="GColFormItem">
import { FormItemProps, FormProps } from '../../index'
import LGFormItem from '../GFormItem/index.vue'

const props = withDefaults(
    defineProps<{
        /**
         * 表单 item 配置参数
         */
        formItemConfig: FormItemProps
        /**
         * 表单配置对象
         */
        formConfig: FormProps
    }>(),
    {
        formItemConfig: null,
        formConfig: null
    }
)

// el col 的配置：响应式布局 || span 布局
const getElColConfigs = (item: FormItemProps) => {
    const baseConfig = {
        offset: item.offset ?? 0
    }

    const spanConfig = {
        ...baseConfig,
        span: item.span ?? 6
    }

    const bootstrapConfig = {
        ...baseConfig,
        xs: item.xs ?? 24,
        sm: item.sm ?? 12,
        md: item.md ?? 12,
        lg: item.lg ?? 8,
        xl: item.xl ?? 8
    }

    if (item.span) return spanConfig
    if (item.xs || item.sm || item.md || item.lg || item.xl) return bootstrapConfig
    return spanConfig
}
</script>

<style lang="scss" scoped></style>
