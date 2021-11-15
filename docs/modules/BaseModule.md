# BaseModule

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

## Attributes

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
searchFormProps | 搜索条件表单配置对象 | [FormProps](/element-component/modules/Form.html#form-attributes) | null
tableColumns | 表格列配置 | [TableColumnProps](/element-component/modules/Table.html#table-column-attributes) | []
tableData | 表格数据 | BaseTableDataItem[] | []
tablePagination | 分页配置 | [PaginationProps](/element-component/modules/Table.html#pagination-attributes) | null
btns | 按钮组 | BtnProps[] | []
searchBtnHorizontal | 搜索按钮是否独占一行 | boolean | false
loadTableMethods | 核心加载 table 数据的方法 | Function | --
tableLoading | 表格 loading flag | boolean | false
noSearchLabel | 去除 “查询条件” label | boolean | false
searchBtnAuthCode | 搜索按钮的鉴权 code | string | --
moreSearchMode | 更多查询展示方式 | 'pull-down' \| 'popup' | undefined

```ts
interface BtnProps {
    /**
     * 按钮名称
     */
    label: string
    /**
     * 授权标识
     */
    authCode?: string
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 事件
     */
    onClick?: () => void
}
```

## Event

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
@getTableInstance | 抛出表格实例 | (instance: TableMethods) => void | --
