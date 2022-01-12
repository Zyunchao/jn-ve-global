# 柱状图

柱状图支持

* 单数据
* 多数据
* 多轴
* 自定义颜色
* 工具箱

## Config interface

```ts
// 基础
interface BaseConfig {
    /**
     * 标题
     */
    title?: string
    /**
     * 调色板
     */
    colors?: string[]
    /**
     * 是否隐藏工具箱
     */
    hideToolBox?: boolean
}

// 柱状图 或 折线图的配置
interface BarOrLineConfig extends BaseConfig {
    /**
     * 类型：bar
     */
    type: 'bar' | 'line' | Array<'bar' | 'line'>
    /**
     * xAxis
     */
    x:
        | Array<string | number | Date>
        | {
              [k: string]: XAXisComponentOption
          }
    /**
     * yAxis
     */
    y?:
        | Array<string | number | Date>
        | {
              [k: string]: YAXisComponentOption
          }
    /**
     * series & data
     * data 可以是简单类型数组，也可以是单独配置的数据对象
     */
    data:
        | BarSeriesOption['data']
        | LineSeriesOption['data']
        | {
              [k: string]: BarSeriesOption['data'] | LineSeriesOption['data']
          }
    /**
     * 是否堆叠
     */
    stackX?: boolean
    /**
     * 是否显示区域面积图
     */
    showLineArea?: boolean
    /**
     * 是否平滑曲线显示
     */
    lineSmooth?: boolean
}
```

## 单数据

<demo-block>

<Charts-bar-demo1 />

<template #code>

@[code](@demoroot/Charts/bar/demo1.vue)

</template>

</demo-block>

## 多数据

<demo-block>

<Charts-bar-demo2 />

<template #code>

@[code](@demoroot/Charts/bar/demo2.vue)

</template>

</demo-block>

## 堆叠

<demo-block>

<Charts-bar-demo3 />

<template #code>

@[code](@demoroot/Charts/bar/demo3.vue)

</template>

</demo-block>

## 多轴

<demo-block>

<Charts-bar-demo4 />

<template #code>

@[code](@demoroot/Charts/bar/demo4.vue)

</template>

</demo-block>

## 自定义颜色

<demo-block>

<Charts-bar-demo5 />

<template #code>

@[code](@demoroot/Charts/bar/demo5.vue)

</template>

</demo-block>
