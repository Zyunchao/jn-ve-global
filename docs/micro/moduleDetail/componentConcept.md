# 组件概念

组件：这里所谓的组件是指高度封装，功能独立，样式独立，复用性高的 \*.vue 文件

整个系统中分为如下组件

* 组件库组件
* element-plus 组件
* 本地业务组件
* 本地全局组件
* 远程业务组件

前二者不做解释，下面解释下后三者

## 本地业务组件

即一些通用的业务组件，需要单独抽取的，这个组件范围仅适用于当前应用系统，也是存放在当前系统

存放的目录为 `/src/components/business` 目录下，业务组件的开发规则，符合页面组件[开发规则](./pages.md#页面组件规范)

在使用的时候，需要单独引入，注册等

:::tip

可作为远程业务组件提供他人使用

:::

## 本地全局组件

即本地的一些需要全局注册的组件，如：自己的系统要封装一个按钮

全局组件存放目录为 `/src/components/global` 需要注意的是，存放在 `global` 目录下的，都会被注册到 vue 实例上，即全局注册

开发规则，符合页面组件[开发规则](./pages.md#页面组件规范)

## 远程业务组件

得益于 `MicroApp` 提供的[嵌套应用](https://micro-zoe.github.io/micro-app/docs.html#/zh-cn/nest)的概念，使得我们的微应用之间可以互相嵌套

在通过路由的切换，达到使用其他微应用的组件的目的

我将它称之为远程业务组件

即物料使用者与物料提供者的关系
