<template>
    <div :data-unit="unit" class="g-figure-input">
        <!-- 负责搜集数据的框 -->
        <LGAdvanceInput
            v-show="!showInputShow"
            v-model:el-input-ref="gatherFigureInputRef"
            v-model="gatherFigureInputVal"
            v-bind="$attrs"
            @blur="gatherFigureInputControlBlur"
        />

        <!-- 展示的框 -->
        <LGAdvanceInput
            v-show="showInputShow"
            v-model:el-input-ref="showFigureInputRef"
            v-model="showFigureInputVal"
            v-bind="$attrs"
            @focus="showFigureInputControlFocus"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GFigureInput',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { nextTick, ref, computed, watch } from 'vue'
import { FigureInputProps } from '../GForm'
import { clearNoNum, getNumUnit } from '@jsjn/utils'
import { ElInput as ElInputCom } from 'element-plus'
import LGAdvanceInput from '../GForm/component/GAdvanceInput/core.vue'

const props = withDefaults(
    defineProps<{
        /**
         * 双向绑定的值
         */
        modelValue: string | number
        /**
         * 展示格式化
         */
        format?: FigureInputProps['format']
        /**
         * 搜集值格式化（会直接影响到用户的输入行为）
         */
        valueFormat?: FigureInputProps['valueFormat']
        /**
         * 显示单位提示
         */
        showUnitTip?: boolean
    }>(),
    {
        format: null,
        valueFormat: null,
        showUnitTip: true
    }
)

const emits = defineEmits(['update:modelValue', 'tableEditHide'])

// 展示 input 显示 flag
const showInputShow = ref<boolean>(true)
// 搜集框 ref
const gatherFigureInputRef = ref<InstanceType<typeof ElInputCom> | null>(null)
// 展示框 ref
const showFigureInputRef = ref<InstanceType<typeof ElInputCom> | null>(null)
// 单位
const unit = computed(() => (props.showUnitTip ? getNumUnit(props.modelValue as number) : ''))

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

<style lang="scss" scoped>
.g-figure-input {
    position: relative;
    width: 100%;
    display: flex;

    &::after {
        content: attr(data-unit);
        position: absolute;
        font-size: 10px;
        right: 10px;
        bottom: calc(-1 * var(--jn-ve-g-form-item-margin-b));
        height: var(--jn-ve-g-form-item-margin-b);
        overflow: hidden;
        display: flex;
        align-items: center;
        z-index: 999;
        color: var(--el-color-info-light-3);
    }
}
</style>
<style lang="scss">
.g-table-root {
    .g-figure-input::after {
        display: none;
    }
}
</style>
