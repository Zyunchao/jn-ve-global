# 基于部署生产的基座应用开发

:::tip

当前模式为各位开发所接触的开发模式

原理流程：将基座应用部署，访问部署的基座应用地址，基座应用在运行阶段以 `localhost` 加载开发者本地的微应用

优点：

* 不需要本地启动基座应用
* 不需要配置路由模式
* 不需要配置额外代理
* 开发只需要关注微应用框架即可，减轻开发负担

缺点：

* 无法支持开发热更新
* 微应用注册较为封闭，需要部署人员在生产环境中修改

:::

## 部署基座应用

架构组已在 `http://172.31.33.84/` 环境部署了一套基座应用

:::tip
由于微应用都是基于基座应用运行的，意味着微应用的请求都会基于基座应用的部署环境去请求

简言之：<strong style="color: #ff3040; ">基座应用只能请求到它所部署环境下的服务</strong>

这就需要各项目组应该在各自的环境上部署基座应用，[如何部署？](./production.md)

:::

应用采用文件夹（二级目录）方式部署，基座应用和各微应用存在同一根目录下，如图所示

![前端项目服务器目录.png](/images/micro/前端项目服务器目录.png)

## 配置微应用注册列表

详见 [微应用注册列表](./microRegList.md)

可直接修改服务器中的 `basic` 目录下的微应用注册列表

> 位置： `/www/wwwroot/basic/microApps/index.js`

![增加微应用.png](/images/micro/增加微应用.png)

:::tip 注意

以当前方式开发，将不能再使用静态路由配置，业务模块都将以动态路由运行

:::

至此，所有开发都将不再需要关注基座应用，只需要在浏览器中输入自己项目组部署的基座应用

### 关于缓存

:::danger

在进行直接修改服务器中的文件的时候，客户端处可能存在缓存，导致加载不到新的微应用列表，可进行如下两种方案处理

* 开发清除浏览器缓存刷新（开发者）
* 修改服务器中基座应用的 `index.html` 中，微应用注册列表的引用版本戳

:::

文件路径： `/www/wwwroot/basic/index.html`

如下圈绿的部分：

> 可随便修改

![版本时间戳.png](/images/micro/版本时间戳.png)

## 微应用开发

1. 获取微应用框架，请参考[仓库管理](./storeMage.md)

2. 在拿到微应用框架后，更改文件夹名称
    >文件夹命名以各项目名为准，如： `microapptemplate` => `apollo`

![微应用目录名称修改](/images/realize/微应用目录名称修改.png)

3. 修改 package.json 的 name 字段 `/package.json`
    > 命名以项目名为准，微应用内部会使用 name 作为唯一标识拼接一些关键变量

![packageName.png](/images/realize/packageName.png)

4. 在 `/.gitignore` 中添加生产包的忽略配置
    > 由于项目采用二级目录配置，打包出来的生产包，以 第三步 的命名，命名生产包，生产包不需要 git 管理，故需要将项目名配置到 .gitignore 中

```zsh
# .gitignore
apollp
```

5. 修改微应用的端口 `/vue.config.js`
    > 开发模式下，应用是以端口进行本地部署的，如果在本地跑多个微应用，<strong style="color: #ff3040;">每个微应用的端口应该唯一</strong>，关乎基座应用的注册及加载资源

![portChnage](/images/realize/portChnage.png)

6. 配置基座应用的部署位置
    > 请参考 [关于打包静态资源优化](./production.md#关于打包静态资源优化)

```zsh
# 基座应用部署位置，用来加载静态共享资源，静态共享资源存在于基座应用中
VUE_APP_BASE_APP_SERVER=http://172.31.33.84/basic
```

7. 添加页面 `/src/views/`
    > 依据[页面创建规则](./moduleDetail/pages.md#页面组件规范)，添加页面

![pages](/images/realize/pages.png)

```vue
<template>
    <div>Burseraceae</div>
</template>

<script lang="ts">
export default {
    name: 'Burseraceae'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped></style>
```

8. 前往 `应用管理 > 应用功能` 添加动态路由
    > 动态路由添加方式请参考 [动态路由注册](./moduleDetail/routerPractical.md#动态路由注册)

![创建动态路由.png](/images/micro/创建动态路由.png)

至此，完成了微应用页面的添加

## 访问

在浏览器访问基座应用的部署服务器：

如 [http://172.31.33.84/basic/](http://172.31.33.84/basic/)
