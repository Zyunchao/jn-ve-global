# Tree

基于 [Element Tree](https://element-plus.gitee.io/#/zh-CN/component/tree)

实现了：

* 样式定制
* 本地搜索
* 扩展按钮

:::tip
当前组件多用于有侧边栏树的模块，这些模块的树多具有扩展按钮，用来实现业务功能
:::

## 基础使用

带有按钮+节点机构图标

<demo-block>

<Tree-demo1 />

<template #code>

@[code](@demoroot/Tree/demo1.vue)

</template>

</demo-block>

## 消除机构图标

<demo-block>

<Tree-demo2 />

<template #code>

@[code](@demoroot/Tree/demo2.vue)

</template>

</demo-block>

:::tip
展开按钮图标定制化，样式局限，如需其他图标，可另行扩展
:::

## GTree Attributes

除去扩展字段，请参考[Element Tree Attributes](https://element-plus.gitee.io/#/zh-CN/component/tree#attributes)

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
data | 树数据 | TreeData[] | []
mode | 树类型 | 'default' \| 'other' | 'default'
defaultProps | 配置树的 props | object | {children: 'children', label: 'name' }
btns | 扩展按钮配置数组 | BtnProps[] | []
