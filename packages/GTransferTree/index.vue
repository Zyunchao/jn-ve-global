<template>
    <div :class="['g-transfer-tree-wrapper', { 'is-disabled': disabled }]">
        <!-- 左面板 -->
        <div class="g-transfer-tree-panel">
            <p class="g-transfer-tree-panel__header">
                <span>{{ titles[0] }}</span>
                <span class="right">
                    <span class="count">
                        <span>{{ treeCheckedKeys.length }}</span>
                        <span>/</span>
                        <span>{{ enableNodesLength }}</span>
                    </span>

                    <el-tooltip
                        v-if="checkStrictly === undefined"
                        effect="dark"
                        :content="!localCheckStrictly ? '包含下级' : '不包含下级'"
                        placement="bottom"
                    >
                        <span
                            :class="[
                                'change-check-strictly-trigger',
                                { 'is-un-strictly': localCheckStrictly }
                            ]"
                            @click="localCheckStrictly = !localCheckStrictly"
                        >
                            <g-icon icon="org" />
                        </span>
                    </el-tooltip>
                </span>
            </p>
            <div class="g-transfer-tree-panel__body">
                <el-input
                    v-if="filterable"
                    v-model="filterTextLeft"
                    class="g-transfer-tree-panel__filter"
                    placeholder="请输入搜索内容"
                    :prefix-icon="Search"
                    clearable
                    :disabled="disabled"
                />

                <div class="g-transfer-tree-panel__list">
                    <el-tree-v2
                        ref="elTreeV2Ref"
                        class="g-transfer-tree-panel__tree"
                        :show-checkbox="true"
                        :check-strictly="checkStrictly ?? localCheckStrictly"
                        :data="localTreeData"
                        :props="sourceMapping"
                        :default-expanded-keys="defaultExpandedKeys"
                        :height="size2Rem(400 - 32 - 30 - 10)"
                        :filter-method="filterable ? treeFilterMethod : undefined"
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
                    <span>{{ titles[1] }}</span>
                </span>
                <span class="count">
                    <span>{{ checkedPanelCheckedKeys.length }}</span>
                    <span>/</span>
                    <span>{{ checkedPanelNodes.length }}</span>
                </span>
            </p>
            <div class="g-transfer-tree-panel__body">
                <el-input
                    v-if="filterable"
                    v-model="filterTextRight"
                    class="g-transfer-tree-panel__filter"
                    placeholder="请输入搜索内容"
                    :prefix-icon="Search"
                    clearable
                />

                <div class="g-transfer-tree-panel__list">
                    <el-scrollbar>
                        <el-checkbox-group v-model="checkedPanelCheckedKeys">
                            <template
                                v-for="node in checkedPanelNodes"
                                :key="node[sourceMapping.value]"
                            >
                                <el-checkbox
                                    :class="[
                                        'g-transfer-tree-panel__checked-item',
                                        { 'is-hide': node.isHide }
                                    ]"
                                    :label="node[sourceMapping.value]"
                                >
                                    <span :title="node[sourceMapping.label]">
                                        {{ node[sourceMapping.label] }}
                                    </span>
                                </el-checkbox>
                            </template>
                        </el-checkbox-group>
                    </el-scrollbar>

                    <p v-if="checkedPanelIsEmpty" class="empty">
                        暂无数据
                    </p>
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
import { reactive, nextTick, watch, ref } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { ElTreeV2 } from 'element-plus'
import { size2Rem } from '@jsjn/utils'
import LGButtonGroup from '../GButtonGroup/index.vue'
import type { BtnProps, TreeData } from '../index'
import _ from 'lodash'

import useCheckedContext from './hooks/useCheckedContext'
import useTreeContext, { TreeProps } from './hooks/useTreeContext'
import useFilterContext from './hooks/useFilterContext'

const props = withDefaults(
    defineProps<{
        /**
         * 绑定的已选值（id 数组）
         */
        modelValue: Array<string | number>
        /**
         * 树数据
         */
        data: TreeData[]
        /**
         * 树的配置对象
         */
        sourceMapping?: TreeProps
        /**
         * 标题
         */
        titles?: string[]
        /**
         * 可搜索
         */
        filterable?: boolean
        /**
         * 在显示复选框的情况下，是否严格的遵循父子不互相关联的做法
         */
        checkStrictly?: boolean
        /**
         * 选中的数据（对象）
         */
        selectedData?: TreeData[]
        /**
         * 禁用
         */
        disabled?: boolean
    }>(),
    {
        data: () => [],
        sourceMapping: () => ({
            label: 'name',
            value: 'id',
            children: 'children',
            disabled: 'disabled',
            check: 'check'
        }),
        titles: () => ['待选', '已选'],
        filterable: true,
        checkStrictly: undefined,
        disabled: false
    }
)

const emits = defineEmits<{
    (e: 'update:modelValue', arr: Array<string | number>): void
    (e: 'update:selectedData', arr: TreeData[]): void
}>()

const localCheckStrictly = ref<boolean>(false)

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

// 搜索功能上下文
const { filterTextLeft, filterTextRight, treeFilterMethod, checkedPanelIsEmpty } = useFilterContext(
    {
        props,
        elTreeV2Ref,
        checkedPanelNodes
    }
)

watch(
    () => props.data,
    () => {
        changeNodesDisabledStatus(localSelectedKeys.value, true)
    },
    { deep: false }
)

const transferBtns = reactive<BtnProps[]>([
    {
        label: '<',
        disabled: () => props.disabled === true || checkedPanelCheckedKeys.value.length === 0,
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
        disabled: () => props.disabled === true || treeCheckedKeys.value.length === 0,
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
/*! scopecss-disable */
@import './styles';
</style>
