/**
 * Client App Enhance 会在客户端应用创建后被调用，它可以为 Vue 应用添加任意功能。
 * .vuepress/clientAppEnhance.{js,ts} 文件会被隐式地用作 Client App Enhance 文件
 */

// 注册 Ele
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

// 阿里图标
import '@assets/icons/ali/iconfont.css'

// 全局组件
import GlobalComponent from '@component/register'

// 本地 svg 图标
import 'virtual:svg-icons-register'

// 页面样式
import './style.scss'

export default ({ app, router, siteData }) => {
    app.use(ElementPlus)
    app.use(GlobalComponent)
}
