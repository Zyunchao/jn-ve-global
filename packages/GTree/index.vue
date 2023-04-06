<template>
    <div class="aside-tree">
        <!-- 顶部操作区域 -->
        <div v-if="showBtnArea" class="btns-wrapper">
            <div class="btns">
                <LGButtonGroup :btns="btns" />
            </div>
            <div class="tree-icons">
                <el-tooltip content="展开全部" placement="bottom" popper-class="my-custom-popper">
                    <span> <LGIcon icon="tree-list-unfold" @click="unfold" /> </span>
                </el-tooltip>

                <el-tooltip content="收起全部" placement="bottom" popper-class="my-custom-popper">
                    <span> <LGIcon icon="tree-list-pack-up" @click="packUp" /></span>
                </el-tooltip>
            </div>
        </div>

        <!-- 搜索框 -->
        <div v-if="!hideSearch" class="input-wrapper">
            <el-input v-model="filterText" placeholder="请输入关键字" />
        </div>

        <!-- 树 -->
        <div ref="treeWrapRef" class="tree-wrapper">
            <ElTreeV2
                v-if="!!treeWrapHeight"
                ref="treeRef"
                :data="data"
                empty-text="暂无数据"
                :highlight-current="true"
                :filter-method="filterMethod"
                :expand-on-click-node="false"
                v-bind="$attrs"
                :height="treeWrapHeight"
                :item-size="itemSize"
                :props="localSourceMapping"
                :default-checked-keys="localDefaultCheckedKeys"
                @node-expand="handleNodeExpand"
                @node-collapse="handleNodeCollapse"
            >
                <template #default="{ node, data }">
                    <span
                        v-if="['institution', 'default'].includes(mode)"
                        :class="[
                            'tree-node-icon-wrapper',
                            { 'no-icon': !data.industryId && !data.children?.length }
                        ]"
                    >
                        <!-- 一级节点 -->
                        <LGIcon v-if="node.level === 1" icon="org" class="root-icon" />

                        <!-- 非机构节点，且有子节点 -->
                        <LGIcon
                            v-else-if="!data.industryId && !!data.children?.length"
                            :icon="
                                expandNodeKeys.includes(data[localSourceMapping.value])
                                    ? 'folder'
                                    : 'aside-tree-node-close-icon'
                            "
                        />

                        <!-- 机构节点（数据包含 industryId） -->
                        <LGIcon v-else-if="data.industryId" icon="tree-node-institution-icon" />
                    </span>

                    <!-- 节点文本 -->
                    <span>{{ node.label }}</span>
                </template>
            </ElTreeV2>
        </div>

        <!-- 留白占位 -->
        <div class="white" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'GTree'
}
</script>

<script lang="tsx" setup>
import { watchEffect, ref, computed } from 'vue'
import type { TreeData, BtnProps, TreeV2Props } from '../index'
import LGIcon from '../GIcon/index.vue'
import LGButtonGroup from '../GButtonGroup/index.vue'
import { size2Rem, getStyle, nodeHasChildren, getAllParentNode } from '@jsjn/utils'
import { ElTreeV2 } from 'element-plus'
import useFilterContext from './hooks/useFilterContext'
import useExpandCache from './hooks/useExpandCache'
import _ from 'lodash'

interface Props {
    /**
     * 树数据
     */
    data: TreeData[]
    /**
     * 类别 'default' | 'other'
     */
    mode?: 'institution' | 'default' | 'other'
    /**
     * 默认配置选项，历史依赖原因，理论上应该改为 sourceMapping
     */
    defaultProps?: TreeV2Props
    /**
     * 配置按钮组
     */
    btns?: BtnProps[]
    /**
     * 是否展示顶部按钮区域
     */
    showBtnArea?: boolean
    /**
     * 默认勾选的节点的 key 的数组
     */
    defaultCheckedKeys?: string[] | number[]
    /**
     * 过滤传递的默认勾选的 key 的数组中的父节点
     * 如果传递的选中节点中包含父节点，那么就会导致其下的子节点全部选中
     * 有些情况下，可能希望由子控制父，而不是由父控制子
     */
    filterParentCheckedKeysFlag?: boolean
    /**
     * 隐藏搜索框
     */
    hideSearch?: boolean
    /**
     * 默认展开全部
     */
    defaultExpandAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    data: () => [],
    mode: 'default',
    btns: () => [],
    showBtnArea: true,
    defaultCheckedKeys: () => [],
    filterParentCheckedKeysFlag: false,
    hideSearch: false,
    defaultExpandAll: false
})

const emits = defineEmits(['getTreeRef'])

const localDefaultCheckedKeys = ref<any[]>()
const localSourceMapping = computed<TreeV2Props>(() => ({
    label: 'name',
    value: 'id',
    children: 'children',
    disabled: 'disabled',
    ...props.defaultProps
}))

const treeWrapRef = ref<HTMLElement>()
const treeWrapHeight = computed(() =>
    treeWrapRef.value ? parseFloat(getStyle(treeWrapRef.value, 'height')) : 0
)
const itemSize = computed(() => size2Rem(30))

/**
 * 树中所有父节点的 key 数组，用途：
 *  - 默认展开全部
 *  - 展开全部
 *  - 收起全部
 */
const allParentNodeKeys = computed(() =>
    getAllParentNode(props.data).map((node) => node[localSourceMapping.value.value])
)

// 过滤的上下文
const { treeRef, filterText, filterMethod } = useFilterContext({ emits, localSourceMapping })

// 缓存展开的节点
const { expandNodeKeys, handleNodeExpand, handleNodeCollapse } = useExpandCache({
    localSourceMapping,
    treeRef
})

// 是否默认展开全部节点
watchEffect(() => {
    if (!props.defaultExpandAll) return
    const parentKeys = allParentNodeKeys.value
    const data = props.data
    const treeInstance = treeRef.value
    if (!treeInstance || !data || !data.length || !parentKeys.length) return
    treeInstance.setExpandedKeys(parentKeys)
})

/**
 * 处理默认选中的数据
 *  - 如果标识 filterParentCheckedKeysFlag，则过滤掉父级节点
 *  - 否则，全量返回用户传递的
 */
watchEffect(() => {
    if (
        props.data.length > 0 &&
        props.defaultCheckedKeys.length > 0 &&
        props.filterParentCheckedKeysFlag
    ) {
        localDefaultCheckedKeys.value = props.defaultCheckedKeys
            .map((targetFieldVal) => {
                // 依照树的 props 配置对象的 value 字段，进行筛选
                const isParentNode = nodeHasChildren(
                    props.data,
                    targetFieldVal,
                    localSourceMapping.value.value
                )

                if (isParentNode) return null
                else return targetFieldVal
            })
            .filter((item) => !!item)
    } else {
        localDefaultCheckedKeys.value = props.defaultCheckedKeys
    }
})

// 展开全部
const unfold = () => {
    if (!allParentNodeKeys.value.length) return
    treeRef.value.setExpandedKeys(allParentNodeKeys.value)
    expandNodeKeys.value = allParentNodeKeys.value
}

// 收起全部
const packUp = () => {
    treeRef.value.setExpandedKeys([])
    expandNodeKeys.value = []
}

// 抛出
defineExpose({
    treeRef
})
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
