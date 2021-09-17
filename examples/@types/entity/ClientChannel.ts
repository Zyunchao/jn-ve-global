/**
 * 客户端渠道实体类
 */
export default interface ClientChannel {
    id?: string | number
    instituId?: string | number
    clientId: string
    name: string
    type: string
    category: string | number
    certSystem: string
    secret: string
    scopes: string
    authorizedGrantTypes: string
    redirectUri?: string
    accessTokenValidity: number
    refreshTokenValidity: number
    additionalInformation?: string
    trusted: string | number
    autoApprove: string | number
    enabled: string | number
    isLock: string | number
    details?: string
    [k: string]: any
}



/**
 * 是否依赖
 */
export enum Rely {
    NORMAL = '0',
    DISABLED = '1'
}

export const RelyMapping = {
    [Rely.NORMAL]: '依赖',
    [Rely.DISABLED]: '不依赖'
}

/**
 * 是否自动授权
 */
export enum autoApprove {
    NORMAL = '0',
    DISABLED = '1'
}

export const autoApproveMapping = {
    [autoApprove.NORMAL]: '自动授权',
    [autoApprove.DISABLED]: '手动授权'
}

/**
 * 状态
 */
export enum enabled {
    DISABLED = '0',
    NORMAL = '1'
}

export const enabledMapping = {
    [enabled.DISABLED]: '停用',
    [enabled.NORMAL]: '正常'
}

/**
 * 是否启用
 */
export enum status {
    NORMAL = '0',
    DISABLED = '1'
}

export const statusMapping = {
    [status.NORMAL]: '启用',
    [status.DISABLED]: '未启用'
}
