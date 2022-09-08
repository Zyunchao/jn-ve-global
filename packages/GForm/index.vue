<template>
    <el-form
        v-if="config && refreshLoad"
        ref="localInstance"
        class="g-form"
        v-bind="formRootConfigs"
    >
        <!-- 
            提供默认插槽
            - 可以自定义表单内容的渲染
            - 配合拖拽平台
         -->
        <slot :form-items="localConfig.formItems">
            <el-row :gutter="localConfig.gutter ?? 20">
                <template v-for="item in localConfig.formItems" :key="item.prop">
                    <el-col
                        v-if="!item.hide"
                        :class="`${item.class + ' ' || ''}form-item-col`"
                        v-bind="getElColConfigs(item)"
                    >
                        <!-- 增强的 form-item -->
                        <LGFormItem :form-config="localConfig" :form-item-config="item" />
                    </el-col>
                </template>
            </el-row>
        </slot>
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
import _ from 'lodash'
import { assignOwnProp } from '@/utils/utils'

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
// 缓存初始（创建前）的 model
const modelCache = ref<FormProps['model']>(_.cloneDeep(props.config.model))

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
        modelCache.value = _.cloneDeep(config.model)
    }
)

/**
 * 监听实例的变化
 *  - 抛出
 *  - 扩展方法：initModel、init
 */
watch(
    () => localInstance.value,
    (instance) => {
        if (instance) {
            instance['initModel'] = () => {
                assignOwnProp(localConfig.value.model, modelCache.value)
            }

            instance['init'] = function () {
                this.initModel()
                nextTick(() => {
                    this.resetFields()
                })
            }

            localConfig.value.instance = instance
        }
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
