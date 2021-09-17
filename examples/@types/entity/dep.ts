/**
 * 部门信息实体类
 */
export default interface depInfo {
  id: string
  // 机构编号
  instituId: string
  // 传真
  fax: string | null
  // 手机号
  mobile: string | null
  // 部门名称
  name: string
  // 部门缩写
  nameAbbr: string | null
  // 父部门编码
  parentId: string
  // 说明
  remark: string | null
  // 部门排序
  sortNo: number | null
  // 状态
  status: string
  [k: string]: any
}


/**
 * 部门状态
 */
// export enum depStatus {
//   TRUE = '0',
// }

// export const depStatusType = {
//   [depStatus.TRUE]: '正常',
// }
