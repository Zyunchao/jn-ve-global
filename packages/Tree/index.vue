<template>
    <div class="tree-box">
        <div class="input-wrapper">
            <el-input v-model="filterText" placeholder="输入关键字进行过滤" />
        </div>
        <div class="tree-wrapper">
            <el-tree
                ref="treeRef"
                :show-checkbox="showCheckbox"
                :expand-on-click-node="false"
                :props="defaultProps"
                default-expand-all
                empty-text="暂无数据"
                highlight-current
                node-key="id"
                :default-checked-keys="defaultCheckedKeys"
                :data="data"
                :check-strictly="checkStrictly"
                :filter-node-method="filterNode"
                @check="check"
                @node-click="nodeClick"
            >
                <template #default="{ node, data }">
                    <span>
                        <svg-icon
                            v-if="Array.isArray(node.parent.data)"
                            class="org-icon"
                            name="org"
                        />
                        <svg-icon
                            v-if="
                                data.children &&
                                    data.children.length > 0 &&
                                    !Array.isArray(node.parent.data)
                            "
                            name="folder"
                        />
                        {{ node.label }}
                    </span>
                </template>
            </el-tree>
        </div>
    </div>
</template>

<script>
import { defineComponent, reactive, ref, watch } from 'vue'

export default defineComponent({
    name: 'Tree',
    props: {
        data: {
            type: Array,
            default: () => []
        },
        showCheckbox: {
            type: Boolean,
            default: () => false
        },
        defaultProps: {
            type: Object,
            default: () => {
                return {
                    children: 'children',
                    label: 'name'
                }
            }
        },
        defaultCheckedKeys: {
            type: Array,
            default: () => []
        },
        checkStrictly: {
            type: Boolean,
            default: () => false
        }
    },
    emits: ['check', 'node-click'],
    setup(props, context) {
        const treeRef = ref(null)
        const filterText = ref('')
        watch(filterText, (newValue, oldValue) => {
            treeRef.value.filter(newValue)
        })
        const filterNode = (value, data) => {
            if (!value) return true
            return data.name.indexOf(value) !== -1
        }
        const nodeClick = (data, node, self) => {
            context.emit('node-click', data, node)
        }

        const check = (node, data) => {
            context.emit('check', data, node)
        }

        const setCheck = (arr) => {
            treeRef.value.setCheckedKeys(arr)
        }

        return { treeRef, filterText, filterNode, nodeClick, check, setCheck }
    }
})
</script>
<style lang="scss" scoped>
.tree-box {
    width: 100%;
    height: 100%;
    .input-wrapper {
        padding: 13px;
        :deep(.el-input__inner) {
            height: 32px;
        }
    }
    .tree-wrapper {
        height: calc(100% - 66px);
        overflow: auto;
    }
}

.tree-box :deep(.el-tree) {
    width: 100%;
    overflow: auto;
}

.tree-box :deep(.el-tree) > .el-tree-node {
    display: inline-block;
    min-width: 100%;
}

.org-icon {
    color: #1890ff !important;
}
</style>
