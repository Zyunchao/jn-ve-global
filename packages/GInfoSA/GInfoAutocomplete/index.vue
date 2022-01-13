<template>
    <div ref="autocompRef" class="g-info-autocomplete">
        <el-autocomplete
            style="width: 100%"
            v-bind="$attrs"
            popper-class="info-autocomplete-popper"
            :fetch-suggestions="fetchSuggestions"
            :popper-append-to-body="false"
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
        <transition :name="dropdownShow ? 'dropdown' : ''">
            <InfoHeader
                v-if="dropdownShow"
                type="autocomplete"
                :popper-top="popperTop"
                :popper-left="popperLeft"
                :columns="columns"
                :scroll-left="scrollLeft"
            />
        </transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GInfoAutocomplete'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted, onUnmounted } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import FunctionalComponent from '../../FunctionalComponent'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import { getWidth } from '../utils'

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

const dropdownShow = ref<boolean>(false)
// 组件根
const autocompRef = ref<HTMLElement>(null)
// 表格头
const infoHeaderWrapRef = ref<Element>(null)
// 滚动容器
const scrollWrapRef = ref<HTMLElement>(null)

// ------------- 隐藏 or 显示 + 表头位置获取 ----------------------------------------------------------------------
// 下拉框弹出层 dom 操作
// 当前组件的下拉弹框的 id，多个组件时，保证下拉框唯一
const popperRoot = ref<Element>(null)
const popperTop = ref<string>('')
const popperLeft = ref<string>('')

// 观察器的配置（需要观察什么变动）
const config: MutationObserverInit = { attributes: true }

// 当观察到变动时执行的回调函数
const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
    for (let mutation of mutationsList) {
        // 探查位置
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const pRootDom = mutation.target as HTMLElement
            const display = pRootDom.style['display']

            if (display !== 'none') {
                popperTop.value = pRootDom.style.top
                popperLeft.value = pRootDom.style.left
            }
        }

        // 探查显示 & 隐藏
        if (mutation.type === 'attributes' && mutation.attributeName === 'aria-hidden') {
            const pRootDom = mutation.target as HTMLElement
            const ariaHidden = pRootDom.attributes['aria-hidden'].value
            dropdownShow.value = ariaHidden === 'false'
        }
    }
}

// 创建一个观察器实例并传入回调函数
let observer = new MutationObserver(callback)
onMounted(() => {
    const pRootDom = autocompRef.value.querySelector('.info-autocomplete-popper')
    popperRoot.value = pRootDom
    observer.observe(pRootDom, config)
})

// ------------- 表头横向滚动 ----------------------------------------------------------------------
/**
 * 监听横向滚动（表头追随）
 * autocomplete 的列表容器不同于 infoSelect，这个 dom 是一直存在的，只不过父元素隐藏了
 * 所以可以在 mounted 的时候绑定滚动事件
 */
const scrollLeft = ref<number>(0)
onMounted(() => {
    const scrollWrap = autocompRef.value.querySelector(
        '.el-autocomplete-suggestion__wrap'
    ) as HTMLElement
    scrollWrapRef.value = scrollWrap
    scrollWrap.addEventListener('scroll', scrollEventHandle)
})
function scrollEventHandle(e: Event) {
    scrollLeft.value = (e.target as Element).scrollLeft
}

onUnmounted(() => {
    // 卸载，停止观察
    observer.disconnect()
    observer = null

    // 滚动容器事件移除
    scrollWrapRef.value.removeEventListener('scroll', scrollEventHandle)
})
</script>

<style lang="scss" scoped>
$--header-hieght: 34px;
$--base-zi: 98;

.g-info-autocomplete {
    position: relative;
    width: 100%;
    min-width: 100px;

    :deep(*) {
        box-sizing: border-box;
    }

    /* 下拉选项 */
    :deep(.info-autocomplete-popper) {
        width: 100%;
        z-index: $--base-zi !important;
        padding-top: $--header-hieght;

        .el-autocomplete-suggestion__wrap {
            padding-top: 0;
            max-height: 240px;
        }

        .el-autocomplete-suggestion__list {
            > li {
                width: fit-content;
            }
        }
    }
}

.dropdown-enter-active,
.dropdown-leave-active {
    transition: all 0.2s ease;
}
.dropdown-enter-from,
.dropdown-leave-to {
    transform: translateY(-10%);
    opacity: 0;
}
</style>
