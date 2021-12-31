<template>
    <div class="examples-base-wrapper">
        <div class="chart1-box">
            <GChart ref="chart1Ref" :config="barConfig" @getChartInstance="getChartInstance" />
        </div>

        <div class="chart1-box">
            <GChart ref="chart2Ref" :config="barConfig2" />
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

const chart1Ref = ref(null)
const chart2Ref = ref(null)
const chartInstance = ref<ECharts>(null)

watch(
    () => chartInstance.value,
    (instance) => {
        instance.on('click', (params) => {
            console.log(`%c chatrs click ============== `, 'color: blue;', params)
        })
    }
)

const barConfig = ref<ChartConfig>({
    // title: '测试柱状图1',
    type: 'bar',
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    y: [],
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

const barConfig2 = ref<ChartConfig>({
    // title: '测试柱状图2',
    // stackX: true,
    type: 'bar',
    x: {
        '品类': {
            data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        }
        // '轴2': {
        //     data: ['衬衫2', '羊毛衫2', '雪纺衫2', '裤子2', '高跟鞋2', '袜子2']
        // },
        // '轴3': {
        //     name: 'qwer',
        //     position: 'bottom',
        //     offset: 30,
        //     data: [
        //         '衬衫3',
        //         '羊毛衫3',
        //         '雪纺衫3',
        //         '裤子3',
        //         '高跟鞋3',
        //         '袜子3',
        //         '袜子3',
        //         '袜子3',
        //         '袜子3',
        //         '袜子3',
        //         '袜子3'
        //     ]
        // },
        // '轴4': {
        //     position: 'bottom',
        //     offset: 70,
        //     data: ['衬衫2', '羊毛衫2', '雪纺衫2', '裤子2', '高跟鞋2', '袜子2']
        // }
    },
    y: {
        '销量': {}
        // '价格': {}
        // '价格2': {
        //     offset: 60
        // },
        // '人数': {
        //     offset: 30
        // }
    },
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [50, 10, 16, 40, 60, 20, 16, 40, 60, 20, 20, 16, 40, 60, 20]
    }
})

const getChartInstance = (instance: ECharts) => {
    chartInstance.value = instance
}
</script>

<style lang="scss" scoped>
.chart1-box {
    width: 500px;
    height: 300px;
    margin-bottom: 30px;
    // box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
    border: 1px solid skyblue;
    border-radius: 4px;
}

.examples-base-wrapper {
    margin: 0;
    width: 100%;
    height: 100%;
}
</style>
