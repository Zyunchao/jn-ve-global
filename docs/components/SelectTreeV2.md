# SelectTreeV2

:::tip

Element-plus 在 2.1.8 版本新增了下拉树组件，基于 [Element 下拉树](https://element-plus.gitee.io/zh-CN/component/tree-select.html#treeselect-%E6%A0%91%E5%BD%A2%E9%80%89%E6%8B%A9) 进行了二次封装

后续（组件版本 2.0+）开发请使用 SelectTreeV2，[SelectTree](./SelectTree.md) 将不再维护，仅做兼容之前的代码
:::

组件主要进行了

* 业务数据填充映射（id -> value, name -> label）
* 多选默认显示 Checkbox
* 默认所有节点可选

当前组件已经集成到 form 和 表格中，使用方法同其他组件

:::tip

在下拉树的使用中，待选树数据每个节点都应包含 `label` & `value` 字段，如果没有，组件内部会自动的将数据的 `name` & `id` 映射成这二者

如果数据内包含 `label` & `value` 则取数据节点的字段

也可以通过 `treeProps` 配置要绑定的字段值

:::

## 单独使用

<demo-block>

<SelectTreeV2-demo1 />

<template #code>

@[code](@demoroot/SelectTreeV2/demo1.vue)

</template>

</demo-block>

## 表单集成

<demo-block>

<SelectTreeV2-demo2 />

<template #code>

@[code](@demoroot/SelectTreeV2/demo2.vue)

</template>

</demo-block>

## 表格集成

<demo-block>

<SelectTreeV2-demo3 />

<template #code>

@[code](@demoroot/SelectTreeV2/demo3.vue)

</template>

</demo-block>

## SelectTreeV2 Attributes

基本配置api 请参考 [Element-plus TreeSelect 属性](https://element-plus.gitee.io/zh-CN/component/tree-select.html#treeselect-%E5%B1%9E%E6%80%A7)

### 扩展 api

参数|说明|类型|默认值
-----|-----|-----|-----
treeData | 树数据 | [TreeData](#treedata)[] | []
treeProps | 配置树节点信息 | [SelectTreeV2TreeProps](#selecttreev2treeprops) | {label: 'name', value: 'id', disabled: 'disabled'}
checkStrictly | 是否所有节点都可选择，等同于树的父子不关联选择 | boolean | true

#### TreeData

```ts
interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    value?: string
    label?: string
    [k: string]: unknown
}
```

#### SelectTreeV2TreeProps

```ts
interface SelectTreeV2TreeProps {
    /**
     * 指定节点 value 为节点对象的某个属性值
     */
    value?: string
    /**
     * 指定节点标签为节点对象的某个属性值
     */
    label?: string
    /**
     * 指定节点选择框是否禁用为节点对象的某个属性值
     */
    disabled?: string | ((data, node) => string)
    /**
     * 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
     */
    isLeaf?: string | ((data, node) => string)
    /**
     * 自定义节点类名
     */
    class?: string | ((data, node) => string)
}
```
