/**
 * 部门实体类
 */
export default interface Department {
    /**
     * 子集
     */
    children?: string
    /**
     * 创建者
     */
    createBy?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 部门角色
     */
    departRole: string
    /**
     * 传真
     */
    fax: string
    /**
     * 主键
     */
    id: string
    /**
     * 机构编号
     */
    instituId: string
    /**
     * 手机号
     */
    mobile: string
    /**
     * 部门名称
     */
    name: string
    /**
     * 部门缩写
     */
    nameAbbr: string
    /**
     * 父部门编码
     */
    parentId: string | number
    /**
     * 说明
     */
    remark: string
    /**
     * 部门排序
     */
    sortNo: string
    /**
     * 状态
     */
    status: Status
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
    /**
     * 扩展字段
     */
    [k: string]: any
}

/**
 * 部门状态
 */
export enum Status {
    NORMAL = '0',
    DISABLED = '1'
}
export const StatusMapping = {
    [Status.NORMAL]: '正常',
    [Status.DISABLED]: '停用'
}
