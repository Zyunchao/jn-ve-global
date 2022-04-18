import { SelectProps, SelectEvents } from './SelectControlConfig'
import TreeConfig from '../../GSelectTree/interface/TreeConfig'
import { TreeData } from '../../GSelectTree/interface/TreeData'
import TreeProps from '../../GSelectTree/interface/TreeProps'

/**
 * v2 扩展的 tree 的 props
 */
export interface SelectTreeV2TreeProps extends TreeProps {
    /**
     * 指定节点 value 为节点对象的某个属性值
     */
    value?: string
    /**
     * 指定节点标签为节点对象的某个属性值
     */
    label?: string
}

/**
 * 扩展组件自定义参数
 */
export interface SelectTreeV2Props {
    /**
     * 树节点的配置对象
     */
    treeProps?: SelectTreeV2TreeProps
    /**
     * 是否所有节点都可选择
     * 默认为 true
     * 等同于树的父子不关联选择
     */
    checkStrictly?: boolean
    /**
     * 预留字段
     */
    [k: string]: any
}

export default interface SelectTreeV2ControlConfig {
    type: 'selectTreeV2'
    treeData: TreeData | TreeData[]
    props?: TreeConfig & SelectProps & SelectEvents & SelectTreeV2Props
}
