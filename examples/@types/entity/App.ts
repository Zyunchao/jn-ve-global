/**
 * 应用表
 */
import AppFunc from '@/@types/entity/AppFunc'

export default interface App {
    /**
     * 是否被选中
     */
    checked: string
    /**
     * 功能
     */
    children: AppFunc[]
    /**
     * 应用编号
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
     * 主键
     */
    id: string | number
    /**
     * 项目经理
     */
    manager: string
    /**
     * 应用名称
     */
    name: string
    /**
     * 投产时间
     */
    onlineTime: string
    /**
     * 备注1
     */
    remark1: string
    /**
     * 备注2
     */
    remark2: string
    /**
     * 状态
     */
    status: Status
    /**
     * 应用类型（和client编号需要对应）
     */
    type: string
    /**
     * 更新者
     */
    updateBy: string
    /**
     * 更新时间
     */
    updateTime: string
    /**
     * 版本号
     */
    version: string
}

/**
 * 应用类型
 */
export enum AppType {
    UUMS = '9999'
}

/**
 * 应用状态
 */
export enum Status {
    NORMAL = '0',
    DISABLED = '1'
}
export const StatusMapping = {
    [Status.NORMAL]: '正常',
    [Status.DISABLED]: '停用'
}
