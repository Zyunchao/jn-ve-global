<template>
    <!-- 柱 或 线 -->
    <BarOrLine
        v-if="chartType.includes('bar') || chartType.includes('line')"
        :config="config"
        v-bind="$attrs"
    />
</template>

<script lang="ts">
export default {
    name: 'GChart'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, PropType, toRef } from 'vue'
import ChartConfig from './interface/ChartConfig'
import BarOrLine from './component/barOrLine.vue'

const props = defineProps({
    config: {
        type: Object as PropType<ChartConfig>,
        default: null
    }
})

const chartType = computed(() => props.config.type)
</script>

<style lang="scss" scoped></style>
