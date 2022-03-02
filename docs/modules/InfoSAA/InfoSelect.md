# InfoSelect

组件基于 [Element Select](https://element-plus.gitee.io/zh-CN/component/select.html)

下拉框本身只能显示有限的数据（label），一些业务情况需要展示更多的信息，就像表格那样，以多列的形式展示；

当前组件虽然是以多列展示的，本质上还是使用的下拉框的自定义渲染，只不过每一个 OptionItem 都使用 **“表格”** 的配置，进行了多元素的渲染

:::tip
组件下拉选项数据拥有两个核心属性：

value: 绑定的值；<br/>
label: 展示在下拉框中得值

对于表格的多列展示，只在下拉面板中起展示作用的，传入的数据的字段可以不带有这两个字段，内部通过传递的 optionsProps 所定义的映射字段，进行这两个字段的映射；

也可以在传递数据之前，自行映射这两个字段，组件内部如果探查到数据中包含 value 或 label 字段，就不再对字段进行映射；

:::

:::tip 重要

组件的数据是基于查询条件的，组件会通过 `paramsChange` 事件将参数抛出，基于参数的变化，发送请求，更新下拉列表的数据

抛出的数据带有默认的 pageSize 值，下拉框一次不宜渲染太多数据，默认取 10

:::

:::warning 须知

因为组件的下拉数据是分页的，选中的数据仅对当前页的下拉数据有选中效果，切换到对应的分页也可以展示到选中的样式

:::

## 基础使用

查询控件的配置是基于每一个 column 的，其中

* isQuery：配置是否为搜索条件
* queryType：控件类型，目前仅支持 `input` 和 `select`
* querySelectOptions：`select` 控件必须的下拉选项

column 配置的 `prop` 将作为抛出参数的字段名称

<demo-block>

<InfoSAA-infoSelect-index />

<template #code>

@[code](@demoroot/InfoSAA/infoSelect/index.vue)

</template>

</demo-block>

## 初始化

默认情况下，下拉框的选项弹框收起后，会将本次的查询条件（用户输入、分页）初始化，同时触发参数变化事件。

组件提供了关闭初始化的 Api： `initParamsOnPopperHide: false`

<demo-block>

<InfoSAA-infoSelect-closeInit />

<template #code>

@[code](@demoroot/InfoSAA/infoSelect/closeInit.vue)

</template>

</demo-block>

## 表单集成

<demo-block>

<InfoSAA-infoSelect-formInside />

<template #code>

@[code](@demoroot/InfoSAA/infoSelect/formInside.vue)

</template>

</demo-block>

## 表格集成

<demo-block>

<InfoSAA-infoSelect-tableInside />

<template #code>

@[code](@demoroot/InfoSAA/infoSelect/tableInside.vue)

</template>

</demo-block>

## Attributes

基础属性请参考 [Element Select 属性](https://element-plus.gitee.io/zh-CN/component/select.html#select-%E5%B1%9E%E6%80%A7)

### 扩展属性

参数|说明|类型|默认值
-----|-----|-----|-----
optionsData | 下拉框数据 | SelectOptionProps[] | []
columns | option 展示的列 | InfoColumnProps[]（见下 interface 的定义） | []
optionProps | option item 绑定的值 | { value: string; label: string} | { value: 'id', label: 'name'}
total | 分页总数 | number | 0
initParamsOnPopperHide | 是否在 popper 隐藏时初始化参数 | boolean | true
valueBindObj | value 值是否绑定为 data 的 item 对象 | boolean | false

## Events

Element 提供的事件请参考 [Element Select 事件](https://element-plus.gitee.io/zh-CN/component/select.html#select-%E4%BA%8B%E4%BB%B6)

参数|说明|类型|默认值
-----|-----|-----|-----
@paramsChange | 参数变化事件 | (params: object) => void | --
@closed | popper 关闭事件 | () => void | --

## interface InfoColumnProps

```ts
interface InfoColumnProps {
    /**
     * 显示的标题
     */
    label: string
    /**
     * 对应列内容的字段名，也可以使用 property 属性
     */
    prop: string
    /**
     * 对应列的宽度
     */
    width?: string | number
    /**
     * 自定义渲染
     */
    render?: (item?: any, index?: number) => JSX.Element | VNode | string | number
    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 当内容过长被隐藏时显示 tooltip
     */
    showOverflowTooltip?: boolean
    /**
     * 是否是查询条件
     * 当前列的 prop 将作为 查询字段抛出
     */
    isQuery?: boolean
    /**
     * 查询控件类型
     * 默认为 input，即不传递类型，就使用 input 控件
     */
    queryType?: 'input' | 'select'
    /**
     * 下拉框的待选列表
     */
    querySelectOptions?: {
        value: string | number
        label: string
    }[]
}
```
