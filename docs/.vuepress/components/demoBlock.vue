<template>
    <div class="demo-block">
        <div class="component-wrapper">
            <slot />
        </div>
        <div :class="['source-wrapper', { expanded: expanded }]" ref="sourceWrapperRef">
            <slot name="code"></slot>
        </div>
        <div class="open-handle-wrapper" @click="handleChanleExpanded">
            <i :class="['el-icon-caret-bottom', { expanded: expanded }]" />
            {{ !expanded ? '显示代码' : '隐藏代码' }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
export default defineComponent({
    name: 'DemoBlock'
})
</script>
<script lang="ts" setup>
import { ref, reactive } from 'vue'

const expanded = ref(false)
const sourceWrapperRef = ref<HTMLElement>(null)
const sourceHeight = ref<string>('0px')

const handleChanleExpanded = () => {
    expanded.value = !expanded.value
}

onMounted(() => {
    // 动态获取代码区域的高度
    sourceHeight.value = `${sourceWrapperRef.value.querySelector('.language-vue').clientHeight}px`
})
</script>

<style lang="scss" scoped>
.demo-block {
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    transition: 0.2s;
    z-index: 999;
    position: relative;

    &:hover {
        box-shadow: 0 0 8px 0 rgb(232, 237, 250, 60%), 0 2px 4px 0 rgb(232, 237, 250, 50%);
    }

    // 组件展示
    .component-wrapper {
        padding: 20px;
    }

    // 代码区域
    .source-wrapper {
        transition: 0.2s;
        overflow: hidden;
        height: 0;

        &.expanded {
            height: v-bind(sourceHeight);
        }

        :deep(.language-vue) {
            margin-top: 0;
            margin-bottom: 0;
            border-radius: 0;
            border: none;
        }
    }

    // 展开按钮
    .open-handle-wrapper {
        border-top: 1px solid #dcdfe6;
        height: 44px;
        box-sizing: border-box;
        margin-top: -1px;
        color: rgb(172, 168, 168);
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
            background-color: #f9fafc;
            color: #409eff;
            transition: all 0.2s;
            user-select: none;
        }

        i.el-icon-caret-bottom {
            transition: transform 0.4s;
            margin-right: 10px;
            font-size: 20px;
            &.expanded {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>
