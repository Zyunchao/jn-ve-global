<template>
    <div class="examples-base-wrapper">
        <!-- 单数据 -->
        <div class="chart-box">
            <GChart :config="singleLineConfig" />
        </div>

        <div class="chart-box">
            <GChart :config="singleLineConfig2" />
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

// 单条
const singleLineConfig = ref<ChartConfig>({
    title: '单条数据',
    type: 'pie',
    labelPosition: 'outside',
    radius: ['30%', '70%'],
    // showBorder: true,
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

// 单条
const singleLineConfig2 = ref<ChartConfig>({
    title: '单条数据',
    type: 'pie',
    labelPosition: 'outside',
    // radius: [0, '70%'],
    // showBorder: true,
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
