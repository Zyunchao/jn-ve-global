<template>
    <InputCore
        v-show="!inputDisabled || !exceedBoxWidth"
        v-model.trim="localModelValue"
        v-model:el-input-ref="localInputRef"
        v-bind="$attrs"
    />

    <!-- 仅展示作用 -->
    <template v-if="inputDisabled && exceedBoxWidth">
        <el-tooltip :content="localModelValue" placement="top-start">
            <InputCore :model-value="localModelValue" v-bind="$attrs" />
        </el-tooltip>
    </template>
</template>

<script lang="ts">
export default {
    name: 'GAdvanceInput'
}
</script>

<script lang="ts" setup>
import { computed, watch } from 'vue'
import useInputDisabledTooltip from './mixins/useInputDisabledTooltip'
import InputCore from './core.vue'
import { ElInput as ElInputCom } from 'element-plus'

const props = withDefaults(
    defineProps<{
        elInputRef?: InstanceType<typeof ElInputCom> | null
        modelValue: string | number | any
    }>(),
    {
        modelValue: ''
    }
)

const emits = defineEmits(['update:modelValue', 'update:elInputRef'])

// 双向绑定的数据
const localModelValue = computed({
    get: () => props.modelValue,
    set(val) {
        emits('update:modelValue', val)
    }
})

/**
 * input 禁用时，tooltip 处理
 *  - elInputRef：input 控件的 ref
 *  - inputDisabled：是否禁用
 *  - exceedBoxWidth：内容是否超出宽度
 */
const {
    elInputRef: localInputRef,
    inputDisabled,
    exceedBoxWidth
} = useInputDisabledTooltip(localModelValue)

/**
 * 抛出 input 的 ref 引用
 */
watch(
    () => localInputRef.value,
    (instance) => {
        emits('update:elInputRef', instance)
    }
)
</script>

<style lang="scss" scoped></style>
