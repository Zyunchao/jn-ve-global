<template>
    <div ref="infoHeaderWrapRef" :class="['info-header-wrap', type]">
        <div class="info-header">
            <span
                v-for="(column, index) in columns"
                :key="`${column.prop}-${index}`"
                :style="`width: ${getWidth(column.width)}; text-align: ${column.align};`"
                :title="column.label"
            >
                {{ column.label }}
            </span>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GInfoSOrAHeader'
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import { getWidth } from '../utils'

interface Props {
    popperTop: string
    popperLeft: string
    columns: InfoColumnProps[]
    scrollLeft: number
    type?: 'select' | 'autocomplete'
}

const props = withDefaults(defineProps<Props>(), {
    columns: () => [],
    scrollLeft: 0,
    type: 'select'
})

const headerJSHieght = '34px'
const infoHeaderWrapRef = ref<HTMLElement>(null)

watch(
    () => props.scrollLeft,
    (left) => {
        infoHeaderWrapRef.value.scrollLeft = left
    }
)
</script>

<style lang="scss" scoped>
$--base-zi: 98;

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

    &.select {
        padding: 0 32px 0 20px;
        height: v-bind(headerJSHieght);
    }

    &.autocomplete {
        padding: 0 20px;
        height: 34px;
    }

    .info-header {
        height: 100%;
        width: fit-content;
        display: flex;
        align-items: center;

        span {
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #000000;
            font-size: var(--el-font-size-base);
            font-weight: 600;
        }
    }
}
</style>
