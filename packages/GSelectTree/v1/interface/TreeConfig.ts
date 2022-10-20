import { VNode } from 'vue'

export default interface TreeConfig {
    /**
     * 内容为空的时候展示的文本
     */
    emptyText?: string
    /**
     * 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
     */
    nodeKey?: string
    /**
     * 是否在第一次展开某个树节点后才渲染其子节点
     * true
     */
    renderAfterExpand?: boolean
    /**
     * 加载子树数据的方法，仅当 lazy 属性为true 时生效	function(node, resolve)，node为当前点击的节点，resolve为数据加载完成的回调(必须调用)	—	—
     */
    load?: (node, resolve) => any
    /**
     * 树节点的内容区的渲染 Function(h, { node, data, store })
     */
    renderContent?: Function | JSX.Element | VNode
    /**
     * 是否高亮当前选中节点
     * false
     */
    highlightCurrent?: boolean
    /**
     * 是否默认展开所有节点
     * false
     */
    defaultExpandAll?: boolean
    /**
     * 是否在点击节点的时候展开或者收缩节点， 默认值为 true，如果为 false，则只有点箭头图标的时候才会展开或者收缩节点。
     * true
     */
    expandOnClickNode?: boolean
    /**
     * 是否在点击节点的时候选中节点，默认值为 false，即只有在点击复选框时才会选中节点
     * false
     */
    checkOnClickNode?: boolean
    /**
     * 展开子节点的时候是否自动展开父节点
     * true
     */
    autoExpandParent?: boolean
    /**
     * 默认展开的节点的 key 的数组
     */
    defaultExpandedKeys?: Array<any>
    /**
     * 节点是否可被选择	boolean
     * false
     */
    showCheckbox?: boolean
    /**
     * 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
     * false
     */
    checkStrictly?: boolean
    /**
     * 默认勾选的节点的 key 的数组
     */
    defaultCheckedKeys?: Array<any>
    /**
     * 当前选中的节点
     */
    currentNodeKey?: string | number
    /**
     * 对树节点进行筛选时执行的方法， 返回 false 则表示这个节点会被隐藏	Function(value, data, node)	—	—
     */
    filterNodeMethod?: (value, data, node) => boolean
    /**
     * 是否每次只打开一个同级树节点展开	boolean
     * false
     */
    accordion?: boolean
    /**
     * 相邻级节点间的水平缩进，单位为像素
     * 16
     */
    indent?: number
    /**
     * 自定义图标组件
     */
    icon?: string | JSX.Element | VNode
    /**
     * 是否懒加载子节点，需与 load 方法结合使用
     * false
     */
    lazy?: boolean
}
