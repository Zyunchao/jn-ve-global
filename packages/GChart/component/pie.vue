<template>
    <Basic class="pie" :option="pieOption" />
</template>

<script lang="tsx">
export default {
    name: 'GChartPie'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import Basic from './GChartBasic/index.vue'
import PieConfig from '../interface/PieConfig'
import _ from 'lodash'
import { size2Rem, isObject } from '../utils'
import defaultColors from '../constant/colors'
import { EChartsOption, PieSeriesOption } from 'echarts'

interface Props {
    config: PieConfig
}

const props = withDefaults(defineProps<Props>(), {
    config: null
})

const fontSize16 = size2Rem(16)
const fontSize14 = size2Rem(14)
const fontSize12 = size2Rem(12)
const fontSize10 = size2Rem(10)

/* ---------- 顶部额外的距离 ------------------------------------------------------------ */
const boxPaddingTop = computed(() =>
    props.config.hideToolBox && !props.config.title ? size2Rem(25) : 0
)

/* ---------- xAxis ------------------------------------------------------------ */
const colors = computed(() =>
    props.config.colors && !!props.config.colors.length ? props.config.colors : defaultColors
)

/* ---------- series ------------------------------------------------------------ */
const series = computed<PieSeriesOption>(() => ({
    type: 'pie',
    radius: props.config.radius || [0, '70%'],
    data: props.config.data,
    right: size2Rem(106),
    top: props.config.title ? size2Rem(14) : 0,
    label: {
        color:
            props.config.labelPosition && props.config.labelPosition === 'outside'
                ? '#606060'
                : undefined,
        show: true,
        position: props.config.labelPosition || 'outside',
        fontSize: fontSize12,
        width: size2Rem(100),
        distanceToLabelLine: size2Rem(6)
    },
    labelLine: {
        lineStyle: {
            color: '#b9b9b9'
        }
    },
    itemStyle: {
        borderWidth:
            props.config.showBorder ||
            (_.isArray(props.config.radius) &&
                props.config.radius.length === 2 &&
                props.config.radius[0] !== 0)
                ? 1
                : 0,
        borderColor: '#fff'
    },
    emphasis: {
        label: {
            fontSize: fontSize14,
            color: 'inherit'
        }
    },
    select: {
        label: {
            fontSize: fontSize14,
            color: 'inherit'
        }
    },
    tooltip: {
        padding: size2Rem(5),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        formatter: (data) => {
            return `
                <div class="pie-tooltip-wrapper">
                    <span class="round" style="background-color: ${data.color};"></span>
                    <span class="name">${data.name}：</span>
                    <span class="value">${data.value}</span>
                    <strong style="color: ${data.color};">|</strong>
                    <span class="percent">${data.percent}%</span>
                </div>
            `
        },
        textStyle: {
            fontSize: fontSize14
        }
    },
    roseType: props.config.roseType as any
}))

/* ---------- EChartsOption ------------------------------------------------------------ */
const pieOption = computed<EChartsOption>(() => ({
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
    tooltip: {
        show: true
    },
    legend: {
        type: 'scroll',
        orient: 'vertical',
        top: size2Rem(30),
        right: size2Rem(0),
        padding: size2Rem(5),
        itemGap: size2Rem(10),
        itemWidth: size2Rem(20),
        itemHeight: size2Rem(12),
        itemStyle: {
            borderWidth: 0
        },
        textStyle: {
            width: size2Rem(80),
            fontSize: size2Rem(12),
            overflow: 'break'
        }
    },
    toolbox: {
        show: !props.config.hideToolBox,
        itemSize: size2Rem(15),
        itemGap: size2Rem(13),
        feature: {
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
    series: series.value
}))
</script>

<style lang="scss">
.pie-tooltip-wrapper {
    .round {
        width: 10px;
        height: 10px;
        display: inline-block;
        border-radius: 50%;
        margin-right: 4px;
    }

    .name {
        margin-right: 10px;
    }

    .value,
    .percent {
        font-weight: 600;
    }
}
</style>
