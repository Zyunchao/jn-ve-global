import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.scss'
import './utils/rem'
import './mock/mockStore'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import Router from '@/router'

import GlobalComponents from '@component/register'

const app = createApp(App)

app.directive('auth', {})

app.use(ElementPlus, { locale: zhCn })
    .use(GlobalComponents, {
        interceptorsReqHandle: (config) => {
            config.headers['Authorization'] = 'Bearer 285e3b25-14dd-4e6c-b643-3dd6a9f50da9'

            return config
        }
    })
    .use(Router)
    .mount('#app')
