declare var SVG_ROOT: string
declare var proBaseUrl: string
declare var __VUEPRESS_SSR__: boolean

// window 扩展属性
interface Window {
    /**
     * 微应用注册列表
     */
    __MICRO_APP_LIST__: {
        name: string
        url: string
        keepAlive?: boolean
    }[]
    /**
     * 基座应用运行模式
     */
    __RUN_MODE__: string
    /**
     * 帆软报表基础请求地址
     */
    __STATEMENT_BASE_URL__: string
    /**
     * 标识是否处于工作流容器中
     */
    __IS_WORKFLOW__: boolean
    /**
     * 标识当前应用模式
     * regtech 监管 | uums 统一管理平台 | financing 江苏省再保融资租赁系统 | maintenance 后台运维系统
     */
    __VUE_APP_MODE__: string
}
