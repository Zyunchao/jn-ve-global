export default interface TreeV2Props {
    /**
     * 每个树节点用来作为唯一标识的属性，在整棵树中应该是唯一的
     * default: id
     */
    value?: string
    /**
     * 指定节点标签为节点对象的某个属性值
     * default: label
     */
    label?: string
    /**
     * 指定子树为节点对象的某个属性值
     * default: children
     */
    children?: string
    /**
     * 指定节点选择框是否禁用为节点对象的某个属性值
     * default: disabled
     */
    disabled?: string
}
