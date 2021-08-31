import { RouteConfig } from '@/@types/Route'

const files = import.meta.globEager('./*.ts')
// 获取源配置数组（多维嵌套）
const routeConfigs = Object.keys(files).reduce(
    (modules: Array<RouteConfig>, path: string) => [...modules, ...files[path].default],
    []
)

export default routeConfigs
