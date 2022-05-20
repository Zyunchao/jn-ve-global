# Address 

选择地址的组件，基于

* [级联选择](https://element-plus.org/zh-CN/component/cascader.html)
* [Input](https://element-plus.org/zh-CN/component/input.html)

:::tip

控件抛出的数据格式为： `[[区域编码...]], '详细地址']`

如： `[['140000', '140400', '140406'], '上元大街88号']`

组件内置了全国的省市区节点（写死的），不需要再请求接口获得
:::

## 单独使用

<demo-block>

<Address-demo1 />

<template #code>

@[code](@demoroot/Address/demo1.vue)

</template>

</demo-block>

## 表单集成

<demo-block>

<Address-demo2 />

<template #code>

@[code](@demoroot/Address/demo2.vue)

</template>

</demo-block>

## 隐藏详细地址栏

控件可以隐藏详细地址填写栏，为组件添加 `hideDetail` 属性

<demo-block>

<Address-hideDetail />

<template #code>

@[code](@demoroot/Address/hideDetail.vue)

</template>

</demo-block>

## 替换数据

当前组件的数据，默认已提供好，但存在只需要某些地区的数据的需求，可以传递 `options` 以替换默认的数据

<demo-block>

<Address-demo3 />

<template #code>

@[code](@demoroot/Address/demo3.vue)

</template>

</demo-block>

## 特殊行为

一些特殊行为，遵循 [级联选择 Props](https://element-plus.gitee.io/zh-CN/component/cascader.html#props) 的配置方式

:::tip

如：配置多选、多选、每一级都可选择

需要注意的一点，在单独使用时，在标签上配置的是 `props` ，在 `form` 集成中，需要在组件 props 下，配置 `props` 字段

:::

<demo-block>

<Address-demo4 />

<template #code>

@[code](@demoroot/Address/demo4.vue)

</template>

</demo-block>
