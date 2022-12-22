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
            <!-- 默认表单项 || 不被 Collapse 控制的表单项 -->
            <LGFormRow
                v-if="baseFormItems.length"
                :form-config="(localConfig as FormProps)"
                :class="{ 'is-collapse-layout': isCollapseLayout }"
            >
                <template v-for="(item, index) in baseFormItems" :key="`${item.prop}-${index}`">
                    <LGColFormItem
                        :form-config="(localConfig as FormProps)"
                        :form-item-config="(item as FormItemProps)"
                    />
                </template>
            </LGFormRow>

            <!-- Collapse 布局容器 -->
            <LGCollapse
                v-if="isCollapseLayout"
                v-model="activeCollapses"
                :mode="localConfig.collapseMode"
            >
                <template
                    v-for="(collapseItem, index) in collapseItems"
                    :key="`${collapseItem.title}-${index}`"
                >
                    <LGCollapseItem
                        :title="collapseItem.title"
                        :name="collapseItem.name"
                        :disabled="collapseItem.disabled"
                        :prefix="collapseItem.prefix"
                        :btns="collapseItem.btns"
                        :class="{
                            'form-item-classify': true,
                            'is-tail': collapseItem.isTail
                        }"
                    >
                        <LGFormRow :form-config="(localConfig as FormProps)">
                            <template
                                v-for="(item, index) in collapseItem.content"
                                :key="`${item.prop}-${index}`"
                            >
                                <LGColFormItem
                                    :form-config="(localConfig as FormProps)"
                                    :form-item-config="item"
                                />
                            </template>
                        </LGFormRow>
                    </LGCollapseItem>
                </template>
            </LGCollapse>
        </slot>
    </el-form>
</template>
<script lang="ts">
export default {
    name: 'GForm'
}
</script>

<script lang="ts" setup>
import { watch, provide, ref, toRef, nextTick, computed, Ref } from 'vue'
import type { FormProps, FormInstance, FormItemProps } from './index'
import formConfigProvideKey from './constant/formConfigProvideKey'
import _ from 'lodash'
import { assignOwnProp, advanceSerialize } from '@jsjn/utils'
// 本地组件
import LGFormRow from './component/GFormRow/index.vue'
import LGColFormItem from './component/GColFormItem/index.vue'
import LGCollapse from '../GCollapse/index.vue'
import LGCollapseItem from '../GCollapse/component/GCollapseItem/index.vue'
import useCollapseLayout from './mixins/useCollapseLayout'

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
const modelCache = ref<FormProps['model']>(_.cloneDeep(props.config?.model))
// 用户主动缓存
const userCache = ref<FormProps['model']>(null)

const { isCollapseLayout, collapseItems, activeCollapses, baseFormItems } = useCollapseLayout(props)

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
 *  - 扩展方法：initModel、init、cacheModel、isChangeByCache
 */
watch(
    () => localInstance.value,
    (instance) => {
        if (instance) {
            advanceInstance(instance)
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

// 增强表单实例，添加方法
function advanceInstance(instance: FormInstance) {
    instance['initModel'] = () => {
        assignOwnProp(localConfig.value.model, modelCache.value)
    }

    instance['init'] = function () {
        this.initModel()
        nextTick(() => {
            this.resetFields()
        })
    }

    instance['cacheModel'] = () => {
        userCache.value = _.cloneDeep(localConfig.value.model)
    }

    instance['isChangeByCache'] = () => {
        if (!userCache.value) {
            console.log(`%c 未主动缓存，不予比对`, 'color: #f56c6c;')
            return false
        }
        const cacheStr = advanceSerialize.stringify(userCache.value)
        const currentModelStr = advanceSerialize.stringify(localConfig.value.model)
        return !(cacheStr === currentModelStr)
    }
}
</script>

<style lang="scss" scoped>
@import './styles';
</style>
