import { TreeData } from '../../GSelectTree/v1/interface/TreeData'
import TreeV2Props from '../../GSelectTree/v1/interface/TreeV2Props'
import TreeV2Config from '../../GSelectTree/v1/interface/TreeV2Config'

interface SelectTreeProps {
    /**
     * 多选
     */
    multiple?: boolean
    /**
     * 占位符
     */
    placeholder?: string
    /**
     * 排除某些特定条件下，所有节点都可以选择
     */
    everyChoose?: boolean
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 依据 node.type 判断不可选择的节点
     */
    nonselectable?: string[]
    /**
     * 树的节点属性配置
     */
    treeProps?: TreeV2Props
    /**
     * select 的原生配置，可直接加到标签上面
     * https://element-plus.gitee.io/zh-CN/component/tree-v2.html
     * Tree V2 虚拟化树形控件, 的原生配置，需要以对象的形式传递给当前组件
     */
    treeConfig?: TreeV2Config
    /**
     * 是否可搜索
     */
    filterable?: boolean
    /**
     * onchange 事件
     */
    onChange?: (data: TreeData) => void
    /**
     * 默认展开全部
     */
    defaultExpandAll?: boolean
    /**
     * 是否可清空
     */
    clearable?: boolean
}

export default interface SelectTreeControlConfig {
    type: 'selectTree'
    treeData: TreeData | TreeData[]
    props?: SelectTreeProps
}
