# 更新日志

<!-- ================== 1.5.0 ======================================================================== -->

<update-log-block>

<template #version>

1.4.16

</template>

<template #date>

2022-1-11

</template>

<h3>新特性</h3>

<h4>Collapse</h4>

新增折叠面板组件

<h4>Table</h4>

1. 表格操作列配置化；
2. 增加可配置的更多操作按钮；

<h4>BaseModule</h4>

1. 集成 Table 的可配置操作列
2. 添加可选页签功能
3. 集成 Table 的多选功能

<h4>Form</h4>

1. FormItem > Input 在禁用且内容超出 input 的宽度时，进行内容 toolTip 的展示（自动开启）

<h4>Tree</h4>

1. 增加机构的图标

<h4>DebounceButton</h4>

新增防抖按钮

<h4>InfoSelect</h4>

新增多列展示的下拉框

<h3>优化</h3>

<h4>Icon</h4>

使用 @element-plus/icons-vue 包

<h4>SelectTree</h4>

重构代码

<h4>Modal</h4>

优化 Modal 的样式

<h4>Table</h4>

重构多选功能的代码

</update-log-block>

<!-- ================== 1.4.8 ======================================================================== -->

<update-log-block>

<template #version>

1.4.8

</template>

<template #date>

2021-12-9

</template>

<h3>重要</h3>

element-plus 升级

<h3>新特性</h3>

<h4>BaseModule</h4>

抛出重置、查询按钮的钩子（内置事件同时执行用户传递的）

<h3>优化</h3>

1. 清理el font-class icon
2. 优化由于升级 elment 产生的样式问题

</update-log-block>

<!-- ================== 1.4.7 ======================================================================== -->

<update-log-block>

<template #version>

1.4.7

</template>

<template #date>

2021-12-6

</template>

<h3>新特性</h3>

<h4>各组件可配置按钮</h4>

btns 增加 hide 配置项

<h3>Bug Fix</h3>

<h4>Table</h4>

修复单元格超出未显示省略号的问题

</update-log-block>

<!-- ================== 1.4.3 ======================================================================== -->

<update-log-block>

<template #version>

1.4.3

</template>

<template #date>

2021-11-30

</template>

<h3>优化</h3>

<h4>Form</h4>

优化 FormItem 的 line-height

<h4>Upload</h4>

提供灵活配置下载与删除按钮的api

</update-log-block>

<!-- ================== 1.4.2 ======================================================================== -->

<update-log-block>

<template #version>

1.4.2

</template>

<template #date>

2021-11-30

</template>

<h3>优化</h3>

<h4>Icon</h4>

优化 ali icon 的注册方式

<h4>Upload</h4>

1. 优化 disable 时的操作划分（上传、删除不可用；预览、下载可用）
2. 抛出预览、下载的钩子；将覆盖组件内置行为（自定义预览、下载的行为）

</update-log-block>

<!-- ================== 1.4.1 ======================================================================== -->

<update-log-block>

<template #version>

1.4.1

</template>

<template #date>

2021-11-28

</template>

<h3>新特性</h3>

<h4>Upload</h4>

1. 在 El-upload 的基础上封装常用功能，扩展下载、预览、文件图标、双向绑定 FileList 等功能
2. 从 form 中抽取出来，行成独立组件
3. 已集成到 Form 组件中

<h3>优化</h3>

<h4>FormItemControlGroup（控件组）</h4>

1. 优化样式
2. 优化绑定表单值的方式（）
    - 去除数组校验的抛出错误，使用时要注意传递数组
    - 去除数组长度的校验抛出的错误，只要传递的是数组，会自动扩展数组的长度（重要）
3. 优化控件组的焦点获取

<h4>Table</h4>

1. 优化可编辑单元格校验消息的弹出方式

<h3>Bug Fix</h3>

<h4>Table</h4>

1. 修复编辑表格初始状态为编辑时， Esc 退出编辑失效的问题；
2. 修复编辑表格初始状态为编辑时，未改动字段的情况下，校验功能失效的问题；
3. 修复编辑表格，校验不通过，esc 取消行编辑时，多次循环执行任务的问题；

<h4>FormItemControlGroup（控件组）</h4>

1. 修复表单重置时，控件组未重置的问题
2. 修复 item 未传递正确 prop 值时抛出的错误（去除初始化绑定值的格式校验）

<h4>Modal</h4>

修复自定义类名 undefined 问题

</update-log-block>

<!-- ================== 1.4.0 ======================================================================== -->

<update-log-block>

<template #version>

1.4.0

</template>

<template #date>

2021-11-24

</template>

<h3>重要更新</h3>

