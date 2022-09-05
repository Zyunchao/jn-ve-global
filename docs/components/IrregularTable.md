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

```tsx
import { reactive, computed } from 'vue'
import type { IrregularTableCell } from '@component/index'

export default () => {
    // 金额拆分处
    const moneySplitArr: {
        unit: IrregularTableCell[]
        first: IrregularTableCell[]
    } = reactive({
        unit: [
            {
                content: '千',
                ri: 5,
                ci: 28,
                align: 'center'
            },
            {
                content: '百',
                ri: 5,
                ci: 29,
                align: 'center'
            },
            {
                content: '十',
                ri: 5,
                ci: 30,
                align: 'center'
            },
            {
                content: '万',
                ri: 5,
                ci: 31,
                align: 'center'
            },
            {
                content: '千',
                ri: 5,
                ci: 32,
                align: 'center'
            },
            {
                content: '百',
                ri: 5,
                ci: 33,
                align: 'center'
            },
            {
                content: '十',
                ri: 5,
                ci: 34,
                align: 'center'
            },
            {
                content: '元',
                ri: 5,
                ci: 35,
                align: 'center'
            },
            {
                content: '角',
                ri: 5,
                ci: 36,
                align: 'center'
            },
            {
                content: '分',
                ri: 5,
                ci: 37,
                align: 'center'
            }
        ],
        first: [
            {
                content: '',
                ri: 6,
                ci: 28,
                align: 'center'
            },
            {
                content: '1',
                ri: 6,
                ci: 29,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 30,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 31,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 32,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 33,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 34,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 35,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 36,
                align: 'center'
            },
            {
                content: '0',
                ri: 6,
                ci: 37,
                align: 'center'
            }
        ]
    })

    const row1 = reactive<IrregularTableCell[]>([
        {
            content: '机 构',
            ri: 0,
            ci: 0,
            rowspan: 2,
            colspan: 3,
            align: 'center'
        },
        {
            content: '名 称',
            ri: 0,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 0,
            ci: 7,
            colspan: 14
        },
        {
            content: '电 话',
            ri: 0,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 0,
            ci: 28,
            colspan: 10
        }
    ])
    const row2 = reactive<IrregularTableCell[]>([
        {
            content: '地 址',
            ri: 1,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 1,
            ci: 7,
            colspan: 14
        },
        {
            content: '许可证编号',
            ri: 1,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 1,
            ci: 28,
            colspan: 10
        }
    ])
    const row3 = reactive<IrregularTableCell[]>([
        {
            content: '用 户',
            ri: 2,
            ci: 0,
            rowspan: 3,
            colspan: 3,
            align: 'center'
        },
        {
            content: '名 称',
            ri: 2,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 2,
            ci: 7,
            colspan: 14
        },
        {
            content: '电 话',
            ri: 2,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 2,
            ci: 28,
            colspan: 10
        }
    ])
    const row4 = reactive<IrregularTableCell[]>([
        {
            content: '地 址',
            ri: 3,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 3,
            ci: 7,
            colspan: 14
        },
        {
            content: '联系人',
            ri: 3,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 3,
            ci: 28,
            colspan: 10
        }
    ])
    const row5 = reactive<IrregularTableCell[]>([
        {
            content: '证件名称',
            ri: 4,
            ci: 3,
            colspan: 4,
            align: 'center'
        },
        {
            content: '',
            ri: 4,
            ci: 7,
            colspan: 14
        },
        {
            content: '证件号码',
            ri: 4,
            ci: 21,
            colspan: 7,
            align: 'center'
        },
        {
            content: '',
            ri: 4,
            ci: 28,
            colspan: 10
        }
    ])
    const row6 = reactive<IrregularTableCell[]>([
        {
            content: '序 号',
            ri: 5,
            ci: 0,
            colspan: 3,
            align: 'center'
        },
        {
            content: '物品名称',
            ri: 5,
            ci: 3,
            colspan: 9,
            align: 'center'
        },
        {
            content: '重 量',
            ri: 5,
            ci: 12,
            colspan: 6,
            align: 'center'
        },
        {
            content: '数 量',
            ri: 5,
            ci: 18,
            colspan: 3,
            align: 'center'
        },
        {
            content: '单 价',
            ri: 5,
            ci: 21,
            colspan: 4,
            align: 'center'
        },
        {
            content: '总 价',
            ri: 5,
            ci: 25,
            colspan: 3,
            align: 'center'
        }
    ])
    const row7 = reactive<IrregularTableCell[]>([
        {
            content: '1',
            ri: 6,
            ci: 0,
            colspan: 3,
            align: 'center'
        },
        {
            content: '',
            ri: 6,
            ci: 3,
            colspan: 9
        },
        {
            content: '',
            ri: 6,
            ci: 12,
            colspan: 6
        },
        {
            content: '1',
            ri: 6,
            ci: 18,
            colspan: 3,
            align: 'right'
        },
        {
            content: '3000000',
            ri: 6,
            ci: 21,
            colspan: 4,
            align: 'right'
        },
        {
            content: '33.33',
            ri: 6,
            ci: 25,
            colspan: 3,
            align: 'right'
        }
    ])
    const efficaciousCellList = computed<IrregularTableCell[]>(() => [
        ...moneySplitArr.unit,
        ...moneySplitArr.first,
        ...row1,
        ...row2,
        ...row3,
        ...row4,
        ...row5,
        ...row6,
        ...row7
    ])

    return {
        moneySplitArr,
        row1,
        row2,
        row3,
        row4,
        row5,
        row6,
        row7,
        efficaciousCellList
    }
}
```

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
