import { TreeData } from '../../GSelectTree/interface/TreeData'
import TreeProps from '../../GSelectTree/interface/TreeProps'
import { SelectProps } from './SelectControlConfig'
import TreeConfig from '../../GSelectTree/interface/TreeConfig'

export interface SelectTreeProps extends SelectProps {
    /**
     * 树的配置节点对象
     */
    treeProps?: TreeProps
    /**
     * QH, QW 是在选择角色时，对机构及部门的特殊处理
     * 由于有些树的节点并非在一张表中，故 id 存在重复的问题，通过 类型 + id 才能确定唯一
     *
     * everyChoose 用来标识每个节点都可以选择
     */
    everyChoose?: boolean
    /**
     * 依据 node.type 判断不可选择的节点
     * default: ['QH', 'QW', 'QZ']
     */
    nonselectable?: string[]
    /**
     * select 的原生配置，可直接加到标签上面
     * tree 的原生配置，需要以对象的形式传递给当前组件
     */
    treeConfig?: TreeConfig
}

export default interface SelectTreeControlConfig {
    type: 'selectTree'
    treeData: TreeData | TreeData[]
    props?: SelectTreeProps
}
