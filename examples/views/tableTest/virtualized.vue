<template>
    <div class="box">
        <el-table-v2
            v-if="isCreate"
            :columns="tableColumns"
            :data="mockData"
            :width="width"
            :height="height"
            row-key="id"
            fixed
            expand-column-key="name"
            :default-expanded-row-keys="expandRowKeys"
            :row-class="getRowClass"
        />
    </div>
</template>

<script lang="tsx" setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { TableV2FixedDir } from 'element-plus'
import type { ExpandedRowsChangeHandler, RowExpandHandler } from 'element-plus'
import mockData from './data/menuTree.json'
import { size2Rem } from '@jsjn/utils'
import AppFunc, { FuncType, FuncTypeMapping } from '@/@types/entity/AppFunc'

const expandColumnKey = 'type'
const width = size2Rem(1598)
const height = size2Rem(569)
const isCreate = ref<boolean>(false)

onMounted(() => {
    isCreate.value = true
})

// console.log(`%c width == `, 'color: #67c23a;', width)

const tableColumns = [
    {
        key: 'name',
        dataKey: 'name',
        title: '功能名称',
        width: size2Rem(300),
        cellRenderer({ rowData: row }) {
            return (
                <span class='func-name-content'>
                    {row.icon && <g-icon icon={row.icon} class='func-icon' />}
                    <span>{row.name}</span>
                </span>
            )
        }
    },
    {
        key: 'type',
        dataKey: 'type',
        title: '功能类型',
        width: size2Rem(130)
    },
    {
        key: 'component',
        dataKey: 'component',
        title: '组件',
        width: size2Rem(600)
    },
    {
        key: 'url',
        dataKey: 'url',
        title: '功能路径',
        width: size2Rem(600)
    },
    {
        key: 'sortNo',
        dataKey: 'sortNo',
        title: '排序',
        width: size2Rem(100)
    },
    {
        key: 'opertion',
        dataKey: 'opertion',
        title: '操作',
        fixed: 'right',
        width: size2Rem(320),
        cellRenderer() {
            return (
                <>
                    <el-button v-auth='uums:iaf:edit' text={true}>
                        编辑
                    </el-button>
                    <el-button text={true}>详情</el-button>

                    <el-button v-auth='uums:iaf:add' text={true}>
                        添加下级
                    </el-button>

                    <el-button v-auth='uums:iafdr:listPage' text={true}>
                        数据规则
                    </el-button>

                    <el-button v-auth='uums:iaf:del' text={true} class='btn-danger'>
                        删除
                    </el-button>
                </>
            )
        }
    }
]

const expandRowKeys = reactive<string[]>([])

const getExpandRowKeys = (data: AppFunc[]) => {
    data.forEach((item) => {
        if (item.children && item.children.length > 0) {
            if (item.children.some((subItem) => subItem.type !== FuncType.BTN)) {
                expandRowKeys.push(item.id as string)
            }
            getExpandRowKeys(item.children)
        }
    })
}
getExpandRowKeys(mockData)

const getRowClass = (row, index) => {
    return `custom-row ${row.rowIndex % 2 === 0 ? 'even' : 'odd'}`
}
</script>
<style lang="scss" scoped>
.box {
    :deep(.el-table-v2) {
        .custom-row {
            &.even {
                background-color: #fafafa;

                &:hover {
                    background-color: var(--el-table-row-hover-bg-color);
                }
            }
        }

        .el-button {
            &.is-text,
            &.el-button--text {
                height: auto !important;
                font-size: var(--jn-ve-g-table-font-size) !important;
                padding: 0 !important;
                border: none;
                background-color: transparent;

                // 颜色初始化
                &:not(.is-disabled, :hover, .btn-danger, .el-button--danger, .el-button--primary, .el-button--success, .el-button--warning, .el-button--info, .el-button--default) {
                    --el-button-text-color: var(--el-color-primary);
                }

                &:active,
                &:focus {
                    border: none;
                    background-color: transparent;
                }

                // hover 的颜色
                &:hover {
                    &:not(.is-disabled, .btn-danger, .el-button--danger, .el-button--primary, .el-button--success, .el-button--warning, .el-button--info, .el-button--default) {
                        color: var(--el-color-primary-light-3);
                    }
                }
            }

            &.is-disabled,
            &.is-loading::before {
                background-color: transparent;
            }

            &.is-loading {
                opacity: 0.7;
            }
        }
    }
}
</style>
