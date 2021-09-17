/**
 * 职位信息
 */
export default interface Post {
    /**
     * 创建者
     */
    createBy?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 主键
     */
    id: string | number
    /**
     * 机构编号
     */
    instituId: string | number
    /**
     * 机构名称
     */
    instituName: string
    /**
     * 名称
     */
    name: string
    /**
     * 职务编码
     */
    postId: string | number
    /**
     * 状态
     */
    status: Status
    /**
     * 更新者
     */
    updateBy?: string
    /**
     * 更新时间
     */
    updateTime?: string
    /**
     * 预留字段
     */
    [k: string]: any
}

/**
 * 职务状态
 */
export enum Status {
    NORMAL = '0',
    DISABLED = '1'
}
export const StatusMapping = {
    [Status.NORMAL]: '正常',
    [Status.DISABLED]: '停用'
}
