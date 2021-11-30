// 图标
import './assets/icons/ali/iconfont.css'
import 'virtual:svg-icons-register'

/**
 * 全局注册组件
 */
const globalComponentFiles = import.meta.globEager('./**/index.vue')

const components = Object.keys(globalComponentFiles).reduce((components: any, path: string) => {
    const componentName = path.split('/')[1]
    const context = globalComponentFiles[path]
    components[componentName] = context.default
    return components
}, {})

export default (app, params) => {
    Object.keys(components).forEach((name) => {
        app.component(name, components[name])
    })
}
