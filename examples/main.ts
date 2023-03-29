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
            config.headers['Authorization'] = 'Bearer d499611d-71bb-4e4c-a991-bb284392db67'

            return config
        }
    })
    .use(Router)
    .mount('#app')
