import { ref, computed, reactive, watch } from 'vue'
import { TreeV2Props, TreeData } from '../../index'
import { ElTreeV2 } from 'element-plus'
import type { CheckedInfo, TreeKey } from 'element-plus/es/components/tree-v2/src/types'
import { getEnableNodesLength } from '../utils/tree'
import _ from 'lodash'
import { findTargetByField } from '@jsjn/utils'

export interface TreeProps extends TreeV2Props {
    check?: string
}

interface Params {
    props: {
        data: TreeData[]
        /**
         * 树的配置对象
         */
        sourceMapping?: TreeProps
        [k: string]: any
    }
    emits: {
        (e: 'update:modelValue', arr: Array<string | number>): void
    }
}

export default (p: Params) => {
    const { props } = p

    const elTreeV2Ref = ref<InstanceType<typeof ElTreeV2> | null>(null)
    const treeCheckedKeys = ref<TreeKey[]>([])
    const defaultExpandedKeys = ref<TreeKey[]>([])

    const localTreeData = ref<TreeData[]>([])
    const enableNodesLength = ref<number>(0)

    watch(
        () => props.data,
        (data) => {
            enableNodesLength.value = getEnableNodesLength(data)
            localTreeData.value = _.cloneDeep(data)
        },
        { immediate: true }
    )

    const handleTreeCheck = (_, checkInfo: CheckedInfo) => {
        const { checkedKeys, checkedNodes } = checkInfo
        /**
         * 过滤非禁用的已选的节点
         */
        const keys = checkedNodes
            .filter((node) => !node.disabled)
            .map((node) => node[props.sourceMapping.value])
        treeCheckedKeys.value = keys
    }

    function changeNodesDisabledStatus(keys: Array<string | number>, status: boolean) {
        keys.forEach((key) => {
            const preSelectedNode = findTargetByField(
                localTreeData.value,
                key as string,
                props.sourceMapping.value
            )

            if (preSelectedNode) {
                preSelectedNode['disabled'] = status
            }
        })

        // 更新待选项的可选值
        enableNodesLength.value = getEnableNodesLength(localTreeData.value)
        // 更新节点
        elTreeV2Ref.value.setData(localTreeData.value)
    }

    return {
        elTreeV2Ref,
        treeCheckedKeys,
        defaultExpandedKeys,
        localTreeData,
        enableNodesLength,
        handleTreeCheck,
        /**
         * 改变指定节点的禁用状态
         */
        changeNodesDisabledStatus
    }
}
