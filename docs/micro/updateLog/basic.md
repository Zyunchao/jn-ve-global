# 基座更新日志

遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

<!-- ================== 2.2.0 ======================================================================== -->

<update-log-block>

<template #version>

2.2.0

</template>

<template #date>

2023-02-24

</template>

<h3>资源</h3>

<h3>新功能</h3>

01. 登录增加容错上限显示校验人机验证码；
02. 增加多种人机校验方式；
03. `store` 增加 `SystemSafeInfo` 模块；
04. 登录信息携带 ip & 地址信息；
05. 通过登录接口存储登录用户信息；
06. 密码修改规则对接系统安全信息；
07. 接口错误响应信息防抖处理；
08. 工作流平台增加上一步操作；

</update-log-block>

<!-- ================== 2.1.0 ======================================================================== -->

<update-log-block>

<template #version>

2.1.0

</template>

<template #date>

2023-02-24

</template>

<h3>资源</h3>

<h3>新功能</h3>

01. 扩展 ProcessEnv 的类型；
02. 不需要指定外部登录页的应用集添加 c 端；
03. store 统一最新结构；

<h3>优化</h3>

01. 获取用户信息失败时，弹出拦截用户操作的弹框；
02. 浏览器首次进入系统时，登录失效导致的拦截到登录页时的消息提醒去除；
03. 消息中心文案更新、样式优化；
04. 关闭消息提醒增加响应 loading

<h3>BugFix</h3>

01. 消息提醒列表插队问题；
02. 登录失败，不再缓存账户名；
03. 没有消息提醒时,消息 dom 容器依然存在的问题；

</update-log-block>

<!-- ================== 2.0.0 ======================================================================== -->

<update-log-block>

<template #version>

2.0.0

</template>

<template #date>

2023-02-20

</template>

:::danger

基座采用 monorepo 架构重构

:::

<h3>资源</h3>

<h3>新功能</h3>

01. 登录信息输入框获取焦点自动选择内容；
02. 监管登录页记住用户名功能；
03. api 封装函数返回值泛型指定为 BaseResponse（微应用同时适配）；
04. 监管基础布局（基础页面）增加快捷入口模块；
05. 监管菜单选择页，新窗口打开增加标识图标；
06. 消息提醒弹框优化
07. 消息中心来源增加未读数量提示
08. 消息中心列表增加分页方式展示

<h3>优化</h3>

01. 登录页进入系统时，loading 加载动画优化；
02. 页面刷新，请求数据加载 loading 优化；
03. 访问系统携带 appKey 时，系统取消加载菜单的优化；

<h3>BugFix</h3>

01. 监管应用菜单选择页，二级路由无效时的报错问题；
02. 登出接口未与业务接口隔离问题；
03. 浏览器刷新，页面 title 显示无效数据问题；

</update-log-block>

<!-- ================== 1.0.2 ======================================================================== -->

<update-log-block>

<template #version>

1.0.2

</template>

<template #date>

2023-01-12

</template>

<h3>资源</h3>

新核心：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-new-core/-/basic-new-core-1.0.2.tgz) <br/>
监&nbsp; &nbsp; 管：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-regtech/-/basic-regtech-1.0.2.tgz)<br/>
C &nbsp; &nbsp; 端：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-consumer/-/basic-consumer-1.0.2.tgz)<br/>

<h3>BugFix</h3>

<h4>公共</h4>

01. 重复路由页面相互切换导致的未更新渲染问题

<h4> C 端 </h4>

01. [布局]：布局底部内容遮盖内容市区问题
02. [布局]：页面切换或内容切换时，滚动条问题

<h4>监管</h4>

01. [菜单选择页]：外部跳转链接切换页面时，点击失效问题
02. [菜单选择页]：外部跳转链接未初始化子级菜单

</update-log-block>

<!-- ================== 1.0.1 ======================================================================== -->

<update-log-block>

<template #version>

1.0.1

</template>

<template #date>

2023-01-03

</template>

<h3>资源</h3>

新核心：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-new-core/-/basic-new-core-1.0.1.tgz) <br/>
监&nbsp; &nbsp; 管：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-regtech/-/basic-regtech-1.0.1.tgz)<br/>
C &nbsp; &nbsp; 端：[下载](http://172.31.71.159/repository/npm-release/@jsjn/basic-consumer/-/basic-consumer-1.0.1.tgz)<br/>

<h3>基座所包含的功能</h3>

01. 基础登录模型
02. 权限控制
03. 路由处理（动/静态处理、菜单控制）
04. 路由跳转代理
05. 基础布局（布局、视图、内嵌...）
06. 基础微应用容器
07. 应用模式概念
08. 工作流平台
09. 共享资源容器
10. 基础样式类名
11. 基础主题配置
12. 公用请求拦截
13. 基础请求代理配置
14. 全局仓库存储及下发
15. 请求配置列表封装

</update-log-block>
