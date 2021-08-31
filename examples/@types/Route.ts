import { RouteRecordNormalized, _RouteRecordBase, RouteComponent } from 'vue-router'

type Lazy<T> = () => Promise<T>

export interface RouteMeta {
    title: string // 菜单栏及 tagsView 栏、菜单搜索名称（国际化）
    isLink?: string // 是否超链接菜单，开启外链条件，`1、isLink:true 2、链接地址不为空`
    hidden?: boolean // 是否隐藏此路由
    cache?: boolean // 是否缓存组件状态
    isAffix?: boolean // 是否固定在 tagsView 栏上
    isIframe?: boolean // 是否内嵌窗口，，开启条件，`1、isIframe:true 2、链接地址不为空`
    icon?: string // 图标
}

export interface RouteConfig {
    path: _RouteRecordBase['path']
    meta?: RouteMeta
    name?: _RouteRecordBase['name']
    component?: RouteComponent | Lazy<RouteComponent>
    children?: RouteConfig[]
    redirect?: _RouteRecordBase['redirect']
    alias?: _RouteRecordBase['alias']
    props?: RouteRecordNormalized['props']
    beforeEnter?: _RouteRecordBase['beforeEnter']
}
