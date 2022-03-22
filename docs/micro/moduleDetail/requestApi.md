# Api 模块

api 模块隶属于 请求模块，[http部分](./requestConcept.md) 是对请求工具的封装，api 模块是对于要发送的请求的封装

![apiModule](/images/realize/apiModule.png)

api 的配置，基座应用和微应用一致

## 封装思想

api 模块的封装属于将每个请求抽象成了配置对象

通过提取配置对象的各参数，创建符合：

* 请求方法
* 参数类型
* 参数
* 请求头
* 响应格式

的请求方法，请求方法内使用 [http 模块](./requestConcept.md) 封装的实例发送请求

api 各配置模块同样采用自动化引入的思想，自动化引入，形成完整的配置数组，然后统一处理配置配置对象

配置化开发模式下的请求前缀，配置 [http 模块.proxy](./requestConcept.md#proxys)，完成统一配置代理

源码不多，可参考源码

## RequestConfig 配置对象

```ts
interface RequestConfig {
    /**
     * api 调用名
     */
    name: string
    /**
     * 对应后台的接口 api
     */
    api: string
    /**
     * 请求方法
     */
    method: REQMethods
    /**
     * 当前请求需要携带的请求头
     */
    headers?: {
        [key: string]: any
    }
    /**
     * 参数发送形式
     */
    paramType?: REQParamsType
    /**
     * 开发模式前缀：取决于开发模式下已经添加的代理前缀
     * 见 vite.config.ts
     */
    devPrefix?: string
    /**
     * 请求时，axios 的额外配置
     * 可用配置请参考：https://www.kancloud.cn/yunye/axios/234845
     */
    axiosRequestConfig?: AxiosRequestConfig
}
```

### 请求类型

```ts
enum REQMethods {
   GET = 'get',
   POST = 'post',
   PUT = 'put',
   DELETE = 'delete',
   HEAD = 'head'
}
```

### 请求参数枚举

```ts
enum REQParamsType {
    /**
     * key value 形式：用于登录，需要改请求头
     * 'Content-Type': 'application/x-www-form-urlencoded'
     */
    KEY_VALUE = 'keyValue',
    /**
     * 默认的 Post/Put 请求 json 格式，不需要改请求头
     */
    JSON = 'json',
    /**
     * RESTful 风格，简单请求是参数以 query 形式拼接在请求路径后面
     * 如：/res/iam-post/entity/{id}
     */
    QUERY = 'query',
    /**
     * 简单请求的默认形式
     */
    URL = 'url'
}
```
