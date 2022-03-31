# 基于本地基座应用开发

本篇旨在走一遍大体的流程，跟随本章，快速搭建属于你自己的微应用

:::tip

本章为基于本地启动的基座应用开发模式

此模式不对外开放，请前往[基于部署生产的基座应用开发](./quickStart2.md)

此模式需要拿到基座应用代码，本地运行基座应用

此模式需要对基座应用有一定了解，需要掌握

* 路由模式配置
* 代理配置

优点：

* 可配置静态路由
* 灵活配置代理

:::

## 微应用

1. 获取微应用框架，请参考[仓库管理](./storeMage.md)

2. 在拿到微应用框架后，更改文件夹名称
    >文件夹命名以各项目名为准，如： `baseMicroAppFrame` => `apollo`

![微应用目录名称修改](/images/realize/微应用目录名称修改.png)

3. 修改 package.json 的 name 字段 `/package.json`
    >命名以项目名为准，微应用内部会使用 name 作为唯一标识拼接一些变量

![packageName.png](/images/realize/packageName.png)

4. 修改微应用的端口 `/vue.config.js`
    > 开发模式下，应用是以端口进行本地部署的，如果在本地跑多个微应用，<strong style="color: #ff3040;">每个微应用的端口应该唯一</strong>，关乎基座应用的注册及加载资源

![portChnage](/images/realize/portChnage.png)

5. 添加页面 `/src/views/`
    > 依据[页面创建规则](./moduleDetail/pages.md#页面组件规范)，添加页面

![pages](/images/realize/pages.png)

```vue
<template>
    <div>Burseraceae</div>
</template>

<script lang="ts">
export default {
    name: 'Burseraceae'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped></style>
```

至此 5 步，完成了微应用的开发

## 基座应用

1. 注册微应用 `/public/microApps/index.js`

![regMicroApps](/images/realize/regMicroApps.png)

```js
/**
 * interface MicroApp {
 *  // 应用名称，每个name都对应一个应用，当多个应用同时渲染时，name不可以重复。
 *  name: string
 *
 *  // 应用地址
 *  url: string
 *
 *  // 是否开启keep-alive模式，开启keep-alive后，应用卸载时会进入缓存，而不是销毁它们，以便保留应用的状态和提升重复渲染的性能。
 *  keepAlive?: boolean
 * }
 */

// 子应用注册列表，基座应用依据当前列表进行注册子应用，可在生产环境更换
window.__MICRO_APP_LIST__ = [{
        name: 'ares',
        url: 'http://localhost:3001/',
        keepAlive: true
    },
    {
        name: 'apollo',
        url: 'http://localhost:3002/',
        keepAlive: true
    }
]
```

2. 确认基座应用的路由模式为 “静态路由” `/.env` 或 `/.env.local`

```zsh
# .env.local

# 路由配置方式（后端 | 前端）"backEnd" | "frontEnd"
VUE_APP_ROUTE_MODE=frontEnd
```

3. 将微应用的路由文件复制粘贴到基座应用的 `/src/router/modules/microApps/xxx`
    >'xxx' 为应用注册的 `name` ，基座应用的微应用配置路由文件应该与微应用自身的路由配置保持一致

![microAppRoutesToBaseApp](/images/realize/microAppRoutesToBaseApp.png)

:::tip

静态路由的配置并不灵活，需要手动复制粘贴文件，不过我对一些引用做了特殊处理，庆幸的是，你只需要原封不动的将微应用的路由模块粘贴到基座应用下，然后执行第 4 步，就可以完成微应用的注册工作了

当然，这只是静态路由的配置方式，动态路由的配置不需要如此 “落后”

在微前端框架搭建之初，曾经考虑过不再支持静态路由，因为它实在无法做到物理磁盘上的跨越，只能开发者主动的去 “倒腾” 文件，但经过再三考量，还是决定将静态路由的功能提供出来

所以，<strong style="color:purple; ">不要嫌弃静态路由配置的方式落后，这是不可避免的，框架本可以不提供静态路由方式的</strong>

:::

4. 修改路由组件 `/src/router/modules/microApps/xxx/yyy.ts`
    > 复制过来的微应用路由，component 还是引用的微应用的内部组件，在基座应用里面是不存在的，也是不需要的<br/>
    > 需要将静态路由的 component 修改成基座应用的 microAppRoot 组件

```ts
import { RouteConfig } from '@/@types/Route'

/**
 * 业务路由为 / 路由的后代路由，path 不需要加 '/'
 * 否则将被定义为根路径
 * 参考：https://next.router.vuejs.org/zh/guide/essentials/nested-routes.html
 *
 * 路由配置参数参考：https://next.router.vuejs.org/zh/api/#routerecordraw
 * 路由配置呈嵌套模式，只有拥有 component 的配置才会被真正注册呈路由，没有 component 仅做层级结构
 */
const routes: Array<RouteConfig> = [
    {
        path: 'botany',
        name: 'botany',
        meta: {
            title: '植物科',
            icon: 'el-Grape'
        },
        children: [
            {
                path: 'aceraceae',
                name: 'aceraceae',
                meta: {
                    title: '槭树科'
                },
                component: () => import('@/views/microAppRoot/index.vue')
            },
            {
                path: 'burseraceae',
                name: 'burseraceae',
                meta: {
                    title: '橄榄科'
                },
                component: () => import('@/views/microAppRoot/index.vue')
            }
        ]
    }
]

export default routes

```

:::tip

microAppRoot 组件是基座应用展示微应用的根组件

:::

至此 4 步，完成了基座应用注册微应用

## 启动

* 基座应用：进入基座应用目录 `yarn dev` 或 `npm run dev`
* 微应用：进入微应用目录 `yarn dev` 或 `npm run dev`

在启动之后，基座应用会自动打开浏览器及端口，微应用不会打开，但是当你在浏览器中输入微应用的端口时，依然能够访问到微应用（会报错）

:::tip

微应用是没有办法单独运行的，要依赖基座应用的资源，数据等

:::
