# 微应用开发步骤教程

:::tip 基于已部署的基座开发微应用模式：

原理流程：将基座应用部署，访问部署的基座应用地址，基座应用在运行阶段以 `localhost` 加载开发者本地的微应用

优点：

* 不需要本地启动基座应用
* 不需要配置路由模式
* 不需要配置额外代理
* 开发只需要关注微应用框架即可，减轻开发负担

缺点：

* 微应用注册较为封闭，需要部署人员在线上环境中修改

:::

## 1. 创建微应用模板

使用现成的脚手架，构建一个微应用模板，详见[微应用脚手架](../micro-cli/index.md)

## 2. 注册微应用

在已部署的线上基座的[微应用注册列表](./microRegList.md) (路径： `basic/microApps/index.js` ) 中，添加构建的微应用的名称及端口

## 3. 创建页面

在子项目中，创建 `.vue` 页面文件（路径： `rootPro/subPro/src/views/xxx` ）

页面开发规范[详见](./moduleDetail/pages.md)

## 4. 在系统中添加页面路由

前往 `应用管理 > 应用功能` 添加 [动态路由](./moduleDetail/routerPractical.md#动态路由注册)

![创建动态路由.png](/images/micro/创建动态路由.png)

:::tip

新添加的菜单，需要重新登录，且把菜单分配到具体角色才能正常展示，否则将会 404

:::

## 概念

微应用整个框架采用 monorepo 方案架构，开发时有以下三个概念

* 本地模块：直接存在于子项目内部的模块
* 远程模块：微应用核心功能抽取到了 npm 私库的模块
* 公用页面模块：monorepo 工作区 `common-module` 模块

### 本地模块

:::tip

本地模块内部也默认引用了对应的远程模块，当在项目中使用本地引用（如： `@/store` ）时，实际会包含远程抛出的模块实例，只不过没有具体的子级模块

:::

本地模块顾名思义：项目内部自己的模块

就是普通 vue 工程化的项目内模块，存在于每一个子应用中，定制化强，可以由每个开发者自由发挥，目前框架已提供的本地模块有：

* [api](./moduleDetail/requestApi.md)：远程会覆盖本地的，目前远程仅提供了一个 `common.api`，意味着你不应该在本地的模块中存在 common.api 的模块
* [store](./moduleDetail/storeConcept.md)：仅做了远程模块的引用抛出，即方便引用远程 store 模块
* [router](./moduleDetail/routerConcept.md)：内部引用了远程模块，也提供了本地的模块文件夹，会合并二者
* [directives](./moduleDetail/directives.md)：目前仅做了引用远程模块

拿 router 模块举例：

router 模块你应该引用本地的，框架提供了合并本地模块和远程模块的能力。

因为远程模块，核心部分得以隐藏，你也可以基于框架提供的远程模块定制化二次开发本地模块

![router-remote](/images/micro/router-remote-example.png)

::: danger

如果您熟练掌握前端工程化，对工程化各模块的作用、特性特别熟悉，我才建议您定制化自己的微应用框架模块

否则，请不要动已提供的本地模块（router 添加子模块除外）

:::

### 远程模块

将微应用项目核心工程化模块以 npm 依赖的方式抽取了出去，不属于当前微应用的模块，即为远程模块

远程模块有如下：

```json
"@jsjn/micro-core-api": "1.0.0",
"@jsjn/micro-core-assets": "1.0.0",
"@jsjn/micro-core-components": "1.0.0",
"@jsjn/micro-core-constants": "1.0.0",
"@jsjn/micro-core-directives": "1.0.0",
"@jsjn/micro-core-hooks": "1.0.0",
"@jsjn/micro-core-micro-main": "1.0.0",
"@jsjn/micro-core-router": "1.0.0",
"@jsjn/micro-core-store": "1.2.0",
"@jsjn/micro-core-utils": "1.0.0",
"@jsjn/micro-core-views": "1.0.0",
"@jsjn/types": "1.3.0",
```

#### 更新远程模块

在项目根目录（最外层）的 `package.json` 中更改对应模块的版本号，然后在执行 `pnpm i -w` 即可完成更新

通常更新后需要重启下编辑器，有时候新增的 ts 类型，不会被编辑器识别到

如：

```json
"@jsjn/types": "1.3.0",

# 更新 ↓↓↓

"@jsjn/types": "1.4.0",
```

### 公用页面模块

框架基座 `monorepo` 本身是有能力支持多个微应用项目在同一个根项目的，但是这样会有子项目版本管理的问题，因此不建议将多个项目放到一起

但是，框架依旧提供了多个子应用间 `公用页面模块` 的能力，即多个页面都能够引用（编译）的页面存放模块

```json
"@jsjn/common-module": "workspace:*",
```

特殊情况下，多个项目有重复的页面，不需要在每个项目中创建这个页面，只需要将这个页面放到根目录下的 `rootPro/common-module/views/xxx` 下

后台路由处理核心将会首先加载指定项目下的页面，如果没找到就会去 `common-module/views` 下寻找，如果还是没找到，就抛出错误页面

公共模块基于 [pnpm workspace](https://pnpm.io/zh/workspaces) 隶属于本地模块

## 扩展

对于框架开发者，在您熟悉 [pnpm workspace](https://pnpm.io/zh/workspaces) 的前提下，您可以在现有 `monorepo` 项目中，继续扩展自己的模块

如：子项目公用组件模块
