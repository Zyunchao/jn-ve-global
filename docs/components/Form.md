# Form

在 [Element Form](https://element-plus.gitee.io/#/zh-CN/component/form) 的基础上，使其配置化的二次封装

实现了：

* Item 配置化
* 便捷的实例获取
* 多种方式配置控件（预定义 + render）

## 思想

在开始查看示例之前，最好先理解下当前组件的封装思想

### 旧

Element 已经提供了功能丰富的 Form 组件，但我们在使用时多是复制及创建一堆的 `<form-item>` + 内部控件如 `<el-input>` ，
根据业务需求，排列出我们需要的表单，就造成了在 `<template>` 中存在过多的代码行，要进行更换某个控件时，还要去一堆标签中寻找

就像这样：

![ele-form-temp](/images/ele-form-temp.png)

在以往的使用中，痛点在于：

1. 冗长的 tamplate
    > 妨碍其他组件的视觉，不利于阅读

2. 重复的复制粘贴
    > 即使有现成的 `<form-item>` 供我们粘贴使用，但我们依然需要重复的去修改每一个 `<form-item>` 的 `props`

3. 重复的控件配置
    > 我们在配置 formItem 的同时还要配置 item 的控件，这些都是重复的工作

### 新

当前组件通过数据的配置，解决了冗长的模板，避免了重复的复制粘贴，使控件高度灵活可配 <br/>

数据模型基于一个分层概念，拿一个表单示例：

![form-layer](/images/form-layer.png)

一个业务表单，应该由 `外层 form` + `form-item` + `control` 构成，完全对应 Element 中的 Form 组件的构成；<br/>
而当前组件的配置对象，就像这个层次一样，是多维的嵌套，每一层决定对应的层级的配置。

:::tip 配置属性来源
配置对象中的每一层可配置属性，皆来自 Element 组件中对应的层级的 Props，只不过是在当前组件库内定义为了接口<br/>
而在组件内部，实际上是通过 `v-bind` 的方式，将各配置属性传递下去
:::

## 样例

### 已支持的控件

* [Input](https://element-plus.gitee.io/#/zh-CN/component/input)
* [InputNumber](https://element-plus.gitee.io/#/zh-CN/component/input-number)
* [Select](https://element-plus.gitee.io/#/zh-CN/component/select)
* [Radio](https://element-plus.gitee.io/#/zh-CN/component/radio)
* [RadioButton](https://element-plus.gitee.io/#/zh-CN/component/radio)
* [Switch](https://element-plus.gitee.io/#/zh-CN/component/switch)
* [TimePicker](https://element-plus.gitee.io/#/zh-CN/component/time-picker)
* [TimeSelect](https://element-plus.gitee.io/#/zh-CN/component/time-select)
* [DatePicker](https://element-plus.gitee.io/#/zh-CN/component/date-picker)
* [DateTimePicker](https://element-plus.gitee.io/#/zh-CN/component/datetime-picker)
* [Checkbox](https://element-plus.gitee.io/#/zh-CN/component/checkbox)
* [CheckboxButton](https://element-plus.gitee.io/#/zh-CN/component/checkbox)
* [ColorPicker](https://element-plus.gitee.io/#/zh-CN/component/color-picker)
* [Rate](https://element-plus.gitee.io/#/zh-CN/component/rate)
* [Slider](https://element-plus.gitee.io/#/zh-CN/component/slider)
* [SelectTree](/element-component/modules/SelectTree.html)
* [FigureInput](/element-component/modules/FigureInput.html)
* [IconPicker](/element-component/modules/IconPicker.html)
* [Upload](/element-component/modules/Upload.html)

<demo-block>

<Form-demo1 />

<template #code>

@[code vue{23-246}](@demoroot/Form/demo1.vue)

</template>

</demo-block>

如上样例所示，使用该组件完全解放了 `<template>` ，整个表单完全交由数据模型管理，虽然这个数据模型的配置也很长，但是一般采用的方式是将这个数据模型整个**抽离出去**，作为一个单独的**js模块**，这样一来，主模块就会变得很干净了。

而对于表单的操作，就变成了对这个数据模型的操作

:::tip 注意
由于表单配置对象一般要在后续进行操作，所以，在定义这个配置对象时，一定要配置成响应式对象
:::

### 自定义渲染 label

FormItem.label 可以传递字符串，也可以传递一个函数： `(prop?: any) => JSX. Element | VNode | string | number`

:::tip 注意

非自定义的 label，控件的 `placeholder` 将拼接 label 的值，但是自定义的 label 将无法拼接 `placeholder` ，故在使用自定义渲染 label 时，要为控件传递 `placeholder`

:::

<demo-block>

<Form-customLabel />

<template #code>

@[code](@demoroot/Form/customLabel.vue)

</template>

</demo-block>

### 自定义控件

对于 “第三层” 配置，存在两种配置方式：

* 一种是预配置方式，即上述样例中的 `controlConfig`
* 另一种就是使用自定义渲染函数 `render`

有些不常用的控件并没有封装进当前 Form 组件，也有可能存在一些需要自定义的控件，或将 FormItem 作为布局组件使用，这些都可以使用 `render` 来实现

:::tip 注意
Form 组件内部 item 的生成时，依赖 formItem 的 `prop` 属性，且与内部 `model` 的关联也依赖 `prop` ，
即使自定义控件不需要与 `model` 交互，也需要定义唯一的 `prop`

:::

<demo-block>

<Form-demo2 />

<template #code>

@[code vue{54-76}](@demoroot/Form/demo2.vue)

</template>

</demo-block>

如上样例所示，通过配置对象中的 `instance` 字段，可以拿到表单实例，实际上是表单的 `ref` ，可以用来调用 Element Form 提供的方法

而对于数据的收集，直接获取配置对象中的 `model` 对象即可

:::tip
对于Form 组件来说 `instance` 和 `model` 是至关重要的
:::

### 表单校验

表单的校验配置方式可分为两种

* 将所有的要校验的字段配置到 “第一层” Form.rules
* 各 FormItem 自己携带配置 FormItem.rules

校验是基于 **async-validator** 这个库的，可配置内容如下

```typescript
interface RuleItem {
    type?: RuleType;
    required?: boolean;
    pattern?: RegExp | string;
    min?: number;
    max?: number;
    len?: number;
    enum?: Array<string | number | boolean | null | undefined>;
    whitespace?: boolean;
    fields?: Record<string, Rule>;
    options?: ValidateOption;
    defaultField?: Rule;
    transform?: (value: Value) => Value;
    message?: string | ((a?: string) => string);
    // 异步自定义校验
    asyncValidator?: (
      rule: InternalRuleItem, 
      value: Value, 
      callback: (error?: string | Error) => void, 
      source: Values, options: ValidateOption
    ) => void | Promise<void>;
    // 自定义校验
    validator?: (
      rule: InternalRuleItem, 
      value: Value, 
      callback: (error?: string | Error) => void, 
      source: Values, 
      options: ValidateOption
    ) => SyncValidateResult | void;
}

// 适应 Element 的控件，配置触发方式
interface ExtendRuleItem extends RuleItem {
    trigger?: 'blur' | 'change'
}
```

#### 添加给 FormItem.rules

<demo-block>

<Form-demo3 />

<template #code>

@[code vue{32}](@demoroot/Form/demo3.vue)

</template>

</demo-block>

#### 添加给 Form.rules

<demo-block>

<Form-demo4 />

<template #code>

@[code vue{27-38}](@demoroot/Form/demo4.vue)

</template>

</demo-block>

由上可见，两种添加方式是等效的

### 控件组

一个 FormItem 中可配置多个控件，行成控件组；

将 ControlConfig 更换成 `ControlConfigs` 即可配置控件组

<demo-block>

<Form-controlGroup />

<template #code>

@[code](@demoroot/Form/controlGroup.vue)

</template>

</demo-block>

### 控件内容超出宽度，显示 ToolTip

目前仅 Input 控件做了适配

<demo-block>

<Form-showToolTip />

<template #code>

@[code](@demoroot/Form/showToolTip.vue)

</template>

</demo-block>

## GForm :config 配置列表

### Form Attributes

一层配置：interface **FormProps**

除去扩展字段，请参考 [Element Form Attributes](https://element-plus.gitee.io/#/zh-CN/component/form#form-attributes)

扩展字段：

参数|说明|类型|默认值
-----|-----|-----|-----
instance|表单的实例（实际为 ref）| [FormInstance](https://element-plus.gitee.io/#/zh-CN/component/form#form-methods) \| null | null
formItems | 生成表单 item 的配置列表 | FormItemProps[] | []
gutter| 栅格间隔 | number | 20
colon | 表示是否显示 label 后面的冒号| boolean | true

### Form-Item Attributes

二层配置：interface **FormItemProps**

除去扩展字段，请参考 [Element Form-Item Attributes](https://element-plus.gitee.io/#/zh-CN/component/form#form-item-attributes)

扩展字段：

参数|说明|类型|默认值
-----|-----|-----|-----
controlConfig | 控件配置 | ControlConfig | --
render | 控件渲染函数 | (prop?: any) => JSX. Element \| VNode | --
span| FormItem 所占的栅格（1 - 24） | number | 6
class | 当前 formItem 的 className | string | --
hide | 隐藏 item | boolean | --
group | item 的类别组，无实际控制，做鉴别字段 | string \| string[] | --
controlConfigs| 控件组（一个 item 多个控件）| ExtendControlConfig[] | --

### ControlConfig

三层配置：interface **ControlConfig**

请参考源码各控件的 `ControlConfig interface` + 各控件文档

基本字段：

参数|说明|类型|默认值
-----|-----|-----|-----
type | 控件类型 | string | --
options | 待选列表 | array | --
props | 具体的控件的配置对象 | {} | --

### ExtendControlConfig

继承 ControlConfig

扩展字段：

参数|说明|类型|默认值
-----|-----|-----|-----
after | 控件的后缀（两个控件间的分隔符） | string | --