/**
 * 用户信息实体类
 */
export default interface UserInfo {
    /**
     * 头像
     */
    avatar: string
    /**
     * 创建者
     */
    createBy?: string
    /**
     * 创建时间
     */
    createTime?: string
    /**
     * 关联部门编号
     */
    departIds: string
    /**
     * 邮箱
     */
    email: string
    /**
     * 主键
     */
    id: string
    /**
     * 证件号码
     */
    idNumber: string
    /**
     * 证件类型
     */
    idType: IdType
    /**
     * 用户身份
     */
    identity: string
    /**
     * 机构编码
     */
    instituId: string
    /**
     * 机构名称
     */
    instituName: string
    /**
     * 防止前台操作
     */
    isLocked: IsLocked
    /**
     * 用户登录名
     */
    loginName: string
    /**
     * 用户姓名
     */
    name: string
    /**
     * 手机
     */
    phone: string
    /**
     * 职务
     */
    post: string
    /**
     * 密钥
     */
    salt: string
    /**
     * 性别
     */
    sex: Sex
    /**
     * 用户状态
     */
    status: UserStatus
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
    /**
     * 机构用户默认id
     */
    userId: string
    [k: string]: any
}

/**
 * 性别
 */
export enum Sex {
    /**
     * 男
     */
    M = 'M',
    /**
     * 女
     */
    F = 'F'
}

export const SexMapping = {
    [Sex.M]: '男',
    [Sex.F]: '女'
}

/**
 * 用户状态
 */
export enum UserStatus {
    /**
     * 正常
     */
    NORMAL = '0',
    /**
     * 锁定
     */
    LOCKED = '1'
}
export const UserStatusMapping = {
    [UserStatus.NORMAL]: '正常',
    [UserStatus.LOCKED]: '锁定'
}

/**
 * 防前台操作是否锁定
 */
export enum IsLocked {
    /**
     * 是
     */
    YES = '0',
    /**
     * 否
     */
    NO = '1'
}
export const IsLockedMapping = {
    [IsLocked.YES]: '是',
    [IsLocked.NO]: '否'
}

/**
 * 证件类型
 */
export enum IdType {
    /**
     * 身份证
     */
    ID_CARD = '1',
    /**
     * 港澳台通行证
     */
    HKMLA = '2'
}
export const IdTypeMapping = {
    [IdType.ID_CARD]: '身份证',
    [IdType.HKMLA]: '港澳台通行证'
}
