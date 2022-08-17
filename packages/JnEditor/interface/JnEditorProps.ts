import { TinyMCE, Editor as TinyMCEEditor, RawEditorSettings } from './tinymce'

export default interface JnEditorProps {
    /**
     * 双向绑定的值
     */
    modelValue: string
    /**
     * TinyMCE 的配置
     */
    config?: RawEditorSettings
    /**
     * 模式
     */
    mode?: 'classic' | 'inline' | 'distraction-free'
    /**
     * dom Id
     */
    id?: string
    /**
     * 内联模式下，标签的名字
     */
    tagName?: string
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 上传文件的 url
     */
    uploadUrl?: string
    /**
     * 下载、展示的 url
     */
    downloadUrl?: string
    /**
     * 内容限制大小，单位：M
     */
    maxSize?: number
    /**
     * 开启图片压缩，会失帧
     * 默认开启
     */
    compress?: boolean
    /**
     * 压缩率
     */
    compressRatio?: number
}
