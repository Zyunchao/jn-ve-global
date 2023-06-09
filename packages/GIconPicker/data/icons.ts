import * as elIcons from '@element-plus/icons-vue'
import AliIconfontClass from '@component/assets/icons/ali/iconfont.css?raw'

/**
 * el icon 组件名字 list
 */
export const elIconKeys: string[] = Object.keys(elIcons)

/**
 * 阿里图标类名 list
 */
export const aliIcons: string[] = getAliIconNames()

/**
 * 本地 svg list
 */
export const localIcons: string[] = getLocalIconNames()

/**
 * 获取本地 svg 资源名称列表
 * @returns
 */
function getLocalIconNames(): string[] {
    /**
     * 注意: import.meta.glob 内只能以相对路径传递
     */
    const newCoreFiles = import.meta.glob('../../assets/icons/svg/newCore/*.svg', { eager: true })
    const regtechFiles = import.meta.glob('../../assets/icons/svg/regtech/*.svg', { eager: true })

    const allFiles = { ...newCoreFiles, ...regtechFiles }

    return Object.keys(allFiles).map((fileName) => {
        return fileName.replace(/(.*\/)*([^.]+).*/gi, '$2')
    })
}

/**
 * 获取 ali 图标库下载的本地项目的类名
 * @returns
 */
function getAliIconNames(): string[] {
    return AliIconfontClass.split(`\n`)
        .filter((item) => item.indexOf(':before') !== -1)
        .map((item: string) => {
            const newStr = item.substring(1)
            return newStr.split(':before')[0]
        })
}
