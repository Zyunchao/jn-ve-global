<template>
    <Basic class="bar" :option="pieOption" />
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
import { EChartsOption, PieSeriesOption } from 'echarts/types/dist/echarts'

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
    radius: props.config.radius || [0, '75%'],
    data: props.config.data,
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
            color: 'auto'
        }
    },
    select: {
        label: {
            fontSize: fontSize14,
            color: 'auto'
        }
    },
    tooltip: {
        padding: size2Rem(5),
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        formatter: () => {
            return `
                <p>1234</p>
                <span>5678</span>
            `
        },
        textStyle: {
            fontSize: fontSize14
        }
    }
}))

/* ---------- EChartsOption ------------------------------------------------------------ */
const pieOption = computed<EChartsOption>(() => ({
    color: colors.value,
    tooltip: {
        show: true
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

<style lang="scss" scoped></style>
