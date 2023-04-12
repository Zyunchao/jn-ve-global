<template>
    <div ref="currentRootRef" class="g-info-select-all">
        <!-- 下拉框，虚拟滚动 -->
        <el-select-v2
            filterable
            :options="localSelectOptins"
            v-bind="$attrs"
            :height="popperHeight"
            style="width: 100%"
            :teleported="true"
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
import { computed, toRef } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import { SelectOptionProps } from '../../index'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import _ from 'lodash'
import { packagingOptionData } from '../utils'
import useMainLogic from '../hooks'
import { getStyle } from '@jsjn/utils'

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

const emits = defineEmits(['closed'])

// 数据包装转换
const localSelectOptins = computed(() => packagingOptionData(props.optionsData, props.optionProps))

// DOM Size
const baseHeight: string = '34px'
const optionItemBaseHeight = computed<string>(() => (!props.hideHeader ? baseHeight : '0px'))
const popperHeight = computed(() => parseInt(baseHeight) * props.optionMaxItemNum)

// ------------- 隐藏 or 显示 + 表头位置获取 ----------------------------------------------------------------------
const setPosition = _.debounce((pRootDom?: HTMLElement) => {
    // popperTop.value = pRootDom.style.top
    // popperLeft.value = pRootDom.style.left
    popperTop.value = getStyle(pRootDom, 'top')
    popperLeft.value = getStyle(pRootDom, 'left')
    popperZIndex.value = pRootDom.style.zIndex

    // 表头高度 = 容器 padding-top
    infoHeaderWrapRef.value &&
        (pRootDom.style.paddingTop = `${(infoHeaderWrapRef.value as any).el.offsetHeight}px`)
}, 10)
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
    currentRootWidth
} = useMainLogic({
    type: 'info-select-all',
    mutationOb,
    popperClassSpecific: 'el-select-v2__popper',
    scrollWrapDomClass: 'el-select-dropdown__list',
    optionsData: toRef(props, 'optionsData')
})

// 下拉框出现/隐藏
const visibleChange = (flag: boolean) => {
    dropdownShow.value = flag

    // 关闭下拉框后，位移清零
    if (!flag && !!scrollWrapper.value) {
        scrollWrapper.value.scrollLeft = 0
        scrollLeft.value = 0
        emits('closed')
    }
}
</script>

<style lang="scss" scoped>
.g-info-select-all {
    width: 100%;
}
</style>
<style lang="scss">
@import './styles.global.scss';
</style>
