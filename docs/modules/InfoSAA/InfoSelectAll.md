# InfoSelectAll

思想同 `InfoSelect`

:::tip
组件基于 [Element Virtualized Select 虚拟化选择器](https://element-plus.gitee.io/zh-CN/component/select-v2.html)

意味着用户可以一次性加载所有数据，然后虚拟化渲染

搜索默认搜索绑定的 label 值，如需自定义搜索请参照Element官网的示例
:::

:::tip
组件拥有两个核心属性：

value: 绑定的值；<br/>
label: 展示在下拉框中得值

对于表格的多列展示，只在下拉面板中起展示作用的，传入的数据的字段可以不带有这两个字段，内部通过传递的 optionsProps 所定义的映射字段，进行这两个字段的映射；

也可以在传递数据之前，自行映射这两个字段，组件内部如果探查到数据中包含 value 或 label 字段，就不再对字段进行映射；

:::

## 与 InfoSelect 的区别

* 本组件使用虚拟滚动
* 可全量数据
* 查询方式交给用户控制，只需要对下拉数据赋值即可
* 无附加查询条件
* 无分页
* 可去除头部标题

## 基础使用

<demo-block>

<InfoSAA-infoSelectAll-index />

<template #code>

@[code](@demoroot/InfoSAA/infoSelectAll/index.vue)

</template>

</demo-block>

## 去除头部

对于一些有明确需求的列，可以选择隐藏表头

<demo-block>

<InfoSAA-infoSelectAll-hideHeader />

<template #code>

@[code](@demoroot/InfoSAA/infoSelectAll/hideHeader.vue)

</template>

</demo-block>

## 表单集成

<demo-block>

<InfoSAA-infoSelectAll-formInside />

<template #code>

@[code](@demoroot/InfoSAA/infoSelectAll/formInside.vue)

</template>

</demo-block>

## Attributes

基础属性请参考 [Element Select2 属性](https://element-plus.gitee.io/zh-CN/component/select-v2.html#selectv2-%E5%B1%9E%E6%80%A7)

### 扩展属性

参数|说明|类型|默认值
-----|-----|-----|-----
optionsData | 下拉框数据 | SelectOptionProps[] | []
columns | option 展示的列 | InfoColumnProps[] | []
optionProps | option item 绑定的值 | { value: string; label: string} | { value: 'id', label: 'name'}
optionMaxItemNum | 下拉列表最多显示的行数 | number | 7
hideHeader | 隐藏表头 | boolean | false
