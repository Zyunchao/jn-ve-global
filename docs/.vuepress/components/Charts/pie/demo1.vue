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
    ],
    legendPosition: 'right'
})
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    height: 400px;
}
</style>
