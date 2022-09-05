<template>
    <!-- 正常的 -->
    <el-input
        v-if="(!inputDisabled || !exceedBoxWidth) && !reload"
        ref="elInputRef"
        v-model.trim="localPropRef"
        v-bind="localInputProps"
        @focus="emits('controlFocus')"
        @blur="emits('controlBlur')"
    >
        <!-- input 插槽
                - 组件（VNode/JSX.Element）
                - 组件库内图标（ali-/el-/jg-）
                - 文本
         -->
        <template v-for="(slot, key) in inputSlots" :key="key" #[key]>
            <component :is="slot" v-if="typeof slot !== 'string'" />
            <LGIcon v-else-if="stringIsIcon(slot)" :icon="slot" />
            <span v-else>{{ slot }}</span>
        </template>
    </el-input>

    <!-- 禁用 && 超长的 -->
    <template v-if="inputDisabled && exceedBoxWidth">
        <el-tooltip :content="localPropRef" placement="top-start">
            <el-input :model-value="localPropRef" v-bind="localInputProps">
                <template v-for="(slot, key) in inputSlots" :key="key" #[key]>
                    <component :is="slot" v-if="typeof slot !== 'string'" />
                    <LGIcon v-else-if="stringIsIcon(slot)" :icon="slot" />
                    <span v-else>{{ slot }}</span>
                </template>
            </el-input>
        </el-tooltip>
    </template>
</template>

<script lang="ts">
export default {
    name: 'AdvanceInput',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { ref, computed, Ref, watch, nextTick, reactive } from 'vue'
import type { InputControlConfig } from '../index'
import addInputDisabledTooltip from '../mixins/inputDisabledTooltip'
import LGIcon from '../../GIcon/index.vue'
import getInputSlots from '../mixins/getInputSlots'

const props = defineProps<{
    /**
     * input 的配置对象（经上层处理）
     */
    inputProps: InputControlConfig['props']
    /**
     * 表单绑定的值
     */
    prop: Ref<string | number | boolean | object | Array<any>>
}>()

const emits = defineEmits(['controlFocus', 'controlBlur'])

const localPropRef = ref(props.prop)

/**
 * 再次处理 input 的配置对象
 *  - 排除插槽所占据的属性
 */
const localInputProps = computed<InputControlConfig['props']>(() => {
    const { prefix, suffix, prepend, append, ...inputProps } = props.inputProps
    return inputProps
})

/**
 * 获取有效的 slot 及主动重绘
 */
const { inputSlots, reload } = getInputSlots(props)

/**
 * input 禁用时，tooltip 处理
 *  - elInputRef：input 控件的 ref
 *  - inputDisabled：是否禁用
 *  - exceedBoxWidth：内容是否超出宽度
 */
const { elInputRef, inputDisabled, exceedBoxWidth } = addInputDisabledTooltip({
    propRef: localPropRef
})

/**
 * 探查字符串是否为组件库的图标
 */
const stringIsIcon = (str: string): boolean => {
    const iconPrefix = ['ali-', 'el-', 'jg-']
    const res = iconPrefix.some((item) => str.startsWith(item))
    return res
}
</script>

<style lang="scss" scoped></style>
