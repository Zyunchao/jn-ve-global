import { TinyMCE, Editor as TinyMCEEditor, RawEditorSettings } from './tinymce'

export default interface JnEditorProps {
    modelValue: string
    config?: RawEditorSettings
    mode?: 'classic' | 'inline' | 'distraction-free'
    id?: string
    tagName?: string
    disabled?: boolean
    uploadUrl?: string
}
