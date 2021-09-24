import { TreeData } from '../../GSelectTree'
import { SelectProps } from './SelectControlConfig'

export interface SelectTreeProps {
    /**
     * 是否多选
     */
    multiple?: boolean
    /**
     * 占位
     */
    placeholder?: string
    /**
     * 树的配置节点对象
     */
    treeProps?: {
        children?: string
        label?: string | ((data: TreeData, node) => any)
    }
    /**
     * QH, QW 是在选择角色时，对机构及部门的特殊处理
     * 由于有些树的节点并非在一张表中，故 id 存在重复的问题，通过 类型 + id 才能确定唯一
     *
     * everyChoose 用来标识每个节点都可以选择
     */
    everyChoose?: boolean
    /**
     * 下拉框的尺寸
     */
    size?: SelectProps['size']
    /**
     * 下拉框出现/隐藏时触发
     * status 出现则为 true，隐藏则为 false
     */
    onVisibleChange?: (status: boolean) => void
}

export default interface SelectTreeControlConfig {
    type: 'selectTree'
    treeData: TreeData | TreeData[]
    props?: SelectTreeProps
}
