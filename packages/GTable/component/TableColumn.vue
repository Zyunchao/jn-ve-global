<template>
    <el-table-column
        v-bind="columnProps"
        :class-name="`${columnProps.className || ''}${
            columnConfig.editable ? ' g-table-edit-cell' : ''
        }`"
    >
        <!-- 
            1. column 嵌套，多级表头
            2. 自定义渲染
            3. 可编辑行
         -->
        <template
            v-if="
                (columnConfig.children && columnConfig.children.length > 0) ||
                    columnConfig.render ||
                    columnConfig.editable
            "
            #default="{ row, $index }"
        >
            <!-- 表头无限嵌套 -->
            <template v-if="columnConfig.children && columnConfig.children.length > 0">
                <template
                    v-for="(subColumnConfig, subIndex) in columnConfig.children"
                    :key="`${subColumnConfig.label}-${subIndex}`"
                >
                    <TableColumn :column-config="subColumnConfig" />
                </template>
            </template>

            <!-- 可编辑行 -->
            <template v-else-if="columnConfig.editable && $index >= 0">
                <TableEditCell :column-config="columnConfig" :data="row" :index="$index" />
            </template>

            <!-- 列的自定义渲染 -->
            <template v-else-if="columnConfig.render && $index >= 0">
                <FunctionalComponent :render="columnConfig.render(row, $index)" />
            </template>
        </template>
    </el-table-column>
</template>

<script lang="tsx">
export default {
    name: 'TableColumn'
}
</script>

<script lang="tsx" setup>
import { PropType, ref, computed, isProxy, onBeforeMount } from 'vue'
import { TableColumnProps } from '../index'
import { getColumnProps } from '../utils'
import FunctionalComponent from '../../FunctionalComponent'
import TableEditCell from '../component/TableEditCell/index.vue'

const props = defineProps({
    columnConfig: {
        type: Object as PropType<TableColumnProps>,
        required: true,
        default: null
    }
})

const columnProps = getColumnProps(props.columnConfig)
</script>

<style lang="scss" scoped></style>
