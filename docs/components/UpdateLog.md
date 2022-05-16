# 更新日志

<!-- ================== 2.1.0 ======================================================================== -->

<update-log-block>

<template #version>

2.1.0

</template>

<template #date>

2022-5-16

</template>

<h3>重要</h3>

Element 版本升级到 2.2.0，带来了一些不兼容的更新
已发现：

1. button type='text' 弃用（对应更改组件库已同步）

<h3>新特性</h3>

<h4>动态表单</h4>

1. 新增表单生成器（JSON 动态生成表单）组件
2. 组件库增加 `增强 form 配置` 对象 `class AdvanceFormConfig`

<h4>Form</h4>

1. FormItem 中，一些控件（如下拉框、单选多选框）的待选列表，现在可以通过配置资源地址的方式，自动填充

<h3>优化</h3>

<h4>BaseModule</h4>

modal 在嵌套 BaseModule 时，固定了 baseModule 在弹框内的高度

</update-log-block>

<!-- ================== 2.0.15 ======================================================================== -->

<update-log-block>

<template #version>

2.0.15

</template>

<template #date>

2022-5-9

</template>

<h3>优化</h3>

<h4>Tabs</h4>

1. 优化 tab 的边缘间隙
2. 优化内容区域的边距

<h4>Form</h4>

1. 表单控件的占位符去除 label 的拼接
2. 优化日期范围选择器的字体大小

<h3>新特性</h3>

<h4>Address</h4>

新增[地址选择组件](./Address.md)（适用 formItem）

<h3>Bug Fix</h3>

<h4>表单控件组</h4>

使用表单的重置时，仅第一次有效，后续失效的问题

</update-log-block>

<!-- ================== 2.0.8 ======================================================================== -->

<update-log-block>

<template #version>

2.0.8

</template>

<template #date>

2022-4-27

</template>

<h3>新特性</h3>

<h4>FigureInput</h4>

支持负数

<h4>Tabs</h4>

增加默认内容插槽（布局）

<h4>Table</h4>

1. 可编辑单元格增加单击转换控件模式的 Api
2. FigureInput 转换时自动获取焦点

<h4>Tree</h4>

树增加隐藏搜索框的配置

</update-log-block>

<!-- ================== 2.0.7 ======================================================================== -->

<update-log-block>

<template #version>

2.0.7

</template>

<template #date>

2022-4-25

</template>

<h3>新特性</h3>

<h4>ButtonGroup</h4>

新增按钮组组件，常用于多个按钮的配置化

<h3>优化</h3>

<h4>Button</h4>

1. 优化按钮的 hover 样式

<h4>Form</h4>

优化表单的控件的样式

</update-log-block>

<!-- ================== 2.0.6 ======================================================================== -->

<update-log-block>

<template #version>

2.0.6

</template>

<template #date>

2022-4-24

</template>

<h3>Bug Fix</h3>

<h4>Upload</h4>

1. 修复上传成功时，非 “头像模式” 未将 file 的 url 抛出的问题

<h3>优化</h3>

<h4>Button</h4>

1. 按钮覆盖 focus 样式
2. 增加 active 的触感反馈

<h4>Modal</h4>

1. 优化弹框头的背景颜色
2. 优化 el-message-box 的头的背景色

</update-log-block>

<!-- ================== 2.0.5 ======================================================================== -->

<update-log-block>

<template #version>

2.0.5

</template>

<template #date>

2022-4-20

</template>

<h3>新特性</h3>

<h4>Table</h4>

1. 表格可编辑单元格事件处理函数增强（事件抛出当前行数据）；

</update-log-block>

<!-- ================== 2.0.4 ======================================================================== -->

<update-log-block>

<template #version>

2.0.4

</template>

<template #date>

2022-4-19

</template>

:::tip

组件库 Element-plus 版本更新到 2.1.10，下拉框图标覆盖的问题已得到解决

:::

<h3>Bug Fix</h3>

<h4>Table</h4>

修复编辑表格，更换新的表格数据时，再次编辑数据失效的问题；

</update-log-block>

<!-- ================== 2.0.3 ======================================================================== -->

<update-log-block>

<template #version>

2.0.3

</template>

<template #date>

2022-4-19

</template>

<h3>重要</h3>

:::tip

Element-plus 升级了版本 2.1.9，带来一些不兼容的更新

本次更新，修改了大量的代码，个别组件进行了重构，如果有未达到 **原有/预期** 效果的，请及时联系张云超

本次更新植入了大量 css 原生变量，为换肤做准备

且随着 Element 的 beta 版本结束，一些组件可能新增或抛弃了一些 Api，个人精力有限，难免会有遗漏，请发现时及时联系张云超
:::

<h3>新特性</h3>

<h4>Table</h4>

1. 可编辑表格双击，input 自动获取焦点
2. 重构了可编辑单元格的代码结构（危险）

<h4>Upload</h4>

1. 重构 Upload 组件（危险）
2. 后台返回的 FileId 支持数组的获取

<h4>SelectTree</h4>

增加 onChange 事件

<h4>SelectTreeV2</h4>

基于 Element-plus SelectTree 封装的下拉树组件，后续都使用[这个组件](./SelectTreeV2.md)，SelectTree 将不再维护

<h3>优化</h3>

<h4>ElMessageBox</h4>

1. 覆盖默认样式，同 GModal

<h4>Tree</h4>

1. 优化业务树的样式

</update-log-block>

<!-- ================== 1.5.12 ======================================================================== -->

<update-log-block>

<template #version>

1.5.12

</template>

<template #date>

2022-4-7

</template>

<h3>Bug Fix</h3>

<h4>Table</h4>

配置化的操作列，改变状态（如：hide、label、width）未正确响应的问题

