<template>
    <el-collapse-item class="custom-collapse-item">
        <template #title>
            <LGIcon v-if="prefix" :icon="prefix" class="prefix-icon" />
            <span>{{ attrs.title }}</span>
            <LGIcon icon="el-DArrowRight" class="active-icon" />
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
import { toRaw, watch, ref, computed, reactive, useAttrs } from 'vue'
import { FormProps, TableConfig } from '../../../index'
import LGIcon from '../../../GIcon/index.vue'
import LGForm from '../../../GForm/index.vue'
import LGTable from '../../../GTable/index.vue'

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
}

const props = withDefaults(defineProps<Props>(), {
    formConfig: null,
    tableConfig: null,
    height: 300,
    prefix: ''
})

const attrs = useAttrs()
const tableHeight = computed(() => `${props.height}px`)
</script>

<style lang="scss" scoped>
$--icon-size: 14px;
$--icon-l: 10px;

.custom-collapse-item {
    /* 头 */
    :deep(.el-collapse-item__header) {
        height: 36px;
        font-size: 18px;
        color: #4e5966;
        font-weight: 600;
        border-bottom: none;
        overflow: hidden;

        // > span {
        //     position: relative;

        //     &::after {
        //         content: '';
        //         width: 10000px;
        //         height: 1px;
        //         background-color: #e1e1e1;
        //         position: absolute;
        //         top: 50%;
        //         left: calc(100% + $--icon-size + $--icon-l * 2);
        //         transform: translateY(-50%);
        //     }
        // }

        // .custom-svg-icon {
        //     margin-right: 4px;
        //     font-size: inherit;
        // }

        .active-icon {
            font-size: $--icon-size;
            transform: rotate(-90deg);
            margin-left: $--icon-l;
            transition: transform 0.3s;
            color: #c2c2c2;
        }

        .prefix-icon {
            font-size: inherit;
            margin-right: 4px;
        }

        .el-collapse-item__arrow {
            display: none;
        }

        &.is-active {
            .active-icon {
                transform: rotate(-90deg) rotateY(180deg);
            }
        }
    }

    // 内容区域
    :deep(.el-collapse-item__wrap) {
        border-bottom: none;

        .el-collapse-item__content {
            padding: 10px 20px 14px;
        }
    }

    .table-wrapper {
        height: v-bind(tableHeight);
    }
}
</style>
