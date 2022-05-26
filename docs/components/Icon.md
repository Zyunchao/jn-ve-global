# Icon

[[toc]]

在项目框架中，图标的使用方式分为三种

* 使用本地 Svg 文件作为图标
* 使用 Element 提供的 Icon
* 使用 [阿里巴巴矢量库](https://www.iconfont.cn/)

在如上前提下，对 icon 进行了组件封装，通过统一的组件使用 icon

## 使用方式

<demo-block>

<Icon-demo0 />

<template #code>

@[code](@demoroot/Icon/demo0.vue)

</template>

</demo-block>

## 本地 Svg 图标

:::tip

本地图标以项目为单位，区分不同风格的图标，图标的命名规则如下：

* 分系统的，添加系统缩写：
    - 监管：`jg-`
    - 新核心：`xhx-`

* 公用的： `public-`
* 带有复杂颜色的： `raw-`
* 分业务模块的，添加模块缩写，如：
    - 现场检查：`xcjc-`
    - 保理：`bl-`
* 如果有相似的，添加数字，如：
    - `public-search`
    - `public-search2`

示例：
公用搜索： `public-search / public-search2` <br/>
带有颜色的： `raw-orange` <br/>
监管带有颜色的： `jg-raw-blue` <br/>
监管模块： `jg-xcjc-detail`

:::

Svg 由 ui 提供，若需要新增 Svg 图标，请联系张云超

组件 `icon` 传递的是 Svg 资源的名称

<demo-block>

<Icon-demo1 />

<template #code>

@[code](@demoroot/Icon/demo1.vue)

</template>

</demo-block>

### 自定义颜色 & 原彩显示

:::tip 适用 2.1.4+

:::

在我们自己系统设计的图标中，存在带有特殊样式（不单单是线性），且颜色复杂，并非单纯的单色填充，原先的处理都是对于单色填充进行的处理，在 2.1.4 版本后，<strong style="color: #ff3040; ">本地 svg 图标默认不能够自定义颜色（保持原彩）</strong>

如果图标需要自定义颜色，需要传递 api `customColor: true`

:::warning

一般是一些简单的线性图标，复杂的多色图标，不建议使用自定义颜色

:::

<demo-block>

<Icon-customColor />

<template #code>

@[code](@demoroot/Icon/customColor.vue)

</template>

</demo-block>

:::danger 注意

每个名称的 svg 图标都是在全局只存在一个的，比如一个叫 `wodeshijian` 的图标，他在资源目录中，只存在这一个，当你开启这个叫 `wodeshijian` 的图标的自定义颜色后，他生成的就会是一个可以自定义颜色的图标

至于你要改成什么颜色，取决于你设置的它的父级，或它的颜色

:::

## Element 提供的 icon

组件 `icon` 传递的是 Element 提供的 Svg 组件名，这里为了和其他两种图标区分，组件库为 el 图标添加了 `el-` 前缀

请参考 [Element Icon](https://element-plus.gitee.io/zh-CN/component/icon.html)

<demo-block>

<Icon-demo2 />

<template #code>

@[code](@demoroot/Icon/demo2.vue)

</template>

</demo-block>

## 阿里巴巴矢量库 提供的 icon

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

## Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
icon| 图标标识 | string | --
