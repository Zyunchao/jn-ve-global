<template>
    <table class="irregular-table">
        <!-- 占位 -->
        <colgroup>
            <col v-for="(_, index) in colNum" :key="index">
        </colgroup>

        <!-- 表体 -->
        <tbody>
            <tr v-for="(_, rIndex) in rowNum" :key="rIndex">
                <template v-for="(__, cIndex) in colNum" :key="cIndex">
                    <AdvanceTd
                        :data="getContent(rIndex, cIndex)"
                        :row-index="rIndex"
                        :col-index="cIndex"
                    />
                </template>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
export default {
    name: 'GIrregularTable'
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import type Cell from './interface/Cell'
import AdvanceTd from './components/advanceTd.vue'

interface Props {
    /**
     * 表格有限行数
     */
    rowNum: number
    /**
     * 表格有限列数
     */
    colNum: number
    /**
     * 单元格（有效的）
     */
    cellList: Cell[]
}

const props = withDefaults(defineProps<Props>(), {
    rowNum: 0,
    colNum: 0,
    cellList: () => []
})

/**
 * 需要销毁的节点
 */
const destroyNodes = ref<{ ri: number; ci: number }[]>([])
watch(
    () => props.cellList,
    (list) => {
        destroyNodes.value = []
        list.forEach((node) => {
            const rStartIndex = node.ri
            const cStatrtIndex = node.ci
            const rEndIndex = node.ri + (node.rowspan || 1)
            const cEndIndex = node.ci + (node.colspan || 1)

            /**
             * 每个有效节点的 x,y 范围内，排除掉当前 x,y 则是不需要创建的节点
             */
            for (let i = rStartIndex; i < rEndIndex; i++) {
                let j = i === rStartIndex ? cStatrtIndex + 1 : cStatrtIndex
                for (j; j < cEndIndex; j++) {
                    destroyNodes.value.push({ ri: i, ci: j })
                }
            }
        })
    },
    {
        immediate: true
    }
)

/**
 * 从有效内容列表中，寻找对应的有效单元格
 */
function getContent(ri: number, ci: number): Cell {
    let target = props.cellList.find((item) => item.ri === ri && item.ci === ci) ?? {
        content: '',
        ri,
        ci
    }

    if (destroyNodes.value.some((item) => item.ri === ri && item.ci === ci)) {
        target['destroyed'] = true
    }

    return target
}
</script>

<style lang="scss" scoped>
.irregular-table {
    --border-color: var(--el-border-color);

    border-spacing: 0;
    width: 100%;
    border: 1px solid var(--border-color);
    border-right: none;

    colgroup {
        col {
            width: calc(100% / v-bind(colNum));
        }
    }

    tr {
        td {
            height: 40px;
            min-height: 40px;
            width: calc(100% / v-bind(colNum));
            min-width: calc(100% / v-bind(colNum));
            border-right: 1px solid var(--border-color);
            border-bottom: 1px solid var(--border-color);
            font-weight: normal;
            color: var(--el-text-color-regular);
            padding: 0 8px;
            font-size: 14px;

            &.center,
            &.label {
                text-align: center;
                font-weight: 700;
                color: #000;
            }

            &.left {
                text-align: left;
            }

            &.right {
                text-align: right;
            }

            &.bg {
                background-color: #e1f6fa;
            }
        }

        &:last-of-type {
            td {
                border-bottom: none;
            }
        }
    }
}
</style>
