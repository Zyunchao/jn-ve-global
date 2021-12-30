<template>
    <el-button class="debounce-button" type="primary" v-bind="$attrs" @click="handleDebounce">
        <slot />
    </el-button>
</template>

<script lang="ts">
export default {
    name: 'GDButton'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import _ from 'lodash'

interface Props {
    /**
     * 是否开启防抖
     */
    debounce?: boolean
    /**
     * 延迟时间
     */
    wait?: number
    /**
     * 事件处理函数
     */
    onClick?: Function
}

const props = withDefaults(defineProps<Props>(), {
    debounce: true,
    wait: 1000,
    onClick: null
})

const handleDebounce = computed(() => {
    if (!props.onClick) return null
    if (!props.debounce) return props.onClick
    return _.debounce(props.onClick as any, props.wait, {
        leading: true,
        trailing: false
    })
})
</script>

<style lang="scss" scoped></style>
