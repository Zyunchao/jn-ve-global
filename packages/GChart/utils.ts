import _ from 'lodash'

/**
 * 将传递的尺寸进行 rem 的换算
 * @param size
 * @returns
 */
export function size2Rem(size: number) {
    const rootFontSize = document.querySelector('html')?.style?.fontSize
    if (!rootFontSize) return size
    return (size / 100) * parseFloat(rootFontSize)
}

export function getLength(target: Array<any> | object) {
    if (_.isArray(target)) return target.length
    if (_.isObject(target)) return Object.keys(target).length
}

/**
 * 判断目标是否是 object 且不是数组的 object
 * @param target 
 * @returns 
 */
export function isObject(target: any) {
    return !!target && _.isObject(target) && !_.isArray(target)
}
