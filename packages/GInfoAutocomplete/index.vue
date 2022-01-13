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
                <ul class="info-autocomp-custom-content">
                    <template
                        v-for="(column, columnIndex) in columns"
                        :key="`${column.prop}-${columnIndex}`"
                    >
                        <!-- 带有 toolTip -->
                        <el-tooltip
                            v-if="column.showOverflowTooltip"
                            effect="dark"
                            :content="item[column.prop]"
                            placement="top-start"
                        >
                            <li
                                :style="`width: ${getWidth(column.width)}; text-align: ${
                                    column.align || 'left'
                                };`"
                            >
                                <template v-if="column.render">
                                    <FunctionalComponent :render="column.render(item, $index)" />
                                </template>
                                <span v-else class="option-text">{{ item[column.prop] }}</span>
                            </li>
                        </el-tooltip>

                        <!-- 不带 toolTip -->
                        <li
                            v-else
                            :style="`width: ${getWidth(column.width)}; text-align: ${
                                column.align || 'left'
                            };`"
                        >
                            <template v-if="column.render">
                                <FunctionalComponent :render="column.render(item, $index)" />
                            </template>
                            <span v-else class="option-text">{{ item[column.prop] }}</span>
                        </li>
                    </template>
                </ul>
            </template>
        </el-autocomplete>

        <!-- 表头（依据 columns 生成） -->
        <transition :name="dropdownShow ? 'dropdown' : ''">
            <div v-if="dropdownShow" ref="infoHeaderWrapRef" class="info-header-wrap">
                <div class="info-header">
                    <span
                        v-for="(column, index) in columns"
                        :key="`${column.prop}-${index}`"
                        :style="`width: ${getWidth(column.width)}; text-align: ${column.align};`"
                        :title="column.label"
                    >
                        {{ column.label }}
                    </span>
                </div>
            </div>
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
import InfoAutocompleteColumnProps from './interface/InfoAutocompleteColumnProps'
import FunctionalComponent from '../FunctionalComponent'

interface Props {
    /**
     * option 展示的列
     */
    columns: InfoAutocompleteColumnProps[]
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

onUnmounted(() => {
    // 卸载，停止观察
    observer.disconnect()
    observer = null

    // 滚动容器事件移除
    scrollWrapRef.value.removeEventListener('scroll', scrollEventHandle)
})

// ------------- 表头横向滚动 ----------------------------------------------------------------------
/**
 * 监听横向滚动（表头追随）
 * autocomplete 的列表容器不同于 infoSelect，这个 dom 是一直存在的，只不过父元素隐藏了
 * 所以可以在 mounted 的时候绑定滚动事件
 */
onMounted(() => {
    const scrollWrap = autocompRef.value.querySelector(
        '.el-autocomplete-suggestion__wrap'
    ) as HTMLElement
    scrollWrapRef.value = scrollWrap
    scrollWrap.addEventListener('scroll', scrollEventHandle)
})
function scrollEventHandle(e: Event) {
    infoHeaderWrapRef.value &&
        (infoHeaderWrapRef.value.scrollLeft = (e.target as Element).scrollLeft)
}

// 依照配置项获取宽度
const getWidth = (width: string | number) => {
    const widthVal = width ? parseFloat(`${width}`) : 100
    const unit =
        typeof width === 'number'
            ? 'px'
            : width && (width.includes('px') || width.includes('rem'))
                ? ''
                : 'px'

    return `${widthVal}${unit}`
}
</script>

<style lang="scss" scoped>
$--header-hieght: 34px;
$--base-zi: 98;

.g-info-autocomplete {
    position: relative;
    width: 100%;
    min-width: 100px;

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

        /* 自定义内容 */
        .info-autocomp-custom-content {
            display: flex;

            > li {
                height: $--header-hieght;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                padding: 0;

                span {
                    &.option-text {
                        line-height: $--header-hieght;
                    }
                }
            }
        }
    }

    /* 头（遮挡） */
    .info-header-wrap {
        width: 100%;
        overflow: hidden;
        height: $--header-hieght;
        background-color: #e8e8e8;
        position: absolute;
        z-index: $--base-zi + 1;
        border-radius: 4px 4px 0 0;
        padding: 0 20px;
        top: v-bind(popperTop);
        left: v-bind(popperLeft);

        .info-header {
            height: 100%;
            width: fit-content;
            display: flex;
            align-items: center;

            span {
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color: #000000;
                font-size: var(--el-font-size-base);
                font-weight: 600;
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
