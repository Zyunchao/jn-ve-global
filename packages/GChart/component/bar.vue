<template>
    <Basic class="bar" :option="barOption" />
</template>

<script lang="ts">
export default {
    name: 'GChartBarCom'
}
</script>

<script lang="ts" setup>
import { toRef, watch, ref, computed, reactive, PropType, onMounted } from 'vue'
import BarConfig from '../interface/Bar'
import Basic from './basic.vue'
import {
    BarSeriesOption,
    XAXisComponentOption,
    EChartsOption,
    YAXisComponentOption
} from 'echarts/types/dist/echarts'
import _ from 'lodash'
import { size2Rem, isObject } from '../utils'
import defaultColors from '../constant/colors'
import { fontSize12, fontSize14, fontSize16 } from '../constant/constant'

// 假设的 rem 值
document.querySelector('html').style.fontSize = '100px'

const props = defineProps({
    config: {
        type: Object as PropType<BarConfig>,
        default: null
    }
})

/* ---------- xAxis ------------------------------------------------------------ */
const colors = computed(() =>
    props.config.colors && !!props.config.colors.length ? props.config.colors : defaultColors
)

/* ---------- xAxis ------------------------------------------------------------ */
const baseXAxis: XAXisComponentOption = {
    type: 'category',
    nameTextStyle: {
        fontSize: fontSize12
    },
    nameGap: size2Rem(12),
    axisLine: {
        show: true,
        lineStyle: {
            color: '#8c8c8c'
        }
    },
    axisTick: {
        show: false,
        alignWithLabel: true,
        length: size2Rem(5)
    },
    axisLabel: {
        interval: 0,
        margin: size2Rem(10),
        fontSize: fontSize12
    }
}
const xAxis = computed<EChartsOption['xAxis']>(() => {
    const xConfig = props.config.x

    // 单
    if (_.isArray(xConfig)) {
        return {
            ...baseXAxis,
            data: xConfig
        }
    }

    // 多
    if (_.isObject(xConfig)) {
        return Object.keys(xConfig).map((key, index) => {
            const temp = {
                name: key,
                ...baseXAxis,
                ...xConfig[key]
            }

            if (Object.keys(xConfig).length > 1) {
                temp['axisLine'] = {
                    show: true,
                    onZero: false,
                    lineStyle: {
                        color: colors.value[index]
                    }
                }
            }

            return temp
        })
    }

    return baseXAxis
})

/* ---------- yAxis ------------------------------------------------------------ */
const baseYAxis: YAXisComponentOption = {
    ...(baseXAxis as any),
    type: 'value',
    axisTick: {
        show: true,
        alignWithLabel: true,
        length: size2Rem(5)
    },
    splitLine: {
        show: true,
        lineStyle: {
            color: '#d9d9d9'
        }
    }
}
const yAxis = computed<EChartsOption['yAxis']>(() => {
    const yConfig = props.config.y

    if (!yConfig || !Object.keys(yConfig).length) return baseYAxis

    // 单
    if (_.isArray(yConfig)) {
        return {
            ...baseYAxis,
            data: yConfig
        }
    }

    // 多
    if (_.isObject(yConfig)) {
        return Object.keys(yConfig).map((key, index) => {
            const temp = {
                name: key,
                ...baseYAxis,
                ...yConfig[key]
            }

            if (Object.keys(yConfig).length > 1) {
                temp['axisLine'] = {
                    show: true,
                    lineStyle: {
                        color: colors.value[index]
                    }
                }
            }

            return temp
        })
    }

    return baseYAxis
})

/* ---------- series ------------------------------------------------------------ */
const baseSeries: BarSeriesOption = {
    type: 'bar'
}
const series = computed<EChartsOption['series']>(() => {
    const seriesData = props.config.data

    // 单
    if (_.isArray(seriesData)) {
        return {
            ...baseSeries,
            data: seriesData
        }
    }

    // 多
    if (_.isObject(seriesData)) {
        return Object.keys(seriesData).map((key, index) => {
            return {
                ...baseSeries,
                name: key,
                yAxisIndex:
                    !!Object.keys(props.config.y).length &&
                    index < Object.keys(props.config.y).length
                        ? index
                        : 0,
                xAxisIndex:
                    !!Object.keys(props.config.x).length &&
                    index < Object.keys(props.config.x).length
                        ? index
                        : 0,
                stack: props.config.stackX ? 'x' : '',
                data: seriesData[key]
            }
        })
    }

    return null
})

/* ---------- EChartsOption ------------------------------------------------------------ */
const barOption = reactive<EChartsOption>({
    color: colors.value,
    title: {
        show: !!props.config.title,
        text: props.config.title,
        textStyle: {
            fontSize: fontSize16
        },
        top: size2Rem(4),
        left: size2Rem(4)
    },
    grid: {
        top: size2Rem(_.isArray(props.config.data) ? 45 : 85),
        left: size2Rem(50),
        right: size2Rem(
            isObject(props.config.y) && Object.keys(props.config.y).length >= 2
                ? 25 * Object.keys(props.config.y).length
                : 40
        ),
        bottom: size2Rem(
            isObject(props.config.x) && Object.keys(props.config.x).length >= 3
                ? 25 * Object.keys(props.config.x).length
                : 40
        )
    },
    legend: {
        top: size2Rem(28),
        left: size2Rem(20),
        padding: size2Rem(5),
        itemGap: size2Rem(14),
        itemWidth: size2Rem(25),
        itemHeight: size2Rem(14),
        textStyle: {
            fontSize: fontSize12,
            color: '#8c8c8c'
        },
        show: isObject(props.config.data) && !!Object.keys(props.config.data).length,
        type: 'plain',
        data: Object.keys(props.config.data)
    },
    toolbox: {
        show: true,
        itemSize: size2Rem(15),
        itemGap: size2Rem(13),
        feature: {
            dataZoom: {
                title: {
                    zoom: '区域缩放',
                    back: '区域缩放还原'
                },
                yAxisIndex: 'none'
            },
            magicType: {
                type: ['line', 'bar', 'stack'],
                title: {
                    line: '切换为折线图',
                    bar: '切换为柱状图',
                    stack: '切换为堆叠'
                }
            },
            restore: {
                title: '还原'
            },
            saveAsImage: {
                title: '保存'
            }
        },
        iconStyle: {
            borderColor: '#bababa'
        },
        top: size2Rem(2),
        right: size2Rem(10)
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross',
            label: {
                margin: size2Rem(5),
                fontSize: fontSize12,
                lineHeight: size2Rem(12),
                height: size2Rem(10),
                padding: [size2Rem(5), size2Rem(7)],
                backgroundColor: 'rgba(0, 0, 0, 0.7)'
            }
        },
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: size2Rem(5),
        textStyle: {
            fontSize: fontSize14
        }
    },
    xAxis: xAxis.value,
    yAxis: yAxis.value,
    series: series.value
})
</script>

<style lang="scss" scoped></style>
