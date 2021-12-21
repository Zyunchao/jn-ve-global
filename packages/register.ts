// 图标
import '@component/assets/Icons/ali/iconfont.css'
import 'virtual:svg-icons-register'

/**
 * 全局注册组件
 */
const globalComponentFiles = import.meta.globEager('./**/index.vue')

const components = Object.keys(globalComponentFiles).reduce((components: any, path: string) => {
    // const nameArr = path.split('/')
    // const componentName = nameArr[nameArr.length - 2]
    const context = globalComponentFiles[path]
    const componentName = context.default.name
    components[componentName] = context.default
    return components
}, {})

export default (app, params) => {
    Object.keys(components).forEach((name) => {
        app.component(name, components[name])
    })
}
