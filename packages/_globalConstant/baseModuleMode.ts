/*
 * @Author: Zyunchao 18651805393@163.com
 * @Date: 2022-12-16 10:01:10
 * @LastEditors: Zyunchao 18651805393@163.com
 * @LastEditTime: 2022-12-16 16:05:04
 * @FilePath: /jn-ve-global/packages/_globalConstant/baseModuleMode.ts
 * @Description: baseModule 组件的全局模式变量存储区域
 */
/**
 * 模式：
 *  - classic 经典
 *  - tabular 扁平
 */
export type BaseModuleMode = 'classic' | 'tabular'

// 默认值，只有基座可以设置
let _defauleMode: BaseModuleMode = 'classic'
// 变化值，每个微应用都可以设置
let _mode: BaseModuleMode = _defauleMode

export function getBaseModuleMode(): BaseModuleMode {
    return _mode
}

export function setBaseModuleMode(mode: BaseModuleMode): void {
    _mode = mode
}

/**
 * 设置默认值，供基座使用
 * @param mode
 */
export function setDefauleMode(mode: BaseModuleMode): void {
    _defauleMode = mode
}

export function getDefauleMode(): BaseModuleMode {
    return _defauleMode
}
