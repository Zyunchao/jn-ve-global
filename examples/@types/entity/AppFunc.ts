import App from './App'

/**
 * 应用功能实体类
 */
export default interface AppFunc {
    /**
     * 应用编号
     */
    appId: App['id']
    /**
     * 应用名称
     */
    appName: string
    /**
     * 按钮权限状态
     */
    btnStatus: BtnStatus
    /**
     * 前端组件
     */
    component: string
    /**
     * 前端组件name
     */
    componentName: string
    /**
     * 创建者
     */
    createBy: string
    /**
     * 创建时间
     */
    createTime: string
    /**
     * 是否隐藏路由
     */
    hidden: Hidden
    /**
     * 菜单图标
     */
    icon: string
    /**
     * 主键
     */
    id: string
    /**
     * 是否有数据权限
     */
    isDataRole: string
    /**
     * 是否叶子节点（0：否 1：是）
     */
    isLeaf: IsLeaf
    /**
     * 是否聚合路由
     */
    isMergeRoute: IsMergeRoute
    /**
     * 是否路由功能
     */
    isRoute: IsRoute
    /**
     * 名称
     */
    name: string
    /**
     * 打开方式
     */
    openMode: OpenMode
    /**
     * 父级id
     */
    parentId: string
    /**
     * 菜单权限编码
     */
    perms: string
    /**
     * 权限策略（1：显示 2：隐藏）
     */
    permsType: PermsType
    /**
     * 备注
     */
    remark: string
    /**
     * 菜单排序
     */
    sortNo: string
    /**
     * 菜单 || 功能类型
     */
    type: FuncType
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
    /**
     * 功能路径
     */
    url: string
    /**
     *
     */
    children?: AppFunc[]
    /**
     * 标识位，标识 APP or Func
     */
    isApp: boolean
    /**
     * 按钮是否赋予权限
     */
    btnCheck: boolean
    /**
     * 是否缓存路由
     */
    isCache: IsCache
    /**
     * 是否模糊匹配
     */
    isBlurry: IsBlurry
    /**
     * 扩展字段
     */
    [k: string]: any
}

/**
 * 功能类型
 */
export enum FuncType {
    ROOT = '0',
    SUB = '1',
    BTN = '2',
    WORK = '3'
}
export const FuncTypeMapping = {
    [FuncType.ROOT]: '根菜单',
    [FuncType.SUB]: '子菜单',
    [FuncType.BTN]: '按钮/权限',
    [FuncType.WORK]: '工作台'
}

/**
 * 按钮权限状态
 */
export enum BtnStatus {
    INVALID = '0',
    VALIID = '1'
}
export const BtnStatusMapping = {
    [BtnStatus.INVALID]: '无效',
    [BtnStatus.VALIID]: '有效'
}

/**
 * 是否隐藏路由
 */
export enum Hidden {
    NO = '0',
    YES = '1'
}
export const HiddenMapping = {
    [Hidden.NO]: '否',
    [Hidden.YES]: '是'
}

/**
 * 是否叶子节点
 */
export enum IsLeaf {
    NO = '0',
    YES = '1'
}
export const IsLeafMapping = {
    [IsLeaf.NO]: '否',
    [IsLeaf.YES]: '是'
}

/**
 * 是否聚合路由
 */
export enum IsMergeRoute {
    NO = '0',
    YES = '1'
}
export const IsMergeRouteMapping = {
    [IsMergeRoute.NO]: '否',
    [IsMergeRoute.YES]: '是'
}

/**
 * 是否路由功能
 */
export enum IsRoute {
    NO = '0',
    YES = '1'
}
export const IsRouteMapping = {
    [IsRoute.NO]: '否',
    [IsRoute.YES]: '是'
}

/**
 * 打开方式
 */
export enum OpenMode {
    SELF = '0',
    NEW = '1'
}
export const OpenModeMapping = {
    [OpenMode.SELF]: '单页打开',
    [OpenMode.NEW]: '外部打开'
}

/**
 * 权限策略
 */
export enum PermsType {
    SHOW = '1',
    HIDE = '2'
}
export const PermsTypeMapping = {
    [PermsType.SHOW]: '显示',
    [PermsType.HIDE]: '隐藏'
}

/**
 * 是否缓存路由
 */
export enum IsCache {
    NO = '0',
    YES = '1'
}
export const IsCacheMapping = {
    [IsCache.NO]: '否',
    [IsCache.YES]: '是'
}

/**
 * 是否模糊匹配
 */
export enum IsBlurry {
    NO = '0',
    YES = '1'
}

export const IsBlurryMapping = {
    [IsCache.NO]: '否',
    [IsCache.YES]: '是'
}
