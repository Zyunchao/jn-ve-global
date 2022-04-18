<template>
    <div class="box">
        <g-table :config="tableConfig" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'SelectTreeV2Demo2'
}
</script>

<script lang="tsx" setup>
import { watch, reactive } from 'vue'
import tableData from './data/tableData.json'
import treeData from './data/treeData.json'
import { TableConfig, BaseTableDataItem, TableColumnProps } from '@component/index'

const tableColumns = reactive<TableColumnProps[]>([
    {
        prop: 'selectTreeV2',
        label: '单选',
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'selectTreeV2',
            treeData
        },
        render(row) {
            return (
                <span>{findTargetById(treeData, row.selectTreeV2)?.name || row.selectTreeV2}</span>
            )
        }
    },
    {
        prop: 'selectTreeV2Multiple',
        label: '多选',
        editable: true,
        openDB: true,
        controlConfig: {
            type: 'selectTreeV2',
            treeData: treeData,
            props: {
                multiple: true
            }
        },
        render(row) {
            return (
                <span>
                    {row.selectTreeV2Multiple
                        .map((item) => findTargetById(treeData, item)?.name || item)
                        .join('，')}
                </span>
            )
        }
    }
])

const tableConfig = reactive<TableConfig<BaseTableDataItem>>({
    instance: null,
    columns: tableColumns,
    rowKey: 'id',
    stripe: true,
    pagination: {
        pageSize: 10,
        currentPage: 1,
        total: 26
    },
    data: tableData as any
})

/**
 * 根据id查找目标
 * @param source 源数据
 * @param id 目标id
 * @param field 是否返回目标的指定字段
 * @returns 目标对象 || 目标的指定字段
 */
function findTargetById(source: any[], id: string | number, field?: string) {
    if (!id || source.length === 0) return null

    let target = null

    function recursion(source: any, id: string | number) {
        for (let i = 0; i < source.length; i++) {
            const item = source[i]
            if (item.id === id) {
                target = item

                break
            }

            if (item.children && item.children.length) {
                recursion(item.children, id)
            }
        }
    }

    recursion(source, id)
    if (field && target) return target[field]
    return target
}
</script>

<style lang="scss" scoped>
.box {
    height: 400px;
}
</style>
