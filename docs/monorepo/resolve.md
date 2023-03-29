# 解决问题

[[toc]]

目前架构组的部分前端项目（basic、uums）都已接入 monorepo 架构

基于已经实现的方案，解决问题对比

## 更新方式

### 旧的方式

基于 [仓库管理](../micro/storeMage.md) 

1. 更新繁琐：每个微应用要想更新框架，都要去绑定远程仓库拉取更新，如果是项目初始就绑定了远程仓库还好说，但是项目一旦步入开发（旧项目）想要再更新，就变得非常繁琐（绑仓库、去冲突、覆盖提交历史、强制推送....）等等操作

![bind](/images/monorepo/bind-store.jpg)

2. 更新遗漏

Multirepo 架构下，大量的微应用项目，很难做到每个项目随时更新

![dirs](/images/monorepo/update-old.png)

3. 更新冲突

旧的微应用框架，框架核心部分未与业务代码隔离，更新时，可能会产生代码冲突

### 新的方式

Monorepo 模式下，框架的核心部分已于框架分离，采用 npm 包安装的方式接入框架：

1. 每次更新只需要更改版本号，重新安装即可
2. 所有的微应用都在一个仓库下，并且依赖是公用的，不存在某个微应用没有更新的情况
3. 安装包的形式，原始框架更新于业务代码分离，根本不会产生冲突

![update-new](/images/monorepo/update-new.png)

## 前端项目占磁盘大

### 旧的方式

每个微应用都要安装 node_modules 目录，占据磁盘空间较多

![node_modules-old.png](/images/monorepo/node_modules-old.png)

### 新的方式

monorepo 下，所有的项目可以公用一个 node_modules，将大大减少磁盘的占用

![node_modules-new.png](/images/monorepo/node_modules-new.png)

## 项目运行

### 旧的方式

之前多个微应用在开发时，要开启多个编辑器（如果在一个编辑器工作区里打开多个项目，可能会导致 eslint、prettier 的配置失效），编辑器之间来回切换也是心智负担

![mutile-edit.png](/images/monorepo/mutile-edit.png)

### 新的方式

新框架下，Eslint 等的配置都在项目根目录下，一个工作区就可以开发所有项目

并且通过 js 脚本，一条命令即可运行所有的微应用

![mono-edit.png](/images/monorepo/mono-edit.png)
