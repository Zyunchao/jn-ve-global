/**
 * init 配置
 */
export default interface InitOpts {
    /**
     * 设备像素比，默认取浏览器的值window.devicePixelRatio
     */
    devicePixelRatio?: number
    /**
     * 渲染器，支持 'canvas' 或者 'svg'
     */
    renderer?: 'canvas' | 'svg'
    /**
     * 是否开启脏矩形渲染，默认为false
     * 从 `v5.0.0` 开始支持
     */
    useDirtyRect?: boolean
    /**
     * 可显式指定实例宽度，单位为像素。
     * 如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的宽度
     */
    width?: number | string
    /**
     * 可显式指定实例高度，单位为像素。
     * 如果传入值为 null/undefined/'auto'，则表示自动取 dom（实例容器）的高度。
     */
    height?: number | string
    /**
     * 使用的语言，内置 'ZH' 和 'EN' 两个语言，也可以使用 echarts.registerLocale 方法注册新的语言包
     */
    locale?: string
}
