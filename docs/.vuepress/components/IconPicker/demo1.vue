<template>
    <g-icon-picker v-model="selectedIcon" />
</template>

<script lang="ts">
export default {
    name: 'IconPicker'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const selectedIcon = ref<string>('')

watch(
    () => selectedIcon.value,
    (icon) => {
        console.log(`%c 所选 icon == `, 'color: #67c23a;', icon)
    }
)
</script>

<style lang="scss" scoped></style>
