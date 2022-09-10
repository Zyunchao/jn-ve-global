import _ from 'lodash'
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns {*}
 */
export const filterObj = (obj) => {
    if (!(typeof obj === 'object')) {
        return
    }

    for (let key in obj) {
        if (
            obj.hasOwnProperty(key) &&
            (obj[key] === null || obj[key] === undefined || obj[key] === '')
        ) {
            delete obj[key]
        }
    }
    return obj
}

/**
 * b 对象赋值给 a 对象相同的字段
 * @param target 目标数组
 * @param provider 提供数据的数组
 * @param exclude 要排除的 key
 */
export function assignOwnProp(target: object, provider: object, excludes?: Array<string>) {
    Object.keys(target).forEach((k) => {
        if (excludes && excludes.includes(k)) {
            return false
        }

        if (provider[k] === undefined || provider[k] === null) {
            return false
        }

        if (typeof provider[k] === 'object') {
            target[k] = _.cloneDeep(provider[k])
        } else {
            target[k] = provider[k]
        }
    })
}

/**
 * 合并两个对象的有效字段，无效字段从目标对象中移除
 * @param source 来源对象
 * @param target 目标输出对象，是对源对象进行操作的
 */
export function assignValidField(source: object, target: object) {
    Object.keys(source).forEach((key) => {
        if (
            _.isNull(source[key]) ||
            _.isUndefined(source[key]) ||
            (_.isArray(source[key]) && !source[key].length) ||
            (_.isString(source[key]) && !source[key]) ||
            (_.isNumber(source[key]) && source[key] === 0) ||
            (_.isBoolean(source[key]) && source[key] === false) ||
            (_.isObject(source[key]) && _.isEmpty(source[key]))
        ) {
            delete target[key]
            return
        } else {
            target[key] = source[key]
        }
    })
}

/**
 * 依据子节点的 parentId 查找父节点
 * @param source 源数据（树）
 * @param pid 子节点的 parentId
 * @returns 父节点
 */
export function findParentByPId(source: any, pid: string | number) {
    let parent = null

    function recursion(source: any, pid: string | number) {
        for (let i = 0; i < source.length; i++) {
            const item = source[i]
            if (item.id === pid) {
                parent = item

                break
            }

            if (item.children && item.children.length) {
                recursion(item.children, pid)
            }
        }
    }

    recursion(source, pid)
    return parent
}

/**
 * 根据id查找目标
 * @param source 源数据
 * @param id 目标id
 * @param field 是否返回目标的指定字段
 * @returns 目标对象 || 目标的指定字段
 */
export function findTargetById(source: any[], id: string | number, field?: string) {
    if (!id || source.length === 0) return null

    let target = null

    function recursion(source: any, id: string | number) {
        for (let i = 0; i < source.length; i++) {
            const item = source[i]
            if (item.id === id) {
                target = item

                break
            }

            if (item.children && item.children.length) {
                recursion(item.children, id)
            }
        }
    }

    recursion(source, id)
    if (field && target) return target[field]
    return target
}

/**
 * 判断有效值，包含空字符串
 * @param val 目标值
 */
export function validValue(val) {
    if (val === undefined || val === null || val === false) return false
    return true
}

/**
 * 小驼峰转短横线
 * @param str 字符串
 * @returns 短横线
 */
export function hump2Partition(str: string) {
    return str.replace(/([A-Z])/g, (match, p1, offset, string) => {
        // 一个捕获组捕获全部，所以match等于p1
        return '-' + p1.toLowerCase()
    })
}

/**
 * 将小驼峰字段的对象转换成短横线字段的对象
 * @param obj 要转换的对象
 * @param excludes 排除的字段（字段将在最终的映射对象中排除）
 * @returns 短横线命名的对象
 */
export function humpObj2PartitionObj(obj: object, excludes?: Array<string> | string): object {
    const temp = {}
    Object.keys(obj).forEach((key) => {
        if (!excludes || !excludes.includes(key)) {
            const partitionK = hump2Partition(key)
            temp[partitionK] = obj[key]
        }
    })
    return temp
}

/**
 * 短横线转小驼峰
 * @param str 字符串
 * @returns 驼峰
 */
export function partition2Hump(str: string) {
    return str.replace(/(\-([a-z]))/g, (match, p1, p2, offset, string) => {
        // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
        return p2.toUpperCase()
    })
}

/**
 * 将短横线字段的对象转换成驼峰字段的对象
 * @param obj 要转换的对象
 * @param excludes 排除的字段（字段将在最终的映射对象中排除）
 * @returns 短横线命名的对象
 */
