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
