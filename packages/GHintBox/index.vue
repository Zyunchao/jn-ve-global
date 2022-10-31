<template>
    <span ref="domRef" class="tool-tip-by-width-box">
        <el-tooltip
            v-if="isOverlengthFlag"
            effect="dark"
            :content="text"
            placement="top-start"
            v-bind="$attrs"
        >
            <span>
                {{ text }}
            </span>
        </el-tooltip>

        <template v-else>
            {{ text }}
        </template>
    </span>
</template>

<script lang="ts">
export default {
    name: 'GHintBox'
}
</script>

<script lang="ts" setup>
import { watch, ref, onMounted, computed, shallowRef } from 'vue'
import { getStyle, size2Rem } from '../utils/utils'
import { useResizeObserver } from '@vueuse/core'
import _ from 'lodash'

const props = withDefaults(
    defineProps<{
        /**
         * 文本内容
         */
        text: string
        /**
         * 指定宽度
         */
        width?: string | number
    }>(),
    {
        text: '',
        width: '100%'
    }
)

const domRef = shallowRef<Element | null>(null)
const isOverlengthFlag = ref<boolean>(false)
const boxWidth = ref<number>(0)
const cssWidth = computed(() =>
    _.isNumber(props.width) ? `${size2Rem(props.width)}px` : props.width
)

// 数据变化
watch(
    () => props.text,
    (text) => {
        isOverlengthFlag.value = textIsOverlength(domRef.value, boxWidth.value, text)
    }
)

onMounted(() => {
    // 容器变化
    useResizeObserver(domRef.value as any, (entries) => {
        const entry = entries[0]
        const { width, height } = entry.contentRect
        const baseIndent = 10

        // 存储到外部
        boxWidth.value = width - baseIndent

        isOverlengthFlag.value = textIsOverlength(domRef.value, boxWidth.value, props.text)
    })
})

function textIsOverlength(dom: Element, boxWidth: number, text: string) {
    const fontSize = parseFloat(getStyle(dom, 'font-size'))
    const textNumber = text.length
    const textStyleLength = textNumber * fontSize
    return textStyleLength > boxWidth
}
</script>

<style lang="scss" scoped>
.tool-tip-by-width-box {
    width: v-bind(cssWidth);
    display: inline-flex;
    font-size: inherit;
    color: inherit;

    > span {
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: inherit;
        color: inherit;
    }
}
</style>
