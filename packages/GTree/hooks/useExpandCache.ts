import { watch, ref, computed, nextTick, Ref, ComputedRef, onUnmounted } from 'vue'
import type { TreeNode, TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { Session } from '@jsjn/utils'
import type { TreeV2Props } from '../../index'
import { ElTreeV2 } from 'element-plus'

const EXPAND_KEYS_CACHE_KEY = `EXPAND_KEYS_CACHE_KEY`

interface Params {
    localSourceMapping: ComputedRef<TreeV2Props>
    treeRef: Ref<InstanceType<typeof ElTreeV2> | null>
}

// 缓存展开的节点数组（优化刷新浏览器）
export default ({ localSourceMapping, treeRef }: Params) => {
    const expandNodeKeys = ref<string[]>(Session.get(EXPAND_KEYS_CACHE_KEY) || [])

    const _nodeExpandChange = (data: TreeNodeData, node: TreeNode, isExpand: boolean) => {
        const currentKey = data[localSourceMapping.value.value]
        if (isExpand) {
            if (!expandNodeKeys.value.includes(currentKey)) {
                expandNodeKeys.value.push(currentKey)
            }
        } else {
            expandNodeKeys.value = expandNodeKeys.value.filter((key) => key !== currentKey)
        }
    }

    const handleNodeExpand = (...p) => _nodeExpandChange.apply(null, [...p, true])

    const handleNodeCollapse = (...p) => _nodeExpandChange.apply(null, [...p, false])

    const stop = watch(
        () => treeRef.value,
        (instance) => {
            if (instance) {
                if (expandNodeKeys.value.length) {
                    instance.setExpandedKeys(expandNodeKeys.value)
                }
                stop()
            }
        }
    )

    watch(
        () => expandNodeKeys.value,
        (keys) => {
            Session.set(EXPAND_KEYS_CACHE_KEY, keys)
        },
        { deep: true }
    )

    onUnmounted(() => {
        Session.remove(EXPAND_KEYS_CACHE_KEY)
    })

    return {
        expandNodeKeys,
        handleNodeExpand,
        handleNodeCollapse
    }
}
