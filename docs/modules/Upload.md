# Upload

:::tip 注意

当前组件有较强的业务关联性，定制化，非通用性组件

1. 资源是内网服务器
2. 抛出的绑定值是后台库所存储的 fileId
3. 下载资源的链接与后台为强关联

:::

基于 [Element-plus Upload](https://element-plus.gitee.io/zh-CN/component/upload.html)

扩展了：

* 一键限制文件上传的大小（基于 `beforeUpload`）
* 一键配置头像模式
* 业务 FileId 便捷获取
* FileList 双向绑定

:::tip 与后台交互，响应注意事项：

```ts
/**
 * 文件上传成功时的钩子
 * 注意：文件上传成功后，将期望存储的值（文件url || fileId）存储到表单的 model 字段中
 * 存什么值取决于后台，这里目前和虞鹏飞对接的文件上传接口，需要存储 data 的 fileId
 * 故：将返回的信息的 fileId 抛出
 */
const onSuccess = (res, file: UploadFile, fileList: UploadFile[]) => {
    // 默认赋值行为
    if (res.code === '000000') {
        ElMessage.success(`上传成功!`)

        // 添加业务上的 fileId 到文件 <===> fileList[item]
        file['fileId'] = res.data.fileId

        /**
         * avatar 可以理解为单选模式，每次上传成功后的 file
         * 也就变成了当前活跃的 file
         */
        if (attrs['list-type'] === 'avatar') {
            currentFile.value = file
        }
    } else {
        ElMessage.error(res.msg)
        uploadRef.value.handleRemove(file)
    }

    // 用户传递
    ;(attrs as any)['on-success']?.(res, file, fileList)
}
```

:::

::: tip 注意

组件库文档由于是单独部署在 github 上的，无法与文件服务器交互，故文档中的案例效果并非实际使用效果

实际使用效果可参考 example（使用代理与资源服务器实际交互） 中的案例

:::

## 文本

 `list-type="text"`

 文本模式未做处理

<demo-block>

<Upload-text />

<template #code>

@[code](@demoroot/Upload/text.vue)

</template>

</demo-block>

## 列表

 `list-type="picture"`

 增加预览功能，可预览的文件类型：图片、Pdf

 下载功能依赖后台的接口，当前案例并非实际下载

<demo-block>

<Upload-picture />

<template #code>

@[code](@demoroot/Upload/picture.vue)

</template>

</demo-block>

## 照片墙

 `list-type="picture-card"`

增加预览功能，可预览的文件类型：图片、Pdf

<demo-block>

<Upload-picture-card />

<template #code>

@[code](@demoroot/Upload/picture-card.vue)

</template>

</demo-block>

## 头像

扩展了 `list-type="avatar"`

头像模式 fileList 不再生效，应由 `imgUrl` 字段控制展示

<demo-block>

<Upload-avatar />

<template #code>

@[code](@demoroot/Upload/avatar.vue)

</template>

</demo-block>

## 禁用

禁用给标签添加 `disabled` 即可，禁用将改变组件行为：

* 上传、删除不可用；
* 预览、下载可用

<demo-block>

<Upload-disabled />

<template #code>

@[code](@demoroot/Upload/disabled.vue)

</template>

</demo-block>

## Upload 内置钩子

:::tip 事件钩子
在当前封装的 upload 组件中，内置了 `beforeUpload` 、 `onExceed` 、 `onSuccess` 、 `onError` 等四个钩子的行为；<br/>
以及 `onChange` 、 `onRemove` 钩子用来同步父级的数据；

同时用户可自行传递定义行为，不同的钩子与内置钩子的执行方式不一致，行为如下: <br/>

传递 `onExceed` 钩子将会覆盖内置钩子； <br/>
传递 `beforeUpload` 将会在校验 `size` 后，执行用户传递的钩子； <br/>
传递 `onError` 、 `onSuccess` 、 `onChange` 、 `onRemove` 钩子会和内置钩子同时执行。
:::

## Upload 扩展字段

[Upload 基础属性](https://element-plus.gitee.io/zh-CN/component/upload.html#%E5%B1%9E%E6%80%A7)

参数|说明|类型|默认值
-----|-----|-----|-----
v-model \| modelValue | 组件内会抛出文件的业务id（fileId），列表抛出数组，头像抛出单个 id | string \| string[] | --
v-model:fileList \| fileList | 组件内会抛出文件列表，或接收文件列表渲染指定的文件列表 | File[] | []
size | 单个文件上传最大大小(单位：MB)，不传递则不限制 | number | 5
imgUrl | 上传头像回显的 img url | string \| 流 | --
downloadHide | 隐藏下载按钮 | boolean | false
delHide | 隐藏删除按钮 | boolean | false

## Upload 扩展钩子

参数|说明|类型|默认值
-----|-----|-----|-----
onDownload | 覆盖默认的下载行为，用户自定义 | (file: UploadFile) => void | null
onMagnify | 覆盖默认的预览行为，用户自定义 | (file: UploadFile) => void | null
