<template>
    <div ref="currentRootRef" class="g-info-select-all">
        <!-- 下拉框，虚拟滚动 -->
        <el-select-v2
            filterable
            :options="localSelectOptins"
            v-bind="$attrs"
            popper-class="info-select-all-popper"
            :height="popperHeight"
            style="width: 100%"
            :popper-append-to-body="false"
            @visible-change="visibleChange"
        >
            <template #default="{ item, $index }">
                <OptionCustomContent :columns="columns" :data="item" :index="$index" />
            </template>
        </el-select-v2>

        <!-- 表头（依据 columns 生成） -->
        <transition :name="dropdownShow ? 'dropdown' : ''">
            <InfoHeader
                v-if="!hideHeader"
                v-show="dropdownShow"
                type="select-all"
                :height="optionItemBaseHeight"
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
    name: 'GInfoSelectAll',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { watch, ref, computed, onMounted, onUnmounted } from 'vue'
import InfoColumnProps from '../interface/InfoColumnProps'
import FunctionalComponent from '../../FunctionalComponent'
import { SelectOptionProps } from '../../index'
import InfoHeader from '../component/infoHeader.vue'
import OptionCustomContent from '../component/optionCustomContent.vue'
import { getWidth } from '../utils'

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

// 高度计算
const optionWrapBaseBottom: string = '8px'
const baseHeight: string = '34px'
const optionItemBaseHeight = computed<string>(() => (!props.hideHeader ? baseHeight : '0px'))
const popperHeight = computed(() => parseInt(baseHeight) * props.optionMaxItemNum)

const dropdownShow = ref<boolean>(false)
// 组件根
const currentRootRef = ref<Element>(null)
// 表格头
const infoHeaderWrapRef = ref<Element>(null)
// 待选项的容器
const optionItemWrapper = ref<Element>(null)

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
// 下拉框弹出层 dom 操作
// 当前组件的下拉弹框的 id，多个组件时，保证下拉框唯一
const popperRoot = ref<Element>(null)
const popperTop = ref<string>('')
const popperLeft = ref<string>('')

// 观察器的配置（需要观察什么变动）
const config: MutationObserverInit = { attributes: true }
const callback = function (mutationsList: MutationRecord[]) {
    for (let mutation of mutationsList) {
        if (mutation.type === 'attributes' && mutation.attributeName === 'style') {
            const pRootDom = mutation.target as HTMLElement
            const display = pRootDom.style['display']
            if (display !== 'none') {
                popperTop.value = pRootDom.style.top
                popperLeft.value = pRootDom.style.left
            }
        }
    }
}

// 创建一个观察器实例并传入回调函数
let mutationOb = new MutationObserver(callback)
onMounted(() => {
    const pRootDom = currentRootRef.value.querySelector('.info-select-all-popper')
    popperRoot.value = pRootDom
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
    const optionItemWrapperDom = currentRootRef.value.querySelector(
        '.info-select-all-popper .el-select-dropdown__list'
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
@import '../styles.scss';
$--item-base-height: v-bind(optionItemBaseHeight);

.g-info-select-all {
    position: relative;
    width: 100%;
    min-width: 100px;

    /* 下拉框 */
    :deep(.el-select-v2) {
        .el-select-v2__wrapper {
            .el-select-v2__placeholder {
                color: var(--el-text-color-placeholder);
            }
        }

        // 下拉框弹出和输入框是平级的
        .info-select-all-popper {
            z-index: $--base-zi !important;

            .el-select-dropdown__list {
                overflow-x: auto !important;
                margin-top: $--item-base-height !important;
                padding-bottom: v-bind(optionWrapBaseBottom) !important;
                margin-bottom: 0 !important;
                box-sizing: content-box;

                &::-webkit-scrollbar {
                    height: v-bind(optionWrapBaseBottom);
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

            .el-select-v2__empty {
                margin-top: $--item-base-height;
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
<style lang="scss"></style>
