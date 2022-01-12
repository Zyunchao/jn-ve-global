<template>
    <div class="examples-base-wrapper">
        <GChart :config="chartConfig" />
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
    height: 400px;
}
</style>
