文档站：https://zyunchao.github.io/

# 安装

推荐使用 pnpm 管理依赖，非公司网络，请把项目下的 .npmrc 清空

```shell
pnpm i
```

# 文档

## 运行

```shell
pnpm docs:dev
```

## 打包

```shell
pnpm docs:build
```

# 组件库测试样例

所有的组件库样例，都写到 examples 下，这个是一个单独的 vite 项目，有路由，通过注册路由添加组件库样例

## 运行

```shell
pnpm dev
```

# 打包组件库

```shell
pnpm build
```
