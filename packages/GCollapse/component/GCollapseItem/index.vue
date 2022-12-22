<template>
    <el-collapse-item
        v-bind="$attrs"
        :disabled="localDisabled"
        :class="['custom-collapse-item', `${collapseMode}-mode-item`]"
    >
        <template #title>
            <div class="collapse-item-title">
                <div class="label">
                    <LGIcon v-if="prefix" :icon="prefix" class="prefix-icon" />
                    <span>{{ attrs.title }}</span>
                    <LGIcon icon="el-DArrowRight" class="active-icon" />
                </div>
                <LGButtonGroup v-if="btns && btns.length" :btns="btns" />
            </div>
        </template>

        <!-- 内容 -->
        <template #default>
            <!-- 表单 -->
            <div v-if="formConfig" class="form-wrapper">
                <LGForm :config="formConfig" />
            </div>

            <!-- 表格 -->
            <div v-if="tableConfig" class="table-wrapper">
                <LGTable :config="tableConfig" />
            </div>

            <!-- 自定义 -->
            <slot />
        </template>
    </el-collapse-item>
</template>

<script lang="ts">
export default {
    name: 'GCollapseItem'
}
</script>

<script lang="ts" setup>
import { inject, watch, ref, computed, reactive, useAttrs } from 'vue'
import type { FormProps, TableConfig, BtnProps } from '../../../index'
import LGIcon from '../../../GIcon/index.vue'
import LGForm from '../../../GForm/index.vue'
import LGTable from '../../../GTable/index.vue'
import disabledKey from '@component/GCollapse/constant/disabledKey'
import modeKey from '@component/GCollapse/constant/modeKey'
import LGButtonGroup from '../../../GButtonGroup/index.vue'

interface Props {
    /**
     * 表单配置
     */
    formConfig?: FormProps
    /**
     * 表格配置
     */
    tableConfig?: TableConfig<any>
    /**
     * 高度，表格可能需要最小高度
     */
    height?: number
    /**
     * 前缀图标
     */
    prefix?: string
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 按钮
     */
    btns?: BtnProps[]
}

const props = withDefaults(defineProps<Props>(), {
    formConfig: null,
    tableConfig: null,
    height: 300,
    prefix: '',
    disabled: undefined,
    btns: () => []
})

const attrs = useAttrs()
const tableHeight = computed(() => `${props.height}px`)
const isDisabledForParent = inject(disabledKey)
const collapseMode = inject(modeKey)
const localDisabled = computed(() => isDisabledForParent.value ?? props.disabled)
</script>

<style lang="scss" scoped>
@import './styles/panel.scss';
@import './styles/card.scss';

.custom-collapse-item {
    .table-wrapper {
        height: v-bind(tableHeight);
    }

    .collapse-item-title {
        --jn-ve-g-btn-height: 30px;

        width: 100%;
        justify-content: space-between;

        &,
        > .label {
            display: flex;
            align-items: center;
        }
    }
}
</style>