export function partitionObj2HumpObj(obj: object, excludes?: Array<string> | string): object {
    const temp = {}
    Object.keys(obj).forEach((key) => {
        if (!excludes || !excludes.includes(key)) {
            const partitionK = partition2Hump(key)
            temp[partitionK] = obj[key]
        }
    })
    return temp
}

/**
 * 获取 dom 的样式值
 * @param element dom 节点
 * @param attr 属性
 * @returns
 */
export function getStyle(element: Element, attr: string) {
    return getComputedStyle(element, null).getPropertyValue(attr)
}

/**
 * 判断字符串是否为 json
 * @param str 要判断的字符串
 * @returns
 */
export function isJSON(str: string) {
    if (typeof str === 'string') {
        try {
            var obj = JSON.parse(str)
            if (typeof obj === 'object' && obj) {
                return true
            } else {
                return false
            }
        } catch (e) {
            // console.log(`%c error：${str} !!! ${e}`, 'color: #f56c6c;')
            return false
        }
    }
}

/**
 * 函数字符串转函数体，遇到非函数字符串则抛出错误
 * @param str
 */
export function funStr2FuncBody(str: string) {
    if (typeof str !== 'string') return false

    try {
        return new Function('return ' + str)()
    } catch (e) {
        console.log(`%c error：${str} !!! ${e}`, 'color: #f56c6c;')
        return false
    }
}

/**
 * 获取字符串占据内存的大小
 * @param str 字符串
 * @param charset Unicode 编码集
 * @returns
 */
export function getStrSize(str: string, charset: string = 'UTF-8') {
    let total = 0
    charset = charset?.toLowerCase() || ''
    for (let i = 0; i < str.length; i++) {
        let charCode = str.charCodeAt(i)
        if (charset === 'utf-16' || charset === 'utf16') {
            total += charCode <= 0xffff ? 2 : 4
        } else {
            if (charCode <= 0x007f) {
                total += 1
            } else if (charCode <= 0x07ff) {
                total += 2
            } else if (charCode <= 0xffff) {
                total += 3
            } else {
                total += 4
            }
        }
    }
    return total
}

/**
 * 获取 url 中的参数，并转换为对象
 * @returns
 */
export function getUrlParams(queryString: string = window.location.search) {
    let result = {}
    let reg = /[?&][^?&]+=[^?&]+/g
    let newSearch = queryString.match(reg)
    if (newSearch) {
        newSearch.forEach((item) => {
            let temp = item.substring(1).split('=')
            let key = temp[0]
            let value = temp[1]
            result[key] = value
        })
    }
    return result
}

/**
 * 增强版序列化对象：可以将对象转换成字符串，通过 JSON.stringify 实现
 *  - JSON.stringify 不能序列化函数，当前方法可以序列化函数
 *  - 但是不能序列化简写的函数，如：对象函数简写方式
 *
 * 注意：可序列化的函数，只能是声明式或箭头函数
 */
export const advanceSerialize = {
    FUNC_PREFIX: 'FUNC_PREFIX',
    stringify(obj: any, space?: number | string, error?: (err: Error | unknown) => void) {
        try {
            return JSON.stringify(
                obj,
                (k, v) => {
                    if (typeof v === 'function') {
                        return `${this.FUNC_PREFIX}${v}`
                    }
                    return v
                },
                space
            )
        } catch (err) {
            error && error(err)
        }
    },
    parse(jsonStr: string, error?: (err: Error | unknown) => void) {
        try {
            return JSON.parse(jsonStr, (key, value) => {
                if (value && typeof value === 'string') {
                    return value.indexOf(this.FUNC_PREFIX) !== -1
                        ? new Function(`return ${value.replace(this.FUNC_PREFIX, '')}`)()
                        : value
                }
                return value
            })
        } catch (err) {
            error && error(err)
        }
    }
}

/**
 * 清空 obj 所有的 key，非改变引用
 * @param obj
 */
export function emptyObj(obj: object) {
    Object.keys(obj).forEach((key) => delete obj[key])
}

/**
 * 探查字符串是否为组件库的图标
 */
export function stringIsIcon(str: string): boolean {
    if (!str) return false
    const iconPrefix = ['ali-', 'el-', 'jg-']
    const res = iconPrefix.some((item) => str.startsWith(item))
    return res
}

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

/**
 * 获取数组 or 对象的长度
 * @param target
 * @returns
 */
export function getLength(target: Array<any> | object) {
    if (_.isArray(target)) return target.length
    if (_.isObject(target)) return Object.keys(target).length
}
