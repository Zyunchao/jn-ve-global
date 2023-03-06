import { ref, computed, watch, Ref } from 'vue'
import type { TreeData } from '../../index'
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
        (e: 'update:selectedData', arr: TreeData[]): void
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
                const selectedNode = findTargetByField(treeData, key, props.sourceMapping.value)

                if (selectedNode) {
                    return selectedNode
                } else {
                    return {
                        [props.sourceMapping.value]: key,
                        [props.sourceMapping.label]: key
                    }
                }
            })

            // 抛出所选节点的数组
            emits('update:selectedData', checkedPanelNodes.value)
        }, 100),
        { immediate: true }
    )

    // checkbox 数据
    const checkedPanelNodes = ref<TreeData[]>([])
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
