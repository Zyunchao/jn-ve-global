// 样式资源
import './assets/styles/index.scss'

// 图标
import '@component/assets/icons/ali/iconfont.css'
import 'virtual:svg-icons-register'

// 特殊的组件 editor
export { default as JnEditor } from './JnEditor/edit.vue'

/**
 * 全局注册组件
 */
const globalComponentFiles = import.meta.globEager('./**/index.vue')
const globalFunctionalComponentFiles = import.meta.globEager('./*/index.tsx')

// 模板组件
const components = Object.keys(globalComponentFiles).reduce((components: any, path: string) => {
    // const nameArr = path.split('/')
    // const componentName = nameArr[nameArr.length - 2]
    const context = globalComponentFiles[path]
    const componentName = context.default.name
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
