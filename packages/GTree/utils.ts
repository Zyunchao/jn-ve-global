/**
 * 节点是否包含子元素，且子元素长度不为0
 * @param source 源数据（树）
 * @param id 目标 id
 * @returns
 */
export function nodeHasChildren(source: any[], id: string | number): boolean {
    let flag = true

    function recursion(source: any[], id: string | number) {
        source.some((item) => {
            if (item.id === undefined || item.id === null) throw new Error('id not defined')

            if (item.id === id) {
                if (item.children && item.children.length > 0) {
                    flag = true
                } else {
                    flag = false
                }

                return true
            }

            if (item.children && item.children.length > 0) {
                recursion(item.children, id)
            }
        })
    }

    recursion(source, id)
    return flag
}
