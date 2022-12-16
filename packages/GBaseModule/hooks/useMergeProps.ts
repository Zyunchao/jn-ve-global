import { reactive, watch, nextTick, computed, useAttrs } from 'vue'
import type { TableConfig } from '@component/index'
import { assignOwnProp, partitionObj2HumpObj } from '@jsjn/utils'

export default ({ props, emits }) => {
    const attrs = useAttrs()
    const _humpAttrs = computed(() => partitionObj2HumpObj(attrs, ['onReset', 'onSearch']))

    const localTableConfig = reactive<TableConfig<any>>({
        instance: null,
        rowKey: 'id',
        stripe: true,
        columns: props.tableColumns,
        data: props.tableData,
        pagination: props.tablePagination,
        rowBtnConfig: props.rowBtnConfig,
        selectedRows: props.selectedRows,
        ..._humpAttrs.value
    })

    /* --------------- 向外抛出 ------------------------------------------------------------------- */
    watch(
        () => localTableConfig.instance,
        (instance) => {
            emits('getTableInstance', instance)
        }
    )
    // 选中行
    watch(
        () => localTableConfig.selectedRows,
        (list) => {
            emits('update:selectedRows', list)
        }
    )

    /* --------------- 向内关联 ------------------------------------------------------------------- */
    watch(
        () => _humpAttrs.value,
        (obj) => {
            assignOwnProp(localTableConfig, obj, ['instance', 'columns', 'data'])
            nextTick(() => {
                localTableConfig.instance?.doLayout()
            })
        }
    )

    // 数据
    watch(
        () => props.tableData,
        (data) => {
            localTableConfig.data = data
        }
    )

    // 列
    watch(
        () => props.tableColumns,
        (columns) => {
            localTableConfig.columns = columns
        }
    )

    // 分页
    watch(
        () => props.tablePagination,
        (val) => {
            localTableConfig.pagination = val
            if (val && !localTableConfig.pagination['onChange']) {
                localTableConfig.pagination['onChange'] = () => {
                    props.loadTableMethods?.()
                }
            }
        },
        {
            immediate: true,
            deep: false
        }
    )

    // 选中行的状态数组
    watch(
        () => props.selectedRows,
        (list) => {
            localTableConfig.selectedRows = list
        }
    )

    return {
        localTableConfig
    }
}
