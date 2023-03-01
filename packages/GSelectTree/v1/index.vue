<template>
    <!-- 
        基于 el-slect + Tree V2 虚拟化树形控件 https://element-plus.gitee.io/zh-CN/component/tree-v2.html
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
        clearable
        :filterable="filterable"
        :filter-method="filterable ? selectFilterMethod : undefined"
    >
        <el-option value="">
            <el-tree-v2
                v-if="treeData"
                ref="elTreeRefV2"
                node-key="id"
                class="select-tree-tree"
                v-bind="treeConfig"
                :data="treeData"
                :current-node-key="!multiple ? modelValue : undefined"
                :default-checked-keys="multiple ? modelValue : undefined"
                :props="treeProps"
                :show-checkbox="multiple"
                :check-on-click-node="multiple"
                :highlight-current="!multiple"
                :expand-on-click-node="false"
                :filter-method="filterable ? treeFilterMethod : undefined"
                :default-expanded-keys="defaultExpandedKeys"
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
import { findTargetById, getAllParentNode } from '@jsjn/utils'
import { TreeData } from './interface/TreeData'
import TreeV2Props from './interface/TreeV2Props'
import TreeV2Config from './interface/TreeV2Config'
import { ElTreeV2 } from 'element-plus'
import type { TreeNode } from 'element-plus/es/components/tree-v2/src/types'

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
     * 树的节点属性配置
     */
    treeProps?: TreeV2Props
    /**
     * select 的原生配置，可直接加到标签上面
     * https://element-plus.gitee.io/zh-CN/component/tree-v2.html
     * Tree V2 虚拟化树形控件, 的原生配置，需要以对象的形式传递给当前组件
     */
    treeConfig?: TreeV2Config
    /**
     * 是否可搜索
     */
    filterable?: boolean
    /**
     * onchange 事件
     */
    onChange?: (data: TreeData) => void
    /**
     * 默认展开全部
     */
    defaultExpandAll?: boolean
}

const props = withDefaults(defineProps<SelectTreeProps>(), {
    modelValue: '',
    treeData: () => [],
    multiple: false,
    placeholder: '请选择',
    treeProps: () => ({
        label: 'name',
        value: 'id',
        children: 'children',
        disabled: 'disabled'
    }),
    everyChoose: false,
    disabled: false,
    nonselectable: () => ['QH', 'QW', 'QZ'],
    treeConfig: null,
    onChange: null,
    filterable: false,
    defaultExpandAll: true
})

const emits = defineEmits(['update:modelValue'])

// 保险
if (props.multiple && !Array.isArray(props.modelValue)) {
    throw new Error('多选模式下，modelValue 必须是数组')
}
if (
    !props.multiple &&
    !(typeof props.modelValue === 'string' || typeof props.modelValue === 'number')
) {
    throw new Error('单选模式下，modelValue 必须是字符串或数字')
}

const elSelectRef = ref<any>(null)
const elTreeRefV2 = ref<InstanceType<typeof ElTreeV2> | null>(null)
const defaultExpandedKeys = computed<string[]>(() =>
    props.defaultExpandAll
        ? getAllParentNode(props.treeData).map((node) => node[props.treeProps.value])
        : []
)

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
                return (
                    findTargetById(props.treeData, id as string, props.treeProps.label as string) ||
                    id
                )
            })
        } else {
            // 单选展示值
            selectShowTxt =
                findTargetById(
                    props.treeData,
                    props.modelValue as string,
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
            if (props.multiple) elTreeRefV2.value?.setCheckedKeys([])
            else elTreeRefV2.value?.setCurrentKey(null)
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
        props.onChange?.(data)
    } else {
        if (!props.nonselectable.includes(data.type)) {
            emits('update:modelValue', data.id)
            elSelectRef.value.blur()
            props.onChange?.(data)
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
    props.onChange?.(checkedKeys)
    emits('update:modelValue', checkedKeys)
}

const selectFilterMethod = (val: string) => {
    elTreeRefV2.value.filter(val)
}

const treeFilterMethod = (query: string, node: TreeNode) => {
    // 用户传递优先
    if (props.treeConfig.filterMethod) {
        return props.treeConfig.filterMethod(query, node)
    }
    return node[props.treeProps.label]!.includes(query)
}

// 抛出
defineExpose({
    elSelectRef,
    elTreeRefV2
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
