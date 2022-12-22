<template>
    <el-collapse
        v-bind="$attrs"
        :disabled="localDisabled"
        :class="['custom-collapse', `${mode}-mode`]"
    >
        <slot />
    </el-collapse>
</template>

<script lang="ts">
export default {
    name: 'GCollapse'
}
</script>
<script lang="ts" setup>
import { computed, provide } from 'vue'
import disabledKey from './constant/disabledKey'
import modeKey from './constant/modeKey'

const props = withDefaults(
    defineProps<{
        /**
         * 模式
         *  - card 卡片
         *  - panel 面板
         */
        mode?: 'card' | 'panel'
        /**
         * 禁用下属所有节点
         */
        disabled?: boolean
    }>(),
    {
        mode: 'panel',
        disabled: undefined
    }
)

const localDisabled = computed(() => (props.mode === 'card' ? true : props.disabled))
const localMode = computed(() => props.mode)
provide(disabledKey, localDisabled)
provide(modeKey, localMode)
</script>
<style lang="scss" scoped>
.custom-collapse {
    border: none !important;
}
</style>
