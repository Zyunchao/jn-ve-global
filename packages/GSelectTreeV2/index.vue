<template>
    <el-tree-select
        default-expand-all
        highlight-current
        v-bind="$attrs"
        :show-checkbox="showCheckbox"
        :check-strictly="checkStrictly"
        :data="localTreeData"
        :props="localTreeProps"
    />
</template>

<script lang="ts">
export default {
    name: 'GSelectTreeV2'
}
</script>

<script lang="ts" setup>
import { computed, useAttrs } from 'vue'
import { TreeData } from '../GSelectTree/interface/TreeData'
import TreeProps from '../GSelectTree/interface/TreeProps'
import _ from 'lodash'
import { humpObj2PartitionObj } from '../utils/utils'

export interface SelectTreeV2TreeProps extends TreeProps {
    /**
     * 指定节点 value 为节点对象的某个属性值
     */
    value?: string
    /**
     * 指定节点标签为节点对象的某个属性值
     */
    label?: string
}

export interface CustomProps {
    /**
     * 树的数据
     */
    treeData: TreeData | TreeData[]
    /**
     * 树节点的配置对象
     */
    treeProps?: SelectTreeV2TreeProps
    /**
     * 是否所有节点都可选择
     * 默认为 true
     * 等同于树的父子不关联选择
     */
    checkStrictly?: boolean
}

const props = withDefaults(defineProps<CustomProps>(), {
    checkStrictly: true,
    treeData: () => [],
    treeProps: () => ({
        label: 'name',
        value: 'id'
    })
})

// attrs 驼峰转短横线
const attrsSource = useAttrs()
const attrs = computed<{ [k: string]: any }>(() => humpObj2PartitionObj(attrsSource))

/**
 * 是否显示勾选框
 *  1. 用户传递覆盖
 *  2. 多选默认显示
 */
const showCheckbox = computed(() => {
    if (attrs.value['show-checkbox'] !== undefined && attrs.value['show-checkbox'] !== null) {
        return attrs.value['show-checkbox']
    }

    return attrs.value['multiple'] !== undefined && attrs.value['multiple'] !== null
})

/**
 * 节点配置选项
 * element-plus v 2.1.9
 * 原本直接配置 props 的 label & value 即可对应节点对象的展示字段
 * 但是 多选 + showCheckbox 会在勾选时获取不到绑定的 value 数据
 * 只有树数据中包含 value 字段时，勾选抛出的值才是正确的，可能是个 bug
 * 持续关注 ele 的版本
 *
 * 故在这里将节点的绑定值，固定为 label & value
 * 并结合数据的过滤包装，完成数据的装填
 */
const localTreeProps = computed(() => ({
    disabled: 'disabled',
    ...props.treeProps,
    label: 'label',
    value: 'value'
}))

// 包装数据
const localTreeData = computed(() => recursion(_.cloneDeep(props.treeData)))
function recursion(source: any) {
    return source.map((item) => {
        if (item.children && !!item.children.length) {
            item.children = recursion(item.children)
        }

        item['label'] = item['label'] ? item['label'] : item[props.treeProps.label || 'name']
        item['value'] = item['value'] ? item['value'] : item[props.treeProps.value || 'id']

        return item
    })
}
</script>

<style lang="scss" scoped></style>
