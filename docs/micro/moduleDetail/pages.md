# 页面

::: tip

页面模块就是我们写的一个个 vue 组件，结合路由，进行组件的切换，形成页面

:::

页面我不会去做详细的案例代码，请大家明确一点，后台管理系统的页面，无非就是组件的搭建

开发技巧如下：

* 熟悉 [Vue3 SFC语法](https://v3.cn.vuejs.org/api/sfc-spec.html)
* 熟悉 [Mixin](https://v3.cn.vuejs.org/guide/mixins.html)
* 参考[Element-plus官网](https://element-plus.gitee.io/zh-CN/)
* 参考内部[组件库](../../components/index.md)

## 页面组件规范

对于组件代码怎么写，这个没有什么规范要求，对于组件的文件存放，需要大家遵守如下规范

1. 模块起名具有语义化，且使用小驼峰

![小驼峰命名.png](/images/realize/小驼峰命名.png)

2. 明确的层级嵌套，目录的层级应该和路由的层级保持一致

![页面层级结构.png](/images/realize/页面层级结构.png)

3. 符合唯一入口规则，目录下有一个 `index.vue` 作为这个模块的首要唯一入口

![唯一入口.png](/images/realize/唯一入口.png)

4. 组件正确嵌套，且组件符合前三条规则

子组件放到 `component`

![子组件唯一入口规则.png](/images/realize/子组件唯一入口规则.png)

嵌套子组件一律遵循此规则

5. 其他目录

一个页面模块，可以包含下面三个文件夹

![页面模块文件夹.png](/images/realize/页面模块文件夹.png)

* component 子组件存放目录
* constant 组件常量存放
* interface 组件的接口类型存放（包含子组件的类型）

:::tip

对于组件的开发，希望大家要知其然，知其所以然

大家要先熟练掌握组件库的使用，才能更好的去开发页面

:::
