<template>
    <svg aria-hidden="true" :class="['custom-svg-icon', { 'custom-color': customColor }]">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script lang="ts">
export default {
    name: 'SvgIcon'
}
</script>

<script lang="ts" setup>
import { computed, onMounted } from 'vue'

const props = withDefaults(
    defineProps<{
        name: string
        /**
         * 生成的 svg 前缀
         */
        prefix?: string
        /**
         * 本地 svg 存在固有设计样式颜色，需要保留
         * 因此，需要主动开启自定义颜色
         */
        customColor?: boolean
    }>(),
    {
        name: '',
        prefix: 'custom-icon',
        customColor: false
    }
)

const symbolId = computed<string>(() => `#${props.prefix}-${props.name}`)

/**
 * 插件将 svg 抽离，挂载到了 body 下面
 * 注意：生成的组件是全局统一的，也就是说，只会生成这一个，svg 就这一个
 */
onMounted(() => {
    const currentSymbol = document.querySelector(symbolId.value)
    if (currentSymbol && props.customColor) {
        currentSymbol.classList.add('svg-icon-custom-color')
    }
})
</script>
<style lang="scss" scoped>
.custom-svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: top;
}
</style>
<style lang="scss"></style>
