<template>
    <div class="g-transfer-tree-wrapper">
        <!-- 左面板 -->
        <div class="g-transfer-tree-panel">
            <p class="g-transfer-tree-panel__header">
                <span>待选</span>
                <span class="count">
                    <span>{{ treeCheckedKeys.length }}</span>
                    <span>/</span>
                    <span>{{ enableNodesLength }}</span>
                </span>
            </p>
            <div class="g-transfer-tree-panel__body">
                <el-input
                    v-model="filterTextLeft"
                    class="g-transfer-tree-panel__filter"
                    placeholder="请输入搜索内容"
                    :prefix-icon="Search"
                ></el-input>

                <div class="g-transfer-tree-panel__list">
                    <el-tree-v2
                        ref="elTreeV2Ref"
                        class="g-transfer-tree-panel__tree"
                        :show-checkbox="true"
                        :check-strictly="true"
                        :data="localTreeData"
                        :props="treeProps"
                        :default-expanded-keys="defaultExpandedKeys"
                        :height="size2Rem(400 - 32 - 30 - 10)"
                        @check="handleTreeCheck"
                    >
                        <template #default="{ node }">
                            <span class="g-transfer-tree-panel__node-label" :title="node.label">
                                {{ node.label }}
                            </span>
                        </template>
                    </el-tree-v2>
                </div>
            </div>
            <!-- <div class="g-transfer-tree-panel__footer"></div> -->
        </div>

        <!-- 穿梭按钮 -->
        <LGButtonGroup class="g-transfer-tree__buttons" :btns="transferBtns" />

        <!-- 右面板 -->
        <div class="g-transfer-tree-panel">
            <p class="g-transfer-tree-panel__header">
                <span class="check">
                    <el-checkbox
                        v-model="checkAll"
                        :disabled="checkedPanelNodes.length === 0"
                        :indeterminate="isIndeterminate"
                        @change="handleCheckAllChange"
                    />
                    <span>已选</span>
                </span>
                <span class="count">
                    <span>{{ treeCheckedKeys.length }}</span>
                    <span>/</span>
                    <span>{{ checkedPanelNodes.length }}</span>
                </span>
            </p>
            <div class="g-transfer-tree-panel__body">
                <el-input
                    v-model="filterTextRight"
                    class="g-transfer-tree-panel__filter"
                    placeholder="请输入搜索内容"
                    :prefix-icon="Search"
                ></el-input>

                <div class="g-transfer-tree-panel__list">
                    <el-checkbox-group v-model="checkedPanelCheckedKeys">
                        <template v-for="node in checkedPanelNodes" :key="node[treeProps.value]">
                            <el-checkbox
                                class="g-transfer-tree-panel__checked-item"
                                :label="node[treeProps.value]"
                            >
                                <span :title="node[treeProps.label]">
                                    {{ node[treeProps.label] }}
                                </span>
                            </el-checkbox>
                        </template>
                    </el-checkbox-group>
                </div>
            </div>
            <!-- <div class="g-transfer-tree-panel__footer"></div> -->
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'GTransferTree'
})
</script>

<script lang="ts" setup>
import { reactive, nextTick } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElTreeV2 } from 'element-plus'
import { size2Rem, findTargetByField } from '@jsjn/utils'
import { getEnableNodesLength } from './utils/tree'
import LGButtonGroup from '../GButtonGroup/index.vue'
import type { BtnProps, TreeData } from '../index'
import _ from 'lodash'

import useCheckedContext from './hooks/useCheckedContext'
import useTreeContext, { TreeProps } from './hooks/useTreeContext'
import useFilterContext from './hooks/useFilterContext'

const props = withDefaults(
    defineProps<{
        /**
         * 绑定的已选值
         */
        modelValue: Array<string | number>
        /**
         * 树数据
         */
        data: TreeData[]
        /**
         * 树的配置对象
         */
        treeProps?: TreeProps
    }>(),
    {
        data: () => [],
        treeProps: () => ({
            label: 'name',
            value: 'id',
            children: 'children',
            disabled: 'disabled',
            check: 'check'
        })
    }
)

const emits = defineEmits<{
    (e: 'update:modelValue', arr: Array<string | number>): void
}>()

// 树的上下文
const {
    elTreeV2Ref,
    treeCheckedKeys,
    defaultExpandedKeys,
    localTreeData,
    enableNodesLength,
    handleTreeCheck,
    changeNodesDisabledStatus
} = useTreeContext({ props, emits })

const { filterTextLeft, filterTextRight } = useFilterContext()

// 已选数据上下文
const {
    checkedPanelNodes,
    localSelectedKeys,
    checkAll,
    isIndeterminate,
    checkedPanelCheckedKeys,
    handleCheckAllChange
} = useCheckedContext({
    props,
    emits,
    localTreeData
})

const transferBtns = reactive<BtnProps[]>([
    {
        label: '<',
        disabled: () => checkedPanelCheckedKeys.value.length === 0,
        onClick() {
            localSelectedKeys.value = localSelectedKeys.value.filter(
                (key) => !checkedPanelCheckedKeys.value.includes(key)
            )
            changeNodesDisabledStatus(checkedPanelCheckedKeys.value, false)
            checkedPanelCheckedKeys.value = []
        }
    },
    {
        label: '>',
        disabled: () => treeCheckedKeys.value.length === 0,
        onClick() {
            // 去重
            localSelectedKeys.value = _.uniqWith(
                localSelectedKeys.value.concat(treeCheckedKeys.value),
                _.isEqual
            )

            /**
             * 这里发现，本地 computed 关联 props 改变时，会存在数据更新延迟
             * 即：设置本地的 计算值后，立即获取这个值，获取到的还是旧的 props 值
             * 所以这里采用了延迟操作，保证 计算值是期望的赋过值的值
             */
            nextTick(() => {
                treeCheckedKeys.value = []
                elTreeV2Ref.value.setCheckedKeys([])
                changeNodesDisabledStatus(localSelectedKeys.value, true)
            })
        }
    }
])

defineExpose({
    elTreeV2Ref,
    filterTextLeft,
    filterTextRight
})
</script>

<style lang="scss" scoped>
@import './styles';
</style>
