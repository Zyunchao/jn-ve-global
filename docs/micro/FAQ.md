# 常见问题

## 页面跳转

微应用路由跳转需要使用已经封装好的方法： `/src/microApp/navTo.toPage`

:::danger

注意：

跨系统的跳转请不要适用 params 传参，请一律使用 query 传参

跳转

放弃 name 传递导航（子应用，基座应用中依旧可以使用 name 导航）：
在使用路由对象（包含 path、name 的整体对象）跳转时，name 的优先级要高于 path；
在工作流微应用容器中，跳转路由的 name 将始终保持为 workflow-root；
导致子应用的路由无法正常激活；
所以需要抛弃 name 导航。

且注意：
在应用初始化的时候，是不会触发当前的主动导航的，当前的主动导航仅适用于子应用处于激活（存活）状态时；
这样一来，如果没有使用主动导航，路由中的 params 将丢失；
因此：规范开发中跨应用跳转不要使用 params。

注意：

* name 可以和 query 混用
* path 不可以和 params 混用

:::

```vue
<template>
    <div class="box">
        <div>阿波罗：槭树科</div>

        <el-button type="warning" @click="toBicycle">
            跨系统跳转：前往 ares 的 bicycle 页面
        </el-button>

        <el-button type="danger" @click="toBurse">
            同系统跳转：前往 apollo 的 bicycle 页面
        </el-button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Aceraceae'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { toPage } from '@/microApp/navTo'

const toBicycle = () => {
    toPage({
        path: '/ares/vehicleMage/bicycle',
        query: {
            str: 'asdf'
        }
    })
}

const toBurse = () => {
    toPage({
        path: '/apollo/botany/burseraceae',
        query: {
            str: 'qwer'
        }
    })
}
</script>

<style lang="scss" scoped>
</style>
```

## 内嵌 iframe 主动激活（帆软/积木报表）

框架内提供了跳转 iframe 的 api，会在标签页上新开一个页面，不同的 url 链接将会开启不同的标签

常用于内嵌帆软的报表

:::tip

iframe 的跳转链接，内部已经处理了 `${token}` 字符串

意味着跳转链接上 携带的 `${token}` 会被处理成当前登录的 `access_token`

适用于 菜单 + 主动激活 iframe
:::

### 基座应用

:::tip

vite 老框架的使用方式同基座应用

:::

1. 引入 `mixin`

```ts
import NavTo from '@/mixins/navTo'
```

2. 解构获取激活方法

```ts
const { activateIframe } = NavTo()
```

3. 调用传参

```ts
// 传递的参数详解
interface Params { 
    /**
     * 标签 tag 标题
     */
    title?: string
    /**
     * iframe 链接
     *  - 普通：链接
     *  - 报表：页面参数
     */
    href: string
    /**
     * 标识是否是报表跳转
     */
    isStatement?: boolean
}

activateIframe({
    title: '某某报表',
    href: '/xxxx?token=${token}',
    isStatement: true
})
```

4. 报表配置帆软的基础路径

:::tip

如果是需要跳转帆软的报表，需要在环境变量中配置帆软的基础部署位置

:::

开发模式配置：

```zsh
# 基座应用 .env || .env.local
# 帆软报表基础 url
VUE_APP_STATEMENT_BASE_URL=

# 老系统 .env || .env.local
# 帆软报表基础 url
VITE_STATEMENT_BASE_URL=
```

生产模式配置（老系统同基座应用），需要在 `/public/statementBaseUrl.js` 中配置：

```js
window.__STATEMENT_BASE_URL__ = ''
```

### 微应用

1. 引入方法，微应用从 `/src/microApp/navTo.ts` 中引用：

```js
import {
    activateIframe
} from '@/microApp/navTo'
```

2. 调用传参

```ts
activateIframe({
    title: '某某报表',
    href: '/xxxx?token=${token}',
    isStatement: true
})
```

3. 报表配置帆软的基础路径

:::tip

微应用的帆软基础路径请参考 [基座应用第4步](./FAQ.md#基座应用) 的配置

:::
