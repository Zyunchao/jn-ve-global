<template>
    <div :class="['imitative-collapse-item', { 'is-active': active, 'is-tail': isTail }]">
        <LGIcon v-if="prefix" :icon="prefix" class="prefix-icon" />
        <span>{{ title }}</span>
        <LGIcon icon="el-DArrowRight" class="active-icon" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'ImitativeCollapseItem'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import LGIcon from '../../GIcon/index.vue'

const props = withDefaults(
    defineProps<{
        title?: string
        /**
         * 前缀图标
         */
        prefix?: string
        /**
         * 是否展开
         */
        active?: boolean
        /**
         * 是否是尾巴，闭合标签作用
         */
        isTail?: boolean
    }>(),
    {
        title: '',
        prefix: '',
        active: true,
        isTail: false
    }
)
</script>

<style lang="scss" scoped>
$--icon-size: 16px;
$--icon-l: 10px;

.imitative-collapse-item {
    height: 36px;
    font-size: 18px;
    color: #4e5966;
    font-weight: 600;
    border-bottom: none;
    overflow: hidden;
    display: flex;
    align-items: center;
    cursor: default;

    :deep(.active-icon) {
        font-size: $--icon-size;
        transform: rotate(-90deg);
        margin-left: $--icon-l;
        transition: transform 0.3s;
        color: #c2c2c2;
    }

    :deep(.prefix-icon) {
        font-size: inherit;
        margin-right: 4px;
    }

    &.is-active {
        :deep(.active-icon) {
            transform: rotate(-90deg) rotateY(180deg);
        }
    }

    &.is-tail {
        opacity: 0;
    }
}
</style>
