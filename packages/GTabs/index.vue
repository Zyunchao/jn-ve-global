<template>
    <el-tabs
        v-bind="$attrs"
        :class="['g-tabs', type ? `custom-${type}` : '']"
        :type="localType"
        @tab-click="tabChange"
    >
        <template v-for="item in list" :key="item.value">
            <el-tab-pane
                v-if="
                    item.hide === undefined || (_.isFunction(item.hide) ? !item.hide() : !item.hide)
                "
                :name="item.value"
                :disabled="item.disabled"
            >
                <template #label>
                    <span class="tabs-item-label">{{ item.label }}</span>
                </template>
            </el-tab-pane>
        </template>
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
import { computed, useSlots } from 'vue'
import { TabPaneProps } from './index'
import _ from 'lodash'

const props = withDefaults(
    defineProps<{
        list: TabPaneProps[]
        type?: 'card' | 'border-card' | 'big-card' | ''
    }>(),
    {
        list: () => [],
        type: ''
    }
)

const emits = defineEmits(['tabChange'])
const slots = useSlots()

const localType = computed<string>(() => {
    if (props.type === 'big-card') return 'card'
    return props.type
})

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

            &.is-disabled {
                opacity: 0.6 !important;
                cursor: not-allowed !important;
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

    &.el-tabs--card.custom-big-card {
        --jn-ve-g-tabs-item-base-height: 62px;
        --jn-ve-g-tabs-item-font-size: 18px;

        border-radius: 6px 6px 0 0;
        overflow: hidden;

        :deep(.el-tabs__header) {
            border: none;
            background-color: #f4fbff;
            height: initial;

            &,
            .el-tabs__nav,
            .el-tabs__item {
                border: none;
            }

            .el-tabs__item {
                padding: 0 !important;

                .tabs-item-label {
                    padding: 0 44px !important;
                }

                &:not(.is-active) {
                    color: #4e5966;
                }

                &.is-active {
                    background-color: #fff;
                }
            }
        }
    }
}

.g-tabs-content {
    padding: 20px 0 8px;
}
</style>
