## 问题描述

> 在 vue3 开发中：<br/>
> 现在有 A、B 两个微应用，使用一个 `<micro-app>` 组件加载，通过 **路由切换获取不同的 name** 进行重绘，A 应用使用样式隔离，B 应用禁用样式隔离<br/>
> B 禁用样式隔离方式采用的方式如： `<micro-app :disable-scopecss="appName === B">` <br/>

> <strong style="color: #000; ">期望结果</strong>：A 切换到 B，B 禁用了样式隔离 <br/>
> <strong  style="color: #000; ">实际结果</strong>：A 在切换到 B 后，B 的样式隔离依然有效，体现为：类名依然有 `micro-app[name=B]` <br/>

> 如果在 B 应用路由下，刷新页面，也就是首次直接加载 B 应用，非 A/B 切换，B 的样式隔离禁用是有效的，类名<strong style="color: orange; ">不再带有</strong> `micro-app[name=B]`

> 后经试验：即使给所有的应用都加上 `<micro-app disable-scopecss>` ，也会存在相同的问题，即应用间切换时，禁用样式隔离并未生效，只有 `首次加载` 的那个微应用的 `禁用样式隔离` 才是有效的。如果采用 `start({ disableScopecss: true })` 这种方式禁用样式隔离，应用间切换则是正常的，但这不是我期望的。我期望 `根据条件判断某个微应用` 进行禁用样式隔离

## 复现步骤

1. 微应用根容器

```tsx
// microAppRoot.vue
<micro-app
    v-if="currentMicroApp && reload && currentMicroAppSourceUrl" // 根据应用名称切换时，重绘 micro-app，不进行重绘的话会有一些路由定向问题
    :class="['micro-view', { 'is-home': currentMicroApp === 'home' }]"
    :name="currentMicroApp" // 各个应用名称 
    :url="currentMicroAppSourceUrl" // 对应的资源 url
    :baseroute="`${routePrefix}/${currentMicroApp}`"
    :data="toRaw(microData)"
    :disable-scopecss="__disableScopecssMicroList__.includes(currentMicroApp)" // 在这里，探查当前应用是否在排除列表中
    @created="microCreated"
    @beforemount="microBeforemount"
    @mounted="microMounted"
    @unmount="microUnmount"
    @error="microError"
    @datachange="microDataChangeHandle"
    @aftershow="microAftershow"
/>
```

2. route-view

```tsx
<el-main :class="['layout-main-content', { 'is-root-route': isRootRoute }]">
    <g-loding-shade :show="routeLoading" />
    <RouterView :key="currentRouteViewKey" /> // 路由匹配后，在这里渲染
</el-main>
```

3. 路由配置

```tsx
const routes: Array<RouteConfig> = [
    {
        path: 'formDesigner',
        name: 'formDesigner',
        meta: {
            title: '表单设计器',
            icon: 'ali-icon--zujian'
            // openMode: OpenMode.NEW,
            // urlQuery: 'routeMode=root'
            // hidden: true
        },
        component: () => import('@/views/microAppRoot/index.vue')
    }
]
```

## 上传截图

1. 应用关系

![image-20221122152849964](https://foruda.gitee.com/images/1669103148304893763/2718e63b_1831475.png)

2. 跳转后结果

![image-20221122153245379](https://foruda.gitee.com/images/1669103183575295131/657723f6_1831475.png)

3. 刷新后（直接加载）

![image-20221122153429598](https://foruda.gitee.com/images/1669103186098823645/2593b78d_1831475.png)

## 复现仓库

如果需要，我会提供一个仓库

## 环境信息

* micro-app版本：0.8.10
* 主应用前端框架&版本：vue&3.2.31
* 子应用前端框架&版本：vue&3.2.31
* 构建工具&版本：vue-cli&5.0.1
