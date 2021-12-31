<template>
    <div ref="chartBoxRef" class="g-chart-basic" />
</template>

<script lang="ts">
export default {
    name: 'GChartBasic',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { ref, onMounted, onUnmounted, PropType, watch } from 'vue'
import * as echarts from 'echarts'
import { ECharts, EChartsOption } from 'echarts'

const props = defineProps({
    option: {
        type: Object as PropType<EChartsOption>,
        required: true,
        default: () => ({})
    }
})

const emits = defineEmits(['getChartInstance'])

const chartBoxRef = ref<HTMLElement>(null)
const chartInstance = ref<ECharts>(null)

onMounted(() => {
    const cI = echarts.init(chartBoxRef.value)
    cI.setOption(props.option)
    chartInstance.value = cI

    // 抛出 echarts 实例
    emits('getChartInstance', cI)
})

onUnmounted(() => {
    chartInstance.value?.dispose()
})
</script>

<style lang="scss" scoped>
.g-chart-basic {
    width: 100%;
    height: 100%;
}
</style>
