<template>
    <div ref="infoHeaderWrapRef" :class="['info-header-wrap', type]">
        <!-- 查询控件 -->
        <ul v-if="isCreateQuery && type === 'select'" class="control-wrapper">
            <li
                v-for="(column, index) in columns"
                :key="`${column.prop}-${index}`"
                :style="`width: ${getWidth(column.width)}; text-align: ${column.align};`"
            >
                <!-- input -->
                <template
                    v-if="
                        column.isQuery &&
                            (column.queryType === undefined || column.queryType === 'input')
                    "
                >
                    <el-input v-model.trim="localParams[column.prop]" />
                </template>

                <!-- select -->
                <template v-if="column.isQuery && column.queryType === 'select'">
                    <el-select
                        v-model="localParams[column.prop]"
                        @focus="preventParentPopperHide"
                        @click="preventParentPopperHide"
                        @change="preventParentPopperHide"
                        @blur="preventParentPopperHide"
                    >
                        <el-option
                            v-for="option in column.querySelectOptions"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                        />
                    </el-select>
                </template>
            </li>
        </ul>

        <!-- 表头 -->
        <ul class="info-header">
            <li
                v-for="(column, index) in columns"
                :key="`${column.prop}-${index}`"
                :style="`width: ${getWidth(column.width)}; text-align: ${column.align};`"
                :title="column.label"
            >
                {{ column.label }}
            </li>
        </ul>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GInfoSOrAHeader'
}
</script>

<script lang="ts" setup>
import { watch, ref, onMounted, computed, reactive, watchEffect } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import { getWidth } from '../utils'
import _ from 'lodash'

interface Props {
    /**
     * 定位：top 值
     */
    popperTop: string
    /**
     * 定位：left 值
     */
    popperLeft: string
    /**
     * 内容项
     */
    columns: InfoColumnProps[]
    /**
     * 滚动值
     */
    scrollLeft: number
    /**
     * 类型标识
     */
    type?: 'select' | 'autocomplete' | 'select-all'
    /**
     * 参数初始化的标志位
     */
    initialized?: boolean
    /**
     * 组件高度（用于虚拟滚动的 select）
     */
    height?: string
}

const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    scrollLeft: 0,
    type: 'select',
    initialized: false,
    height: '34px'
})

const emits = defineEmits(['paramsChange', 'preventParentPopperHide'])

const infoHeaderWrapRef = ref<HTMLElement>(null)
const infoHeaderHight = ref<number>(34)

// ------------- 参数处理：select 带有分页的 ----------------------------------------------------------------------
const isCreateQuery = ref<boolean>(false)
const localParams = reactive({})
if (props.type === 'select') {
    // 默认参数获取（column.prop）
    watch(
        () => props.columns,
        (columns) => {
            columns.forEach((cloumn) => {
                const key = cloumn.prop
                localParams[key] = null
            })

            isCreateQuery.value = columns.some((column) => column.isQuery)
        },
        {
            immediate: true
        }
    )
    // 抛出有效值（防抖）
    watch(
        () => localParams,
        _.debounce((params) => {
            const filterParams = {}
            for (const key in params) {
                if (Object.prototype.hasOwnProperty.call(params, key)) {
                    const element = params[key]
                    if (element !== null) {
                        filterParams[key] = element
                    }
                }
            }

            if (!!Object.keys(filterParams).length) {
                emits('paramsChange', filterParams)
            }
        }, 300),
        {
            deep: true
        }
    )
    // 初始化
    watch(
        () => props.initialized,
        () => {
            props.columns.forEach((cloumn) => {
                const key = cloumn.prop
                localParams[key] = null
            })
        }
    )
}
// ------------- 参数处理：select 带有分页的 ----------------------------------------------------------------------

// 位移
watch(
    () => props.scrollLeft,
    (left) => {
        infoHeaderWrapRef.value.scrollLeft = left
    }
)

// 组件高度获取
onMounted(() => {
    infoHeaderHight.value = infoHeaderWrapRef.value.offsetHeight
})

const preventParentPopperHide = () => {
    emits('preventParentPopperHide')
}

defineExpose({
    el: infoHeaderWrapRef,
    height: infoHeaderHight
})
</script>

<style lang="scss" scoped>
@import '../styles.scss';

/* 头（遮挡） */
.info-header-wrap {
    width: 100%;
    overflow: hidden;
    background-color: #e8e8e8;
    position: absolute;
    z-index: $--base-zi + 1;
    border-radius: 4px 4px 0 0;
    top: v-bind(popperTop);
    left: v-bind(popperLeft);

    // 分页查询
    &.select,
    &.select-all {
        padding: 0 32px 0 20px;
    }

    // 全量查询
    &.select-all {
        height: v-bind(height);

        .info-header,
        .control-wrapper {
            li {
                height: v-bind(height);
                line-height: v-bind(height);
            }
        }
    }

    // 自动补全
    &.autocomplete {
        padding: 0 20px;
    }

    .info-header,
    .control-wrapper {
        width: fit-content !important;
        display: flex;
        align-items: center;

        li {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #000000;
            font-size: var(--el-font-size-base);
            font-weight: 600;
            display: block;
            height: $--header-hieght;
            line-height: $--header-hieght;
        }
    }

    .control-wrapper {
        li {
            display: flex;
            align-items: center;

            :deep(.el-input) {
                input {
                    height: 26px;
                    padding: 0 10px;
                }
            }
        }
    }
}
</style>
