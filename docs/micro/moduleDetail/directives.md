# 指令

[[toc]]

这里的指令指应用的自定义指令，自定义指令存放在 `/src/directives` 目录下

![指令](@imgs/realize/指令.jpg)

指令会自动注册，按照指令的写法，以模块为单位，会自动注册到根实例中

目前已经提供的自定义指令有：

* auth

## v-auth

用来校验权限的指令，会根据应用功能模块注册的 `按钮/权限` 进行节点的显示（创建）隐藏（移除）

校验权限即业务系统中，当前用户的角色所拥有的权限，权限包括：

* 菜单权限
* 路由权限
* 功能权限（按钮）

功能权限大多使用 v-auth 来实现

:::tip

注意：权限校验必须使用后端控制路由，前端静态路由当前指令不会生效

:::

### 配置权限

在 `应用管理>应用功能` 模块中，为某一个菜单（路由模块）添加 `按钮/权限`

![添加权限](@imgs/realize/添加权限.png)

授权标识：作为匹配关键字段存在，需要和后台约定配置规则

![授权标识](@imgs/realize/授权标识.png)

### 基本使用

v-auth 可以用于如下节点

* 按钮
* 表格配置列的按钮
* 任意普通节点
* 组件

:::tip

在组件标签上使用时，应当注意所写的组件是否只有一个根节点

当在组件中使用时，自定义指令总是会被应用在组件的根节点上。

和 attribute 不同，指令不会通过 v-bind="$attrs" 被传入另一个元素。

有了[片段](https://v3.cn.vuejs.org/guide/migration/fragments.html#%E6%A6%82%E8%A7%88)支持以后，组件可能会有多个根节点。当被应用在一个多根节点的组件上时，指令会被忽略，并且会抛出一个警告。

:::

:::tip

v-auth 内部会以当前模块的路由为匹配基准，查找应用功能中配置的 权限点，然后判断当前角色是否勾选了这个权限点，然后进行 dom 操作

传递给 v-auth 的值，就是配置阶段的授权标识的取值

:::

```vue
<template>
    <div class="box">
        <h2>普通元素</h2>
        <div v-auth="'data:table'">
            data:table
        </div>
        <div v-auth="'data:write'">
            data:write
        </div>
        <div v-auth="'burseraceae:add'">
            burseraceae:add
        </div>
    </div>

    <div class="box">
        <h2>tab 页</h2>
        <el-tabs v-model="activeName" class="demo-tabs">
            <el-tab-pane v-auth="'data:table'" label="User" name="first">
                data:table
            </el-tab-pane>
            <el-tab-pane v-auth="'data:write'" label="Config" name="second">
                data:write
            </el-tab-pane>
            <el-tab-pane v-auth="'burseraceae:add'" label="Role" name="third">
                burseraceae:add
            </el-tab-pane>
        </el-tabs>
    </div>

    <div class="box">
        <h2>按钮组</h2>
        <g-button-group :btns="btns" />
    </div>

    <div class="box flex">
        <h2>组件：</h2>
        <Panel v-auth="'data:table'">
            data:table
        </Panel>
        <Panel v-auth="'data:write'">
            data:write
        </Panel>
        <Panel v-auth="'burseraceae:add'">
            burseraceae:add
        </Panel>
    </div>
</template>

<script lang="ts">
export default {
    name: 'Burseraceae'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { BtnProps } from 'jn-ve-global/packages'
import listAuth from '@/mixins/listAuth'
import Panel from './component/panel.vue'

const activeName = ref<string>('first')

const btns: BtnProps[] = [
    {
        label: 'data:table',
        authCode: 'data:table'
    },
    {
        label: 'data:write',
        authCode: 'data:write'
    },
    {
        label: 'burseraceae:add',
        authCode: 'burseraceae:add'
    }
]

const tabs = listAuth(btns as any)

console.log(`%c tabs === `, 'color: #67c23a;', tabs)
</script>

<style lang="scss" scoped>
h2 {
    margin-bottom: 10px;
}

.box {
    padding: 10px;
    background-color: #fff;
    margin: 15px 0;

    &:first-of-type {
        margin-top: 0;
    }
}
</style>
```

### 在 tabs 标签页中使用

不同于 v-if 等指令，自定义的指令无法做到代码的静态编译时，在语法树中处理，自定义指令只能在运行时进行处理 dom

同时自定义指令无法阻止组件的渲染（只能渲染后移除 dom）

在一些特殊的组件，如 elment 的 tabs 组件中，为 el-tab-pane 添加 v-auth 指令，并没有按照预期的行为移除掉那一项 tab，而是移除的 `tab-content`

因为 v-auth 是会加到组件的根节点上面的，而 tab 是根据 tabs 组件的 `slots` 进行生成的

在这里，提供了一些特殊的方法，用于过滤一些带有 `authCode` 字段的数组，由于要用到 `路由对象` （vue-router 提供的 hook） ，故以 mixin 的方式进行了封装

:::tip

利用 `listAuth` 方法，筛选符合权限的节点，然后利用循环生成对应的组件

:::

```ts
import { useRoute } from 'vue-router'

type BaseList = {
    authCode: string
    [k: string]: any
}[]

export default (list: BaseList) => {
    const route = useRoute()
    const btns = route.meta.btns as any[]

    return list.filter((item) => {
        const target = btns.find((btn) => btn.perms === item.authCode)
        return target ? target.btnCheck : true
    })
}
```
