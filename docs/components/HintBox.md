# HintBox

自适应宽度（跟随父级），文本内容超出宽度显示省略号并展示 tooltip 的盒子组件

:::tip 注意

只支持纯文本

:::

## 基础使用

<demo-block>

<HintBox-demo1 />

<template #code>

@[code](@demoroot/HintBox/demo1.vue)

</template>

</demo-block>

## 数据变化

<demo-block>

<HintBox-demo2 />

<template #code>

@[code](@demoroot/HintBox/demo2.vue)

</template>

</demo-block>

## 指定宽度

<demo-block>

<HintBox-demo3 />

<template #code>

@[code](@demoroot/HintBox/demo3.vue)

</template>

</demo-block>

## Attributes

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
text | 展示内容 | string | -
width | 指定宽度 | string \| number | '100%'
