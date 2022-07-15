# 富文本编辑器

基于 [TinyMCE5.10.5](http://tinymce.ax-z.cn/) 封装的 vue 组件

减小开发者的学习成本，配置成本，使用富文本就像使用 `Input` 一样简单，同时，组件又是高度可配的

组件实现了：

* 预配置的插件
* 便捷获取编辑器实例
* 事件便捷绑定
* 数据双向绑定
* 集成到 Form 中

::: tip TinyMCE 资源

组件的实现，依赖 TinyMce 的静态资源（就像 jQuery），需要在全局中挂载 `tinymce` 的实例，[TinyMCE 下载地址](https://www.tiny.cloud/get-tiny/self-hosted/)

组件库测试样例、文档库、基座应用，都已在项目中引用了对应版本的资源，开发可直接使用

:::

## 样例

### 经典模式

TinyMce 拥有三种模式，分别为

* `classic`: [经典模式（默认）](http://tinymce.ax-z.cn/general/use-tinymce-classic.php)
* `inline`: [内联模式](http://tinymce.ax-z.cn/general/use-tinymce-inline.php)
* `distraction-free`: [沉浸模式](http://tinymce.ax-z.cn/general/use-tinymce-distraction-free.php)

> 配置模式，使用 `mode` 参数，取值： `mode?: 'classic' | 'inline' | 'distraction-free'`

<demo-block>

<JnEditor-classic />

<template #code>

@[code](@demoroot/JnEditor/classic.vue)

</template>

</demo-block>

### 内联模式

<demo-block>

<JnEditor-inline />

<template #code>

@[code](@demoroot/JnEditor/inline.vue)

</template>

</demo-block>

### 沉浸模式

<demo-block>

<JnEditor-distraction />

<template #code>

@[code](@demoroot/JnEditor/distraction.vue)

</template>

</demo-block>

### 获取实例

通过给标签添加 `ref` 获取 vue 组件抛出的数据， `JnEditor` 组件抛出了如下属性

```ts
interface JnEditor {
    /**
     * tinymce 根实例
     * 
     */
    tinymceRoot: TinyMCE
    /**
     * 编辑器依据 dom 的 id
     */
    elementId: string
    /**
     * 当前组件的 editor 实例（重要）
     */
    currentEditor: Editor
    /**
     * 是否已完成挂载
     */
    editorMounted: boolean
}
```

::: tip 实例的作用

编辑器实例的作用非常大，添加额外功能、事件绑定、调用方法等等，都需要用到当前编辑器的实例

:::

打开控制台，查看日志输出的组件实例

<demo-block>

<JnEditor-getInstance />

<template #code>

@[code](@demoroot/JnEditor/getInstance.vue)

</template>

</demo-block>

### 绑定事件

组件已将部分事件封装，可通过 `vue @` 的方式绑定事件，已封装的事件列表见 [事件列表](./JnEditor.md#事件列表)

更多 TinyMCE 支持的事件，请[参考](https://www.tiny.cloud/docs/advanced/events/)

:::tip

未封装的事件，需要使用 Edit 的实例，调用 `.on` 方法，进行事件绑定，两种绑定方式

* 在获取到组件实例后，获取 `currentEditor` 调用 `.on`
* 在 `setup` 或 `initInstanceCallback` 事件中，使用抛出的参数，调用 `.on`

:::

请打开控制台，查看事件执行顺序

<demo-block>

<JnEditor-bindEvents />

<template #code>

@[code](@demoroot/JnEditor/bindEvents.vue)

</template>

</demo-block>

### 表单集成

<demo-block>

<JnEditor-form />

<template #code>

@[code](@demoroot/JnEditor/form.vue)

</template>

</demo-block>

### 文件上传

目前富文本支持的文件上传：

* 图片
* 视频

:::tip

建议只将 图片 & 视频 作为内嵌文本内容，其他附件用业务划分出去

:::

文件上传分为服务器上传与文本内嵌两种，区别：

* 服务器上传需要配置上传与下载路径，需要后台服务的支持，组件与业务是强关联关系
* 文本内嵌不需要后台的支持，但是内容（图片、视频）会以 base64 的形式存储在整个内容里面，会造成数据超大，需要注意数据库中字段的类型设置

#### 服务器上传

:::tip 注意

服务器上传需要配置上传与下载路径（缺一不可），本身图片与视频的获取资源就是一个 get 请求

服务器上传方式，是与业务强关联的，组件内部对于接口响应是约定格式的，且组件需要获取到登录信息（组件通过获取系统业务框架存储在 localStorage 中的登录信息实现）

:::

本身统一管理平台这边提供了上传与下载的接口，可以都使用平台的接口，后台也可以自定义接口，但会返回的数据格式要符合如下结构：

```json
{
    "code": "000000",
    "data": {
        "fileId": "3,017c821ca4eacb",
        "lastModified": 0,
        "fileName": null,
        "contentType": null,
        "size": 52614,
        "fileUrl": "http://172.31.71.131:7080/3,017c821ca4eacb"
    },
    "msg": "执行成功!",
    "status": 200,
    "success": true
}
```

平台提供的接口（可直接在业务框架中复制粘贴使用）：

```ts
import prefix from '@/api/prefix'

const uploadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/upload`
const downloadUrl = `${prefix}/kinso-basic-open-server/v1/document/file/download`
```

:::tip

`prefix` 是基座处于开发模式下所必须的代理前缀，基于已部署的基座开发模式，可忽略 `prefix`

:::

:::danger 注意

组件库文档处于 gitlab 自动部署，部署环境没有后台服务，文档中的服务器上传示例，仅做代码的查看，请将代码粘贴到项目中测试服务器上传

:::

<demo-block>

<JnEditor-serverUpload />

<template #code>

@[code](@demoroot/JnEditor/serverUpload.vue)

</template>

</demo-block>

:::tip

在粘贴图片时，等同于点击上传图片，与上传按钮上传不同在于：

如果上传失败，图片将以 base64 内嵌到内容中

:::

#### 页面内嵌（默认）

上传图片，打开控制台，查看输出的日志

<demo-block>

<JnEditor-contentStorage />

<template #code>

@[code](@demoroot/JnEditor/contentStorage.vue)

</template>

</demo-block>

:::warning

以 base64 存储时，意味着这一个字段可能会很大，组件内置了限制输入内容的大小，通过 `maxSize` api 控制，默认 100M

:::

## Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
v-model | 双向绑定的数据 | string |
config | 额外配置 | RawEditorSettings [配置参考](http://tinymce.ax-z.cn/configure/integration-and-setup.php) | {}
mode | 编辑器模式 | 'classic' \| 'inline' \| 'distraction-free' | 'classic'
id | 编辑器依据的 dom 节点 id（非必填，内部会做随机值）| string | uuidv4()
tagName | inline 模式下的依据 dom 标签名称 | string | 'div'
disabled | 禁用 | boolean | false
maxSize | 限制输入内容的大小（单位：M） | number | 100
uploadUrl | 上传文件的 url | string | --
downloadUrl | 内容链接文件（图片、视频）的 url | string | --

## 事件列表

参数|说明|类型|默认值
-----|-----|-----|-----
setup | 初始化前执行 | (editor: TinyMCEEditor) => void |
init | 当编辑器完全初始化时触发 | (e: EditorEvent\<any\>) => void |
initInstanceCallback | 初始化结束后执行 | (editor: TinyMCEEditor) => void |
change | 内容发生变化时触发 | (e: EditorEvent\<any\>) => void |
input | 输入时触发 | (e: EditorEvent\<any\>) => void |
undo | 撤消更改时触发 | (e: EditorEvent\<any\>) => void |
redo | 重做时触发 | (e: EditorEvent\<any\>) => void |
