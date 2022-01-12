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
    ],
    hideToolBox: true
})
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    height: 400px;
}
</style>
