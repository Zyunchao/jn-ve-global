<template>
    <ClientOnly>
        <div class="demo-block">
            <!-- 案例展示容器 -->
            <div class="component-wrapper">
                <slot />
            </div>

            <div class="open-handle-wrapper-top">
                <!-- <g-icon icon="el-DocumentCopy" /> -->
                <el-tooltip
                    class="box-item"
                    effect="dark"
                    :content="!expanded ? '显示代码' : '隐藏代码'"
                    placement="right"
                >
                    <div>
                        <g-icon
                            icon="el-MagicStick"
                            :class="{ expanded: expanded }"
                            @click="handleChanleExpanded"
                        />
                    </div>
                </el-tooltip>
            </div>

            <!-- 代码区域 -->
            <div ref="sourceWrapperRef" :class="['source-wrapper', { expanded: expanded }]">
                <slot name="code" />
            </div>

            <div v-if="expanded" class="open-handle-wrapper-bottom" @click="handleChanleExpanded">
                <g-icon icon="el-CaretBottom" :class="{ expanded: expanded }" />
                {{ !expanded ? '显示代码' : '隐藏代码' }}
            </div>
        </div>
    </ClientOnly>
</template>

<script lang="ts">
import { defineComponent, onMounted, watch } from 'vue'
export default defineComponent({
    name: 'DemoBlock'
})
</script>
<script lang="ts" setup>
import { ref, reactive, getCurrentInstance } from 'vue'

const { proxy } = getCurrentInstance()

const expanded = ref(false)
const sourceWrapperRef = ref<HTMLElement>(null)
const sourceHeight = ref<string>('0px')

const handleChanleExpanded = () => {
    expanded.value = !expanded.value
}

watch(
    () => sourceWrapperRef.value,
    (instance) => {
        if (instance) {
            // 动态获取代码区域的高度
            // sourceHeight.value = `${
            //     sourceWrapperRef.value.querySelector('.language-vue').clientHeight
            // }px`
            sourceHeight.value = 'auto'
        }
    }
)
</script>

<style lang="scss" scoped>
.demo-block {
    background-color: #fff;
    border: 1px solid #dcdfe6;
    border-radius: 3px;
    transition: 0.2s;
    z-index: 2;
    position: relative;
    margin: 10px 0;

    &:hover {
        box-shadow: 0 0 8px 0 rgb(232, 237, 250, 60%), 0 2px 4px 0 rgb(232, 237, 250, 50%);
    }

    // 组件展示
    .component-wrapper {
        padding: 20px;
    }

    // 代码区域
    .source-wrapper {
        transition: 0.3s;
        overflow: hidden;
        height: 0;

        &.expanded {
            height: v-bind(sourceHeight);
        }
    }

    // 展开按钮
    .open-handle-wrapper-top,
    .open-handle-wrapper-bottom {
        border-top: 1px solid #dcdfe6;
        height: 44px;
        box-sizing: border-box;
        margin-top: -1px;
        color: rgb(172, 168, 168);
        display: flex;
        align-items: center;

        :deep(i.g-icon) {
            transition: transform 0.4s;
            margin-right: 10px;
            font-size: 20px;
        }
    }

    .open-handle-wrapper-top {
        justify-content: flex-end;

        :deep(i.g-icon) {
            cursor: pointer;
            transition: all 0.2s;
            margin-right: 20px;

            &.expanded,
            &:hover {
                color: #409eff;
            }
        }
    }

    .open-handle-wrapper-bottom {
        cursor: pointer;
        justify-content: center;

        &:hover {
            background-color: #f9fafc;
            color: #409eff;
            transition: all 0.2s;
            user-select: none;
        }

        :deep(i.g-icon) {
            &.expanded {
                transform: rotate(-180deg);
            }
        }
    }
}
</style>
