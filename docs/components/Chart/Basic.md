# 基础组件

基于 [ECharts](https://echarts.apache.org/handbook/zh/get-started/) 封装的 vue 组件

:::tip

对于一些常用的图表，如：柱状图、折线图、柱状+折线、饼图等，都进行了 option 的封装，可以使用传递 config 的形式（大多数情况下只需要传递数据，不再需要用户熟练掌握 ECharts ），进行配置图表

一些更加灵活的图表，需要用户自己定制 option，需要用户熟练掌握 ECharts 的配置

:::

## 自定义灵活配置

<demo-block>

<Charts-custom />

<template #code>

@[code](@demoroot/Charts/custom.vue)

</template>

</demo-block>
