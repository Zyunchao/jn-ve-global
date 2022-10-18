# Collapse

在 [Element Collapse](https://element-plus.gitee.io/zh-CN/component/collapse.html) 的基础上进行二次封装的折叠面板

* 定制样式
* 便捷传递表单、表格的配置
* 灵活自定义内容

## 便捷传递表单、表格

组件内置了表单、表格，只需要传递对应的配置，即可生成对应的组件

<demo-block>

<Collapse-formAndTable />

<template #code>

@[code](@demoroot/Collapse/formAndTable.vue)

</template>

</demo-block>

## 自定义内容

和 `el-collapse-item` 一直，传递默认 slot 即可

<demo-block>

<Collapse-custom />

<template #code>

@[code](@demoroot/Collapse/custom.vue)

</template>

</demo-block>

## 表单内部快捷配置 Collapse 布局

:::tip

在以往的开发中发现表单频繁使用 Collapse 布局方式，以往采用的多是一个 CollapseItem 配置一个表单对象，造成在收集字段及校验时，要进行多个表单的校验及数据拼接

这样的操作无疑对开发造成额外的负担，且降低了代码的可读性

:::

:::tip 自：
2.1.17-beta.13 起，formItems 可直接配置 `collapseItem` 类别，简化 Collapse 布局的开发方式

2.1.17-beta.13 起，formItems 可直接配置 `table` 类别
:::

这里需要理解 Collapse 的划分规则：

* 已知 `collapseItem` 是用来充当分类容器的，内部包裹的表单项相当于其子项，基于父子关系思想：
* 在 formItems 中所添加的 `controlConfig.type = 'collapseItem'` 被认为是其后面的 formItem 的父级
* 内部会自动查找划分，自当前 `collapseItem` 节点开始，到下一 `collapseItem` 节点结束，往复，直至 formItems 结尾
* 如果 `collapseItem` 的 `'isTail'` 标识为 true，则代表上一节点的结束位置
* 容器划分将从第一个 `collapseItem` 下标开始，再之前的 formItem 被认为不予控制分类，显示在第一个 `collapseItem` 之前

示例：

<demo-block>

<Collapse-formFast />

<template #code>

<CodeGroup>
  <CodeGroupItem title="vue" active>

@[code](@demoroot/Collapse/formFast.vue)

  </CodeGroupItem>

  <CodeGroupItem title="./data/formConfig.tsx" >

@[code tsx{152-163}](@demoroot/Collapse/data/formConfig.tsx)

  </CodeGroupItem>

  <CodeGroupItem title="./data/columns.tsx" >

@[code](@demoroot/Collapse/data/columns.tsx)

  </CodeGroupItem>
</CodeGroup>

</template>

</demo-block>

## CollapseItem Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
formConfig| 表单配置 | FormProps | null
tableConfig| 表格配置 | TableConfig | null
height| 高度，适用于表格 | number | 300
prefix | 图标 | string | --

## FormItem CollapseItem Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
disabled | 禁用 | boolean | false
prefix | 图标 | string | --
active | 是否展开 | boolean | true
isTail | 是否是尾巴，闭合标签作用 | boolean | false
