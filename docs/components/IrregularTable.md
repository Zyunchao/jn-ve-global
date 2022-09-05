# IrregularTable

组件意义

* 需求：一些需要表格布局的展示方式
* 痛点：纯手写需要写大量的 html 布局代码，且需要频繁的书写 合并单元格，并计算掉被合并的单元格，工作量巨大繁琐
* 解决：将繁琐的合并单元格计算、大量的 html 结构封装了起来，形成当前组件
* 意为：不规则表格

## 概念

使用当前表格，就像在定位坐标，当你知道一个有效单元格的 x, y （row, col） 后，再横向、纵向对比，确定 `rowspan`  `colspan` 就可以将目标单元格合并

而定位坐标的前提，是需要一个画布

## 画布

首先确定最小单元格，以这个最小单元格（行、列）出发，用最小单元格去合并大的单元格，最终形成整体布局

<demo-block>

<IrregularTable-drawingBoard />

<template #code>

@[code](@demoroot/IrregularTable/drawingBoard.vue)

</template>

</demo-block>

## 设计

可以理解为把部分小的单元格去掉，合并成大的单元格，小的是点，大的是面，最终组合成一个不规则的表格展示布局

:::tip

无论是数据标题，还是数据本身，都是作为单元格在表格内展示的，修改数据时，要从单元格列表中寻找，然后改变数据，所以，一定要将单元格配置列表定义为响应式对象

:::

<demo-block>

<IrregularTable-design />

<template #code>
<CodeGroup>
<CodeGroupItem title="基本使用" active>

@[code](@demoroot/IrregularTable/design.vue)

</CodeGroupItem>

<CodeGroupItem title="efficaciousCellList.tsx" >

</CodeGroupItem>
</CodeGroup>
</template>

</demo-block>

## Attributes

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
rowNum | 表格有限行数（画布 y） | number | 0
colNum | 表格有限列数 （画布 x）| number | 0
cellList | 单元格（有效的节点） | Cell[] | []

## 单元格可配属性

```ts
import { VNode } from 'vue'

export default interface Cell {
    /**
     * 内容
     */
    content: string | VNode | JSX.Element
    /**
     * 行坐标（起始）
     */
    ri: number
    /**
     * 列坐标（起始）
     */
    ci: number
    /**
     * 列合并
     */
    colspan?: number
    /**
     * 行合并
     */
    rowspan?: number
    /**
     * 是否销毁（被合并的）
     */
    destroyed?: boolean
    /**
     * 内容对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 额外的类名
     */
    class?: string
    /**
     * 数据的 key，用来查找
     */
    propKey?: string
}
```
