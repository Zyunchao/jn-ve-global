<template>
    <!-- 
        利用 Select 的绑定值如果没有 label 则默认显示 value
        Select 仅做一个显示的作用，选中的值由内部 State 维护，并抛出
    -->
    <el-select
        ref="elSelectRef"
        v-model="localSelectValue"
        :placeholder="placeholder"
        :multiple="multiple"
        popper-class="select-tree-item-wrapper"
        class="select-tree-select"
        style="width: 100%"
    >
        <el-option value="">
            <el-tree
                v-if="treeData"
                ref="elTreeRef"
                node-key="id"
                class="select-tree-tree"
                default-expand-all
                :data="treeData"
                :current-node-key="!multiple ? modelValue : undefined"
                :default-checked-keys="multiple ? modelValue : undefined"
                :props="treeProps"
                :show-checkbox="multiple"
                :check-on-click-node="multiple"
                :highlight-current="!multiple"
                :expand-on-click-node="false"
                @current-change="handleCurrentChange"
                @check="handleCheck"
            />
        </el-option>
    </el-select>
</template>

<script lang="ts">
export default {
    name: 'GSelectTree'
}
</script>

<script lang="ts" setup>
import { nextTick, watch, PropType, watchEffect, ref } from 'vue'
import { findTargetById, validValue } from '../utils/utils'
import { TreeData } from './index'

const props = defineProps({
    /**
     * v-mdoel 绑定的 prop
     */
    modelValue: {
        type: [String, Number, Array],
        default: ''
    },
    /**
     * 树的待选数据
     */
    treeData: {
        type: Array as PropType<TreeData[]>,
        required: true,
        default: () => []
    },
    /**
     * 多选
     */
    multiple: {
        type: Boolean,
        default: false
    },
    /**
     * 占位符
     */
    placeholder: {
        type: String,
        default: '请选择'
    },
    /**
     * 树的节点属性配置
     */
    treeProps: {
        type: Object,
        default: () => ({
            children: 'children',
            label: 'name'
        })
    },
    /**
     * 排除某些特定条件下，所有节点都可以选择
     */
    everyChoose: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue'])

if (props.multiple && !Array.isArray(props.modelValue))
    throw new Error('多选模式下，modelValue 必须是数组')
if (
    !props.multiple &&
    !(typeof props.modelValue === 'string' || typeof props.modelValue === 'number')
)
    throw new Error('单选模式下，modelValue 必须是字符串或数字')

const elSelectRef = ref<any>(null)
const elTreeRef = ref<any>(null)
// select 绑定的值
const localSelectValue = ref<string[] | string>(props.multiple ? [] : '')

// 监听变化，触发寻找值
watchEffect(() => {
    if (props.treeData.length > 0 && validValue(props.modelValue)) {
        setLocalSelectValue()
    }
})

// 单选清空选中数据时，清空树的选中
watch(
    () => props.modelValue,
    () => {
        if (!props.multiple && !props.modelValue) {
            elTreeRef.value?.setCurrentKey(null)
        } else if (props.multiple && (props.modelValue as string[]).length === 0) {
            elTreeRef.value?.setCheckedKeys([])
        }
    }
)

// 获取选中的 key 对应的树数据的值
function setLocalSelectValue() {
    let selectValue: string[] | string

    if (props.multiple) {
        // 多选
        selectValue = (props.modelValue as string[] | number[]).map((id: string | number) => {
            return findTargetById(props.treeData, id, 'name')
        })
    } else {
        // 单选
        selectValue = findTargetById(props.treeData, props.modelValue as string | number, 'name')
    }

    /**
     * 本地状态的赋值分为两种情况
     * 1. 组件已生成，监听状态的变化即可
     * 2. 组件未生成，且值已存在，此时，组件创建 watch 的执行要在 state 之前，防止 state 报错，需要异步设置本地状态值
     */
    nextTick(() => {
        localSelectValue.value = selectValue
    })
}

/**
 * 单选点击
 */
const handleCurrentChange = (data) => {
    if (props.multiple) return

    if (!props.everyChoose) {
        /**
         * QH, QW 是在选择角色时，对机构及部门的特殊处理
         * 由于有些树的节点并非在一张表中，故 id 存在重复的问题，通过 类型 + id 才能确定唯一
         */
        if (!['QH', 'QW', 'QZ'].includes(data.type)) {
            emits('update:modelValue', data.id)

            // 收起下拉框
            elSelectRef.value.blur()

            nextTick(() => {
                elSelectRef.value.focus()
            })
        }
    } else {
        /**
         * 每个都可以选择
         */
        emits('update:modelValue', data.id)

        // 收起下拉框
        elSelectRef.value.blur()

        nextTick(() => {
            elSelectRef.value.focus()
        })
    }
}

/**
 * 复选框点击
 */
const handleCheck = (data, { checkedNodes, checkedKeys }) => {
    if (!props.multiple) return
    emits('update:modelValue', checkedKeys)
}
</script>

<style lang="scss" scoped>
.select-tree-select {
    :deep(.el-tag) {
        .el-tag__close {
            display: none;
        }
    }
}
</style>
<style lang="scss">
.select-tree-item-wrapper {
    .el-select-dropdown__list {
        margin: 0;
    }

    .el-select-dropdown__item {
        padding: 0 0 0 0;
        height: auto;
        margin: 10px 0;

        &:hover {
            background-color: transparent;
        }

        .select-tree-tree {
            font-weight: 400;

            .el-tree-node__content {
                overflow: hidden;

                .el-tree-node__expand-icon {
                    font-size: 20px;
                    margin-right: 4px;
                    margin-left: 4px;
                    padding: 0;
                }
            }
        }
    }
}
</style>
