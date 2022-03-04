<template>
    <div ref="currentRootRef" class="g-info-select-all">
        <!-- 下拉框，虚拟滚动 -->
        <el-select-v2
            filterable
            :options="localSelectOptins"
            v-bind="$attrs"
            :height="popperHeight"
            style="width: 100%"
            :popper-append-to-body="true"
            :popper-class="`${popperClass} ${randomId}`"
            @visible-change="visibleChange"
        >
            <template #default="{ item, $index }">
                <OptionCustomContent :columns="columns" :data="item" :index="$index" />
            </template>
        </el-select-v2>

        <!-- 表头（依据 columns 生成） -->
        <InfoHeader
            v-if="!hideHeader"
            v-show="dropdownShow"
            ref="infoHeaderWrapRef"
            :class="['info-header-wrapper-to-body', randomId]"
            type="select-all"
            :height="optionItemBaseHeight"
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
    name: 'GInfoSelectAll',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { watch, ref, computed, onMounted, onUnmounted, watchEffect } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import FunctionalComponent from '../../FunctionalComponent'
import { SelectOptionProps } from '../../index'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import { getWidth } from '../utils'
import { v4 as uuidv4 } from 'uuid'
import _ from 'lodash'

interface Props {
    /**
     * 下拉框数据
     */
    optionsData: SelectOptionProps[]
    /**
     * option 展示的列
     */
    columns: InfoColumnProps[]
    /**
     * option item 绑定的值
     */
    optionProps?: {
        value: string
        label: string
    }
    /**
     * 最大行数
     */
    optionMaxItemNum?: number
    /**
     * 是否隐藏头
     */
    hideHeader?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    optionsData: () => [],
    columns: () => [],
    optionProps: () => ({
        value: 'id',
        label: 'name'
    }),
    optionMaxItemNum: 7,
    hideHeader: false
})

const randomId = `random-id-${uuidv4()}`
const popperClass = 'info-select-all-popper'
const dropdownShow = ref<boolean>(false)

// 组件根
const currentRootRef = ref<Element>(null)
// 表格头
const infoHeaderWrapRef = ref<any>(null)
// 待选项的容器
const optionItemWrapper = ref<Element>(null)
// popper 根
const popperRoot = ref<HTMLElement>(null)

// DOM Position
const popperTop = ref<string>('')
const popperLeft = ref<string>('')
const popperZIndex = ref<string>('1')

// DOM Size
const baseHeight: string = '34px'
const optionItemBaseHeight = computed<string>(() => (!props.hideHeader ? baseHeight : '0px'))
const popperHeight = computed(() => parseInt(baseHeight) * props.optionMaxItemNum)
const currentRootWidth = computed(() => `${currentRootRef.value?.clientWidth}px`)

// 数据包装
const VALUE_K = 'value'
const LABEL_K = 'label'
const localSelectOptins = computed(() =>
    props.optionsData.map((item) => {
        const target = { ...item }

        // value
        if (target[VALUE_K] === undefined || target[VALUE_K] === null) {
            target[VALUE_K] = target[props.optionProps.value]
        }

        // key
        if (target[LABEL_K] === undefined || target[LABEL_K] === null) {
            target[LABEL_K] = item[props.optionProps.label]
        }

        return target
    })
)

// ------------- 隐藏 or 显示 + 表头位置获取 ----------------------------------------------------------------------
// 观察器的配置（需要观察什么变动）
const config: MutationObserverInit = { attributes: true }

const setPosition = _.debounce((pRootDom?: HTMLElement) => {
    popperTop.value = pRootDom.style.top
    popperLeft.value = pRootDom.style.left
    popperZIndex.value = pRootDom.style.zIndex

    // 表头高度 = 容器 padding-top
    infoHeaderWrapRef.value &&
        (pRootDom.style.paddingTop = `${(infoHeaderWrapRef.value as any).el.offsetHeight}px`)
}, 20)

const callback = function (mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const pRootDom = mutation.target as HTMLElement
            const display = pRootDom.style['display']
            display !== 'none' && setPosition(pRootDom)
        }
    }
}

// 创建一个观察器实例并传入回调函数
let mutationOb = new MutationObserver(callback)
onMounted(() => {
    const pRootDom = document.querySelector(`.${popperClass}.${randomId}.el-select-v2__popper`)

    /**
     * 需要将 表头dom 挂载到 body 上
     */
    const headerDom = document.querySelector(`.info-header-wrapper-to-body.${randomId}`)

    if (!pRootDom) return null

    headerDom && document.body.appendChild(headerDom)

    // 存储及监听
    popperRoot.value = pRootDom as HTMLElement
    mutationOb.observe(pRootDom, config)
})

// ------------- 表头横向滚动 ----------------------------------------------------------------------
const scrollLeft = ref<number>(0)
watch(
    () => props.optionsData,
    (data) => {
        if (data && !!data.length) {
            setTimeout(() => {
                listeneSroll()
            }, 100)
        }
    },
    {
        immediate: true
    }
)
function scrollEventHandle(e: Event) {
    scrollLeft.value = (e.target as Element).scrollLeft
}
// 监听包装容器的横向滚动
function listeneSroll() {
    const optionItemWrapperDom = document.querySelector(
        `.${popperClass}.${randomId} .el-select-dropdown__list`
    )

    if (!optionItemWrapperDom) return

    optionItemWrapper.value = optionItemWrapperDom

    optionItemWrapperDom.removeEventListener('scroll', scrollEventHandle)
    optionItemWrapperDom.addEventListener('scroll', scrollEventHandle)
}

// 下拉框出现/隐藏
const visibleChange = (flag: boolean) => {
    dropdownShow.value = flag

    // 关闭下拉框后，位移清零
    if (!flag && !!optionItemWrapper.value) {
        optionItemWrapper.value.scrollLeft = 0
    }
}

// 卸载，停止观察
onUnmounted(() => {
    mutationOb && mutationOb.disconnect()
    mutationOb = null
})
</script>

<style lang="scss" scoped>
.g-info-select-all {
    width: 100%;
}
</style>
<style lang="scss">
$--option-wrap-base-bottom: 8px;

.info-select-all-popper {
    * {
        box-sizing: border-box;
    }

    ul {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    .el-select-dropdown__list {
        overflow-x: auto !important;
        margin-bottom: 2px !important;
        margin-top: 0 !important;
        padding-bottom: $--option-wrap-base-bottom !important;
        box-sizing: content-box;

        &::-webkit-scrollbar {
            height: $--option-wrap-base-bottom;
        }

        &::-webkit-scrollbar-track {
            background-color: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: #e8e8e8;
            border-radius: 4px;

            &:hover {
                background: #a5a3a3;
            }
        }

        .el-select-dropdown__option-item {
            width: fit-content !important;
            min-width: 100%;
        }
    }
}
</style>
