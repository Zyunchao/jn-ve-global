<template>
    <div class="examples-base-wrapper">
        <!-- 单数据 -->
        <div class="chart-box">
            <GChart :config="singleBarConfig" />
        </div>

        <!-- 多数据 -->
        <div class="chart-box">
            <GChart :config="muchBarConfig" />
        </div>

        <!-- 多数据堆叠 -->
        <div class="chart-box">
            <GChart :config="muchStackBarConfig" />
        </div>

        <!-- 多 y -->
        <div class="chart-box">
            <GChart :config="muchYBarConfig" />
        </div>

        <!-- 多 x -->
        <div class="chart-box">
            <GChart :config="muchXBarConfig" />
        </div>

        <!-- 自定义颜色 -->
        <div class="chart-box">
            <GChart :config="customColorBarConfig" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: ''
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted } from 'vue'
import * as echarts from 'echarts'
import ChartConfig from '@component/GChart/interface/ChartConfig'
import { ECharts, EChartsOption } from 'echarts'

// 单条
const singleBarConfig = ref<ChartConfig>({
    title: '单条数据',
    type: ['bar', 'bar', 'line'],
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    data: [
        5,
        20,
        {
            value: 59,
            label: {
                show: true,
                color: '#fff',
                fontWeight: 'bold'
            }
        },
        10,
        {
            value: 60,
            itemStyle: {
                color: 'pink'
            }
        },
        20
    ]
})

// 多数据
const muchBarConfig = ref<ChartConfig>({
    title: '多数据',
    type: ['bar', 'bar', 'line'],
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
})

// 多数据堆叠
const muchStackBarConfig = ref<ChartConfig>({
    title: '多数据堆叠',
    type: ['bar', 'bar', 'line'],
    stackX: true,
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
})

// 多条 y
const muchYBarConfig = ref<ChartConfig>({
    title: '多条 Y 轴',
    type: ['bar', 'bar', 'line'],
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    y: {
        '销量': {},
        '价格': {},
        '人数': {
            offset: 40
        }
    },
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
})

// 多条 X
const muchXBarConfig = ref<ChartConfig>({
    title: '多条 X Y 轴',
    type: ['bar', 'bar', 'line'],
    x: {
        'x1': {
            name: '',
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        'x2': {
            name: '',
            data: ['衬衫2', '羊毛衫2', '雪纺衫2', '裤子2', '高跟鞋2', '袜子2']
        },
        'x3': {
            name: '',
            data: ['衬衫3', '羊毛衫3', '雪纺衫3', '裤子3', '高跟鞋3', '袜子3', '高跟鞋3'],
            offset: 30,
            position: 'bottom'
        }
    },
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
})

// 自定义颜色
const customColorBarConfig = ref<ChartConfig>({
    title: '自定义颜色',
    type: ['bar', 'bar', 'line'],
    colors: ['pink', 'skyblue', 'orange'],
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
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
