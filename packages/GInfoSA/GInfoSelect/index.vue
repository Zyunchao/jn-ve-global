<template>
    <div ref="currentRootRef" class="g-info-select">
        <!-- 下拉框 -->
        <el-select
            ref="elSelectRef"
            style="width: 100%"
            v-bind="$attrs"
            :filterable="false"
            clearable
            :visible="true"
            :popper-append-to-body="true"
            :popper-class="`${popperClass} ${randomId}`"
            @visible-change="visibleChange"
        >
            <el-option
                v-for="(item, index) in localSelectOptins"
                :key="`${item.value}-${index}`"
                :value="valueBindObj ? item : item.value"
                :label="item.label"
            >
                <OptionCustomContent :columns="columns" :data="item" :index="index" />
            </el-option>
        </el-select>

        <!-- 表头（依据 columns 生成）to body -->
        <InfoHeader
            v-show="dropdownShow"
            ref="infoHeaderWrapRef"
            type="select"
            :class="['info-header-wrapper-to-body', randomId]"
            :popper-top="popperTop"
            :popper-left="popperLeft"
            :columns="columns"
            :scroll-left="scrollLeft"
            :initialized="initialized"
            :width="currentRootWidth"
            :z-index="popperZIndex"
            @click="preventPopperHide"
            @params-change="headerParamsChange"
            @prevent-parent-popper-hide="preventPopperHide"
        />

        <!-- 分页 to body -->
        <transition :name="dropdownShow && animationFlag ? 'opacity' : ''">
            <div
                v-show="dropdownShow"
                ref="paginationRef"
                :class="['info-select-pagination-wrapper', randomId]"
                :style="{
                    width: currentRootWidth,
                    zIndex: parseInt(popperZIndex) + 5,
                    left: popperLeft,
                    top: paginationTop
                }"
                @click="preventPopperHide"
            >
                <Pagination
                    v-model:current-page="currentPage"
                    :total="total"
                    @current-change="paginationCurrentChange"
                />
            </div>
        </transition>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GInfoSelect',
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
import Pagination from '../component/pagination.vue'
import ResizeObserver from 'resize-observer-polyfill'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'

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
     * 分页总数
     */
    total?: number
    /**
     * 是否在 popper 隐藏时初始化参数
     */
    initParamsOnPopperHide?: boolean
    /**
     * value 值是否绑定为 data 的 item 对象
     */
    valueBindObj?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    optionsData: () => [],
    columns: () => [],
    optionProps: () => ({
        value: 'id',
        label: 'name'
    }),
    total: 0,
    initParamsOnPopperHide: true,
    valueBindObj: false
})

const emits = defineEmits(['paramsChange', 'closed'])

const randomId = `random-id-${uuidv4()}`
const popperClass = 'info-select-popper'
const dropdownShow = ref<boolean>(false)
const animationFlag = ref<boolean>(true)

// 组件根
const currentRootRef = ref<HTMLElement>(null)
// select 实例
const elSelectRef = ref<any>(null)
// 弹出根容器
const popperRoot = ref<HTMLElement>(null)
// 表格头
const infoHeaderWrapRef = ref<Element>(null)
// 待选项的滚动容器
const scrollWrapper = ref<HTMLElement>(null)
// 分页
const paginationRef = ref<HTMLElement>(null)

// DOM Position
const popperTop = ref<string>('')
const popperLeft = ref<string>('')
const popperZIndex = ref<string>('1')

// DOM Size
const infoHeaderHeight = ref<string>('34px')
const optionItemWrapperHeight = ref<number>(0)
const currentRootWidth = computed(() => `${currentRootRef.value?.clientWidth}px`)
const paginationTop = computed<string>(() => {
    // 分页的顶部距离 = 容器本身top + 表头高度 + 内容高度
    const headerHeight = parseFloat(infoHeaderHeight.value)
    const contentHeight = optionItemWrapperHeight.value
    const wrapTop = popperTop.value ? parseFloat(popperTop.value) : 0
    return `${wrapTop + headerHeight + contentHeight}px`
})

/**
 * 弹出容器的属性设置
 */
