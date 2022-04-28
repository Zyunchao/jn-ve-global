# Tabs

在 [Element Tabs](https://element-plus.gitee.io/#/zh-CN/component/tabs) 的基础上，进行样式修改的二次封装

提供了：

* 定制化样式
* 数据模型驱动
* 状态抛出

:::tip 思想
区别于 Element Tabs，当前组件更像是一个状态控制器（element 的每一个状态的内容都定义在组件内）
:::

## 基本使用

状态控制通过 `v-model` 双向绑定，内容渲染交给其他模板

<demo-block>

<Tabs-demo1 />

<template #code>

@[code](@demoroot/Tabs/demo1.vue)

</template>

</demo-block>

## GTabs Attributes

当前组件上的所有 attrs，都会通过 `v-bind="$attrs"` 传递到 `<el-tabs>` 内部，故可直接参考 [Element Tabs Attributes](https://element-plus.gitee.io/#/zh-CN/component/tabs#tabs-attributes)

## Tab-pane Attributes

interface **TabPaneProps**

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
label | 显示值 | string | --
value | 绑定值 | string | --
disabled | 禁用 | boolean | --
