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
    /**
     * 按钮尺寸
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 加载中
     */
    loading?: boolean
    /**
     * 是否为朴素按钮
     */
    plain?: boolean
    /**
     * 是否为圆角按钮
     */
    round?: boolean
    /**
     * 是否为圆形按钮
     */
    circle?: boolean
}
