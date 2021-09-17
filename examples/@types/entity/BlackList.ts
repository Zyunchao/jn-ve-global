/**
 * 黑名单实体类
 */
export default interface BlackList {
    /**
     * 主键
     */
    id: string | number
    /**
     * 黑名单类型
     */
    type: string
    /**
     * 黑名单内容
     */
    content: string
    /**
     * 黑名单原因
     */
    reason: string
    /**
     * 起效日期
     */
    effectiveTime: string
    /**
     * 失效日期
     */
    expiryTime: string
    /**
     * 状态
     */
    status: string
    /**
     * 创建者
     */
    createBy?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 更新者
     */
    updateBy?: string
    /**
     * 更新时间
     */
    updateTime?: string
    [k: string]: any
}

/**
 * 黑名单状态 valid invalid
 */
export enum Status {
    VALID = '0',
    INVALID = '1'
}
export const StatusMapping = {
    [Status.VALID]: '有效',
    [Status.INVALID]: '无效'
}
