# FormGenerate

[[toc]]

## 前言

表单生成器，根据配置的 JSON 数据，生成动态的表单

在阅读本组件前，请确保对 [Form组件](../Form.md) 已经有较多使用经验

## 思想

JSON 可配置表单其实和日常开发中的 `formConfig` 配置的表单是一个东西，转换一下思想，将日常的所写的 formConfig 或 .tsx 内的配置，改成了 JSON 数据，以及 .json 文件

:::tip

无论是以哪种数据格式（数组 or JSON）书写，哪种文件（.tsx or .json）存放，它都是用来配置表单的，只不过现在我们将它改成了 json 的形式，且能够灵活的通过 后台获取

其实获取到的 json 还是会在组件内部转换、拼装、增强，改造成我们熟悉的 formConfig

**而需要特别注意的地方是，我们不能在 json 里面写函数（事件处理），所有的函数，都要以字符串的形式存储，涉及到函数的地方有：**

* 控件的事件处理函数
* 每一个 formItem 的自定义校验函数（validator）

:::

## 基本使用

传递给组件的配置对象可以是未格式化成 js 对象的 JSON，也可以是格式化好的 js 对象，内部会抹平差异

一般来说，使用 import 引用的 xxx.json 框架会将其格式化成对应的 js 对象，请求回来的 json 也同样会被格式化好

### 数据为 JSON

<demo-block>

<DynamicForm-FormGenerate-demo1 />

<template #code>

<CodeGroup>
  <CodeGroupItem title="示例代码" active>

@[code](@demoroot/DynamicForm/FormGenerate/demo1.vue)

  </CodeGroupItem>

  <CodeGroupItem title="demo1.json" >

```json
{
    "labelPosition": "right",
    "labelWidth": "120px",
    "formItems": [
        {
            "prop": "name",
            "label": "Input",
            "span": 12,
            "defaultValue": "Tiga",
            "controlConfig": { "type": "input" }
        },
        {
            "prop": "sex1",
            "label": "Select",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        },
        {
            "prop": "selectMValue",
            "label": "SelectMultiple",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "multiple": true
                }
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radio",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radioButton",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        }
    ]
}
```

  </CodeGroupItem>
</CodeGroup>

</template>

</demo-block>

### 数据为格式化好的 js 对象

<demo-block>

<DynamicForm-FormGenerate-demo2 />

<template #code>

@[code](@demoroot/DynamicForm/FormGenerate/demo2.vue)

</template>

</demo-block>

:::tip

