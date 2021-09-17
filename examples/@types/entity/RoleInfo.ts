/**
 * 角色信息实体类
 */
export default interface RoleInfo {
  /**
   * 主键
   */
  id: string
  /**
   * 状态
   */
  status: string
  /**
   * 角色编码
   */
  code: string
  /**
   * 创建者
   */
  createBy: string
  /**
   * 创建时间
   */
  createTime: string
  /**
   * 是否启用
   */
  enabled: RoleEnabled
  /**
   * 机构编号
   */
  instituId: string
  /**
   * 角色名称
   */
  name: string
  /**
   * 说明
   */
  remark: string
  /**
   * 更新者
   */
  updateBy: string
  /**
   * 更新时间
   */
  updateTime: string
  [k: string]: any
}


/**
 * 角色状态(是否启用)
 */
export enum RoleEnabled {
  /**
   * 开启
   */
  TRUE = '0',
  /**
   * 关闭
   */
  FALSE = '1'
}

export const RoleEnabledType = {
  [RoleEnabled.TRUE]: '启用',
  [RoleEnabled.FALSE]: '停用'
}
