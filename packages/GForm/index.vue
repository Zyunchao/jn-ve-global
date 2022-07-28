<template>
    <el-form
        v-if="config && refreshLoad"
        ref="localInstance"
        class="g-form"
        v-bind="formRootConfigs"
    >
        <el-row :gutter="localConfig.gutter ?? 20">
            <template v-for="item in localConfig.formItems" :key="item.prop">
                <el-col v-if="!item.hide" v-bind="getElColConfigs(item)">
                    <!-- 增强的 form-item -->
                    <LGFormItem :form-config="localConfig" :form-item-config="item" />
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>
<script lang="ts">
export default {
    name: 'GForm'
}
</script>

<script lang="ts" setup>
import { watch, provide, ref, toRef, nextTick, computed } from 'vue'
import { FormProps, FormItemProps, FormInstance } from './index'
import LGFormItem from './component/GFormItem/index.vue'
import formConfigProvideKey from './constant/formConfigProvideKey'

interface Props {
    config: FormProps
}

const props = withDefaults(defineProps<Props>(), {
    config: () => null
})

provide(formConfigProvideKey, toRef(props, 'config'))

const localInstance = ref<FormInstance | null>(null)
const refreshLoad = ref(true)
const localConfig = ref<FormProps>(props.config)

/**
 * 惰性监听（只在后续改变时执行）
 * props config 与本地建立关联
 * 总的来说，props.config 必须是一个 Proxy
 */
watch(
    () => props.config,
    (config) => {
        // 配置对象发生变化 RefInstance 需要重建
        refreshLoad.value = false
        nextTick(() => {
            refreshLoad.value = true
        })

        localConfig.value = config
    }
)

// 监听实例的变化，抛出
watch(
    () => localInstance.value,
    (instance) => {
        instance && (localConfig.value.instance = instance)
    }
)

/**
 * 获取 form 配置（一级配置）
 * 抛出自定义配置，剩余的即为 elemen-plus 原生配置
 */
const formRootConfigs = computed(() => {
    const { instance, formItems, gutter, colon, ...formConfigs } = props.config
    return formConfigs
})

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

<style lang="scss" scoped>
@import './styles';
</style>
