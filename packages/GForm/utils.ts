/**
 * 数字转换成千分位
 * @param {numer | string} number 要格式化的数字
 * @returns 千分位分割字符串
 */
export function toThousands(str: string | number) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g

    return `${str}`.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(reg, '$&,') + s2
    })
}

/**
 * 格式化成整数 or 小数（未指定小数位数）
 * @param str 需要格式化的值
 * @returns 数值
 */
export function clearNoNum(str: string | number) {
    return `${str}`
        .replace(/[^\d.]/g, '')
        .replace(/^\./g, '')
        .replace(/\.{2,}/g, '.')
        .replace('.', '$#$')
        .replace(/\./g, '')
        .replace('$#$', '.')
}
