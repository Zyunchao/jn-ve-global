<template>
    <div ref="currentRootRef" class="g-info-autocomplete">
        <el-autocomplete
            style="width: 100%"
            v-bind="$attrs"
            :fetch-suggestions="fetchSuggestions"
            :popper-append-to-body="true"
            :popper-class="`${popperClass} ${randomId}`"
        >
            <template #default="{ item, $index }">
                <OptionCustomContent
                    :columns="columns"
                    :data="item"
                    :index="$index"
                    type="autocomplete"
                />
            </template>
        </el-autocomplete>

        <!-- 表头（依据 columns 生成） -->
        <InfoHeader
            v-show="dropdownShow"
            ref="infoHeaderWrapRef"
            :class="['info-header-wrapper-to-body', randomId]"
            type="autocomplete"
            :popper-top="popperTop"
            :popper-left="popperLeft"
            :columns="columns"
            :scroll-left="scrollLeft"
            :width="currentRootWidth"
            :z-index="popperZIndex"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GInfoAutocomplete',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { onMounted, onUnmounted } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import _ from 'lodash'
import useMainLogic from '../hooks'

interface Props {
    /**
     * option 展示的列
     */
    columns: InfoColumnProps[]
    /**
     * 获取输入建议的方法， 仅当你的输入建议数据 resolve 时，通过调用 callback(data:[])  来返回它
     */
    fetchSuggestions: (queryString?: string, callback?: (arg: any) => void) => void
}

const props = withDefaults(defineProps<Props>(), {
    columns: () => []
})

const emits = defineEmits(['closed'])

// ------------- 隐藏 or 显示 + 表头位置获取 ----------------------------------------------------------------------
const setPosition = _.debounce((pRootDom?: HTMLElement) => {
    popperTop.value = pRootDom.style.top
    popperLeft.value = pRootDom.style.left
    popperZIndex.value = pRootDom.style.zIndex

    // 表头高度 = 容器 padding-top
    infoHeaderWrapRef.value &&
        (pRootDom.style.paddingTop = `${(infoHeaderWrapRef.value as any).el.offsetHeight}px`)

    // 容器宽度 = 根容器宽度
    pRootDom.style.width = currentRootWidth.value
}, 20)
const callback = function (mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        // 探查位置
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const pRootDom = mutation.target as HTMLElement
            const display = pRootDom.style['display']

            if (display !== 'none') {
                setPosition(pRootDom)
            }
        }

        // 探查显示 & 隐藏
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
            const pRootDom = mutation.target as HTMLElement
            const ariaHidden = pRootDom.attributes['aria-hidden'].value
            dropdownShow.value = ariaHidden === 'false'

            if (ariaHidden === 'true') {
                scrollWrapper.value.scrollLeft = 0
                scrollLeft.value = 0
                emits('closed')
            }
        }
    }
}
let mutationOb = new MutationObserver(callback)

// 重复逻辑抽取
const {
    randomId,
    popperClass,
    dropdownShow,
    currentRootRef,
    infoHeaderWrapRef,
    scrollWrapper,
    popperTop,
    popperLeft,
    popperZIndex,
    scrollLeft,
    scrollEventHandle,
    currentRootWidth
} = useMainLogic({
    type: 'info-autocomplete',
    mutationOb,
    popperClassSpecific: 'el-autocomplete__popper'
})

// ------------- 表头横向滚动 ----------------------------------------------------------------------
/**
 * 监听横向滚动（表头追随）
 * autocomplete 的列表容器不同于 infoSelect，这个 dom 是一直存在的，只不过父元素隐藏了
 * 所以可以在 mounted 的时候绑定滚动事件
 */
onMounted(() => {
    const scrollWrapDom = document.querySelector(
        `.${popperClass}.${randomId} .el-autocomplete-suggestion__wrap`
    ) as HTMLElement

    if (!scrollWrapDom) return

    scrollWrapper.value = scrollWrapDom
    scrollWrapDom.addEventListener('scroll', scrollEventHandle)
})

onUnmounted(() => {
    scrollWrapper.value?.removeEventListener('scroll', scrollEventHandle)
})
</script>

<style lang="scss" scoped>
.g-info-autocomplete {
    width: 100%;
}
</style>
<style lang="scss">
@import './styles.global.scss';
</style>
