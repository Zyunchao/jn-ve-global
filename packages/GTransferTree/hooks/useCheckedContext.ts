import { ref, computed, watch, Ref } from 'vue'
import { TreeData } from '../../index'
import type { TreeNodeData } from 'element-plus/es/components/tree-v2/src/types'
import { findTargetByField } from '@jsjn/utils'
import _ from 'lodash'

interface Params {
    props: {
        /**
         * 绑定的已选值
         */
        modelValue: Array<string | number>
        [k: string]: any
    }
    emits: {
        (e: 'update:modelValue', arr: Array<string | number>): void
    }
    localTreeData: Ref<TreeData[]>
}

export default (p: Params) => {
    const { props, emits, localTreeData } = p

    const localSelectedKeys = computed<Array<string | number>>({
        get: () => props.modelValue,
        set(arr) {
            emits('update:modelValue', arr)
        }
    })

    watch(
        () => [localSelectedKeys.value, localTreeData.value],
        _.debounce(([selectedKeys, treeData]) => {
            checkedPanelNodes.value = selectedKeys.map((key) => {
                const selectedNode = findTargetByField(treeData, key, props.treeProps.value)

                if (selectedNode) {
                    return selectedNode
                } else {
                    return {
                        [props.treeProps.value]: key,
                        [props.treeProps.label]: key
                    }
                }
            })
        }, 100),
        { immediate: true }
    )

    // checkbox 数据
    const checkedPanelNodes = ref<TreeNodeData[]>([])
    const checkedPanelCheckedKeys = ref<Array<string | number>>([])
    const checkAll = computed<boolean>(
        () =>
            checkedPanelNodes.value.length > 0 &&
            checkedPanelCheckedKeys.value.length === checkedPanelNodes.value.length
    )
    const isIndeterminate = computed<boolean>(() => {
        const checkedCount = checkedPanelCheckedKeys.value.length
        return checkedCount > 0 && checkedCount < checkedPanelNodes.value.length
    })

    const handleCheckAllChange = (checked: boolean) => {
        checkedPanelCheckedKeys.value = checked ? _.cloneDeep(localSelectedKeys.value) : []
    }

    return {
        localSelectedKeys,
        checkedPanelNodes,
        checkAll,
        isIndeterminate,
        checkedPanelCheckedKeys,
        handleCheckAllChange
    }
}
