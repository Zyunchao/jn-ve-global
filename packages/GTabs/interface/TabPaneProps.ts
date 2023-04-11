export interface TabPaneProps {
    /**
     * 标题
     */
    label: string
    /**
     * 值
     */
    value: string | number
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 隐藏
     */
    hide?: boolean | (() => boolean)
}
