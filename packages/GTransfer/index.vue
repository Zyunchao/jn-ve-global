<template>
    <div class="g-transfer-wrapper">
        <!-- 穿梭框 -->
        <el-transfer
            :titles="['待选', '已选']"
            target-order="unshift"
            v-bind="$attrs"
            v-model="currentSelectedKeys"
            :props="sourceMapping"
            class="g-transfer"
            :data="currentDataWrap"
            @change="transferChange"
        >
            <template v-if="paginationShow" #left-footer>
                <el-pagination
                    v-model:page-size="paginationConfig.pageSize"
                    v-model:current-page="paginationConfig.currentPage"
                    small
                    background
                    :total="paginationConfig.total"
                    layout="total, prev, pager, next, sizes"
                    :pager-count="5"
                    :page-sizes="[10, 20, 30, 40, 50]"
                />
            </template>

            <template v-if="paginationShow" #right-footer>
                <span />
            </template>
        </el-transfer>

        <!-- 扩展按钮 -->
        <LGButtonGroup class="transfer-ext-btns" :btns="transferExtBtns" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'GTransfer'
})
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive } from 'vue'
import type { BtnProps } from '../index'
import _ from 'lodash'
import LGButtonGroup from '../GButtonGroup/index.vue'
import usePagination from './hooks/usePagination'

interface Option {
    id?: string
    name?: string
    key?: string
    label?: string
    disabled?: boolean
    [k: string]: any
}

const props = withDefaults(
    defineProps<{
        /**
         * 选中的值
         */
        modelValue: Array<string | number>
        /**
         * 源数据
         */
        data: any[]
        /**
         * 显示分页
         */
        paginationShow?: boolean
        /**
         * 数据总量
         */
        total?: number
        /**
         * 数据源的字段别名
         */
        sourceMapping?: {
            key?: string
            label?: string
            disabled?: string
        }
    }>(),
    {
        modelValue: () => [],
        data: () => [],
        paginationShow: true,
        total: 0,
        sourceMapping: () => ({
            key: 'id',
            label: 'name',
            disabled: 'disabled'
        })
    }
)

const emits = defineEmits<{
    (e: 'update:modelValue', arr: Array<string | number>): void
    (e: 'pagination-change', currentPage: number, pageSize: number): void
    (
        e: 'change',
        vals: Array<number | string>,
        toDirection: 'left' | 'right',
        moveKeys: Array<number | string>
    ): void
}>()

const { paginationConfig } = usePagination({ props, emits })

/**
 * 当前活跃的数据容器，穿梭框一个核心概念：左右两侧的列表是基于一个数据列表进行维护展示的
 */
const currentDataWrap = ref<Option[]>([])
/**
 * 当前选中的节点 key 数组
 */
const currentSelectedKeys = computed<Array<string | number>>({
    get: () => props.modelValue,
    set(arr) {
        emits('update:modelValue', arr)
    }
})
/**
 * 保存当前活跃的 keys 对应的源数据
 */
const currentSelectedDatas = computed(() =>
    currentDataWrap.value.filter((item) =>
        props.modelValue.includes(item[props.sourceMapping['key']])
    )
)

// 源数据 本地化
watch(
    () => props.data,
    (data) => {
        /**
         * 结合（去重）
         * 数据容器融合已选数据列表，会将之前页选择的数据揉合在一个数组
         * 这样在 computed currentSelectedDatas 时，能够依然从容器中查找到之前选择的数据
         *
         * 数据容器揉合已选数据，已选数据从数据容器中查找添加，形成闭环
         *
         * 去重是因为后台返回的数据中会包含之前的已选数据，如果直接拼接，会产生重复数据
         * 重复数据会对列表渲染产生问题
         */
        currentDataWrap.value = _.uniqWith(data.concat(currentSelectedDatas.value), _.isEqual)
    },
    { immediate: true }
)

/**
 * toDirection 为 'left' 时，就是已选列表还给待选列表，有两种行为：
 *  - 所还数据不在当前页：应该从 “当前活跃的数据容器” 中移除，即不存在于待选列表，也不存在于已选列表
 *      通过更新 “当前活跃的数据容器” 实现移除
 *
 *  - 所还数据就应该是当前页：这个当前页取决于后台返回的分页数据（该数据已备份）
 *      组件默认行为，移动到左侧，即不对 “当前活跃的数据容器” 进行额外的处理
 */
const transferChange = (
    vals: Array<number | string>,
    toDirection: 'left' | 'right',
    moveKeys: Array<number | string>
) => {
    // 触发外部绑定的事件
    emits('change', vals, toDirection, moveKeys)

    // 归还数据
    if (toDirection === 'left') {
        moveKeys.forEach((key) => {
            if (!props.data.some((sourceItem) => sourceItem[props.sourceMapping['key']] === key)) {
                /**
                 * “当前活跃的数据容器” 移除所还项，这样两个容器就都不会显示了
                 */
                currentDataWrap.value = currentDataWrap.value.filter(
                    (item) => item[props.sourceMapping['key']] !== key
                )
            }
        })
    }
}

// 扩展按钮组
const transferExtBtns = reactive<BtnProps[]>([
    {
        label: '>>',
        onClick() {
            currentSelectedKeys.value = currentDataWrap.value.map(
                (item) => item[props.sourceMapping['key']]
            )
        }
    },
    {
        label: '<<',
        disabled: () => currentSelectedKeys.value.length === 0,
        onClick() {
            currentSelectedKeys.value = []
            currentDataWrap.value = props.data
        }
    }
])

defineExpose({
    paginationConfig
})
</script>

<style lang="scss" scoped>
.g-transfer-wrapper {
    --transfer-txt-btns-bottom-start: 200px;
    --transfer-txt-btn-width: 60px;
    --transfer-panel-space: 84px;

    position: relative;
    width: fit-content;
    margin: 0 auto;

    :deep(.g-transfer) {
        --el-transfer-panel-body-height: 400px;
        --el-transfer-panel-width: 420px;

        .el-transfer-panel__filter {
            width: calc(var(--el-transfer-panel-width) - 15px * 2);
        }

        .el-transfer-panel {
            margin: 0 var(--transfer-panel-space);

            &:first-of-type {
                margin-left: 0;
            }

            &:last-of-type {
                margin-right: 0;
            }
        }

        .el-transfer-panel__footer {
            --jn-ve-g-form-item-height: var(--el-pagination-button-height-small);

            padding-left: 10px;
            display: flex;
            align-items: center;

            .el-pagination {
                .el-pagination__total {
                    margin-right: 10px !important;
                }

                .btn-prev {
                    margin: 0;
                }

                .el-pager {
                    li {
                        margin: 0 1px !important;
                    }
                }

                .el-pagination__sizes {
                    margin-right: 0 !important;
                    margin-left: 10px;

                    .el-select .el-input {
                        width: 80px;
                    }
                }
            }
        }
    }

    /* 自带按钮 & 扩展按钮 */
    :deep(.el-transfer__buttons),
    .transfer-ext-btns {
        padding: 0;
        position: absolute;
        left: 50%;
        transform: translateX(-50%);
        bottom: calc(var(--transfer-txt-btns-bottom-start) + var(--jn-ve-g-btn-height) + 20px);

        .el-button {
            width: var(--transfer-txt-btn-width) !important;
        }
    }

    .transfer-ext-btns {
        bottom: var(--transfer-txt-btns-bottom-start);
    }
}
</style>
