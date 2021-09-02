import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import '@/examples/assets/icons/ali/iconfont.css'
import GlobalComponent from '@component/register'

export default ({ app, router, siteData }) => {
    app.use(ElementPlus)
}
