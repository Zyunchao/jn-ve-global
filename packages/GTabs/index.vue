<template>
    <el-tabs v-bind="$attrs" class="g-tabs" @tab-click="tabChange">
        <el-tab-pane v-for="item in list" :key="item.value" :name="item.value">
            <template #label>
                <span class="tabs-item-label">{{ item.label }}</span>
            </template>
        </el-tab-pane>
    </el-tabs>
    <div v-if="slots.default" class="g-tabs-content">
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GTabs'
}
</script>

<script lang="ts" setup>
import { useSlots } from 'vue'
import { TabPaneProps } from './index'

const props = withDefaults(
    defineProps<{
        list: TabPaneProps[]
    }>(),
    {
        list: () => []
    }
)

const emits = defineEmits(['tabChange'])
const slots = useSlots()

const tabChange = (index) => {
    emits('tabChange', index)
}
</script>

<style lang="scss" scoped>
.g-tabs {
    :deep(.el-tabs__header) {
        margin: 0;

        .el-tabs__item {
            font-size: var(--jn-ve-g-tabs-item-font-size);
            color: #333333;
            height: var(--jn-ve-g-tabs-item-base-height);
            line-height: var(--jn-ve-g-tabs-item-base-height);
            padding: 0 8px !important;
            font-weight: 400;

            &:nth-of-type(2) {
                padding-left: 0 !important;
            }

            .tabs-item-label {
                display: block;
                height: var(--jn-ve-g-tabs-item-base-height);
                line-height: var(--jn-ve-g-tabs-item-base-height);
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

.g-tabs-content {
    padding: 20px 0 8px;
}
</style>
