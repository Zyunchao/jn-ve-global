# 全局状态管理实用

Vuex 的应用，请多参考[官网](https://vuex.vuejs.org/zh/)

## 获取

1. 引用

```ts
import { useStore } from '@/store'
```

2. hook 调用获取 store 实例

```ts
const store = useStore()
```

3. 获取数据

```ts
// 动态获取
const isRootRoute = computed(() => store.state.currentStatus.isRootRoute)

// 静态获取
const isRootRoute2 = store.state.currentStatus.isRootRoute
```

更多请参考 [Vuex State](https://vuex.vuejs.org/zh/guide/state.html)

## 提交

1. 模块有命名控件，如：

```ts
store.commit('currentStatus/setIsRootRoute', data)
```

更多请参考 [Vuex Mutation](https://vuex.vuejs.org/zh/guide/mutations.html)

## 新增模块

模块增加，基座与微应用一致

1. 在 `/src/store/interface/` 中新增模块接口 `Foo.ts`

```ts
// Foo.ts
export default interface Foo {
    bar: string
}

```

2. 在 `/src/store/interface/index.ts` 中引入并抛出

```ts
export { default as Foo } from './Foo'
```

3. 在 `/src/store/interface/RootStateTypes.ts` 中注册

```ts
import { CurrentUserInfo, LoginInfo, AppFuncTree, CurrentStatus, SysDict, Foo } from './index'

export default interface RootStateTypes {
    currentUserInfo: CurrentUserInfo
    loginInfo: LoginInfo
    appFuncTree: AppFuncTree
    currentStatus: CurrentStatus
    sysDict: SysDict
    foo: Foo
}

```

4. 新建 `/src/store/modules/foo.ts` 实现接口

```ts
import { Module } from 'vuex'
import { Foo, RootStateTypes } from '../interface'

const Foo: Module<Foo, RootStateTypes> = {
    namespaced: true,
    state() {
        return {
            bar: ''
        }
    },
    mutations: {
        setBar(state, data: string) {
            state.bar = data
        }
    },
    actions: {}
}

export default Foo

```

:::tip

得益于微前端，每一个微应用的 vuex 实例都是独立的，意味着每个微应用开发人员可自由添加模块，不需要担心污染基座应用的状态树

:::