1. 现在将业务框架的所有的 `Svg 图标`、`阿里图标`、`Element 图标` 抽取到组件库中；<br/>
2. 由于未来 Element+ 将会把原先的 `font-class` 图标（当前库 1.4.0 之前所采用的）移除掉，故需要改变 [El 图标](https://element-plus.gitee.io/zh-CN/component/icon.html)的使用方式；<br/>
3. 1.4.0 中将延续之前图标的使用方式，内部处理了差异化，但原先的 `font-class` 已经弃用<br/>

重要：原先各项目组（uums 除外）内请全局搜索 `<g-icon icon="el-` 需要将其修改成新的图标名称

<h3>新特性</h3>

<h4>IconPicker</h4>

新增 IconPicker 独立组件

<h4>Form</h4>

1. 集成 IconPicker 组件
2. 增加自定义渲染 `FormItem label` 的功能
3. FormItem 增加 `控件组` 的配置

<h4>Modal</h4>

新增组件，替换 dialog 组件，统一 dialog & drawer

<h3>Bug Fix</h3>

<h4>Tree</h4>

1. 修复自定义 `treeProps` 时，搜索不生效的问题；

<h4>Table</h4>

1. 修复为 Cloumn 添加 className 不生效的问题

</update-log-block>

<!-- ================== 1.3.9 ======================================================================== -->

<update-log-block>

<template #version>

1.3.9

</template>

<template #date>

2021-11-18

</template>
<h3>新特性</h3>

<h4>FigureInput</h4>

1. 将数字格式化组件独立出来，并添加独立文档
2. 将原先保存在 GForm/utils 中的方法提取到了 GFigureInput/utils（非兼容性，用户注意更改引用文件）

<h4>Table</h4>

1. 将 FigureInput 组件集成到了 EditTable 中

<h3>优化</h3>

<h4>Form</h4>

1. 优化 RangePicker 的 rangeSeparator 的宽度
2. 优化 FormItem 中 FigureInput 部分的代码

<h3>Bug Fix</h3>

<h4>Table</h4>

1. 修复编辑表格，行的 edit 在初始创建时置为 true， 不生效的问题（重要）

<h4>Package.json</h4>

1. 增加组件库的导出目录（"./packages/*": "./packages"）

</update-log-block>

<!-- ================== 1.3.6 ======================================================================== -->

<update-log-block>

<template #version>

1.3.6

</template>

<template #date>

2021-11-16

</template>

<h3>新特性</h3>

<h4>BaseModule</h4>

1. 查询条件增加更多查询功能（隐藏部分查询条件，增加表格可视内容）
2. 表格表体增加最小高度（260px）
3. 增加可替换的核心区域（slot#core 实现）
4. 增加按钮右侧的自定义区域（slot#middle-right）

<h4>Form</h4>

1. 增加控件 FigureInput（数字、计算、格式化）

<h3>优化</h3>

<h4>BaseModule</h4>

1. 优化代码结构，将搜索头抽取成独立组件
2. 优化表格的无数据图标位置

</update-log-block>

<!-- ================== 1.3.3 ======================================================================== -->

<update-log-block>

<template #version>

1.3.3

</template>

<template #date>

2021-11-13

</template>

<h3>优化</h3>

<h4>Form</h4>

1. 优化 Form 组件文件目录，添加 component 目录
2. 优化文件上传组件
3. 上传组件添加扩展字段

<h3>新特性</h3>

<h4>Table</h4>

1. 增加隐藏指定列的 api

</update-log-block>

<!-- ================== 1.3.2 ======================================================================== -->

<update-log-block>

<template #version>

1.3.2

</template>

<template #date>

2021-11-2

</template>

<h4>Tree</h4>

1. 增加默认勾选节点的去除父节点的api（默认勾选由 父驱动子 => 子驱动父）

<h4>SelectTree</h4>

1. 增加下拉选项的“不可选中”的项的 type 值（QZ|QW|QH）
2. 修复清空数据时，清空树的已选中节点

<h4>Table</h4>

1. 修改表格单选的样式

<h4>BaseModule</h4>

1. 修复搜索条件的下边距

</update-log-block>

<!-- ================== 1.2.4 ======================================================================== -->

<update-log-block>

<template #version>

1.2.5

</template>

<template #date>

2021-10-16

</template>

<h3>Bug Fix</h3>

<h4>Tree</h4>

1. 修复收起/展开图标消失问题

<h4>Table</h4>

1. 修复表格多选列的配置

<h3>新特性</h3>

<h4>Tree</h4>

1. 新增取消显示按钮区域的 api
2. 增加抛出 Tree 的 ref 的 api

</update-log-block>

<!-- ================== 1.1.0 ======================================================================== -->

<update-log-block>

<template #version>

1.1.0

</template>

<template #date>

2021-09-27

</template>

<h3>新特性</h3>

<h4>Table</h4>

* 多选
  + 一键开启多选
  + 便捷获取多选数据
  + 维护多选状态（跨页多选+主动设置多选）

* 行内编辑
  + 配置开启行内编辑
  + 单元格校验

* 粘贴功能

</update-log-block>
