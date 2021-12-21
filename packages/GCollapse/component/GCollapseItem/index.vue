<template>
    <el-collapse-item class="custom-collapse-item">
        <template #title>
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
}

const props = withDefaults(defineProps<Props>(), {
    formConfig: null,
    tableConfig: null,
    height: 300
})

const attrs = useAttrs()
const tableHeight = computed(() => `${props.height}px`)
</script>

<style lang="scss" scoped>
$--icon-size: 18px;
$--icon-l: 10px;

.custom-collapse-item {
    /* 头 */
    :deep(.el-collapse-item__header) {
        height: 36px;
        font-size: 18px;
        color: #293545;
        font-weight: 600;
        border-bottom: none;
        overflow: hidden;

        // > span {
        //     // position: relative;

        //     // &::after {
        //     //     content: '';
        //     //     width: 10000px;
        //     //     height: 1px;
        //     //     background-color: #e1e1e1;
        //     //     position: absolute;
        //     //     top: 50%;
        //     //     left: calc(100% + $--icon-size + $--icon-l * 2);
        //     //     transform: translateY(-50%);
        //     // }
        // }

        .active-icon {
            font-size: $--icon-size;
            transform: rotate(-90deg);
            margin-left: $--icon-l;
            transition: transform 0.3s;
            color: #adadad;
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
