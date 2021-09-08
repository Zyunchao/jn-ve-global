<template>
    <div class="aside-tree">
        <!-- 顶部操作区域 -->
        <div class="btns-wrapper">
            <div class="btns">
                <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                    <el-button
                        :type="btn.type || 'primary'"
                        size="mini"
                        :disabled="btn.disabled"
                        @click="btn.onClick"
                    >
                        {{ btn.label }}
                    </el-button>
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
            <el-scrollbar>
                <el-tree
                    ref="treeRef"
                    :data="data"
                    node-key="id"
                    highlight-current
                    :icon-class="`node-handler-custom-icon ${
                        mode === 'default' ? 'default-tree-node' : 'mode-tree-node'
                    }`"
                    :expand-on-click-node="false"
                    :default-expand-all="expandAll"
                    empty-text="暂无数据"
                    :filter-node-method="filterNode"
                    :props="defaultProps"
                    v-bind="$attrs"
                >
                    <!-- 节点图标 -->
                    <template #default="{ node, data }">
                        <span v-if="mode === 'default'" class="tree-node-icon-wrapper">
                            <!-- 这里判断不对，待修改，可能需要依据节点的 type 判断 -->
                            <g-icon
                                v-if="Array.isArray(node.parent.data)"
                                icon="org"
                                class="root-icon"
                            />
                            <g-icon
                                v-if="
                                    data.children &&
                                        data.children.length > 0 &&
                                        !Array.isArray(node.parent.data)
                                "
                                :icon="node.expanded ? 'folder' : 'aside-tree-node-close-icon'"
                            />
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

<script lang="ts">
import { defineComponent, PropType, watch, reactive, toRefs } from 'vue'
import { BtnProps } from '../index'

export default defineComponent({
    name: 'GAsideTree',
    props: {
        /**
         * 树数据
         */
        data: {
            type: Array,
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
        }
    },
    setup() {
        const state = reactive<{
            treeRef: any
            filterText: string
            expandAll: boolean
        }>({
            treeRef: null,
            filterText: '',
            expandAll: true
        })

        watch(
            () => state.filterText,
            (newValue) => {
                state.treeRef.filter(newValue)
            }
        )

        const filterNode = (value, data) => {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        }

        const unfold = () => {
            changeTreeNodeUnfold(state.treeRef.store.root)
        }

        const packUp = () => {
            changeTreeNodeStatusPackUp(state.treeRef.store.root)
        }

        function changeTreeNodeUnfold(node) {
            for (let i = 0; i < node.childNodes.length; i++) {
                node.childNodes[i].expanded = state.expandAll
                if (node.childNodes[i].childNodes.length > 0) {
                    changeTreeNodeUnfold(node.childNodes[i])
                }
            }
        }

        function changeTreeNodeStatusPackUp(node) {
            for (let i = 0; i < node.childNodes.length; i++) {
                node.childNodes[i].expanded = !state.expandAll
                if (node.childNodes[i].childNodes.length > 0) {
                    changeTreeNodeStatusPackUp(node.childNodes[i])
                }
            }
        }

        return {
            ...toRefs(state),
            filterNode,
            unfold,
            packUp
        }
    }
})
</script>

<style lang="scss" scoped>
$--base-padding-lr: 14px;

.aside-tree {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;

    // 按钮区域
    .btns-wrapper {
        display: flex;
        padding: 12px $--base-padding-lr 0;
        justify-content: space-between;
        flex: none;

        .btns {
            flex: 1;
        }

        .tree-icons {
            display: flex;
            justify-content: center;
            align-items: center;

            svg {
                cursor: pointer;
                margin-right: 14px;
                color: #a7a7a7 !important;

                &:hover {
                    color: #399ffb !important;
                }

                &:last-child {
                    margin-right: 0;
                }
            }
        }
    }

    // 搜索框
    .input-wrapper {
        padding: 12px $--base-padding-lr 12px;
    }

    // 树容器
    .tree-wrapper {
        flex: 1;
        overflow: hidden;
        padding-left: $--base-padding-lr;

        :deep(.el-tree) {
            .el-tree-node__content {
                height: 30px;
                align-items: center;
                font-size: 14px;
                color: rgba(0, 0, 0, 0.85);

                // 展开按钮图标
                .node-handler-custom-icon {
                    margin-right: 8px;
                    background-size: 100% 100%;
                    background-repeat: no-repeat;
                    background-position: center;

                    &.is-leaf {
                        background: none !important;
                    }

                    &.default-tree-node {
                        background-image: url(@/assets/icons/svg/arrow-right.svg);
                    }

                    &.mode-tree-node {
                        background-image: url(@/assets/icons/svg/tree-sub.svg);

                        &.expanded {
                            transform: none;
                            background-image: url(@/assets/icons/svg/tree-add.svg);
                        }
                    }
                }

                // 节点内图标
                .tree-node-icon-wrapper {
                    display: flex;
                    align-items: center;
                    height: 100%;
                    margin-right: 6px;

                    svg,
                    i {
                        font-size: 18px;
                        color: rgba(0, 0, 0, 1) !important;

                        &.root-icon {
                            color: #1890ff !important;
                        }
                    }
                }
            }
        }
    }

    .white {
        height: 10px;
    }
}
</style>
