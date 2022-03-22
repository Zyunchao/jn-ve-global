# 请求实用篇

请求模块的实用，从两个角度出发：

* api 的注册与实用
* [代理的注册与配置](./requestProxy.md)

## api 的使用

1. 创建模块文件 `/src/api/modules/foo.api.ts`
    > 模块的命名应该具有语义化，且应该以一个业务大模块为出发点创建文件；<br/>
    > 如：用户管理模块，创建为 userMage.api.ts，而下属子模块，如：职务管理的api 注册，在文件内部以数组体现；<br/>
    > 文件需要带有 `.api.ts` ，自动化注册会按照 `.api.ts` 作为匹配条件

2. 配置内容

```ts
//渠道管理
const channelMapping: Array<RequestConfig> = [
    {
        // 分页查询
        name: 'channel-manage-list',
        api: 'v1/notice-channel-manage/listChannelPage',
        method: REQMethods.GET,
        devPrefix: OtherPrefixs.MESSAGE_LIUAIJUN
    },
    {
        // 新增/编辑
        name: 'add-channel-manage',
        api: 'v1/notice-channel-manage/entity',
        method: REQMethods.POST,
        devPrefix: OtherPrefixs.MESSAGE_LIUAIJUN
    },
    {
        // 删除
        name: 'delete-channel-manage',
        api: 'v1/notice-channel-manage/delete',
        method: REQMethods.DELETE,
        paramType: REQParamsType.QUERY,
        devPrefix: OtherPrefixs.MESSAGE_LIUAIJUN
    }
]

export default [...channelMapping]
```

3. 引用，在任何模块内（\*.vue, \*.ts, \*.tsx）引用

:::tip

引用的模块是一个超级大的对象，内部包含所有的注册表映射的请求方法

:::

```ts
import { apis } from '@/api'
```

拿到的对象以 uums 为例：

![apisBigObject](/images/realize/apisBigObject.png)

api 文件的名字将作为请求对象的第一层字段，每个字段所包含的是模块内部数组所映射的一个对象

4. 调用

```ts
// apis.文件名.congifName(params)
apis.foo['channel-manage-list'](params)
```

5. 处理结果

每个请求配置对象都被包装成了一个返回 promise 对象的函数，在调用后，使用 `.then` 进行处理结果

```ts
apis.foo['channel-manage-list'](params).then(res => {
    console.log(`%c res === `, 'color: #67c23a;', res)
})
```

### api 多种配置方式

针对不同的情况，config 拥有不同的配置方式

不同的配置方式都取决于[参数](./requestApi.md#requestconfig-配置对象)的传递

1. 普通 Get 请求，参数默认以 search 的形式携带，如： `/res/iam-post/entity?name=zhangsan`

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'announce-list',
    api: 'kinso-announcement-server/v1/announce/listPage',
    method: REQMethods.GET
}
```

2. 普通 Post 请求，参数默认以 json 的形式携带

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'announce-add',
    api: 'kinso-announcement-server/v1/announce/entity',
    method: REQMethods.POST
}
```

3. 参数以 RESTful 风格携带，适用于简单请求（GET/DELETE/HEAD），如： `/res/iam-post/entity/{id}`

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'post_del',
    api: 'kinso-basic-resources-server/v1/iam-post/entity',
    method: REQMethods.DELETE,
    paramType: REQParamsType.QUERY
}
```

4. Post 请求，参数以 keyValue 形式传递，某些情况下，接口可能需要表单形式的参数，可以改成 keyValue 形式传递参数

以 keyValue 形式传递参数，该请求会自动添加请求头：'Content-Type': 'application/x-www-form-urlencoded'

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'login',
    api: 'kinso-auth-webmvc-oauth2-server/oauth2/token',
    method: REQMethods.GET,
    paramType: REQParamsType.KEY_VALUE
}
```

5. 携带自定义请求头，通过添加 headers 字段，添加此次请求的额外请求头

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'refresh',
    api: 'kinso-auth-webmvc-oauth2-server/oauth2/refresh',
    method: REQMethods.GET,
    paramType: REQParamsType.KEY_VALUE,
    headers: {
        Authorization
    }
}
```

6. 请求添加 [axios 的额外配置参数](http://www.axios-js.com/zh-cn/docs/#%E8%AF%B7%E6%B1%82%E9%85%8D%E7%BD%AE)

这是一个改变响应类型的配置方式，这个接口需要获取文件流格式的，需要额外配置 axios 的参数，以 axiosRequestConfig 的形式配置

```ts
import { RequestConfig, REQMethods, REQParamsType } from '@/@types/Request'

{
    name: 'getFileStream',
    api: 'kinso-basic-open-server/v1/document/file/download',
    method: REQMethods.GET,
    paramType: REQParamsType.QUERY,
    axiosRequestConfig: {
        responseType: 'blob'
    }
}
```
