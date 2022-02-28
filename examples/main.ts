import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles/index.scss'
import './utils/rem'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import locale from 'element-plus/es/locale/lang/zh-cn.mjs'
import Router from '@/router'

import GlobalComponents from '@component/register'

const app = createApp(App)

app.directive('auth', {})

app.use(ElementPlus, { locale }).use(GlobalComponents).use(Router).mount('#app')
