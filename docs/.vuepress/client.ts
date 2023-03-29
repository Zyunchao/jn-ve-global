import { defineClientConfig } from '@vuepress/client'
import ElementPlus from 'element-plus'
import zhCn from './zh-cn'
import 'element-plus/dist/index.css'
import GlobalComponent from '@component/register'

export default defineClientConfig({
    enhance({ app, router, siteData }) {
        app.directive('auth', {})
        app.use(ElementPlus, { locale: zhCn })
        app.use(GlobalComponent, {
            interceptorsReqHandle: (config) => config
        })
    },
    setup() {},
    rootComponents: []
})
