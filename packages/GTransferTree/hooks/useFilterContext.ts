import { Ref, ref, watch } from 'vue'
import type { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { ElTreeV2 } from 'element-plus'
import { TreeProps } from './useTreeContext'
import { TreeData } from '../../index'

interface Params {
    props: {
        data: TreeData[]
        /**
         * 树的配置对象
         */
        sourceMapping?: TreeProps
        [k: string]: any
    }
    elTreeV2Ref: Ref<InstanceType<typeof ElTreeV2> | null>
    checkedPanelNodes: Ref<TreeNodeData[]>
}

export default (p: Params) => {
    const { elTreeV2Ref, props, checkedPanelNodes } = p

    // 左侧搜索
    const filterTextLeft = ref<string>('')
    watch(
        () => filterTextLeft.value,
        (query) => {
            elTreeV2Ref.value?.filter(query)
        }
    )

    // 右侧搜索
    const filterTextRight = ref<string>('')
    const checkedPanelIsEmpty = ref<boolean>(true)
    watch(
        () => filterTextRight.value,
        (query) => {
            checkedPanelNodes.value.forEach((node) => {
                if (query && !node[props.sourceMapping?.label]?.includes(query)) {
                    node.isHide = true
                } else {
                    node.isHide = false
                }
            })
        }
    )
    watch(
        () => checkedPanelNodes.value,
        (list) => {
            if (list.length !== 0) {
                if (list.every((node) => node.isHide === true)) {
                    checkedPanelIsEmpty.value = true
                    return
                }

                checkedPanelIsEmpty.value = false
            } else {
                checkedPanelIsEmpty.value = true
            }
        },
        { immediate: true, deep: true }
    )

    function treeFilterMethod(query: string, node: TreeNode): boolean {
        return node[props.sourceMapping?.label]?.includes(query)
    }

    return {
        filterTextLeft,
        filterTextRight,
        treeFilterMethod,
        checkedPanelIsEmpty
    }
}
