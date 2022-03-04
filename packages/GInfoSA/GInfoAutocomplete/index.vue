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
import { ref, computed, onMounted, onUnmounted } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import FunctionalComponent from '../../FunctionalComponent'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import { getWidth } from '../utils'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

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

const randomId = `random-id-${uuidv4()}`
const popperClass = 'info-autocomplete-popper'

const dropdownShow = ref<boolean>(false)
// 组件根
const currentRootRef = ref<HTMLElement>(null)
// 表格头
const infoHeaderWrapRef = ref<Element>(null)
// 滚动容器
const scrollWrapRef = ref<HTMLElement>(null)
// 弹出框根
const popperRoot = ref<HTMLElement>(null)

// DOM Position
const popperTop = ref<string>('')
const popperLeft = ref<string>('')
const popperZIndex = ref<string>('1')

// DOM Size
const currentRootWidth = computed(() => `${currentRootRef.value?.clientWidth}px`)

// ------------- 隐藏 or 显示 + 表头位置获取 ----------------------------------------------------------------------
const config: MutationObserverInit = { attributes: true }

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

            if(ariaHidden === 'true') {
                emits('closed')
            }
        }
    }
}

// 创建一个观察器实例并传入回调函数
let mutationOb = new MutationObserver(callback)
onMounted(() => {
    const pRootDom = document.querySelector(`.${popperClass}.${randomId}.el-autocomplete__popper`)

    /**
     * 需要将 表头dom 挂载到 body 上
     */
    const headerDom = document.querySelector(`.info-header-wrapper-to-body.${randomId}`)

    if (!pRootDom) return

    headerDom && document.body.appendChild(headerDom)

    popperRoot.value = pRootDom as HTMLElement
    mutationOb.observe(pRootDom, config)
})

// ------------- 表头横向滚动 ----------------------------------------------------------------------
/**
 * 监听横向滚动（表头追随）
 * autocomplete 的列表容器不同于 infoSelect，这个 dom 是一直存在的，只不过父元素隐藏了
 * 所以可以在 mounted 的时候绑定滚动事件
 */
const scrollLeft = ref<number>(0)
onMounted(() => {
    const scrollWrap = document.querySelector(
        `.${popperClass}.${randomId} .el-autocomplete-suggestion__wrap`
    ) as HTMLElement

    if (!scrollWrap) return

    scrollWrapRef.value = scrollWrap
    scrollWrap.addEventListener('scroll', scrollEventHandle)
})
function scrollEventHandle(e: Event) {
    scrollLeft.value = (e.target as Element).scrollLeft
}

onUnmounted(() => {
    // 卸载，停止观察
    mutationOb.disconnect()
    mutationOb = null

    // 滚动容器事件移除
    scrollWrapRef.value.removeEventListener('scroll', scrollEventHandle)
})
</script>

<style lang="scss" scoped>
.g-info-autocomplete {
    width: 100%;
}
</style>
<style lang="scss">
.info-autocomplete-popper {
    overflow: hidden;

    .el-autocomplete-suggestion__wrap {
        padding-top: 0;
        max-height: 240px;
    }

    .el-autocomplete-suggestion__list {
        > li {
            width: fit-content;

            &:not([role='option']) {
                width: 100%;
                padding: 0;
            }
        }
    }
}
</style>
