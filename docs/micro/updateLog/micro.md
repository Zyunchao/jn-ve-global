# 微应用框架更新日志

遵循 [Semantic Versioning 2.0.0](https://semver.org/lang/zh-CN/) 语义化版本规范。

:::tip

微应用框架更新获取请参考 [仓库管理](../storeMage.md)

:::

<!-- ================== 2.0.0 ================================================= -->

<update-log-block>

<template #version>

2.0.0

</template>

<template #date>

2023-01-28

</template>

:::danger

存在破坏式更新，旧项目升级时，需要针对破坏点更新

:::

<h3>New</h3>

1. <strong style="color:#cc0000;">break</strong>: 微应用端口号配置方式修改，参考：[快速开始/微应用开发/4](/micro/quickStart2.md#微应用开发)

2. 增加项目级常量存放目录，`/src/constant`，增加部分常用常量；
3. 打包生产，去除 `console` 等日志输出；
4. 微应用去除 `element` 的样式资源引用；
5. 打包生产，去除 `KINSO_ROUTE` 的配置；
6. 规范: 框架添加了 `git commit-msg hooks` 后续代码提交时，<strong style="color: #ff3040; " >需要添加规范的前缀</strong>；[详见文档](/micro/commitMsg.md)
7. 增加表单字段、表格列的权限控制；[详见文档](/micro/moduleDetail/pageContentAuths.md)

</update-log-block>

<!-- ================== 1.0.1 ================================================= -->

<update-log-block>

<template #version>

1.0.1

</template>

<template #date>

2023-01-03

</template>

<h3>微应用所包含的功能</h3>

1. 对接基座
    - 全局仓库
    - 路由（动/静）
    - 请求拦截
    - 路由跳转
    - 通信（上/下级）
2. 远程组件
3. 工作流内嵌组件
4. 共享资源排除
5. 基础工具
6. 基础实体类
7. 请求配置列表封装
8. 打包优化

</update-log-block>
