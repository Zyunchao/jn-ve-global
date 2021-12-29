<template>
    <div class="aside-tree">
        <!-- 顶部操作区域 -->
        <div v-if="showBtnArea" class="btns-wrapper">
            <div class="btns">
                <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                    <template v-if="btn.authCode">
                        <el-button
                            v-show="!btn.hide"
                            v-auth="btn.authCode"
                            :type="btn.type || 'primary'"
                            v-bind="btn"
                            size="mini"
                            @click="btn.onClick"
                        >
                            {{ btn.label }}
                        </el-button>
                    </template>
                    <template v-else>
                        <el-button
                            v-show="!btn.hide"
                            :type="btn.type || 'primary'"
                            v-bind="btn"
                            size="mini"
                            @click="btn.onClick"
                        >
                            {{ btn.label }}
                        </el-button>
                    </template>
                </template>
            </div>
            <div class="tree-icons">
                <g-icon icon="tree-list-unfold" @click="unfold" />
                <g-icon icon="tree-list-pack-up" @click="packUp" />
            </div>
        </div>

        <!-- 搜索框 -->
        <div class="input-wrapper">
            <el-input v-model="filterText" placeholder="请输入关键字" />
        </div>

        <!-- 树 -->
        <div class="tree-wrapper">
            <el-scrollbar class="tree-scrollbar">
                <el-tree
                    ref="treeRef"
                    :data="data"
                    node-key="id"
                    highlight-current
                    :expand-on-click-node="false"
                    :default-expand-all="expandAll"
                    empty-text="暂无数据"
                    :filter-node-method="filterNode"
                    :props="defaultProps"
                    v-bind="$attrs"
                    :default-checked-keys="localDefaultCheckedKeys"
                >
                    <!-- 节点图标 -->
                    <template #default="{ node, data }">
                        <span
                            v-if="mode === 'default'"
                            :class="[
                                'tree-node-icon-wrapper',
                                {
                                    'no-icon':
                                        !data.industryId &&
                                        (!data.children || !data.children.length)
                                }
                            ]"
                        >
                            <!-- 根节点 -->
                            <LGIcon
                                v-if="Array.isArray(node.parent.data)"
                                icon="org"
                                class="root-icon"
                            />

                            <!-- 子节点 -->
                            <LGIcon
                                v-else-if="
                                    !data.industryId &&
                                        data.children &&
                                        data.children.length > 0 &&
                                        !Array.isArray(node.parent.data)
                                "
                                :icon="node.expanded ? 'folder' : 'aside-tree-node-close-icon'"
                            />

                            <!-- 机构 -->
                            <LGIcon v-else-if="data.industryId" icon="tree-node-institution-icon" />
                        </span>

                        <span>{{ node.label }}</span>
                    </template>
                </el-tree>
            </el-scrollbar>
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
import { PropType, watch, watchEffect, ref } from 'vue'
import { BtnProps } from '../index'
import { TreeData } from '../GSelectTree/index'
import { nodeHasChildren } from './utils'
import LGIcon from '../GIcon/index.vue'
import _ from 'lodash'

const props = defineProps({
    /**
     * 树数据
     */
    data: {
        type: Array as PropType<TreeData[]>,
        default: () => []
    },
    /**
     * 类别 'default' | 'other'
     */
    mode: {
        type: String,
        default: 'default'
    },
    /**
     * 默认配置选项
     */
    defaultProps: {
        type: Object,
        default: () => {
            return {
                children: 'children',
                label: 'name'
            }
        }
    },
    /**
     * 配置按钮组
     */
    btns: {
        type: Array as PropType<BtnProps[]>,
        default: () => []
    },
    /**
     * 是否展示顶部按钮区域
     */
    showBtnArea: {
        type: Boolean,
        default: true
    },
    /**
     * 默认勾选的节点的 key 的数组
     * 需要传递 node-key='id'
     */
    defaultCheckedKeys: {
        type: Array as PropType<string[] | number[]>,
        default: () => []
    },
    /**
     * 过滤传递的默认勾选的 key 的数组中的父节点
     * 如果传递的选中节点中包含父节点，那么就会到值其下的子节点全部选中
     * 有些情况下，可能希望由子控制父，而不是由父控制子
     */
    filterParentCheckedKeysFlag: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['getTreeRef'])

const treeRef = ref<any>(null)
const filterText = ref<string>('')
const expandAll = ref<boolean>(true)
const localDefaultCheckedKeys = ref<any[]>()

// 树的过滤
watch(
    () => filterText.value,
    (newValue) => {
        treeRef.value.filter(newValue)
    }
)

// 处理默认选中的数据
watchEffect(() => {
    if (
        props.data.length > 0 &&
        props.defaultCheckedKeys.length > 0 &&
        props.filterParentCheckedKeysFlag
    ) {
        localDefaultCheckedKeys.value = props.defaultCheckedKeys
            .map((id) => {
                const isParentNode = nodeHasChildren(props.data, id)
                if (isParentNode) return null
                else return id
            })
            .filter((item) => !!item)
    } else {
        localDefaultCheckedKeys.value = props.defaultCheckedKeys
    }
})

// 抛出树的 ref
watch(
    () => treeRef.value,
    (instance) => {
        if (instance) emits('getTreeRef', instance)
    }
)

const filterNode = (value, data) => {
    if (!value) return true
    return data[props.defaultProps.label || 'name'].indexOf(value) !== -1
}

const unfold = () => {
    changeTreeNodeUnfold(treeRef.value.store.root)
}

const packUp = () => {
    changeTreeNodeStatusPackUp(treeRef.value.store.root)
}

function changeTreeNodeUnfold(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
        node.childNodes[i].expanded = expandAll.value
        if (node.childNodes[i].childNodes.length > 0) {
            changeTreeNodeUnfold(node.childNodes[i])
        }
    }
}

function changeTreeNodeStatusPackUp(node) {
    for (let i = 0; i < node.childNodes.length; i++) {
        node.childNodes[i].expanded = !expandAll.value
        if (node.childNodes[i].childNodes.length > 0) {
            changeTreeNodeStatusPackUp(node.childNodes[i])
        }
    }
}

// 抛出
defineExpose({
    treeRef
})
</script>

<style lang="scss" scoped>
@import './styles.scss';
</style>
