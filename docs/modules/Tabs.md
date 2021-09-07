# Tabs

在 [Element Tabs](https://element-plus.gitee.io/#/zh-CN/component/tabs) 的基础上，进行样式修改的二次封装

提供了：

* 定制化样式
* 数据模型驱动
* 状态抛出

:::tip 思想
区别于 Element Tabs，当前组件更像是一个状态控制器（element 的每一个状态的内容都定义在组件内）<br/>
当前组件不再提供任何内容容器（ `slot` ），仅做**状态的控制&抛出**
:::

## 基本使用

状态控制通过 `v-model` 双向绑定，内容渲染交给其他模板

<demo-block>

<Tabs-demo1 />

<template #code>

@[code](@demoroot/Tabs/demo1.vue)

</template>

</demo-block>
