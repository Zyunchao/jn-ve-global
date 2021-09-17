/**
 * 系统字典表
 */
export default interface SySDict {
    /**
     * 应用CODE
     */
    appCode: string
    /**
     * 字典编码
     */
    code: string
    /**
     * 字典名称
     */
    codeName: string
    /**
     * 创建者
     */
    createBy: string
    /**
     * 创建时间
     */
    createTime: string
    /**
     * 主键
     */
    id: string | number
    /**
     * 字典项文本
     */
    itemText: string
    /**
     * 字典项值
     */
    itemValue: string
    /**
     * 描述
     */
    remark: string
    /**
     * 排序
     */
    sort: string | number
    /**
     * 状态
     */
    status: string
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
}

/**
 * 字典状态
 */
export enum Status {
    NORMAL = '0',
    DISABLED = '1'
}
export const StatusMapping = {
    [Status.NORMAL]: '正常',
    [Status.DISABLED]: '停用'
}
