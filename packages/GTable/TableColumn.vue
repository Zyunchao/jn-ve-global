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
import { defineComponent, PropType } from 'vue'
import { TableColumnProps } from './index'
import { getColumnProps } from './utils'
import FunctionalComponent from '../FunctionalComponent'

export default defineComponent({
    name: 'TableColumn',
    components: {
        FunctionalComponent
    },
    props: {
        columnConfig: {
            type: Object as PropType<TableColumnProps>,
            required: true,
            default: null
        }
    },
    setup: (props) => ({ columnProps: getColumnProps(props.columnConfig) })
})
</script>

<style lang="scss" scoped></style>
