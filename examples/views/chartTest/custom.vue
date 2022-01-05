<template>
    <div class="box">
        <g-chart-basic :option="option" />
    </div>
</template>

<script lang="ts">
export default {
    name: ''
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { ECharts, EChartsOption } from 'echarts'

const data = []

for (let i = 0; i <= 360; i++) {
    let t = (i / 180) * Math.PI
    let r = Math.sin(2 * t) * Math.cos(2 * t)
    data.push([r, i])
}

const option: EChartsOption = {
    title: {
        text: 'Two Value-Axes in Polar'
    },
    legend: {
        data: ['line']
    },
    polar: {
        center: ['50%', '54%']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        }
    },
    angleAxis: {
        type: 'value',
        startAngle: 0
    },
    radiusAxis: {
        min: 0
    },
    series: [
        {
            coordinateSystem: 'polar',
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: data
        }
    ],
    animationDuration: 2000
}
</script>

<style lang="scss" scoped>
.box {
    width: 100%;
    height: 100%;
    background: #fff;
    padding: 10px;
}
</style>
