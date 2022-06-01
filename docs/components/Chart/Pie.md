# 饼图

## Config interface

```ts
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

interface PieConfig extends BaseConfig {
    /**
     * 类型：饼图
     */
    type: 'pie'
    /**
     * 饼图数据
     */
    data?: PieSeriesOption['data']
    /**
     * 饼图的半径
     */
    radius?: PieSeriesOption['radius']
    /**
     * label 的位置
     * 'outside' 饼图扇区外侧，通过视觉引导线连到相应的扇区。
     * 'inside' 饼图扇区内部。
     * 'inner' 同 'inside'。
     * 'center' 在饼图中心位置。见圆环图示例
     */
    labelPosition?: 'outside' | 'inside' | 'inner' | 'center'
    /**
     * 是否显示饼 item 的边框
     */
    showBorder?: boolean,
    /**
     * 是否展示成南丁格尔图，通过半径区分数据大小。可选择两种模式：
     *  'radius' 扇区圆心角展现数据的百分比，半径展现数据的大小。
     *  'area' 所有扇区圆心角相同，仅通过半径展现数据大小。
     */
    roseType?: boolean | 'radius' | 'area'
}

```

## 饼图

:::tip 2.1.6+

增加图例位置配置 api，默认 `right`

:::

<demo-block>

<Charts-pie-demo1 />

<template #code>

@[code](@demoroot/Charts/pie/demo1.vue)

</template>

</demo-block>

## 圆环图

<demo-block>

<Charts-pie-demo2 />

<template #code>

@[code](@demoroot/Charts/pie/demo2.vue)

</template>

</demo-block>

## 南丁格尔图（玫瑰图）

<demo-block>

<Charts-pie-demo3 />

<template #code>

@[code](@demoroot/Charts/pie/demo3.vue)

</template>

</demo-block>
