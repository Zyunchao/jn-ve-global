import { VNode } from 'vue'

export default interface Cell {
    /**
     * 内容
     */
    content: string | VNode | JSX.Element
    /**
     * 行坐标（起始）
     */
    ri: number
    /**
     * 列坐标（起始）
     */
    ci: number
    /**
     * 列合并
     */
    colspan?: number
    /**
     * 行合并
     */
    rowspan?: number
    /**
     * 是否销毁（被合并的）
     */
    destroyed?: boolean
    /**
     * 内容对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 额外的类名
     */
    class?: string
    /**
     * 数据的 key，用来查找
     */
    propKey?: string
}
