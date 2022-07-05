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
     * 编辑器模式
     */
    mode?: 'classic' | 'inline' | 'distraction-free'
    /**
     * 生成编辑器的 dom id
     */
    id?: string
    /**
     * 内联编辑器的标签 name
     */
    tagName?: string
    /**
     * 是否禁用
     */
    disabled?: boolean
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
