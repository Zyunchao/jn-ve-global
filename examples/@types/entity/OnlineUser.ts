/**
 * 在线用户实体类
 */
export default interface OnlineUser {
    id: string | number
    instituId: string
    instituName: string
    clientId: string
    clientType: string
    clientName?: string
    grantType?: string
    clientCert: string
    userId: string
    loginName: string
    userName: string
    location?: string
    operatorSystem?: string
    browser?: string
    ip?: string
    status: string
    details?: string
    createTime?: string
    updateTime?: string
    [k: string]: any
}
