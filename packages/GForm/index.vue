<template>
    <el-form
        v-if="config && refreshLoad"
        ref="localInstance"
        class="g-form"
        v-bind="formRootConfigs"
    >
        <!-- 栅格 row -->
        <el-row :gutter="localConfig.gutter ?? 20">
            <template v-for="item in localConfig.formItems" :key="item.prop">
                <!-- 栅格 col -->
                <el-col v-if="!item.hide" :span="item.span ?? 6">
                    <el-form-item
                        :class="{ 'no-colon': localConfig.colon === false }"
                        v-bind="getFormItemConfigs(item)"
                        :label-width="
                            item.label
                                ? item.labelWidth
                                    ? item.labelWidth
                                    : localConfig.labelWidth
                                        ? localConfig.labelWidth
                                        : 'auto'
                                : '0px'
                        "
                    >
                        <!-- 自定义 label -->
                        <template v-if="item.label" #label>
                            <span v-if="typeof item.label === 'string'">
                                {{ item.label }}
                            </span>

                            <!-- tsx -->
                            <FunctionalComponent
                                v-if="typeof item.label === 'function'"
                                :render="item.label()"
                            />
                        </template>

                        <!-- 优先级1：自定义 Render 控件 -->
                        <template v-if="item.render">
                            <FunctionalComponent
                                :render="item.render(toRef(localConfig.model, item.prop))"
                            />
                        </template>

                        <!-- 优先级2：配置式控件（组） -->
                        <template v-else-if="item.controlConfigs && item.controlConfigs.length > 0">
                            <FormItemControlGroup
                                :form-item-config="item"
                                :control-configs="item.controlConfigs"
                                :prop="toRef(localConfig.model, item.prop)"
                            />
                        </template>

                        <!-- 优先级3：配置式控件（单） -->
                        <template v-else-if="item.controlConfig">
                            <FormItemControl
                                :form-item-config="item"
                                :control-config="item.controlConfig"
                                :prop="toRef(localConfig.model, item.prop)"
                            />
                        </template>
                    </el-form-item>
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
import { watch, PropType, ref, toRef, nextTick, computed, isReactive } from 'vue'
import { FormProps, FormItemProps, FormInstance } from './index'
import FunctionalComponent from '../FunctionalComponent'
import FormItemControl from './component/formItemControl.vue'
import FormItemControlGroup from './component/formItemControlGroup.vue'

const props = withDefaults(
    defineProps<{
        config: FormProps
    }>(),
    {
        config: () => null
    }
)

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

// 获取 formItem 的配置（二级配置）
const getFormItemConfigs = (item: FormItemProps) => {
    const { label, span, hide, group, render, controlConfigs, controlConfig, ...formItemConfigs } =
        item
    return formItemConfigs
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
