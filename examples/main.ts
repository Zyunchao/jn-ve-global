import { createApp } from 'vue'
import App from './App.vue'
import '@assets/styles/index.scss'

// 图标
// import '@assets/icons/ali/iconfont.css'
// import 'virtual:svg-icons-register'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/lib/locale/lang/zh-cn'
import Router from '@/router'

import GlobalComponents from '@component/register'

const app = createApp(App)

app.directive('auth', {})

app.use(ElementPlus, { locale }).use(GlobalComponents).use(Router).mount('#app')
