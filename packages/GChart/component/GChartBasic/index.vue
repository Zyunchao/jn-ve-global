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
import { ref, onMounted, onUnmounted, inject, nextTick, watch } from 'vue'
import * as echarts from 'echarts'
import ResizeObserver from 'resize-observer-polyfill'
import { ECharts, EChartsOption } from 'echarts'
import _ from 'lodash'
import { chartInstanceKey } from '../../constant/chartInstanceKey'

interface Props {
    option: EChartsOption
}

const props = withDefaults(defineProps<Props>(), {
    option: () => ({})
})

const emits = defineEmits(['getChartInstance'])

// 获取 GChart 的 echarts 实例容器
const parentChartInstanceWrap = inject(chartInstanceKey)

const chartBoxRef = ref<HTMLElement>(null)
const chartInstance = ref<ECharts>(null)
const ob = ref<ResizeObserver>(null)
const isFirstOB = ref<boolean>(true)

/**
 * 数据动态刷新
 * https://echarts.apache.org/zh/api.html#echartsInstance.setOption
 */
watch(
    () => props.option,
    _.debounce((option) => {
        if (chartInstance.value) {
            chartInstance.value.setOption(option)
        }
    }, 200),
    { deep: true }
)

onMounted(() => {
    nextTick(() => {
        const cI = echarts.init(chartBoxRef.value)
        cI.setOption(props.option)
        chartInstance.value = cI

        // 抛出 echarts 实例
        emits('getChartInstance', cI)

        /**
         * 如果是嵌套（封装好的图标）使用，通过 inject 获取容器（Ref）引用，然后将 echarts 实例包装到容器中
         */
        if (parentChartInstanceWrap) {
            parentChartInstanceWrap.value = cI
        }

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
})

onUnmounted(() => {
    chartInstance.value?.dispose()
    chartBoxRef.value && ob.value && ob.value.unobserve(chartBoxRef.value)
})

// 抛出
defineExpose({
    chartInstance
})
</script>

<style lang="scss" scoped>
.g-chart-basic {
    width: 100%;
    height: 100%;
}
</style>
