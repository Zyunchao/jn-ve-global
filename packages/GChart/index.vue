<template>
    <!-- 柱 或 线 -->
    <BarOrLine
        v-if="chartType.includes('bar') || chartType.includes('line')"
        :config="config"
        v-bind="$attrs"
    />

    <!-- 饼图 -->
    <Pie v-if="chartType.includes('pie')" :config="config" v-bind="$attrs" />
</template>

<script lang="ts">
export default {
    name: 'GChart'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, PropType, toRef, provide } from 'vue'
import ChartConfig from './interface/ChartConfig'
import BarOrLine from './component/barOrLine.vue'
import Pie from './component/pie.vue'
import { ECharts } from 'echarts'
import { chartInstanceKey } from './constant/chartInstanceKey'

const props = defineProps({
    config: {
        type: Object as PropType<ChartConfig>,
        default: null
    }
})

// 向下抛出 echarts 实例容器
const chartInstance = ref<ECharts>(null)
provide(chartInstanceKey, chartInstance)

const chartType = computed(() => props.config.type)

// 抛出
defineExpose({
    chartInstance
})
</script>

<style lang="scss" scoped></style>
