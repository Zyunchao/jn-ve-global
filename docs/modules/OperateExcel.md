# OperateExcel

服务于表格的组件，提供本地上传 Excel、下载表格 Column 配置的 Excel 模板

:::tip Excel 的解析规则：

* 导入：Excel 的第一行意味着表头，第一行的内容将对应代码中表格 `Columns` 的 label 属性，在处理数据时，通过 label 的对应关系，
    获取到实际数据的 `prop` ，处理成对应 `Columns` 的数据模型

* 导出：将 `Columns` 的 label 配置作为 Excel 模板第一行导出

:::

## 导入：解析数据

:::tip

当前组件所做的仅是Excel 数据的解析及转换成符合代码配置的表格数据，拿到数据后，或赋值给表格，或其他数据处理，由开发者决定

:::

<demo-block>

<OperateExcel-demo1 />

<template #code>

@[code](@demoroot/OperateExcel/demo1.vue)

</template>

</demo-block>

## 下载模板

<demo-block>

<OperateExcel-demo2 />

<template #code>

@[code](@demoroot/OperateExcel/demo2.vue)

</template>

</demo-block>

## Attributes

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
columnsConfig | 表格的 columns 配置 | TableColumnProps[] | null
mode| 组件模式 | import \| template | import
fileName | 下载模板时的文件名称 | string | xxx模板

## Events

参数 | 说明 | 类型 | 默认值
-----|-----|-----|-----
parsed | 解析完成的事件 | (data) => void | --
