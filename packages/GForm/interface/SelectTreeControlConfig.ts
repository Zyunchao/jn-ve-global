import { TreeData } from '../../GSelectTree'

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
}

export default interface SelectTreeControlConfig {
    type: 'selectTree'
    treeData: TreeData | TreeData[]
    props?: SelectTreeProps
}
