import { watch, ref, Ref, ComputedRef } from 'vue'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'
import type { TreeV2Props } from '../../index'

interface Params {
    emits: (event: 'getTreeRef', ...args: any[]) => void
    localSourceMapping: ComputedRef<TreeV2Props>
}

export default ({ emits, localSourceMapping }: Params) => {
    const treeRef = ref<InstanceType<typeof ElTreeV2> | null>(null)
    const filterText = ref<string>('')

    // 树的过滤
    watch(
        () => filterText.value,
        (newValue) => {
            treeRef.value.filter(newValue)
        }
    )

    const filterMethod = (query: string, node: TreeNode) =>
        node[localSourceMapping.value.label]?.includes(query)

    // 抛出树的 ref（兼容旧代码）
    watch(
        () => treeRef.value,
        (instance) => {
            if (instance) emits('getTreeRef', instance)
        }
    )

    return {
        treeRef,
        filterText,
        filterMethod
    }
}
