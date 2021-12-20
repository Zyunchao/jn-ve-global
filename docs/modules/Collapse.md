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
