<template>
    <svg aria-hidden="true" class="custom-svg-icon" :style="{ color: color }">
        <use :xlink:href="symbolId" />
    </svg>
</template>

<script lang="ts">
export default {
    name: 'SvgIcon'
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'

const props = defineProps({
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
})

const symbolId = computed(() => `#${props.prefix}-${props.name}`)
</script>
<style lang="scss" scoped>
.custom-svg-icon {
    width: 1em;
    height: 1em;
    vertical-align: top;
}
</style>
<style lang="scss">
svg path {
    fill: currentColor !important;
}
</style>
