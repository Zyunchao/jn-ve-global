# InfoSelect

下拉框本身只能显示有限的数据（label），一些业务情况需要展示更多的信息，就像表格那样，以多列的形式展示；
当前组件虽然是以多列展示的，本质上还是使用的 下拉框的自定义渲染，只不过每一个 OptionItem 都使用‘表格’的配置，进行了多元素的渲染

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

## 基础使用

<demo-block>

<InfoSelect-demo1 />

<template #code>

@[code](@demoroot/InfoSelect/demo1.vue)

</template>

</demo-block>

## 表单集成

<demo-block>

<InfoSelect-formDemo />

<template #code>

@[code](@demoroot/InfoSelect/formDemo.vue)

</template>

</demo-block>

## Attributes

基础属性请参考 [Element Select2](https://element-plus.gitee.io/zh-CN/component/select-v2.html#selectv2-%E5%B1%9E%E6%80%A7)

### 扩展属性

参数|说明|类型|默认值
-----|-----|-----|-----
optionsData | 下拉框数据 | SelectOptionProps[] | []
columns | option 展示的列 | InfoColumnProps[] | []
optionProps | option item 绑定的值 | { value: string; label: string} | { value: 'id', label: 'name'}
