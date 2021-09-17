/**
 * 登录设备实体类
 */
export default interface LoginDevice {
    id?: string | number
    instituId?: string | number
    instituName?: string
    userId: string | number
    userName?: string
    deviceId?: string
    clientId: string
    clientName?: string
    clientType: string
    status: string | number
    firstLoginTime: string
    refreshTime: string
    expiry_time: string
    createBy?: string
    createTime?: string
    updateBy?: string
    updateTime?: string
    [k: string]: any
}

/**
 * 是否启用
 */
export enum status {
    NORMAL = '0',
    DISABLED = '1'
}

export const statusMapping = {
    [status.NORMAL]: '已登录',
    [status.DISABLED]: '已退出'
}
