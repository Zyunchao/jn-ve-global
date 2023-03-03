import type { TreeData } from '../../GSelectTree/v1/index'

export function getEnableNodesLength(treeData: TreeData[]): number {
    let count = 0

    function recursion(treeData: TreeData[]) {
        treeData.forEach((node) => {
            if (node.children && node.children.length > 0) {
                recursion(node.children)
            }

            if (node['disabled'] !== true) {
                count++
            }
        })
    }

    recursion(treeData)
    return count
}
