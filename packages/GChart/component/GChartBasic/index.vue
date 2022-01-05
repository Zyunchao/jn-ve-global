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
import ResizeObserver from 'resize-observer-polyfill'
import { ECharts, EChartsOption } from 'echarts'
import _ from 'lodash'

interface Props {
    option: EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    option: () => ({})
})

const emits = defineEmits(['getChartInstance'])

const chartBoxRef = ref<HTMLElement>(null)
const chartInstance = ref<ECharts>(null)
const ob = ref<ResizeObserver>(null)
const isFirstOB = ref<boolean>(true)

onMounted(() => {
    const cI = echarts.init(chartBoxRef.value)
    cI.setOption(props.option)
    chartInstance.value = cI

    // 抛出 echarts 实例
    emits('getChartInstance', cI)

    // 监听容器变化，进行图标的重绘
    const resizeObserver = new ResizeObserver(
        _.debounce((entries: ResizeObserverEntry[]) => {
            if (isFirstOB.value) {
                isFirstOB.value = false
                return
            }

            // cI.isDisposed 如果已销毁，返回 true，否则返回 undefined
            !cI.isDisposed() &&
                cI.resize({
                    animation: {
                        duration: 200
                    }
                })
        }, 500)
    )
    resizeObserver.observe(chartBoxRef.value)
    ob.value = resizeObserver
})

onUnmounted(() => {
    chartInstance.value?.dispose()
    chartBoxRef.value && ob.value && ob.value.unobserve(chartBoxRef.value)
})
</script>

<style lang="scss" scoped>
.g-chart-basic {
    width: 100%;
    height: 100%;
}
</style>
