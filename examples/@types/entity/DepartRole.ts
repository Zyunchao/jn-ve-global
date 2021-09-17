/**
 * 部门角色
 */
export default interface DepartRole {
    /**
     * 创建者
     */
    createBy: string
    /**
     * 创建时间
     */
    createTime: string
    /**
     * 部门编号
     */
    departId: string
    /**
     * 主键
     */
    id: string
    /**
     * 	机构编号
     */
    instituId: string
    /**
     * 备注
     */
    remark: string
    /**
     * 角色编码
     */
    roleCode: string
    /**
     * 角色名称
     */
    roleName: string
    /**
     * 状态
     */
    status: DepartRoleStatus
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
}

export enum DepartRoleStatus {
    NORMAL = '0',
    DISABLED = '1'
}

export const DepartRoleStatusMapping = {
    [DepartRoleStatus.NORMAL]: '正常',
    [DepartRoleStatus.DISABLED]: '禁用'
}
