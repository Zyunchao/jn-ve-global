# Table

在 [Element Table](https://element-plus.gitee.io/#/zh-CN/component/table) 的基础上，进行配置化的封装

实现了：

* 配置化 Column 
* 定制化样式
* 集成分页

表格与 [Form](/modules/Form.html#旧) 存在类似的问题，在使用 Element Table 时，要在 `<template>` 中配置多个 `<el-table-column>` 重复的配置及冗长的代码妨碍视觉，使代码可读性变差

当前组件的封装与 [Form](/modules/Form) 理念类似，都是通过配置对象，内部依照规则生成对应的模板，减少开发时 `<template>` 的代码量

## 样例

### 基础使用

<demo-block>

<Table-demo1 />

<template #code>

@[code vue{64-75}](@demoroot/Table/demo1.vue)

</template>

</demo-block>

### 自定义列

通过 Column 的 `render` 实现自定义渲染

<demo-block>

<Table-demo2 />

<template #code>

@[code vue{34-61}](@demoroot/Table/demo2.vue)

</template>

</demo-block>

### 多级表头

通过 column 的 `children` 字段，进行无限嵌套

<demo-block>

<Table-demo3 />

<template #code>

@[code vue{33-48}](@demoroot/Table/demo3.vue)

</template>

</demo-block>

### 多选

多选功能可一键开启 `config.showSelection = true` ，摒弃 Element 的添加一列 column 的配置（内部依旧通过 添加 type 为 `selection` 的 column 实现）<br/>
便捷获取已选数组 `config.selectedRows = []` <br/>
可维护多选状态，跨页多选，主动设置多选

<demo-block>

<Table-demo4 />

<template #code>

@[code vue{50-54}](@demoroot/Table/demo4.vue)

</template>

</demo-block>

### 更多示例

请参考 [Element Table](https://element-plus.gitee.io/#/zh-CN/component/table)

## GTable :config 配置列表

### Table Attributes

组件一级配置：interface **TableConfig**

除去扩展字段，请参考 [Element Table Attributes](https://element-plus.gitee.io/#/zh-CN/component/table#table-attributes)

扩展字段：
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
columns | 列的配置 | TableColumnProps[] | []
instance | 表格实例，用来调用表格的方法 | [TableInstance](https://element-plus.gitee.io/#/zh-CN/component/table#table-methods) \| null | null
pagination | 分页配置，不包含则无分页 | PaginationProps \| null \| undefined | --
showSelection | 开启多选 | boolean | --
selectedRows | 已选列表：获取已选列表 + 维护多选状态，不传递则不维护多选状态 | TBD[] | --

### Table-column Attributes

二级配置：interface **TableColumnProps**

除去扩展字段，请参考 [Element Table-column Attributes](https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes)

扩展字段：
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
render | 自定义渲染列 | (row?: BaseTableDataItem, index?: number) => JSX. Element \| VNode \| string \| number | --
children| 多级嵌套表头 | TableColumnProps[] | --

### Pagination Attributes

二级配置：interface **PaginationProps**

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
show | 是否显示，不传递(undefined)或传递 true 表示显示 | boolean | undefined
pageSize| 页面数据数量 | number | --
currentPage | 当前页码 | number | --
total | 数据总量 | number | --
onChange | 分页变化 | (currentPage?: number, currentPageSize?: number) => void | --
