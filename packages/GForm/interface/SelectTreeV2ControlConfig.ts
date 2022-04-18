import { SelectProps, SelectEvents } from './SelectControlConfig'
import TreeConfig from '../../GSelectTree/interface/TreeConfig'
import { TreeData } from '../../GSelectTree/interface/TreeData'
import {
    SelectTreeV2TreeProps,
    CustomProps as SelectTreeV2CustomProps
} from '../../GSelectTreeV2/index.vue'

/**
 * 扩展组件自定义参数
 */
export interface SelectTreeV2Props {
    /**
     * 树节点的配置对象
     */
    treeProps?: SelectTreeV2CustomProps['treeProps']
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
    treeData: SelectTreeV2CustomProps['treeData']
    props?: TreeConfig & SelectProps & SelectEvents & SelectTreeV2Props
}
