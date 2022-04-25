# Modal

模态框组件

将 [Element Dialog](https://element-plus.gitee.io/zh-CN/component/dialog.html) & [Element Drawer](https://element-plus.gitee.io/zh-CN/component/drawer.html) 进行了整合封装

组件功能：

* 整合 dialog + drawer，去除差异化
* 优化样式
* 便捷传入按钮
* 可自定义 slot#title、slot#default、slot#footer
* drawer 内置 el-scrollbar 滚动条；
* 可内部统一配置模式化

:::tip 注意

出于对样式的统一

dialog 的宽度默认为 '70%'；<br/>
drawer 的宽度默认为 50% <br/>
dialog 顶部距离统一设置为 '5vh'；<br/>
dialog-body 最小高度统一设置为 '150px'；<br/>

如有不同需求，请覆盖对应的配置
:::

## Drawer 模式

通过给组件传递 `type="drawer"` 开启 drawer 模式

<demo-block>

<Modal-demo1 />

<template #code>

@[code](@demoroot/Modal/demo1.vue)

</template>

</demo-block>

## Dialog 模式（默认）

通过给组件传递 `type="dialog"` 开启 drawer 模式

<demo-block>

<Modal-demo2 />

<template #code>

@[code](@demoroot/Modal/demo2.vue)

</template>

</demo-block>

## 去除底部

隐藏底部行为或传递 hideFooter（优先级1），或不传递 btns 配置数组、或 btns 数组长度为 0

<demo-block>

<Modal-demo3 />

<template #code>

@[code](@demoroot/Modal/demo3.vue)

</template>

</demo-block>

## Dialog 垂直居中

:::tip

垂直居中仅适用于 dialog，且内容较少的弹框情况，如果内容较多，采用垂直居中的效果可能不尽人意

:::

<demo-block>

<Modal-verticalCenter />

<template #code>

@[code](@demoroot/Modal/verticalCenter.vue)

</template>

</demo-block>

## Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
type | 弹框模式 | 'dialog' \| 'drawer' | 'dialog'
btns | 弹框按钮配置依赖 | [BtnProps](./ButtonGroup.md)[] | --
hideFooter | 隐藏底部 | boolean | false
width | 组件的宽度 | string \| number | dialog: '70%' \| drawer: '50%'
verticalCenter | dialog 垂直居中 | boolean | false
