<template>
    <el-dropdown
        :hide-on-click="false"
        @visible-change="(visible) => (dropdownIsVisible = visible)"
    >
        <!-- 触发器 -->
        <el-button
            :class="[
                'table-row-more-operation-btn',
                {
                    'is-visible': dropdownIsVisible
                }
            ]"
            type="text"
        >
            <span>更多操作</span>
            <LGIcon icon="el-ArrowDown" />
        </el-button>

        <!-- 下拉 -->
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item
                    v-for="(btn, index) in btns"
                    :key="`${btn.label}-${index}`"
                    class="table-row-more-operation-item"
                >
                    <!-- 不鉴权 -->
                    <el-button
                        v-if="!btn.authCode"
                        v-bind="getBtnProps(btn)"
                        type="text"
                        @click="handleBtnClick(btn)"
                    >
                        {{ btn.label }}
                    </el-button>

                    <!-- 鉴权 -->
                    <el-button
                        v-else
                        v-auth="btn.authCode"
                        v-bind="getBtnProps(btn)"
                        type="text"
                        @click="handleBtnClick(btn)"
                    >
                        {{ btn.label }}
                    </el-button>
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script lang="ts">
export default {
    name: 'GtableOperationColumnMore'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { TableRowBtnProps } from '../../../../index'
import LGIcon from '../../../../GIcon/index.vue'
import { getBtnProps } from '../constant/util'

interface Props {
    /**
     * 按钮组
     */
    btns: TableRowBtnProps<any>[]
    /**
     * 当前行数据
     */
    row: any
    /**
     * 当前行 index
     */
    index: number
}

const props = withDefaults(defineProps<Props>(), {
    btns: () => [],
    row: null,
    index: 0
})

// 下拉框展示
const dropdownIsVisible = ref<boolean>(false)

// 按钮点击，传递行数据
const handleBtnClick = (btn: TableRowBtnProps<any>) => {
    btn.onClick?.(props.row, props.index)
}
</script>

<style lang="scss" scoped>
.table-row-more-operation-btn {
    margin-left: 10px;

    :deep(i.g-icon) {
        margin-left: 4px;
        transition: transform 0.3s;
    }

    &.is-visible {
        :deep(i.g-icon) {
            transform: rotateX(180deg);
        }
    }
}
</style>
<style lang="scss">
.table-row-more-operation-item {
    padding: 0;

    .el-button {
        width: 100%;
        padding: 0 18px;
    }
}
</style>
