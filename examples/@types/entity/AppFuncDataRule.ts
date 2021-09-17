import AppFunc from './AppFunc'

/**
 * 应用功能数据规则
 */

export default interface AppFuncDataRule {
    /**
     * 应用功能 ID
     */
    appFuncId: AppFunc['id']
    /**
     * 应用 ID
     */
    appId: AppFunc['appId']
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
     * 字段
     */
    ruleColumn: string
    /**
     * 条件
     */
    ruleConditions: string
    /**
     * 规则名称
     */
    ruleName: string
    /**
     * 表名
     */
    ruleTable: string
    /**
     * 条件值
     */
    ruleValue: string
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
     * url
     */
    url?: string
}

export enum Status {
    VALID = '1',
    UNVALID = '2'
}

export const StatusMapping = {
    [Status.VALID]: '有效',
    [Status.UNVALID]: '无效'
}
