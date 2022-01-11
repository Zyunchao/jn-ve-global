<template>
    <div class="examples-base-wrapper">
        <div class="chart-box">
            <GChart :config="singleLineConfig1" />
        </div>

        <div class="chart-box">
            <GChart :config="singleLineConfig2" />
        </div>

        <div class="chart-box">
            <GChart :config="singleLineConfig3" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'PieTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'
import ChartConfig from '@component/GChart/interface/ChartConfig'
import { ECharts, EChartsOption } from 'echarts'

// 少量数据饼图
const singleLineConfig1 = ref<ChartConfig>({
    title: '少量数据饼图',
    type: 'pie',
    labelPosition: 'outside',
    data: [
        {
            value: 335,
            name: '直接访问直接访问直接访问直接访问'
        },
        {
            value: 234,
            name: '联盟广告'
        },
        {
            value: 1548,
            name: '搜索引擎'
        },
        {
            value: 1000,
            name: '搜索引擎222'
        }
    ]
})

// 圆环多数据
const singleLineConfig2 = ref<ChartConfig>({
    title: '圆环多数据',
    type: 'pie',
    labelPosition: 'outside',
    radius: ['30%', '70%'],
    data: [
        {
            value: 335,
            name: '直接访问直接访问直接访问直接访问'
        },
        {
            value: 234,
            name: '联盟广告'
        },
        {
            value: 1548,
            name: '搜索引擎'
        },
        {
            value: 1000,
            name: '搜索引擎'
        },
        {
            value: 234,
            name: '联盟广告2'
        },
        {
            value: 1548,
            name: '搜索引擎23'
        },
        {
            value: 1000,
            name: '搜索引擎22'
        },
        {
            value: 1548,
            name: '搜索引擎3'
        },
        {
            value: 1000,
            name: '搜索引擎6'
        },
        {
            value: 234,
            name: '联盟广告3'
        },
        {
            value: 1548,
            name: '搜索引擎4'
        },
        {
            value: 1000,
            name: '搜索引擎5'
        },
        {
            value: 1548,
            name: '搜索引擎46'
        },
        {
            value: 1000,
            name: '搜索引擎56'
        }
    ]
})


// 南丁格尔图（玫瑰图）
const singleLineConfig3 = ref<ChartConfig>({
    title: '南丁格尔图（玫瑰图）',
    type: 'pie',
    labelPosition: 'outside',
    radius: ['30%', '70%'],
    roseType: 'area',
    data: [
        {
            value: 335,
            name: '直接访问直接访问直接访问直接访问'
        },
        {
            value: 234,
            name: '联盟广告'
        },
        {
            value: 1548,
            name: '搜索引擎'
        },
        {
            value: 1000,
            name: '搜索引擎'
        },
        {
            value: 234,
            name: '联盟广告2'
        },
        {
            value: 1548,
            name: '搜索引擎23'
        },
        {
            value: 1000,
            name: '搜索引擎22'
        },
        {
            value: 1548,
            name: '搜索引擎3'
        },
        {
            value: 1000,
            name: '搜索引擎6'
        },
        {
            value: 234,
            name: '联盟广告3'
        },
        {
            value: 1548,
            name: '搜索引擎4'
        },
        {
            value: 1000,
            name: '搜索引擎5'
        },
        {
            value: 1548,
            name: '搜索引擎46'
        },
        {
            value: 1000,
            name: '搜索引擎56'
        }
    ]
})


</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    margin: 0;
    width: 100%;
    height: 100%;

    .chart-box {
        width: 500px;
        height: 300px;
        margin-bottom: 30px;
        border: 1px solid #e0e0e0;
        border-radius: 4px;
        margin-right: 20px;
        float: left;
    }
}
</style>
