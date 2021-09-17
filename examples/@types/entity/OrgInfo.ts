/**
 * 机构信息实体类
 */
export default interface OrgInfo {
  /**
   * 机构编号
   */
  instituId: string,
  /**
   * 机构名称
   */
  name: string,
  /**
   * 机构简称
   */
  sigillum: string,
  /**
   * 机构类型
   */
  type: any[],
  /**
   * 所属行政区划
   */
  adminDivision: string,
  /**
   * 机构属性
   */
  attribute: string,
  /**
   * 机构级别
   */
  level: string,
  /**
   * 机构状态
   */
  status: string,
  /**
   * 机构失效日期
   */
  expiryDate: string,
  /**
   * 加密方式
   */
  encryWay: string,
  /**
   * 登录渠道
   */
  allowLoginChannel: string,
  /**
   * 总公司访问权限
   */
  dataRole: string,
  /**
   * 是否法人机构
   */
  isLegal: string,
  [k: string]: any
}

export interface iamInstitutionExtinfoDto {
  /**
   * 营业执照编号
   */
  socialCreditCode: string,
  /**
   * 联系电话
   */
  phone: string,
  /**
   * 联系人
   */
  contact: string,
  /**
   * 法人
   */
  companyLegal: string,
  /**
   * 开业时间
   */
  openTime: string,
  /**
   * 传真
   */
  fax: string,
  /**
   * 注册资本
   */
  registerdCapital: string,
  /**
   * 经营地址
   */
  registeredAddr: string,
  /**
   * 门牌地址
   */
  officeAddress: string,
  /**
   * 经营理念
   */
  slogan: string,
}



/**
 * 机构属性
 */
export enum AttributeType {
  /**
   * 管理机构
   */
  MANAGE = '00',
  /**
   * 监管机构
   */
  REGU = '10',
  /**
   * 联盟机构
   */
  UNION = '20',
  /**
   * 业务机构
   */
  BUSINE = '30'

}

export const AttributeTypeMapping = {
  [AttributeType.MANAGE]: '管理机构',
  [AttributeType.REGU]: '监管机构',
  [AttributeType.UNION]: '联盟机构',
  [AttributeType.BUSINE]: '业务机构'
}


/**
 * 机构级别
 */
export enum LevelType {
  /**
   * 总（母）公司
   */
  HEAD = '0',
  /**
   * 分公司
   */
  BRANCH = '1',
  /**
   * 子公司
   */
  SUB = '2',

}

export const LevelTypeMapping = {
  [LevelType.HEAD]: '总（母）公司',
  [LevelType.BRANCH]: '分公司',
  [LevelType.SUB]: '子公司'
}



/**
 * 机构级别
 */
export enum StatusType {
  /**
   * 正常
   */
  NOR = '0'

}

export const StatusTypeMapping = {
  [StatusType.NOR]: '正常'
}



/**
 * 总公司访问权限
 */
export enum DataRoleType {
  /**
   * 无
   */
  NOT = '0',
  /**
   * 有
   */
  HAVE = '1'
}
export const DataRoleTypeMapping = {
  [DataRoleType.NOT]: '无',
  [DataRoleType.HAVE]: '有'
}


/**
 * 是否法人机构
 */
export enum IsLegalType {
  /**
   * 非法人机构
   */
  NOT = '0',
  /**
   * 法人机构
   */
  HAVE = '1'
}
export const IsLegalTypeMapping = {
  [IsLegalType.NOT]: '非法人机构',
  [IsLegalType.HAVE]: '法人机构'
}


/**
 * 加密方式
 */
export enum EncryWayType {
  /**
   * 3DES
   */
  DES = '00',
  /**
   * HMAC-SHA1
   */
  HS = '10'
}
export const EncryWayTypeMapping = {
  [EncryWayType.DES]: '3DES',
  [EncryWayType.HS]: 'HMAC-SHA1'
}


