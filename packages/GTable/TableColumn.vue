<template>
    <el-table-column v-bind="columnProps">
        <template
            v-if="
                (columnConfig.children && columnConfig.children.length > 0) || columnConfig.render
            "
            #default="{ row, index }"
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

            <!-- 列的自定义渲染 -->
            <template v-else-if="columnConfig.render">
                <FunctionalComponent :render="columnConfig.render(row, index)" />
            </template>
        </template>
    </el-table-column>
</template>

<script lang="ts">
export default {
    name: 'TableColumn'
}
</script>

<script lang="ts" setup>
import { PropType, ref, computed, isProxy, onBeforeMount } from 'vue'
import { TableColumnProps } from './index'
import { getColumnProps } from './utils'
import FunctionalComponent from '../FunctionalComponent'

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
