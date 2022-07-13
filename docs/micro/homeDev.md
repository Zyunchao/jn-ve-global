# 首页开发

系统首页采用卡片模式开发，整个首页的展示内容，都是灵活可配的，且根据用户定制化的

整个首页的实现框架，由架构组完成开发，内部的卡片需要各组定制化开发，为了方便各组管理自己的卡片，将整个首页作为一个独立的微应用存在

开发维护模式即：

* 各组运行各自的首页微应用（统一名称：home）
* 各组开发、维护自己的卡片
* 高度定制化首页（各组可视情况而定：是否使用当前首页的模式，卡片模式，即可以将首页完全改造成自己的首页）

## 获取首页仓库模板 & 绑定多个仓库

:::tip

首页是一个微应用，但 `微应用模板` ≠ `首页模板`

首页模板相当于继承的微应用模板，开发者需要关注首页模板的更新，它俩本质上是一致的，架构组会在微应用模板更新时，同步推送首页微应用模板

:::

和微应用模板同理，需要在本地仓库中绑定两个远程仓库，目的就是即使获取首页模板的更新

和微应用模板的唯一差别在于基础远程仓库的地址不同，首页模板远程基础仓库地址：

SSH:

> git@gitlab.jsjngf.com:kinso/home-template.git

HTTP:

> http://gitlab.jsjngf.com/kinso/home-template.git

后续绑定请[参考](./storeMage.md#地址)

## 开发卡片

### 项目目录

微应用项目目录与微应用基础框架目录无异，只不过是预定义了两个模块

![目录](/images/micro/homeDir.png)

* design: 个人中心模块，实际上相当于首页的设计器
* home: 实际的首页模块代码

:::tip

大家的工作都在 `/src/views/home/componet/cards` 中，监管特殊情况下，拥有特殊的 `快捷入口` 卡片，需要关注 同目录下的 `quick`

::: 

### 开发卡片组件

1. 在 `cards` 下，新建卡片目录，目录结构遵循组件开发

![卡片](@imgs/micro/卡片.png)

2. 使用 `homeBaseCardLayout` 增强容器组件

> 在首页模板项目中， `src/components/business` 目录下，增加了用于增强卡片的一个组件，可以把它看成一个容器，容器的行为已经预定好，我们需要开发的是容器里面的内容

一个卡片示例：

```vue
<template>
    <Layout class="notify" icon="home-card-notify-icon" title="公告" :show-close="false">
        <el-scrollbar>
            <ul>
                <li
                    v-for="item in notifyList"
                    :key="item.id"
                    class="notify-item overflow-ellipsis"
                    :title="item.text"
                >
                    <span>{{ item.text }}</span>
                </li>
            </ul>
        </el-scrollbar>
    </Layout>
</template>

<script lang="ts">
export default {
    name: 'Notify'
}
</script>

<script lang="ts" setup>
import { defineComponent, reactive, toRefs } from 'vue'
import Layout from '@/components/business/homeBaseCardLayout/index.vue'

const state = reactive<{
    notifyList: any[]
    loadingFalg: boolean
}>({
    notifyList: [],
    loadingFalg: false
})

new Promise((res, rej) => {
    state.loadingFalg = true
    setTimeout(() => {
        res('a')
    }, 400)
}).then((res) => {
    state.loadingFalg = false

    state.notifyList = [
        {
            id: '1',
            text: '省综合金融服务平台“大数据+征信”赋能普惠金融显实效'
        },
        {
            id: '2',
            text: '省地方金融监管局党组召开全面从严治党专题会省地方金融监管局党组召开全面从严治党专题会省地方金融监管局党组召开全面从严治党专题会省地方金融监管局党组召开全面从严治党专题会'
        },
        {
            id: '3',
            text: '江苏小贷逆势增长'
        },
        {
            id: '4',
            text: '江苏银保监局推动提升金融支持全面乡村振兴服务质效'
        },
        {
            id: '5',
            text: '央行持续提升对小微企业的金融服务水平'
        },
        {
            id: '6',
            text: '省地方金融监管局党组书记、局长查斌仪为全局党员干部上专题党课'
        },
        {
            id: '7',
            text: '省地方金融监管局组织召开“七·一”表彰大会'
        }
    ]
})
</script>

<style lang="scss" scoped>
.notify {
    ul {
        li.notify-item {
            height: 52px;
            border-bottom: 1px solid #e8e8e8;
            line-height: 52px;
            font-size: 16px;
            color: #9699a4;

            &:hover {
                color: var(--jn-base-font-color-black);
            }
        }
    }
}
</style>
```

### 注册卡片

这一步，可以放在开发卡片组件之前，可以先注册，然后可以体现在页面中后，进行开发卡片

在业务系统中，进入 `基本信息设置 > 卡片管理 > 新增`

![卡片管理](@imgs/micro/卡片管理.png)

### 设计布局

注册完卡片后，进入个人中心（系统右上角头像处）

在个人中心的待选列表处，应该就能看到你所注册（前提是已经在项目目录中写了这个卡片组件）的组件了，进行拖放排版即可
