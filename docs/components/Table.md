# Table

在 [Element Table](https://element-plus.gitee.io/#/zh-CN/component/table) 的基础上，进行配置化的封装

实现了：

* 配置化 Column 
* 定制化样式
* 集成分页

表格与 [Form](/element-component/modules/Form.html#旧) 存在类似的问题，在使用 Element Table 时，要在 `<template>` 中配置多个 `<el-table-column>` 重复的配置及冗长的代码妨碍视觉，使代码可读性变差

当前组件的封装与 [Form](/element-component/modules/Form) 理念类似，都是通过配置对象，内部依照规则生成对应的模板，减少开发时 `<template>` 的代码量

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

* 多选功能可一键开启 `config.showSelection = true`

:::danger
在 `1.1.0` 版本之前，多选采用与 Element 相同的配置方式（添加 `type: 'selection'` 的 column），新版本不兼容老的写法，请将项目中的多选表格修改为新版写法
:::

* 便捷获取已选数组 `config.selectedRows = []` <br/>
* 可维护多选状态，跨页多选，主动设置多选

:::tip
如果不配置 `selectedRows` 将被认为不维护勾选数组，勾选行为由用户自由控制
:::

<demo-block>

<Table-demo4 />

<template #code>

@[code vue{50-54}](@demoroot/Table/demo4.vue)

</template>

</demo-block>

### 行内编辑

:::danger 在使用行内编辑的时候，内部会涉及到如下性能敏感操作：

* 单元格双击事件绑定
* 控件频繁创建与销毁
* 使用定时器
* 为 `document` 添加 `Escape` 事件
* `ResizeObserver` 的使用

表格本身就是数据量比较大的控件，如果过度使用行内编辑，将带来较大的性能开销

:::

:::tip 使用行内编辑时，请遵循如下准则：
如果是不分页表格（数据量过大），请勿使用行内编辑； <br/>
非修改的字段，请勿定义为“可编辑”； <br/>
“左右固定（ `fixed: 'left' | 'right'` ）” 的列，应避免定义为 “可编辑”；
:::

行内编辑的一个核心理念：**对表格数据某一行（dataList 中某一条数据）的操作**；

其实就是将 Form 中的 model 操作换了一个场景操作，本身还是对于后台数据进行操作；

其中包含：

* 字段修改
* 字段校验
* 发送数据

行内编辑也是基于各种控件完成的，为了降低使用成本，控件的配置和表单的配置几乎是一致的（表格内控件暂未提供自定义渲染）

已支持的控件包括：

* [Input](https://element-plus.gitee.io/#/zh-CN/component/input)
* [InputNumber](https://element-plus.gitee.io/#/zh-CN/component/input-number)
* [Select](https://element-plus.gitee.io/#/zh-CN/component/select)
* [Radio](https://element-plus.gitee.io/#/zh-CN/component/radio)
* [TimePicker](https://element-plus.gitee.io/#/zh-CN/component/time-picker)
* [TimeSelect](https://element-plus.gitee.io/#/zh-CN/component/time-select)
* [DatePicker](https://element-plus.gitee.io/#/zh-CN/component/date-picker)
* [DateTimePicker](https://element-plus.gitee.io/#/zh-CN/component/datetime-picker)
* [Checkbox](https://element-plus.gitee.io/#/zh-CN/component/checkbox)
* [ColorPicker](https://element-plus.gitee.io/#/zh-CN/component/color-picker)
* [Rate](https://element-plus.gitee.io/#/zh-CN/component/rate)
* [Slider](https://element-plus.gitee.io/#/zh-CN/component/slider)
* [InfoSelect](./InfoSAA/InfoSelect.md)
* [InfoSelect](./InfoSAA/InfoSelectAll.md)
* [InfoAutocomplete](./InfoSAA/InfoAutocomplete.md)
* [SelectTreeV2](./SelectTreeV2.md)

#### 单字段编辑

行内编辑拥有两种编辑模式：

* 单字段编辑（鼠标双击单元格`dblclick`）
* 整行编辑（需要为表格行数据添加额外字段）

:::danger
自 1.5.2 版本起，单字段编辑需要手动开启，为需要单字段编辑的列，添加 `openDB: true`

:::

:::tip 注意
在使用可编辑表格定义 Columns 时，如果有需要动态填充数据（如为 Select 填充待选项）的情况，Columns 一定要定义成响应式对象
:::

基本使用：在 Column 中定义 `editable: true` ，然后配置 `controlConfig` 。

多数情况下，一些字段要展示的值和后台存储的值并不一致，我们多需要进行数据的转换，当前组件我们多使用 `render` 来实现单元格的自定义渲染，
同样的，“可编辑” 单元格也是支持 `render` 的，详情请参考如下 `Select` 等。

:::tip 控件绑定值注意项
在 “可编辑单元格” 中，控件将会绑定表格数据中的某一条数据中的某一个字段（ `prop` ），对于普通的以 `string | number` 格式的控件，我们无需做特殊处理。

但有一些（如： `Select多选` ， `CheckBox` ， `timePicker` ）控件在使用时需要绑定特殊格式的字段，所以我们要对表格数据对应的字段做符合控件绑定值格式的处理。

而对于不符合控件需求的字段值，内部将抛出错误，不予创建控件（可参考 `TimePicker` 第一行数据）
:::

目前已知需要特殊处理字段的控件：

* 多选的 Select：`any[]`
* TimePicker：`Date`
* DatePicker
  + 未传递 valueFormat：`Date`
  + 传递了 valueFormat：`string`
* Daterange
  + 未传递 valueFormat：`Date[]`
  + 传递了 valueFormat：`string[]`
* Checkbox：`any[]`
* 多选的 SelectTree：`any[]`
* Slider：`number`

:::tip
按 `esc` 可退出编辑， `esc` 退出编辑拥有最高权限
:::

:::tip 注意
在使用 FigureInput 组件作为行内编辑时，表格内部会采用传递给 FigureInput 组件的 fomat 方法格式化表格的文本显示；<br/>

也可使用 render 格式化表格的展示数据
:::

<demo-block>

<Table-demo5 />

<template #code>

@[code vue{334-339}](@demoroot/Table/demo5.vue)

</template>

</demo-block>

:::tip
编辑完成时，组件会向外抛出 `onCellEdited` 事件，在该事件里做后续操作，如：发送修改请求，**字段联动**...
:::

#### 整行编辑

为表格数据的每一行添加一个 `edit: boolean` 的字段，后续操作这个 edit 字段即可操作整行的 “编辑” 状态

> - true: 编辑
> - false: 字段展示

表格内操作的优先级： `Escape` > 单元格校验 > 行内编辑 > 单字段编辑

:::tip
整行编辑时， `onCellEdited` 事件将失效，后续的操作由事件驱动改变为数据模型驱动，即一切操作皆由数据体现

* 发送请求：应在行的 edit 字段为 false （校验失败，将组织整行的控件切换）的前提下进行
* 字段联动：需要使用 watch 监听具体的字段（监听整个数组，然后获取对应的行及下属字段），然后进行同一条数据不同字段的联动处理
:::

<demo-block>

<Table-demo6 />

<template #code>

@[code vue{165-168}](@demoroot/Table/demo6.vue)

</template>

</demo-block>

#### 单元格校验

校验功能使用和 Form 相同的校验配置方式，内部使用 [async-validator](https://github.com/yiminghe/async-validator) 实现

单元格校验的优先级仅次于 `esc` ，意味着如果校验不通过，将阻止后续操作，如：切换控件、 `onCellEdited` 的触发、行编辑取消

:::tip
在使用校验的时候，行编辑在保存数据（完成编辑）时，应该主动判断当前换行数据的 `edit` 是否为 true

组件内部在某一单元格校验不通过是，会将 `row.edit` 重新置为 true，之间有间隙，故需要使用 `nextTick` 去判断其准确的状态值
:::

<demo-block>

<Table-demo7 />

<template #code>

@[code vue{157-161}](@demoroot/Table/demo7.vue)

</template>

</demo-block>

#### 控件事件获取整行数据

:::tip 2.0.5+ 版本

需求：原本可编辑单元格的每个控件的事件（onChange/onInput...），都是独立的（未与行数据产生关联关系），要在事件中获取当前行的数据，较为复杂，可不可以在事件中直接抛出这一行数据

实现方案：通过 apply 包装增强每个控件的事件处理函数，抛出当前行数据（Proxy{data}、index）

获取行数据：需要获取到事件处理函数的 arguments 的最后一个下标位置的数据，即抛出的行数据

注意点：抛出的行数据并非显性抛出

:::

:::danger 特别提示：

在使用时，需要对函数的 arguments 有一定了解，箭头函数的 arguments 是词法作用域的父级的 arguments，也就是说，要获取当前行数据，事件处理函数不能使用箭头函数

:::

:::tip

事件抛出的 row 是一个 Proxy，意味着你可以直接操作这个对象，用来改变其他列的数据

:::

<demo-block>

<Table-demo8 />

<template #code>

@[code vue{41-47}](@demoroot/Table/demo8.vue)

</template>

</demo-block>

### 动态隐藏列

:::tip 注意

* 在动态进行列的显隐时，必须将对应的 tableColumns 设置为响应式对象，否则，columns 的变化将不能及时的响应的页面上
* 一定要在改变列的 hide 值后，使用 nextTick 调用 table 的 doLayout 方法，否则将会有可能造成列的布局错乱，同时也要给对应的 column 添加宽度（width）的配置

:::

<demo-block>

<Table-hideColumnDemo />

<template #code>

@[code](@demoroot/Table/hideColumnDemo.vue)

</template>

</demo-block>

### 操作按钮配置化

:::tip 注意

操作列配置化于 1.5.0 起适用

按钮的条件创建、条件显隐，都有 `btn.hide` 控制， `btn.hide` 可以直接传递布尔值，也可以传递一个接受当前行 + 行index 且返回布尔值 的函数

:::

在以往的表格使用中，操作列都是以 render 函数的方式增加，痛点在于：

1. html 结构使得配置变得冗长
2. 分模块配置时，配置文件与主文件不在一个作用域，无法便捷的使用主作用域中的变量

基于各组件功能按钮的配置方式，现将表格的操作列的按钮提取成配置方式，**并扩展了按钮条件隐藏到更多操作中**

<demo-block>

<Table-oprationColumnConfiger />

<template #code>

@[code](@demoroot/Table/oprationColumnConfiger.vue)

</template>

</demo-block>

### 更多功能示例

请参考 [Element Table](https://element-plus.gitee.io/#/zh-CN/component/table)

## GTable :config 配置列表

### Table Attributes

组件一级配置： `interface TableConfig`

除去扩展字段，请参考 [Element Table Attributes](https://element-plus.gitee.io/#/zh-CN/component/table#table-attributes)

扩展字段：
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
columns | 列的配置 | TableColumnProps[] | []
instance | 表格实例，用来调用表格的方法 | [TableInstance](https://element-plus.gitee.io/#/zh-CN/component/table#table-methods) \| null | null
pagination | 分页配置，不包含则无分页 | PaginationProps \| null \| undefined | --
showSelection | 开启多选 | boolean | --
selectedRows | 已选列表：获取已选列表 + 维护多选状态，不传递则不维护多选状态 | TBD[] | --
onCellEdited | 编辑完成事件 | (row: TBD, index?: number \| string, field?: string) => void | --
pastable | 可粘贴的表格 | boolean | --
onPasted | 粘贴完成事件 | (tableData: TBD[]) => void | --
rowBtnConfig | 操作列（每一行的操作按钮）配置对象 | RowBtnConfig（见下表） | null

### Table-column Attributes

二级配置： `interface TableColumnProps`

除去扩展字段，请参考 [Element Table-column Attributes](https://element-plus.gitee.io/#/zh-CN/component/table#table-column-attributes)

扩展字段：
参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
render | 自定义渲染列 | (row?: BaseTableDataItem, index?: number) => JSX. Element \| VNode \| string \| number | --
children| 多级嵌套表头 | TableColumnProps[] | --
editable | 启用行编辑 | boolean | --
controlConfig | 可编辑行控件配置 | TableEditCellControlConfig | --
rules | 校验配置 | RuleItem \| RuleItem[] | --
excelValueFormat | 粘贴数据的字段格式化规则 | (currentField: string \| number, preField?: any, index?: number) => string \| number \| boolean \| Date \| any[] \| object | --
hide | 标识列是否隐藏 | boolean | --
openDB | 是否开启可编辑单元格的双击转编辑 | boolean | false

### Pagination Attributes

二级配置： `interface PaginationProps`

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
show | 是否显示，不传递(undefined)或传递 true 表示显示 | boolean | undefined
pageSize| 页面数据数量 | number | --
currentPage | 当前页码 | number | --
total | 数据总量 | number | --
onChange | 分页变化 | (currentPage?: number, currentPageSize?: number) => void | --

### RowBtnConfig

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
btns | 按钮组配置 | TableRowBtnProps\<TBD\>[] | []
maxCount | 最多显示几个按钮，超出部分将于更多操作内显示 | number | --
width | 操作列的宽度 | number | 200
hide | 是否隐藏按钮列 | boolean | false
fixed | 列是否固定在左侧或者右侧。 true 表示固定在左侧 | true \| 'left' \| 'right' | 'right'
label | 列标题 | string | '操作'
align | 对齐方式 |  'left' \| 'center' \| 'right' | 'right'

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
    /**
     * 按钮的类型，同 Element Button
     */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    /**
     * 禁用
     */
    disabled?: boolean | ((row?: any, index?: number) => boolean)
    /**
     * 事件
     */
    onClick?: () => void
    /**
     * 按钮尺寸
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 加载中
     */
    loading?: boolean
    /**
     * 是否为朴素按钮
     */
    plain?: boolean
    /**
     * 是否为圆角按钮
     */
    round?: boolean
    /**
     * 是否为圆形按钮
     */
    circle?: boolean
    /**
     * 是否隐藏
     */
    hide?: boolean | ((row?: any, index?: number) => boolean)
    /**
     * 类名
     */
    class?: string
    /**
     * 具体的行内样式
     */
    style?: { [k: string]: any } | string
}

interface TableRowBtnProps<TBD> extends BtnProps {
    /**
     * 按钮点击事件
     */
    onClick?: (row?: TBD, index?: number) => void
}
```
