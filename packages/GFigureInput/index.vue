<template>
    <!-- 负责搜集数据的框 -->
    <el-input
        v-show="!showInputShow"
        ref="gatherFigureInputRef"
        v-model="gatherFigureInputVal"
        v-bind="$attrs"
        @blur="gatherFigureInputControlBlur"
    />
    <!-- 展示的框 -->
    <el-input
        v-show="showInputShow"
        ref="showFigureInputRef"
        v-model="showFigureInputVal"
        v-bind="$attrs"
        @focus="showFigureInputControlFocus"
    />
</template>

<script lang="ts">
export default {
    name: 'GFigureInput',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { nextTick, ref, computed, PropType } from 'vue'
import { FigureInputProps } from '../GForm'
import { clearNoNum } from './utils'

const props = defineProps({
    /**
     * 双向绑定的值
     */
    modelValue: [String, Number],
    /**
     * 展示格式化
     */
    format: {
        type: Function as PropType<FigureInputProps['format']>,
        default: null
    },
    /**
     * 搜集值格式化（会直接影响到用户的输入行为）
     */
    valueFormat: {
        type: Function as PropType<FigureInputProps['valueFormat']>,
        default: null
    }
})

const emits = defineEmits(['update:modelValue', 'tableEditHide'])

// 展示 input 显示 flag
const showInputShow = ref<boolean>(true)
// 搜集框 ref
const gatherFigureInputRef = ref(null)
// 展示框 ref
const showFigureInputRef = ref(null)

// 搜集数据输入框绑定值，主要做限制数字
const gatherFigureInputVal = computed({
    get: () => props.modelValue,
    set: (val) => {
        // 限制只能输入整数 or 小数
        emits('update:modelValue', clearNoNum(val as string))

        // 将限制处理过的数据传递给用户的 valueFormat
        if (props.valueFormat) {
            nextTick(() => {
                emits('update:modelValue', props.valueFormat(props.modelValue))
            })
        }
    }
})

// 展示输入框绑定的值
const showFigureInputVal = computed(() => {
    if (props.format) {
        return props.format(gatherFigureInputVal.value as string)
    }

    // 原展示
    return gatherFigureInputVal.value
})

/**
 * 展示框获取焦点，隐藏展示框
 * 显示数据收集框，并使其获取焦点
 */
const showFigureInputControlFocus = () => {
    showInputShow.value = false
    nextTick(() => {
        gatherFigureInputRef.value.focus()
    })
}

/**
 * 搜集数据框失去焦点，显示展示框
 */
const gatherFigureInputControlBlur = () => {
    emits('tableEditHide')
    showInputShow.value = true
}

/**
 * 抛出
 * focus：消除差异
 */
defineExpose({
    focus: () => {
        if (showInputShow.value) {
            showFigureInputRef.value.focus()
        } else {
            gatherFigureInputRef.value.focus()
        }
    }
})
</script>

<style lang="scss" scoped></style>
