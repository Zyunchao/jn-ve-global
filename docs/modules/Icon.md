# Icon

在项目框架中，图标的使用方式分为三种

* 使用本地 Svg 文件作为图标
* 使用 Element 提供的 Icon
* 使用 [阿里巴巴矢量库](https://www.iconfont.cn/)

在如上前提下，对 icon 进行了组件封装，通过统一的组件使用 icon

## 使用本地 Svg 图标

在项目框架下， `src/assets/icons/svg` 目录用来存放本地 Svg

组件 `icon` 传递的是 Svg 资源的名称

<demo-block>

<Icon-demo1 />

<template #code>

@[code](@demoroot/Icon/demo1.vue)

</template>

</demo-block>

## 使用 Element 提供的 icon

组件 `icon` 传递的是 Element 提供的 icon 的类名

请参考 [Element Icon](https://element-plus.gitee.io/#/zh-CN/component/icon)

<demo-block>

<Icon-demo2 />

<template #code>

@[code](@demoroot/Icon/demo2.vue)

</template>

</demo-block>

## 使用 阿里巴巴矢量库 提供的 icon

::: tip 注意
在 [IconFont](https://www.iconfont.cn/) 官网中存在一个图标项目，如需添加图标，请注册账号并联系张云超，邀请加入项目后自行添加图标 （[现有图标预览](https://at.alicdn.com/t/project/2683065/a1cd9901-daa2-4c56-84df-1723d172b612.html?spm=a313x.7781069.1998910419.36)）
:::

组件 `icon` 传递的是**下载到本地的图标资源**的 Font Class

<demo-block>

<Icon-demo3 />

<template #code>

@[code](@demoroot/Icon/demo3.vue)

</template>

</demo-block>
