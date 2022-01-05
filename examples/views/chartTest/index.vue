<template>
    <div class="box">
        <g-tabs v-model="activeName" :list="tabList" />
        <Bar v-if="activeName === 'bar'" />
        <Line v-if="activeName === 'line'" />
        <BarWithLine v-if="activeName === 'barWithLine'" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'ChartTestIndex'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import Bar from './bar.vue'
import Line from './line.vue'
import BarWithLine from './barWithLine.vue'

const activeName = ref<string>('bar')

const tabList = [
    {
        label: '柱状图',
        value: 'bar'
    },
    {
        label: '线',
        value: 'line'
    },
    {
        label: '柱与线',
        value: 'barWithLine'
    },
    {
        label: '饼图',
        value: 'pie'
    }
]
</script>

<style lang="scss" scoped>
.box {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
}
</style>
