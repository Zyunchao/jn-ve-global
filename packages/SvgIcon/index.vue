<template>
    <svg aria-hidden="true" class="custom-svg-icon" :style="{ color: color }">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script>
import { defineComponent, computed } from 'vue'

export default defineComponent({
    name: 'SvgIcon',
    props: {
        prefix: {
            type: String,
            default: 'custom-icon'
        },
        name: {
            type: String,
            required: true
        },
        color: {
            type: String,
            default: '#333'
        }
    },
    setup(props) {
        const symbolId = computed(() => `#${props.prefix}-${props.name}`)
        return { symbolId }
    }
})
</script>
<style lang='scss' scoped>
.custom-svg-icon {
    width: 1em;
    height: 1em;
    // vertical-align: middle;
}
</style>
<style lang="scss">
svg path {
    fill: currentColor !important;
}
</style>