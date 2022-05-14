import { TableRowBtnProps } from '../../../../index'

/**
 * 过滤按钮有效原生参数
 * @param btnConfig 按钮的配置
 * @returns 参数
 */
export function getBtnProps(btnConfig: TableRowBtnProps<any>) {
    const { authCode, hide, onClick, label, disabled, ...props } = btnConfig
    return props
}
