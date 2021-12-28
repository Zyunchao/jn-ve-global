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
 * 驼峰转短横线
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
 * @returns 短横线命名的对象
 */
export function humpObj2PartitionObj(obj: object): object {
    const temp = {}
    Object.keys(obj).forEach((key) => {
        const partitionK = hump2Partition(key)
        temp[partitionK] = obj[key]
    })
    return temp
}

/**
 * 短横线转驼峰
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
 * @returns 短横线命名的对象
 */
export function partitionObj2HumpObj(obj: object): object {
    const temp = {}
    Object.keys(obj).forEach((key) => {
        const partitionK = partition2Hump(key)
        temp[partitionK] = obj[key]
    })
    return temp
}

/**
 * 获取 dom 的样式值
 * @param element dom 节点
 * @param attr 属性
 * @returns
 */
export function getStyle(element, attr) {
    return window.getComputedStyle(element, null).getPropertyValue(attr)
}
