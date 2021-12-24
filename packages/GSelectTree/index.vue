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
        :disabled="disabled"
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
                v-bind="treeConfig"
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
import { nextTick, watch, ref, computed } from 'vue'
import { findTargetById } from '../utils/utils'
import { TreeData } from './interface/TreeData'
import TreeProps from './interface/TreeProps'
import TreeConfig from './interface/TreeConfig'

interface SelectTreeProps {
    /**
     * v-mdoel 绑定的 prop
     */
    modelValue: string | number | Array<string> | Array<number>
    /**
     * 树的待选数据
     */
    treeData: TreeData[]
    /**
     * 多选
     */
    multiple?: boolean
    /**
     * 占位符
     */
    placeholder?: string
    /**
     * 树的节点属性配置
     */
    treeProps?: TreeProps
    /**
     * 排除某些特定条件下，所有节点都可以选择
     */
    everyChoose?: boolean
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 依据 node.type 判断不可选择的节点
     */
    nonselectable?: string[]
    /**
     * select 的原生配置，可直接加到标签上面
     * tree 的原生配置，需要以对象的形式传递给当前组件
     */
    treeConfig?: TreeConfig
}

const props = withDefaults(defineProps<SelectTreeProps>(), {
    modelValue: '',
    treeData: () => [],
    multiple: false,
    placeholder: '请选择',
    treeProps: () => ({
        children: 'children',
        label: 'name'
    }),
    everyChoose: false,
    disabled: false,
    nonselectable: () => ['QH', 'QW', 'QZ'],
    treeConfig: null
})

const emits = defineEmits(['update:modelValue'])

// 保险
if (props.multiple && !Array.isArray(props.modelValue))
    throw new Error('多选模式下，modelValue 必须是数组')
if (
    !props.multiple &&
    !(typeof props.modelValue === 'string' || typeof props.modelValue === 'number')
)
    throw new Error('单选模式下，modelValue 必须是字符串或数字')

const elSelectRef = ref<any>(null)
const elTreeRef = ref<any>(null)

// 将与父级绑定的值，进行转义
const localSelectValue = computed({
    get: () => {
        // 任何无效值
        if (!props.modelValue) return props.multiple ? [] : ''
        // 无待选数据
        if (!props.treeData.length) return props.modelValue

        let selectShowTxt: string | string[] = ''
        if (props.multiple) {
            // 多选展示值
            selectShowTxt = (props.modelValue as string[] | number[]).map((id: string | number) => {
                return findTargetById(props.treeData, id, props.treeProps.label as string) || id
            })
        } else {
            // 单选展示值
            selectShowTxt =
                findTargetById(
                    props.treeData,
                    props.modelValue as string | number,
                    props.treeProps.label as string
                ) || props.modelValue
        }

        return selectShowTxt
    },
    set: (val) => {
        if (!(val as string[] | string).length) {
            emits('update:modelValue', val)
        }
    }
})

/**
 * 清空树节点
 * 1. 任何无效值
 * 2. 绑定值为数组，且长度为 0
 */
watch(
    () => props.modelValue,
    (val) => {
        if (!val || (val && Array.isArray(val) && !val.length)) {
            if (props.multiple) elTreeRef.value?.setCheckedKeys([])
            else elTreeRef.value?.setCurrentKey(null)
        }
    }
)

/**
 * 单选点击
 */
const handleCurrentChange = (data) => {
    if (props.multiple) return
    // 是否都可选择
    if (props.everyChoose) {
        emits('update:modelValue', data.id)
        elSelectRef.value.blur()
    } else {
        if (!props.nonselectable.includes(data.type)) {
            emits('update:modelValue', data.id)
            elSelectRef.value.blur()
        }
    }

    nextTick(() => {
        elSelectRef.value.focus()
    })
}

/**
 * 复选框点击
 */
const handleCheck = (data, { checkedNodes, checkedKeys }) => {
    if (!props.multiple) return
    emits('update:modelValue', checkedKeys)
}

// 抛出
defineExpose({
    elSelectRef,
    elTreeRef
})
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