watchEffect(() => {
    const pRootDom = popperRoot.value
    const paginationDom = paginationRef.value
    if (!pRootDom || !paginationDom) return
    const paginationHeight = paginationDom.clientHeight

    // 根容器宽度 = width
    pRootDom.style.width = currentRootWidth.value
    // 头的高度 = padding-top
    pRootDom.style.paddingTop = infoHeaderHeight.value
    // 分页的高度 = padding-bottom
    pRootDom.style.paddingBottom = `${paginationHeight}px`
})

// 数据包装转换
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

// ------------- 隐藏 or 显示 + 表头位置获取 + 分页位置获取 ----------------------------------------------------------------------
// 观察器的配置（需要观察什么变动）
const config: MutationObserverInit = { attributes: true }
const setPosition = _.debounce((pRootDom?: HTMLElement) => {
    setTimeout(() => {
        infoHeaderHeight.value = `${(infoHeaderWrapRef.value as any).el.offsetHeight}px`
        optionItemWrapperHeight.value = pRootDom.querySelector('.el-select-dropdown').clientHeight
    }, 10)
}, 10)
// 当观察到变动时执行的回调函数
const callback = function (mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const pRootDom = mutation.target as HTMLElement
            const display = pRootDom.style['display']
            if (display !== 'none') {
                // popper 的位置 + 层级获取
                popperTop.value = pRootDom.style.top
                popperLeft.value = pRootDom.style.left
                popperZIndex.value = pRootDom.style.zIndex

                // 高度值
                setPosition(pRootDom)
            } else {
                // DOM 隐藏后
                initAtAfter()
                emits('closed')
            }
        }
    }
}
// 创建一个观察器实例并传入回调函数
let mutationOb = new MutationObserver(callback)
onMounted(() => {
    // 当前组件的 popper 根
    const currentPopperRootDom = document.querySelector(
        `.${popperClass}.${randomId}.el-select__popper`
    ) as HTMLElement

    /**
     * 需要将 表头dom 及 分页dom 挂载到 dom 上
     */
    const headerDom = document.querySelector(`.info-header-wrapper-to-body.${randomId}`)
    const paginationDom = document.querySelector(`.info-select-pagination-wrapper.${randomId}`)

    if (!currentPopperRootDom || !headerDom || !paginationDom) return null

    document.body.appendChild(headerDom)
    document.body.appendChild(paginationDom)

    // 存储及监听
    popperRoot.value = currentPopperRootDom
    mutationOb.observe(currentPopperRootDom, config)
})

// ------------- 表头横向滚动 & 监听列表容器高度变化 ----------------------------------------------------------------------
const scrollLeft = ref<number>(0)
watch(
    () => props.optionsData,
    (data) => {
        /**
         * 只有在待选项的数据不为空时，列表容器才会生成
         * 反之生成无数据提示
         */
        if (data && !!data.length) {
            setTimeout(() => {
                listeneSroll()
                listenHeight()
            }, 100)
        }
    },
    {
        immediate: true
    }
)
// 滚动同步到 header
function scrollEventHandle(e: Event) {
    scrollLeft.value = (e.target as Element).scrollLeft
}
// 监听容器滚动
function listeneSroll() {
    const scrollWrapperDom = document.querySelector(
        `.${popperClass}.${randomId} .el-scrollbar__wrap`
    )

    if (!scrollWrapperDom) return

    scrollWrapper.value = scrollWrapperDom as HTMLElement

    scrollWrapperDom.removeEventListener('scroll', scrollEventHandle)
    scrollWrapperDom.addEventListener('scroll', scrollEventHandle)
}
// 监听下拉列表的高度变化
let resizeOb: ResizeObserver = null
function listenHeight() {
    const optionItemWrapperDom = document.querySelector(
        `.${popperClass}.${randomId}.el-select-dropdown`
    )

    if (!optionItemWrapperDom) return

    const resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
        for (const item of entries) {
            const height = item.target.clientHeight
            if (optionItemWrapperHeight.value !== height) {
                optionItemWrapperHeight.value = height
            }
        }
    })

    resizeObserver.observe(optionItemWrapperDom)
    resizeOb = resizeObserver
}

// ------------- 下拉框出现/隐藏 && 阻止默认行为 ----------------------------------------------------------------------
const isPrevent = ref<boolean>(false)

