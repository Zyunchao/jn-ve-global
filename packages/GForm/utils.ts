/**
 * 数字转换成千分位
 * @param {numer | string} number 要格式化的数字
 * @returns 千分位分割字符串
 */
export function toThousands(str: string | number) {
    return `${str}`.replace(/\d{1,3}(?=(\d{3})+$)/g, function (s) {
        return s + ','
    })
}
