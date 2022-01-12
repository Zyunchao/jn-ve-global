<template>
    <div class="examples-base-wrapper">
        <GChart :config="chartConfig" />
    </div>
    <div class="examples-base-wrapper">
        <GChart :config="chartConfig2" />
    </div>
</template>

<script lang="ts">
export default {
    name: ''
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted } from 'vue'
import ChartConfig from '@component/GChart/interface/ChartConfig'

const chartConfig = ref<ChartConfig>({
    title: '多条 Y 轴',
    type: 'bar',
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

const chartConfig2 = ref<ChartConfig>({
    title: '多条 X Y 轴',
    type: 'bar',
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
            data: ['衬衫3', '羊毛衫32', '雪纺衫3', '裤子3', '高跟鞋3', '袜子3', '高跟鞋3'],
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
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    height: 400px;
    box-shadow: 1px 2px 6px rgba(0, 0, 0, 0.4);
    margin-bottom: 20px;
    border-radius: 4px;
}
</style>