JSON 的配置，所有的字段都是遵循 [Form 的三层配置](../Form.md#新)，使用 form 的每一层的 interface 的字段配置

所以在配置的时候，需要对 form 的配置接口有一定程度的了解

这里唯一增加的一个字段：FormItemProps 下新增了一个 `defaultValue` 字段，这个是用来<strong style="color: #ff3040; ">回填数据</strong>的
:::

## 获取数据

在表单的实际使用中，获取数据是获取表单配置下的 `model` ，操作表单实例（校验）是通过表单配置对象下的 `instance`

在表单生成器中，依旧遵循同样的思想，只不过获取配置对象的方式变了而已

:::tip

表单生成器内部实际抛出了当前组件的表单配置对象，通过给组件标签添加 ref，即可获取到表单的实例、model、formItems 等

:::

<demo-block>

<DynamicForm-FormGenerate-demo3 />

<template #code>

@[code vue{22-25}](@demoroot/DynamicForm/FormGenerate/demo3.vue)

</template>

</demo-block>

## 事件处理

:::tip

JSON 配置表单生成器，与以往的开发唯一不同点，就是函数以字符串的形式存储

注意：组件内部会将所有的事件处理函数进行增强，会将整个 `formConfig` 以 arguments 的最后一个下标传递给事件处理函数

当通过 arguments 拿到 formConfig 后，以为着你能够做以前开发的所有事件，包括不限于：

* 组件联动
* 触发校验

由于在书写事件时，和 form 表单的书写方式几乎一致，所以，需要后台配置人员对 form 的使用具有一定程度的了解

:::

:::danger

需要注意：所书写的字符串函数，必须是 function 声明的函数，不能以 箭头函数书写，因为内部要使用 this 和 arguments

由于字符串书写的不便性，请一定要仔细书写

:::

<demo-block>

<DynamicForm-FormGenerate-demo4 />

<template #code>

<CodeGroup>
  <CodeGroupItem title="示例代码" active>

@[code](@demoroot/DynamicForm/FormGenerate/demo4.vue)

  </CodeGroupItem>

  <CodeGroupItem title="demo2.json">

```json
{
    "labelPosition": "right",
    "labelWidth": "120px",
    "formItems": [
        {
            "prop": "name",
            "label": "Input",
            "span": 12,
            "defaultValue": "Tiga",
            "controlConfig": {
                "type": "input",
                "props": {
                    "onInput": "function(val){ console.log(val) }"
                }
            }
        },
        {
            "prop": "sex1",
            "label": "Select",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "onChange": "function(val){ console.log(val); const formConfig = arguments[arguments.length - 1]; console.log(`%c formConfig === `, 'color: #67c23a;', formConfig) }"
                }
            }
        },
        {
            "prop": "selectMValue",
            "label": "SelectMultiple",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "multiple": true
                }
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radio",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        }
    ]
}
```

  </CodeGroupItem>
</CodeGroup>

</template>

</demo-block>

### 增强注入的 formConfig 获取方式

```js
const formConfig = arguments[arguments.length - 1];
```

:::tip

请记住一句话，当你拿到 formConfig 后，就拥有了无限可能！

所有事情都是围绕 formConfig 开发的

:::

## 校验

校验配置方式同 [Form 表单校验](../Form.md#表单校验)

:::tip

唯二不同

* validator 要以字符串书写
* validator 函数增强，表单的 `model` 数据模型会以 arguments 的最后一个下标传递给函数内部

当在自定义校验规则中拿到 model 时，意味着可以实现表单控件的联动校验

:::

<demo-block>

<DynamicForm-FormGenerate-demo5 />

<template #code>

<CodeGroup>
  <CodeGroupItem title="示例代码" active>

@[code](@demoroot/DynamicForm/FormGenerate/demo5.vue)

  </CodeGroupItem>

  <CodeGroupItem title="demo5.json">

```json
{
    "labelPosition": "right",
    "labelWidth": "120px",
    "formItems": [
        {
            "prop": "name",
            "label": "Input",
            "span": 12,
            "defaultValue": "",
            "required": true,
            "controlConfig": {
                "type": "input",
                "props": {
                    "onInput": "function(val){ console.log(val) }"
                }
            }
        },
        {
            "prop": "weight",
            "label": "Weight",
            "span": 12,
            "defaultValue": "",
            "rules": [
                {
                    "required": true,
                    "message": "体重是必填项"
                }
            ],
            "controlConfig": {
                "type": "input",
                "props": {
                    "onInput": "function(val){ console.log(val) }"
                }
            }
        },
        {
            "prop": "sex1",
            "label": "Select",
            "span": 12,
            "defaultValue": "m",
            "rules": [
                {
                    "required": true,
                    "message": "Select 是必填项"
                },
                {
                    "validator": "function(rule, value, callback) { if(value === 'z') { return false }; const model = arguments[arguments.length - 1]; console.log(`%c model === `, 'color: #67c23a;', model); return true; }",
                    "message": "不能选择 '中'"
                }
            ],
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "onChange": "function(val){ console.log(val); const formConfig = arguments[arguments.length - 1]; console.log(`%c formConfig === `, 'color: #67c23a;', formConfig) }"
                }
            }
        },
        {
            "prop": "selectMValue",
            "label": "SelectMultiple",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "multiple": true
                }
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radio",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        }
    ]
}
```

  </CodeGroupItem>
</CodeGroup>

</template>

</demo-block>

## 在已有表单中追加

在开发中，还会存在在已有表单中追加配置的情况，需要使用写好的 `AdvanceFormConfig` 增强类，对已有 `formConfig` 进行追加操作

追加时的配置优先级如下：

* 追加时，表单的一级配置，json 配置中的优先级要高于本地的 form 配置
* 数据模型字段，已存在的字段将不会追加
* 已有的模型字段，formItem 也将不再追加（默认一个字段只能绑定一个 控件）

:::tip

增强后，对于表单的所有操作，还是基于原有的 `formConfig`

:::

<demo-block>

<DynamicForm-FormGenerate-advance />

<template #code>

<CodeGroup>
  <CodeGroupItem title="示例代码" active>

@[code vue{36-38}](@demoroot/DynamicForm/FormGenerate/advance.vue)

  </CodeGroupItem>

  <CodeGroupItem title="demo1.json" >

```json
{
    "labelPosition": "right",
    "labelWidth": "120px",
    "formItems": [
        {
            "prop": "name",
            "label": "Input",
            "span": 12,
            "defaultValue": "Tiga",
            "controlConfig": { "type": "input" }
        },
        {
            "prop": "sex1",
            "label": "Select",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        },
        {
            "prop": "selectMValue",
            "label": "SelectMultiple",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "select",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ],
                "props": {
                    "multiple": true
                }
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radio",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        },
        {
            "prop": "radio",
            "label": "Radio",
            "span": 12,
            "defaultValue": "m",
            "controlConfig": {
                "type": "radioButton",
                "options": [
                    { "label": "男", "value": "m" },
                    { "label": "女", "value": "f" },
                    { "label": "中", "value": "z" }
                ]
            }
        }
    ]
}
```

  </CodeGroupItem>
</CodeGroup>

</template>

</demo-block>
