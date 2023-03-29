import packageInfo from '../package.json'
import type { App } from 'vue'
import { version as VueVersion } from 'vue'
import { version as ElVersion } from 'element-plus'
import {
    setBaseModuleMode,
    BaseModuleMode,
    getDefauleMode,
    setDefauleMode
} from './_globalConstant/baseModuleMode'
import { setAppMode } from './_globalConstant/appMode'
import { getGlobal } from '@jsjn/utils'
import {
    setIterceptorsReqHandle,
    setIterceptorsResHandle,
    ReqHandle,
    ResHandle
} from './_http/httpInterceptors'

// 样式资源
import './assets/styles/index.scss'

// 图标
import './assets/icons/ali/iconfont.css'
import 'virtual:svg-icons-register'
import { elIconKeys, aliIcons, localIcons } from './GIconPicker/data/icons'

/**
 * 全局注册组件
 */
const globalComponentFiles = import.meta.glob<any>('./**/index.vue', { eager: true })
const globalFunctionalComponentFiles = import.meta.glob<any>('./*/index.tsx', { eager: true })

// 模板组件
const components = Object.keys(globalComponentFiles).reduce((components: any, path: string) => {
    // const nameArr = path.split('/')
    // const componentName = nameArr[nameArr.length - 2]
    const context = globalComponentFiles[path]
    const componentName = context.default.name

    // console.log(`%c ************ ${componentName} ************`, 'color: #67c23a;' )

    components[componentName] = context.default
    return components
}, {})

// 函数式组件
const functionalComponents = Object.keys(globalFunctionalComponentFiles).reduce(
    (components: any, path: string) => {
        const module = globalFunctionalComponentFiles[path]
        const nameForPath = path.substring(2).split('/')[0]
        const name = module.name || nameForPath
        const component = module.default
        components[name] = component
        return components
    },
    {}
)

export default (
    app: App,
    props?: {
        appMode?: string
        baseModuleMode?: BaseModuleMode
        baseModuleDefaultMode?: BaseModuleMode
        interceptorsReqHandle?: ReqHandle
        interceptorsResHandle?: ResHandle
    }
) => {
    // vue 模板组件
    Object.keys(components).forEach((name) => {
        app.component(name, components[name])
    })

    // 函数式组件（tsx）
    Object.keys(functionalComponents).forEach((name) => {
        app.component(name, functionalComponents[name])
    })

    // 参数传递
    if (props) {
        if (props.appMode) {
            setAppMode(props.appMode)
        } else if (getGlobal().__VUE_APP_MODE__) {
            setAppMode(getGlobal().__VUE_APP_MODE__)
        }

        /**
         * baseModule 的模式参数
         *  - 如果设置了，就去对应微应用设置的值
         *  - 如果没有，就取基座设置的默认值
         */
        if (props.baseModuleDefaultMode) {
            setDefauleMode(props.baseModuleDefaultMode)
        }

        if (props.baseModuleMode) {
            setBaseModuleMode(props.baseModuleMode)
        } else {
            setBaseModuleMode(getDefauleMode())
        }

        // 请求拦截器
        if (props.interceptorsReqHandle) {
            setIterceptorsReqHandle(props.interceptorsReqHandle)
        }
        // 响应拦截器
        if (props.interceptorsResHandle) {
            setIterceptorsResHandle(props.interceptorsResHandle)
        }
    }
}

/**
 * 抛出组件库内的图标资源
 */
export const icons = { elIconKeys, aliIcons, localIcons }

// 版本号输出，增加辨识 version
console.log(`[${packageInfo.name}] v${packageInfo.version}`)
console.log(`[vue] v${VueVersion}`)
console.log(`[element-plus] v${ElVersion}`)
