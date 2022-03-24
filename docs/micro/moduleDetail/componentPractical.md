# 组件的使用

列举各组件的使用方式

## 本地业务组件

1. 在 `/src/components/business` 目录下面新建组件 `firstForm/index.vue`

```vue
<template>
    <div>FirstForm</div>
</template>

<script lang='ts'>
export default {
    name: 'FirstForm'
}
</script>

<script lang='ts' setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

</script>

<style lang='scss' scoped></style>
```

2. 使用，引用业务组件 `/src/components/busines/firstForm/index.vue`

```vue
<template>
    <div>microTest2222</div>

    <FirstForm />
</template>

<script lang='ts'>
export default {
    name: 'MicroTest'
}
</script>

<script lang='ts' setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import FirstForm from '@/components/busines/firstForm/index.vue'

</script>

<style lang='scss' scoped></style>
```

## 本地全局组件

1. 在 `/src/components/global` 目录下面新建组件 `twoForm/index.vue`

```vue
<template>
    <div>TwoForm</div>
</template>

<script lang='ts'>
export default {
    name: 'TwoForm'
}
</script>

<script lang='ts' setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

</script>

<style lang='scss' scoped></style>
```

2. 因为全局组件会经过自动化引入、全局注册，所以可以直接在其他组件中使用

需要注意，组件要提供 `name` 属性，name 会作为全局注册的组件名

```vue
<template>
    <div>microTest2222</div>

    <FirstForm />
    <TwoForm />
</template>

<script lang='ts'>
export default {
    name: 'MicroTest'
}
</script>

<script lang='ts' setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import FirstForm from '@/components/busines/firstForm/index.vue'

</script>

<style lang='scss' scoped></style>
```

## 远程业务组件

远程业务组件分为生产者，消费者两个

### 生产者

1. 在 `/src/components/business` 目录下面新建组件 `firstForm/index.vue`

2. 向外提供

:::tip

所有的生产者，在对外提供物资时，都是通过路由的方式进行提供的

因为我们作为生产者来说，要提供的物资是确定的，所以我们仅需要注册静态路由即可

在微应用的路由模块，增加了一个专门配置物资的路由文件，如下

:::

![生产者静态路由.png](/images/realize/生产者静态路由.png)

```ts
// /src/router/common/exposes.ts
import { RouteRecordRaw } from 'vue-router'

/**
 * 向外提供组件服务的路由
 * 因为可能存在多个组件共存的情况
 * 且微应用间只能依靠 一条 url 进行处理
 * 故在注册组件的路由时，path 一定要使用模糊匹配
 * 即：path: 'xxx/yyy/ccc/:page*'
 */
const exposesRoutes: Array<RouteRecordRaw> = [
    {
        path: '/components/firstForm/:page*',
        component: () => import('@/components/business/firstForm/index.vue')
    },
    {
        path: '/components/twoForm/:page*',
        component: () => import('@/components/business/twoForm/index.vue')
    }
]

export default exposesRoutes
```

### 消费者

消费者在使用远程组件时，一定要在本地中注册生产者的微应用列表

:::tip

由于 MicroApp 提供的嵌套应用的概念，所有的微应用都可以作为基座应用去嵌套其他微应用显示

:::

1. 注册微应用 `/public/microApps/index.js`

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
    name: 'apollo',
    url: 'http://localhost:3002/',
    keepAlive: true
}]
```

2. 使用微应用中我封装好的加载`远程组件`的组件

我已经封装了一个主动加载远程组件的组件，大家只要学会使用这个组件就可以了，组件位于

 `/src/components/business/remoteMicroAppComponent/index.vue`

```vue
<template>
    <div>阿波罗：橄榄科</div>
    <el-button type="success" @click="openModal">
        打开嵌套的应用
    </el-button>

    <g-modal
        v-model="modalShow"
        title="测试嵌套应用"
        :destroy-on-close="true"
        @closed="closedModal"
    >
        <RemoteMicroAppComponent
            :app-url="aresAppSourceUrl"
            component-url="/components/twoForm"
            :data="{
                name: '刘备',
                id: '123',
                age: 33
            }"
            @mounted="twoFormCreate = true"
            @datachange="remoteDataChange"
        />

        <RemoteMicroAppComponent
            v-if="twoFormCreate"
            :app-url="aresAppSourceUrl"
            component-url="/components/firstForm"
            :data="{
                name: '关羽',
                id: '456',
                age: 32
            }"
            @mounted="twoFormCreate2 = true"
        />

        <RemoteMicroAppComponent
            v-if="twoFormCreate2"
            :app-url="aresAppSourceUrl"
            :data="{
                name: '张飞',
                id: '789',
                age: 31
            }"
            component-url="/components/twoForm"
        />
    </g-modal>
</template>

<script lang="ts">
export default {
    name: 'Burseraceae'
}
</script>

<script lang="ts" setup>
import { useRouter, useRoute } from 'vue-router'
import RemoteMicroAppComponent from '@/components/business/remoteMicroAppComponent/index.vue'
import { ref, watchEffect, nextTick } from 'vue'

const aresAppSourceUrl = window.__MICRO_APP_LIST__.find((app) => app.name === 'ares')?.url
const modalShow = ref<boolean>(false)

console.log(`%c aresAppSourceUrl == `, 'color: #67c23a;', aresAppSourceUrl)

const twoFormCreate = ref<boolean>(false)
const twoFormCreate2 = ref<boolean>(false)

const openModal = () => {
    modalShow.value = true
}

const closedModal = () => {
    twoFormCreate.value = false
    twoFormCreate2.value = false
}

const remoteDataChange = (data: object) => {
    console.log(`%c remoteDataChange ============ `, 'color: #67c23a;', data)
}
</script>

<style lang="scss" scoped></style>
```

:::danger

千万不要把远程组件循环引用

即 a.c组件 引用 b.d组件，b.d 组件又引用 a.c 组件

:::
