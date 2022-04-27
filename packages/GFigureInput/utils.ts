/**
 * 数字转换成千分位
 * @param {numer | string} number 要格式化的数字
 * @returns 千分位分割字符串
 */
export function toThousands(str: string | number) {
    const pre = `${str}`.match(/^\-/g)
    const reg = /\d{1,3}(?=(\d{3})+$)/g
    const thousands = `${str}`.replace(/^-/, '').replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(reg, '$&,') + s2
    })
    return pre !== null ? `-${thousands}` : thousands
}

/**
 * 只允许存在数字或小数点后指定位数
 * @param str 要格式化的数字
 * @param s 小数点后位数
 * @returns 格式化后的值
 */
export function restrictDecimals(str: string, s: number = 2) {
    const regStr = `^\\D*(\\d*(?:\\.\\d{0,${s}})?).*$`
    const reg = new RegExp(regStr, 'g')
    return `${str}`.replace(reg, '$1')
}

/**
 * 格式化成整数 or 小数（未指定小数位数）
 * @param str 需要格式化的值
 * @returns 数值
 */
export function clearNoNum(str: string | number) {
    return `${str}`
        .replace(/[^\d.\.\-]/g, '') // 非 [0-9] . - 的都过滤掉
        .replace(/-{2,}/g, '-') // 连续的 -- 替换成单个 -
        .replace(/^-/, '$@$') // 如果（只能）是开头的 - ，替换成特殊存储字符
        .replace('$@$.', '$@$') // 保证  - 和 . 不能连续存在
        .replace(/-/g, '') // 开头的 - 已被转换特殊字符保留，将其他的 - 都替换掉
        .replace('$@$', '-') // 将 特殊字符转换成 -
        .replace(/^\./g, '') // 开头的 . 替换掉
        .replace(/\.{2,}/g, '.') // 连续的 .. 替换成 .
        .replace('.', '$#$') // . 转换特殊字符保留
        .replace(/\./g, '') // 除特殊字符的 . 其余替换掉
        .replace('$#$', '.') // 将保留的特殊字符转换成 .
}
