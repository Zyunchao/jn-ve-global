# 全局状态管理概念

当前系统使用的全局状态管理插件为 [Vuex4](https://vuex.vuejs.org/zh/)

## 封装思想

vuex 的封装没有太多复杂的操作，封装主要实现了：

* 分模块
* [支持 TypeScript](https://vuex.vuejs.org/zh/guide/typescript-support.html)
* 自动化引入、注册
* 持久化（基座应用）

具体的封装可参考源码，多是interface的定义，及实现

## 具体存储的内容

### 基座应用

![基座应用store](/images/realize/基座应用store.png)

#### AppFuncTree

```ts
interface AppFuncTree {
    /**
     * 当前用户的功能树源数据
     */
    currentUserAppFuncTree: AppFunc[]
    /**
     * 包含系统所有功能的树
     */
    systemAppFuncTree: AppFunc[]
    /**
     * 当进行应用管理时，出发刷新当前用户功能树的 flag
     */
    updateAppFuncTreeFlag: boolean
    /**
     * 后台源数据 => 前端需要的格式
     */
    routeConfigs: RouteConfig[]
    /**
     * 有 component 的组件（有效注册）
     */
    registeredRoutes: RouteConfig[]
    /**
     * 加载后台 route flag
     */
    loadRouteFlag: boolean
}
```

#### CurrentStatus

```ts
interface CurrentStatus {
    /**
     * 当前路由 path
     */
    currentPath: string
    /**
     * 页面跳转 路由加载 flag
     */
    routeLoading: boolean
    /**
     * 是否为根路由
     */
    isRootRoute: boolean
    /**
     * 当前业务是否全屏（非全屏）
     */
    isFullScreen: boolean
    /**
     * 当前屏幕与设计稿的比例
     */
    screenRatio: number
    /**
     * 是否在登录之后
     *  1. 登录
     *  2. 重新登录
     */
    isFirstAfterLogin: boolean
    /**
     * 是否提示更改密码，同步首次登录
     */
    hintUpdatePass: boolean
}
```

#### CurrentUserInfo

```ts
interface CurrentUserInfo {
    /**
     * 账户信息
     */
    accountInfo: UserInfo
    /**
     * 客户端信息
     */
    clientInfo: ClientChannel
    /**
     * 部门列表
     */
    departList: Department[]
    device: string
    /**
     * 机构信息
     */
    instituInfo: OrgInfo
    /**
     * 登录信息
     */
    loginInfo: any
    /**
     * 职务列表
     */
    postList: Post[]
    roleList: RoleInfo[]
}
```

#### LoginInfo

```ts
interface LoginInfo {
    access_token: string
    refresh_token: string
    token_type: string
    expires_in: number | string
    scope: string
    expiration_time: number
}
```

#### SysDict

```ts
interface SysDict {
    /**
     * 字典全量列表
     */
    list: SysDictEntity[]
}
```

### 微应用

![微应用store](/images/realize/微应用store.png)

:::tip

微应用的这些状态都是经由基座或父应用传递的，自身没有维护（持久化）这些状态

模块与基座应用一致

有两个模块不同

:::

#### AppFuncTree

```ts
interface AppFuncTree {
    /**
     * 来自基座应用的注册路由
     */
    remoteRegisteredRoutes: RouteConfig[]
    /**
     * 有 component 的组件（有效注册）
     */
    registeredRoutes: RouteConfig[]
}
```

#### CurrentStatus

```ts
interface CurrentStatus {
    /**
     * 当前路由 path
     */
    currentPath: string
    /**
     * 页面跳转 路由加载 flag
     */
    routeLoading: boolean
}
```
