# Dialog

处于对弹框样式的统一，将 [Element Dialog](https://element-plus.gitee.io/zh-CN/component/dialog.html)进行了二次封装

组件统一了样式，并快捷创建传入的按钮配置

:::tip 注意
dialog 的宽度统一设置为 '70%'；<br/>
顶部距离统一设置为 '5vh'；<br/>
dialog-body 最小高度统一设置为 '150px'；<br/>

如有不同需求，请覆盖对应的配置
:::

## 快捷创建按钮

<demo-block>

<Dialog-demo1 />

<template #code>

@[code](@demoroot/Dialog/demo1.vue)

</template>

</demo-block>

## 自定义底部内容

通过 slot#footer 实现

<demo-block>

<Dialog-demo2 />

<template #code>

@[code](@demoroot/Dialog/demo2.vue)

</template>

</demo-block>
