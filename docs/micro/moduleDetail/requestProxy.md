# 代理的配置

:::tip

整个系统拥有一个默认的代理 `/api` , 在每个请求上会默认添加 `/api` 的前缀，默认代理的代理路径在[环境变量](../environmentVar.md) 中配置

:::

如果需要为某个请求添加额外的代理，需要两步

## 1. 在配置对象中配置 devPrefix 字段

:::tip
devPrefix 本质上是一个字符串，但可能会在多处使用这个字符串，如果单纯的使用字符串来定义，将会形成 “魔法字符串”

好的代码应该避免魔法字符串的出现
:::

```ts
{
    name: 'getPasClass',
    api: 'kinso-basic-resources-server/v1/iam-user-cert/getPasswordClass',
    method: REQMethods.GET,
    devPrefix: '/xxxxx'
}
```

为了避免魔法字符串的出现，我在 api 模块下定义了 prefix 文件

prefix 文件的意义在于集中管理系统的代理前缀，通过常量的引用，可以在改变定义处，解决魔法字符串

改造成：

```ts
import { OtherPrefixs } from '@/api/prefix'

{
    name: 'getPasClass',
    api: 'kinso-basic-resources-server/v1/iam-user-cert/getPasswordClass',
    method: REQMethods.GET,
    devPrefix: OtherPrefixs.BPM
}
```

## 2. 在 webpack 中配置代理

前文中我们讲到，配置代理的部分抽取到了 [http > proxys](./requestConcept.md#proxys) 下，在配置不同系统的代理，创建不同的文件，然后由 `index.js` 统一暴露

假设我们现在要为 `apollo` 系统添加某个代理

:::tip

由于代理都是集成到基座应用中的，所以配置的代理一定要唯一，不要重复配置

配置代理的本质是本地服务器根据匹配规则 '/test' 拦截请求，转发请求，而这个 '/test' 其实就是第一步配置的 `devPrefix`

:::

```js
// '/src/http/proxys/apollo.js'

module.exports = {
    '/test': {
        target: 'http://172.31.12.69:10006',
        changeOrigin: true,
        pathRewrite: (path) => path.replace(/^\/test/, '')
    }
}
```
