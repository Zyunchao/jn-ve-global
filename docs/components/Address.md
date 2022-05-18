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
