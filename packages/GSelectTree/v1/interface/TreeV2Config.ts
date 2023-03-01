import { VNode } from 'vue'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'

export default interface TreeV2Config {
    /**
     * 内容为空的时候展示的文本
     */
    emptyText?: string
    /**
     * 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
     * false
     */
    checkStrictly?: boolean
    /**
     * 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示， 返回 false 则表示这个节点会被隐藏
     * @param query
     * @param node
     * @returns
     */
    filterMethod?: (query: string, node: TreeNode) => boolean
    /**
     * 相邻级节点间的水平缩进，单位为像素
     * 16
     */
    indent?: number
    /**
     * 自定义图标组件
     */
    icon?: string | JSX.Element | VNode
}