<h3>优化</h3>

<h4>Table & BaseModule</h4>

1. 表格行高度优化
2. BaseModule 排版优化

</update-log-block>

<!-- ================== 1.5.11 ======================================================================== -->

<update-log-block>

<template #version>

1.5.11

</template>

<template #date>

2022-4-7

</template>

<h3>新特性</h3>

<h4>Upload</h4>

增加不显示上传成功消息的 api

<h4>Select</h4>

Form 配置 control Select 时，增加原生 click 事件的配置

<h4>LodingShade</h4>

新增加载遮罩组件

<h4>Upload</h4>

上传请求增加 token，缓存大于用户传递

<h3>优化</h3>

<h4>Table</h4>

原始表格默认高度 100%（撑开父容器），现可由用户主动关闭，配和 `maxHeight` 实现表格自增高

<h4>Modal</h4>

优化样式

</update-log-block>

<!-- ================== 1.5.8 ======================================================================== -->

<update-log-block>

<template #version>

1.5.8

</template>

<template #date>

2022-3-10

</template>

<h3>Bug Fix</h3>

<h4>Table</h4>

1. 修复可编辑表格初始化即为编辑状态时，cell 的类名添加错误问题
2. 修复错误提示遮罩和控件的层级问题

</update-log-block>

<!-- ================== 1.5.7 ======================================================================== -->

<update-log-block>

<template #version>

1.5.7

</template>

<template #date>

2022-3-6

</template>

<h3>Bug Fix</h3>

<h4>InfoSelectAll</h4>

关闭下拉列表后，表头位置值未初始化

<h4>InfoAutocomplete</h4>

可编辑表格内嵌组件移除时，表头依旧存在

<h3>优化</h3>

<h4>InfoXXXX</h4>

1. 在组件销毁后，主动移除挂载到 body 的 dom
2. 重构代码结构，将三者重复逻辑抽取到 mixin 中

</update-log-block>

<!-- ================== 1.5.6 ======================================================================== -->

<update-log-block>

<template #version>

1.5.6

</template>

<template #date>

2022-3-5

</template>

<h3>优化</h3>

1. InfoSelect popper、header、pagination 挂载到 body 上
2. InfoSelectAll popper 挂载到 body 上
3. InfoAutocomplete popper 挂载到 body 上

此更新用来优化三者的显示方式，1.5.6 之前没有选择挂载到 body 出现了不太理想的展示效果（表格内被溢出隐藏、表格行遮挡控件等）
1.5.6 版本之后，不再需要修改父容器的 css

<h3>功能补充</h3>

1.5.6 追加了可编辑表格时，InfoXXXX 三者的移除编辑状态的触发

</update-log-block>

<!-- ================== 1.5.3 ======================================================================== -->

<update-log-block>

<template #version>

1.5.3

</template>

<template #date>

2022-2-27

</template>

<h3>Bug Fix</h3>

<h4>Table</h4>

优化可编辑表格的校验错误信息的展示（取消文字展示，增加 toltip 的热区）

</update-log-block>

<!-- ================== 1.5.2 ======================================================================== -->

<update-log-block>

<template #version>

1.5.2

</template>

<template #date>

2022-2-25

</template>

<h3>新特性</h3>

<h4>Table</h4>

1. 动态配置操作列（增加 hide 列功能）
2. 增加动态禁用功能
3. 可编辑表格增加双击单元格编辑的开关（重要）

<h4>InfoSelect</h4>

1. 添加表头查询条件功能
2. 添加分页查询功能
3. 底层更改为 el-select（非虚拟滚动）

<h4>InfoSelectAll</h4>

将原先的 InfoSelect 更改成了 InfoSelectAll（虚拟滚动，全量查询，不带分页）

<h4>Form</h4>

1. 集成 InfoSelect
2. 集成 InfoSelectAll
3. 集成 InfoAutocomplete

<h4>Table</h4>

1. 集成 InfoSelect
2. 集成 InfoSelectAll
3. 集成 InfoAutocomplete

<h3>Bug Fix</h3>

<h4>Table</h4>

操作列配置的 maxCount 未准确生效的问题

</update-log-block>

<!-- ================== 1.5.1 ======================================================================== -->

<update-log-block>

<template #version>

1.5.1

</template>

<template #date>

2022-1-14

</template>

<h3>新特性</h3>

<h4>InfoAutocomplete</h4>

新增多列展示的输入建议框

<h4>Table</h4>

可配置按钮组增加对齐方式的配置

</update-log-block>

<!-- ================== 1.5.0 ======================================================================== -->

<update-log-block>

<template #version>

1.5.0

</template>

<template #date>

2022-1-12

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

FormItem > Input 在禁用且内容超出 input 的宽度时，进行内容 toolTip 的展示（自动开启）

<h4>Tree</h4>

增加机构的图标

<h4>DebounceButton</h4>

新增防抖按钮

<h4>InfoSelect</h4>

新增多列展示的下拉框

<h4>Modal</h4>

dialog 模式增加垂直居中 api

<h4>Chart</h4>

1. 新增图表组件
2. 内置对于常用的 柱状图、折线图、饼图等

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

1. 清理 el font-class icon
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

提供灵活配置下载与删除按钮的 api

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

1. 增加组件库的导出目录（"./packages/\*": "./packages"）

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

1. 增加默认勾选节点的去除父节点的 api（默认勾选由 父驱动子 => 子驱动父）

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

*   多选

    -   一键开启多选
    -   便捷获取多选数据
    -   维护多选状态（跨页多选+主动设置多选）

*   行内编辑

    -   配置开启行内编辑
    -   单元格校验

*   粘贴功能

</update-log-block>
