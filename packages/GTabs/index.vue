<template>
    <el-tabs v-bind="$attrs" class="g-tab" @tab-click="tabChange">
        <el-tab-pane v-for="item in list" :key="item.value" :name="item.value">
            <template #label>
                <span class="tabs-item-label">{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export interface TabPaneProps {
    label: string
    value: string | number
    disabled?: boolean
}

export default defineComponent({
    name: 'GTabs',
    props: {
        list: {
            type: Array as PropType<TabPaneProps[]>,
            default: () => []
        }
    },
    emits: ['tabChange'],
    setup(props, context) {
        const tabChange = (index) => {
            context.emit('tabChange', index)
        }
        return {
            tabChange
        }
    }
})
</script>

<style lang="scss" scoped>
$--base-tab-item-height: 55px;

.g-tab {
    :deep(.el-tabs__header) {
        margin: 0;

        .el-tabs__item {
            font-size: 20px;
            color: #333333;
            height: $--base-tab-item-height;
            line-height: $--base-tab-item-height;
            padding: 0 8px !important;
            font-weight: 400;

            .tabs-item-label {
                display: block;
                height: $--base-tab-item-height;
                line-height: $--base-tab-item-height;
                padding: 0 16px !important;
            }

            &.is-active {
                color: #409eff;
                font-weight: 600;
            }
        }

        .el-tabs__active-bar {
            height: 3px;
            background-color: #1c9eff;
        }
    }

    :deep(.el-tabs__content) {
        display: none;
    }
}
</style>
