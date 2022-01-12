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
    type: 'bar',
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
    height: 400px;
}
</style>