/**
 * 无论是失去焦点，还是被设置了 visible = true
 * visibleChange 都会触发
 * 而我们需要区分二者
 *  - 手动设置 visible = true：flag = true & isPrevent.value = true（因为这一次打开是应为被设置了 visible = true，而 isPrevent 也是 true，所以不做处理）
 *  - 获取焦点展开时：这个时候是没有触发 preventPopperHide 的，故 isPrevent = false
 * 在确定是获取焦点展开时，进行状态的初始化
 *
 * 判断关闭时初始化是不行的
 * 因为 visibleChange 会先于点击事件 preventPopperHide 执行，那么当 flag 为 false 时，isPrevent 永远为 false
 * 并且当弹框关闭后，弹框处于 display: none 的状态，设置不了容器的 scrollLeft 了（实践出的结果）
 * 故需要将初始化的操作，放到打开行为里面
 */
const visibleChange = (flag: boolean) => {
    dropdownShow.value = flag
    if (flag && !isPrevent.value) initAtBefore()
}

/**
 * 分页点击阻止弹框收起，事件委托
 * 在点击分页 或 点击头部时，会首先使 select 失去焦点
 * 需要保持下拉框的展开，visible = true
 * 同时，阻止弹框收起时，不应该初始化状态
 * 设置一个标识 阻止默认行为的 flag
 * 开始阻止时，为 true
 * 结束后，延时改变状态
 */
const preventPopperHide = () => {
    isPrevent.value = true
    elSelectRef.value.visible = true
    animationFlag.value = false

    setTimeout(() => {
        isPrevent.value = false
    }, 300)
}

// ------------- 参数处理 ----------------------------------------------------------------------
const headerParams = ref<object>({})
const currentPage = ref<number>(1)
const paginationCurrentChange = () => {
    paramsChange()
}
const headerParamsChange = (params: object) => {
    headerParams.value = params
    /**
     * 在查询条件初始化时，应该初始化分页页码
     * 否则会出现参数 + 不正确的页码问题出现
     */
    paramsChange(1)
}
const paramsChange = (page?: number) => {
    if (page) {
        currentPage.value = page
    }

    emits('paramsChange', {
        ...headerParams.value,
        pageSize: 10,
        currentPage: currentPage.value
    })
}

/**
 * ------------- 初始化状态 ----------------------------------------------------------------------
 * - 位移清零
 * - 初始化动画
 *
 * 用户选择行为：
 * - 初始化分页页码
 * - 初始化上次查询的参数
 * - 抛出参数变化
 *
 * 分为 popper 展开前 & 收起后的初始化行为
 */
const initialized = ref<boolean>()
const initAtBefore = () => {
    if (scrollWrapper.value) {
        setTimeout(() => {
            scrollWrapper.value.scrollLeft = 0
        }, 100)
    }
}
const initAtAfter = () => {
    animationFlag.value = true
    initParamsHandle()
}
const initParamsHandle = _.debounce(() => {
    /**
     * 如果用户期望在 popper 关闭后，初始化参数
     * 需要在 dome 的实际 display hide 时，调用初始化参数的操作
     * 初始化参数的同时，将参数变化事件抛出
     * 促使用户重新请求一遍数据
     */
    if (props.initParamsOnPopperHide) {
        headerParams.value = {}
        initialized.value = !initialized.value
        paramsChange(1)
    }
}, 300)

// ------------- 卸载，停止观察 ----------------------------------------------------------------------
onUnmounted(() => {
    mutationOb && mutationOb.disconnect()
    mutationOb = null

    resizeOb && resizeOb.disconnect()
    resizeOb = null
})
</script>

<style lang="scss" scoped>
.g-info-select {
    width: 100%;
}

.opacity-enter-active,
.opacity-leave-active {
    transition: opacity 0.4s ease;
}
.opacity-enter-from,
.opacity-leave-to {
    opacity: 0;
}
</style>
<style lang="scss">
$--pagination-height: 32px;

// 下拉弹出容器
.info-select-popper {
    &.el-select__popper {
        overflow: hidden;
    }

    .el-select-dropdown__list {
        width: fit-content;
        margin-top: 0 !important;
    }
}

// 分页（to body）
.info-select-pagination-wrapper {
    position: absolute;
    height: $--pagination-height;
    overflow: hidden;
    display: flex;
    align-items: center;
    border-top: 1px solid #e4e7ed;
}
</style>
