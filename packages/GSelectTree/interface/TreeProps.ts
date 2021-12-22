export default interface TreeProps {
    /**
     * 指定节点标签为节点对象的某个属性值
     */
    label?: string | ((data, node) => string)
    /**
     * 指定子树为节点对象的某个属性值
     */
    children?: string
    /**
     * 指定节点选择框是否禁用为节点对象的某个属性值
     */
    disabled?: boolean | ((data, node) => boolean)
    /**
     * 指定节点是否为叶子节点，仅在指定了 lazy 属性的情况下生效
     */
    isLeaf?: boolean | ((data, node) => boolean)
    /**
     * 自定义节点类名
     */
    class?: string | ((data, node) => string)
}
