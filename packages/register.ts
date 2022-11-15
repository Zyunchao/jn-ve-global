import packageInfo from '../package.json'
import { version as VueVersion } from 'vue'
import { version as ElVersion } from 'element-plus'

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

export default (app) => {
    // vue 模板组件
    Object.keys(components).forEach((name) => {
        app.component(name, components[name])
    })

    // 函数式组件（tsx）
    Object.keys(functionalComponents).forEach((name) => {
        app.component(name, functionalComponents[name])
    })
}

/**
 * 抛出组件库内的图标资源
 */
export const icons = { elIconKeys, aliIcons, localIcons }

// 版本号输出，增加辨识 version
console.log(`[${packageInfo.name}] v${packageInfo.version}`)
console.log(`[vue] v${VueVersion}`)
console.log(`[element-plus] v${ElVersion}`)
