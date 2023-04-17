# 微应用注册列表

所有的微应用都是运行在基座应用中的，而要运行哪些微应用？这个微应用的资源又在哪里？这些信息都是需要告诉基座应用的

告诉基座应用微应用的信息是通过一个 `list` 来完成的，<strong style="color: #ff3040; ">依据约定的数据格式配置基座要加载微应用的信息，这个 `list` 就是所谓的 `微应用注册列表` </strong>

## 位置

### 基座

![注册列表](/images/micro/微应用注册列表-basic.png)

### 生产模式（基座包）

![注册列表](/images/micro/微应用注册列表-dist.png)

## 微应用注册列表 interface

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

## 类型格式详解

列表的每一个配置项，可采用字符串、对象的两种形式配置

* 字符串：`mappingMicroList` 方法会自动获取当前基座的部署服务器的 `location.origin`，并拼接列表的这一项，映射成原有格式的注册数据
    > 常用于生产模式，可以省去很多配置

* 对象：`mappingMicroList` 方法内部会自动拼接 `name` + `origin`
    > 常用于开发模式，指定不同于基座部署环境的微应用

### 配置模式示例

#### 生产模式下

生产模式下，微应用可直接配置字符串数组

```js
const isProduction = false

const microAppList = ['home', 'uums', 'apollo', 'ares', 'kinsoProduct']

window.__MICRO_APP_LIST__ = mappingMicroList(microAppList, isProduction)
```

#### 开发模式下

由于开发模式下需要运行本地的微应用，需要指定特殊的部署地址，采用对象的配置方式，如：

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

优化同样适用于远程组件时微应用中的微应用注册列表

:::
