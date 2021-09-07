# 指引

使用组件库前备知识点：<br/>
[Typescript](https://www.tslang.cn/index.html) <br/>
[Vue3](https://vue3js.cn/docs/zh/) <br/>
[Element-plus](https://element-plus.gitee.io/#/zh-CN/component/installation)

## 理念

该组件库是在 Element-plus 的基础上进行二次封装的，组件库的核心思想包括：

:::tip 去重复
将重复的一些模块抽取出来，通过引用**定制化**的组件，更改不同的 Props 快速实现模块的开发
:::

:::tip 去模板
即使 Element 已经为我们提供了丰富的组件，但我们依旧需要复制粘贴较多的 template，导致我们在修改一些页面时还是需要去一堆模板中寻找
:::

:::tip 数据驱动
通过配置数据模型，传递给组件，内部通过循环生成 template，从而简化组件的模板部分，使我们只需要关注数据模型的修改即可
:::

## 安装

```shell
# npm
npm i jn-ve-global -S

# yarn
yarn add jn-ve-global -S
```

## 注册

:::warning 注意
目前组件库为内部使用，且组件数量较少，故仅提供了全局注册
:::

```js
// main.js 注册未全局组件
import GlobalComponents from 'jn-ve-global'
// 引入样式
import 'jn-ve-global/style.css'

const app = createApp(App)
app
    .use(GlobalComponents)
    .mount('#app')
```

## 使用

至此，全局已经注册了组件库，组件的使用以 `g-` 开头， `g` 仅代表了全局组件的含义，没有其他语义

组件库的 npm 包包含了

![dist view](/images/dist-view.png)

* dist: 生产包
* packages: 组件源代码

:::tip 注意
npm 包中打包了组件的源代码，是因为在使用组件时，在定义数据模型时需要使用到定义好的接口，以保证数据的安全性
:::

**一个组件的基本使用如：**

在 `<template>` 中使用 `<g-icon>` 或 `<GIcon>`

> 在 Vue 中，组件提倡使用全小写标签+短横线分割 <br/>
> 而在 React 中，组件多以大驼峰使用，这个不做强求 <br/>
> 不过使用大驼峰方式 vscode 的组件提示颜色将变成绿色，可以很好的区分组件与原生标签

如：

![tag demo](/images/tag-demo.png)

在 `<script>` 中定义数据模型，一定要正确引用 npm 包中的**接口**

![interface demo](/images/interface-demo.png)

:::tip
具体使用请参考具体组件文档
:::
