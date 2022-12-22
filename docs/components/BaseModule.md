# BaseModule

[[toc]]

## 前言

基础的增删改查模块组件化

基于 [Form](/element-component/modules/Form) && [Table](/element-component/modules/Table)

在查看当前组件前，最好已经阅读过当前组件库的 Form 和 Table 的文档

## 基础使用

<demo-block>

<BaseModule-demo1 />

<template #code>

@[code](@demoroot/BaseModule/demo1.vue)

</template>

</demo-block>

基础模块实际就是将 Form 和 Table 做了一个固定的布局组合，并将参数简化

:::tip
在传递 “搜索条件” 的表单配置时，不需要传递最后一个 按钮组的 `FormItem` ，组件内部会自动追加，当然，如果自己配置了，内部将不再追加
:::

## 更多查询（隐藏部分查询条件）

某些业务场景拥有众多的查询条件，致使过分的挤压表格的高度，此功能可以隐藏部分查询条件，默认显示一行查询条件，其他查询条件将被隐藏；<br/>
展示更多的查询条件分为两种行为：

* 下拉展示
* 弹框展示（弹框、搜索框公用一个 form 表单配置）

根据需要选择使用模式

:::tip 注意

组件的初始状态将只显示第一行的搜索条件，可以把重要的查询条件尽量的放到前面

:::

### 弹框模式

<demo-block>

<BaseModule-moreSearchPopup />

<template #code>

@[code](@demoroot/BaseModule/moreSearchPopup.vue)

</template>

</demo-block>

### 下拉模式

<demo-block>

<BaseModule-moreSearchPullDown />

<template #code>

@[code](@demoroot/BaseModule/moreSearchPullDown.vue)

</template>

</demo-block>

## 自定义内容

详见底部 slot 列表

<demo-block>

<BaseModule-coreCustom />

<template #code>

@[code](@demoroot/BaseModule/coreCustom.vue)

</template>

</demo-block>

## 带有 Tabs 的标签

在父组件中，通过双向绑定（数据驱动事件处理），可以拿到激活的标签的值，多是通过监听这个值，进行业务的处理

<demo-block>

<BaseModule-tabs />

<template #code>

@[code](@demoroot/BaseModule/tabs.vue)

</template>

</demo-block>

## 多选

:::tip
BaseModule 中的多选和 Table 的多选一致，有一个区别是 selectedRows 的绑定要以双向绑定的形式传递（内部需要抛出）

传递的 showSelection 将以 attr 的方式传递给 Table 组件
:::

<demo-block>

<BaseModule-selecttion />

<template #code>

@[code](@demoroot/BaseModule/selecttion.vue)

</template>

</demo-block>

## 布局模式

:::tip

基于不同组的业务需求，提供了不同的布局模式，原有使用方式不变，增加 `mode` api 传递

:::

已支持模式：

* classic：经典模式
* tabular：扁平化模式

### 更多弹出

<demo-block bg='#f3f4f5'>

<BaseModule-moreSearchPopupTabular />

<template #code>

@[code](@demoroot/BaseModule/moreSearchPopupTabular.vue)

</template>

</demo-block>

### 更多下拉

<demo-block bg='#f3f4f5'>

<BaseModule-moreSearchPullDownTabular />

<template #code>

@[code](@demoroot/BaseModule/moreSearchPullDownTabular.vue)

</template>

</demo-block>

### 注意：

由于历史原因，当前组件的模式配置，分为两种配置方式

* 全局
* 组件

组件级别 > 全局

其中，全局又分为：

* 基座全局
* 微应用全局

微应用全局 > 基座全局

:::tip

目前，基座已经根据项目组，全局化配置组件的模式，即项目组划分默认模式

* 监管：经典模式
* 新核心：扁平化

:::

如果微应用需要统一管理模式，请参考微应用全局配置方式：

注册组件库时，传递参数 `baseModuleMode: 'tabular' 或 'classic'`

```ts
app.use(ElementPlus, { locale })
    .use(router)
    .use(api)
    .use(GlobalComponents, {
        baseModuleMode: 'tabular' // 'classic'
    })
    .use(LGlobalComponents)
    .use(store, key)
    .use(VueGridLayout)
    .use(directives)
    .use(microLifecycle)
    .mount('#app')
```

## Attributes

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
mode | 布局模式 | 'classic' \| 'tabular' | 'classic'
searchFormProps | 搜索条件表单配置对象 | [FormProps](/element-component/modules/Form.html#form-attributes) | null
tableColumns | 表格列配置 | [TableColumnProps](/element-component/modules/Table.html#table-column-attributes) | []
tableData | 表格数据 | BaseTableDataItem[] | []
tablePagination | 分页配置 | [PaginationProps](/element-component/modules/Table.html#pagination-attributes) | null
btns | 按钮组 | [BtnProps](./ButtonGroup.md)[] | []
searchBtnHorizontal | 搜索按钮是否独占一行 | boolean | false
loadTableMethods | 核心加载 table 数据的方法 | Function | --
tableLoading | 表格 loading flag | boolean | false
noSearchLabel | 去除 “查询条件” label | boolean | false
searchBtnAuthCode | 搜索按钮的鉴权 code | string | --
moreSearchMode | 更多查询展示方式 | 'pull-down' \| 'popup' | undefined
rowBtnConfig | 表格操作列配置对象 | TableConfig['rowBtnConfig'] | null
tabs | 标签页配置数组 | Array<{ lable: string; value: string }> | []
v-model:activeTab \| :activeTab | 双向绑定的激活的 tab 页的 value 值 | string | 默认第一个 tab 的 value
v-model:selectedRows | 多选绑定的数组，不传递表示不维护选中列表 | array | null

## Events

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
@getTableInstance | 抛出表格实例 | (instance: TableMethods) => void | --
@reset | 重置钩子 | Function | --
@search | 查询钩子 | Function | --

## Slot

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
core | 替换表格，使用自定义内容 | -- | --
middle-right | 按钮右侧的内容 | -- | --

## defineExpose

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
tableConfig | 内部实际表格配置 | TableConfig | --
tableInstance | 表格实例 | TableConfig['instance'] | null
tableSearchRef | 搜索组件的实例 | VNode | --
