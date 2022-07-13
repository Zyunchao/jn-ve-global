# 微应用注册列表

## 什么是微应用注册列表

所有的微应用都是运行在基座应用中的，而要运行哪些微应用？这个微应用的资源又在哪里？信息都是需要告诉基座应用的

告诉基座应用微应用的信息，是通过一个 `list` 来完成，<strong style="color: #ff3040; ">依据约定的数据格式配置微应用的信息，这个 `list` 也就是所谓的 `微应用注册列表` </strong>

## 位置

### 基座

![注册列表](/images/micro/微应用注册列表-basic.png)

### 生产模式（基座包）

![注册列表](/images/micro/微应用注册列表-dist.png)

## 不同的开发模式配置方式

已知，我们在开发一个程序时，分为开发模式和生产模式，我们现在常用的开发方式为：

* 开发模式：将基座应用部署到服务器上，微应用的 url 采用 `localhost:端口号` 的形式配置
    > 这样基座应用加载的就是本地的微应用

* 生产模式：将微应用打包后，和基座应用部署在统一个服务器下，微应用的 url 采用 `ip 或 域名` 的形式配置
    > 这样基座应用加载的就是服务器中的微应用的生产包

无论哪种开发模式，我们都需要准确的将微应用的部署地址，告诉基座应用

## 格式

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
        url: 'http://localhost:3001',
        keepAlive: true
    },
    {
        name: 'apollo',
        url: 'http://localhost:3002',
        keepAlive: true
    }
]
```

:::tip 注意

[基座部署开发模式](./quickStart2.md)下：

微应用注册列表中的每个微应用的 url 可配置为

* 具体 ip 地址：常用于生产模式
* localhost:300X：微应用的注册是在运行阶段的，如果以 `localhost` 配置，用户（开发）在访问基座应用时，基座应用会请求本地（开发模式）的资源，以实现生产基座和开发微应用的对接

:::

## 优化的格式

:::tip 2022-07-13 起适用
:::

微应用注册列表本质上就是上面的格式，基座应用所需的信息都包含在了里面，在经过实际的开发后，发现更改生产包里的注册列表是一个繁琐的事情，且有可能存在忘记修改的情况

在原有的注册列表配置基础上，进行了改进，改进后的注册列表如下：

```ts
interface MicroApp {
    /**
     * 微应用名称，必填
     */
    name: string
    /**
     * 来源
     */
    origin?: string
    /**
     * 缓存，默认 true
     */
    keepAlive?: boolean
}

// 注册列表
type MicroAppList = Array<string | MicroApp>
```

### 格式详解

列表的每一个配置项，可采用字符串、对象的两种形式配置

* 字符串：`mappingMicroList` 方法会自动获取当前基座的部署服务器的 `location.origin`，并拼接列表的这一项，映射成原有格式的注册数据
    > 常用于生产模式，可以省去很多配置

* 对象：`mappingMicroList` 方法内部会自动拼接 `name` + `origin`
    > 常用于开发模式，指定不同于基座部署环境的微应用

### 示例

#### 生产模式下

在升级后的注册列表，生产模式下，微应用可直接配置字符串数组

```js
const isProduction = false

const microAppList = ['home', 'uums', 'apollo', 'ares', 'kinsoProduct']

window.__MICRO_APP_LIST__ = mappingMicroList(microAppList, isProduction)
```

#### 开发模式下

由于开发模式下需要运行本地的微应用，所以，还是需要指定特殊的部署地址的，这时需要采用对象的配置方式，如：

```js
const isProduction = false

const microAppList = [{
        name: 'home',
        origin: 'http://localhost:3002'
    },
    {
        name: 'uums',
        origin: 'http://localhost:3001'
    },
    {
        name: 'apollo',
        origin: 'http://localhost:3098'
    },
    {
        name: 'ares',
        origin: 'http://localhost:3099'
    },
    {
        name: 'kinsoProduct',
        origin: 'http://localhost:3006'
    }
]

window.__MICRO_APP_LIST__ = mappingMicroList(microAppList, isProduction)
```

#### 混合模式

目前来说，开发时，需要同时指定 已部署的微应用（如：uums、home） + 开发模式的微应用

可以采用混合模式：即 字符串 + 对象

```js
const isProduction = false

const microAppList = [
    'home',
    {
        // 对象模式下，不配置 origin 或 origin 为 ''，都将等同于字符串的配置方式
        name: 'uums',
        origin: ''
    },
    {
        name: 'apollo',
        origin: 'http://localhost:3098'
    },
    {
        name: 'ares',
        origin: 'http://localhost:3099'
    },
    {
        name: 'kinsoProduct',
        origin: 'http://localhost:3006'
    }
]

window.__MICRO_APP_LIST__ = mappingMicroList(microAppList, isProduction)
```

#### 一键生产模式（推荐）

对于字符串与对象的配置区别主要在于请求资源的 `origin` 的拼接：

如果在不想在 `开发模式` 与 `生产模式` 下配置两个注册列表

可以只配置一个开发模式的列表，在将要部署生产时，将 `/public/microApps/index.js` 里面的 `isProduction` 配置为 true（开发模式下必须为 false），这样一来，所有的微应用都将强制拼接为当前运行的环境 `location.origin`

```js
const isProduction = true

const microAppList = [
    'home',
    {
        // 对象模式下，不配置 origin 或 origin 为 ''，都将等同于字符串的配置方式
        name: 'uums',
        origin: ''
    },
    {
        name: 'apollo',
        origin: 'http://localhost:3098'
    },
    {
        name: 'ares',
        origin: 'http://localhost:3099'
    },
    {
        name: 'kinsoProduct',
        origin: 'http://localhost:3006'
    }
]

window.__MICRO_APP_LIST__ = mappingMicroList(microAppList, isProduction)
```

:::tip

优化的本质，是对之前需要频繁修改注册列表的优化，微应用注册列表的本质还是之前的格式，代码中对于 `__MICRO_APP_LIST__` 的操作，没有任何变化

:::

:::tip

以往的注册列表依旧生效

:::
