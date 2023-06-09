import type { App, Plugin } from 'vue'
import type { BaseModuleMode } from './_globalConstant/baseModuleMode'
export * from './GTable'
export * from './GForm'
export * from './GSelectTree/v1'
export * from './GBaseModule'
export * from './GTabs'
export * from './GChart'
export * from './GFormGenerate'
export * from './JnEditor/interface/tinymce'
import { ReqHandle, ResHandle } from './_http/httpInterceptors'

export { default as InfoColumnProps } from './GInfoSA/interface/InfoColumnProps'
export { default as IrregularTableCell } from './GIrregularTable/interface/Cell'
export { BaseModuleMode }

// 注册的模块的抛出的类型
declare const _default: (
    app: App,
    props?: {
        appMode?: string
        baseModuleMode?: BaseModuleMode
        baseModuleDefaultMode?: BaseModuleMode
        interceptorsReqHandle?: ReqHandle
        interceptorsResHandle?: ResHandle
    }
) => void
export default _default as Plugin
// 组件库内的图标资源
export declare const icons: {
    elIconKeys: string[]
    aliIcons: string[]
    localIcons: string[]
}
