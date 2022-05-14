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

:::tip 按钮权限

在传递按钮配置时，其实也是可以给按钮加权限的，按钮配置属性接口如下：

内部会将配置的 authCode 传递给 uums 平台的 自定义指令 `v-auth` 实现按钮鉴权
:::

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

## 隐藏顶部扩展的按钮区域

某些情况下，布局需要去掉顶部的按钮区域，包括展开&收起按钮，可以传递 `showBtnArea` （默认为 true，即显示） 参数，置为 false 将不创建顶部按钮区域

<demo-block>

<Tree-demo3 />

<template #code>

@[code](@demoroot/Tree/demo3.vue)

</template>

</demo-block>

## 数据回显筛选父节点

在进行树的数据绑定回显时，如果绑定的节点中包含父节点，那么这个父节点及下的子节点都将被选中；

大多数情况下，这个父节点下的子节点并不是全部选择的，这种情况，是 element 的默认行为，即**父节点的选中驱动子节点选中**

::: tip 期望

在节点勾选回显时，如果包含父节点，也能正确的勾选其子节点，而不是自动勾选这个父节点下的所有子节点

:::

组件提供了一个参数： `filterParentCheckedKeysFlag`

在传递 `defaultCheckedKeys` 的同时，传递 `filterParentCheckedKeysFlag` ，内部就会将 传递的 `defaultCheckedKeys` 里面的**父节点**筛选掉；<br />
继而由 “父驱动子选中” 转换为 “子驱动父选中”<br/>
即只有某个父节点下的所有子节点都选中的情况下，才勾选父节点

<demo-block>

<Tree-demo4 />

<template #code>

@[code](@demoroot/Tree/demo4.vue)

</template>

</demo-block>

## GTree Attributes

除去扩展字段，请参考[Element Tree Attributes](https://element-plus.gitee.io/#/zh-CN/component/tree#attributes)

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
data | 树数据 | TreeData[] | []
mode | 树类型 | 'default' \| 'other' | 'default'
defaultProps | 配置树的 props | object | {children: 'children', label: 'name' }
btns | 扩展按钮配置数组 | [BtnProps](./ButtonGroup.md)[] | []
showBtnArea | 是否显示上方按钮区域 | boolean | true
filterParentCheckedKeysFlag | 过滤传递的默认勾选的 key 的数组中的父节点 | boolean | false
hideSearch | 隐藏搜索框 | boolean | false

## GTree 自定义事件

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
@get-tree-ref | 获取树的 ref | (instance) => void | --
