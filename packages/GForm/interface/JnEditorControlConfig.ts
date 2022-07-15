import JnEditorProps from '../../JnEditor/interface/JnEditorProps'
import {
    RawEditorSettings,
    EditorEvent,
    Editor as TinyMCEEditor
} from '../../JnEditor/interface/tinymce'

export interface FormControlJnEditorProps {
    /**
     * TinyMce 的配置，可见 http://tinymce.ax-z.cn/configure/integration-and-setup.php
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
}

export interface FormControlJnEditorEvents {
    /**
     * 初始化前执行
     */
    onSetup?: (editor: TinyMCEEditor) => void
    /**
     * 初始化结束后执行
     */
    onInitInstanceCallback?: (editor: TinyMCEEditor) => void
    /**
     * 当编辑器完全初始化时触发
     */
    onInit?: (e: EditorEvent<any>) => void
    /**
     * 内容发生变化时触发
     */
    onChange?: (e: EditorEvent<any>) => void
    /**
     * 输入时触发
     */
    onInput?: (e: EditorEvent<any>) => void
    /**
     * 撤消更改时触发
     */
    onUndo?: (e: EditorEvent<any>) => void
    /**
     * 重做时触发
     */
    onRedo?: (e: EditorEvent<any>) => void
}

export default interface JnEditorControlConfig {
    type: 'jnEditor'
    props?: FormControlJnEditorProps & FormControlJnEditorEvents
}
