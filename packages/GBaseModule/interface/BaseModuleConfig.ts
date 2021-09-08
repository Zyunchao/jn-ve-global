/**
 * 按钮组的配置
 */
export interface BtnProps {
    /**
     * 按钮名称
     */
    label: string
    /**
     * 授权标识
     */
    authCode?: string
    /**
     * 按钮的类型，同 Element Button
     */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text'
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 事件
     */
    onClick?: () => void
}
