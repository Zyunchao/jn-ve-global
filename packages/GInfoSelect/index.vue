<template>
    <div ref="infoSelectRef" class="g-info-select">
        <!-- 下拉框，虚拟滚动 -->
        <el-select-v2
            filterable
            :options="localSelectOptins"
            popper-class="info-select-popper"
            v-bind="$attrs"
            :height="popperHeight"
            style="width: 100%"
            :popper-append-to-body="false"
            @visible-change="visibleChange"
        >
            <template #default="{ item, $index }">
                <ul class="select-option-custom-content">
                    <template
                        v-for="(column, columnIndex) in columns"
                        :key="`${column[optionProps.value]}-${columnIndex}`"
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
        </el-select-v2>

        <!-- 表头（依据 columns 生成） -->
        <transition :name="dropdownShow ? 'dropdown' : ''">
            <div v-if="dropdownShow" ref="infoHeaderWrap" class="info-header-wrap">
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
    name: 'GInfoSelect',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, onMounted, nextTick } from 'vue'
import InfoSelectColumnProps from './interface/InfoSelectColumnProps'
import FunctionalComponent from '../FunctionalComponent'
import { SelectOptionProps } from '../index'

interface Props {
    /**
     * 下拉框数据
     */
    optionsData: SelectOptionProps[]
    /**
     * option 展示的列
     */
    columns: InfoSelectColumnProps[]
    /**
     * option item 绑定的值
     */
    optionProps?: {
        value: string
        label: string
    }
}

const props = withDefaults(defineProps<Props>(), {
    optionsData: () => [],
    columns: () => [],
    optionProps: () => ({
        value: 'id',
        label: 'name'
    })
})

// 高度计算
const headerBottom = '-47px'
const optionItemBaseHeight = '34px'
const optionWrapBaseBottom = '14px'
const optionMaxItemNum = 5
const popperHeight = parseInt(optionItemBaseHeight) * optionMaxItemNum

const dropdownShow = ref<boolean>(false)
// 组件根
const infoSelectRef = ref<Element>(null)
// 表格头
const infoHeaderWrap = ref<Element>(null)
// 待选项的容器
const optionItemWrapper = ref<Element>(null)

watch(
    () => props.optionsData,
    (data) => {
        if (data && !!data.length) {
            setTimeout(() => {
                // 监听 el-select-dropdown__list 的横向滚动
                const optionItemWrapperDom = infoSelectRef.value.querySelector(
                    '.info-select-popper .el-select-dropdown__list'
                )

                // 保险
                if (!optionItemWrapperDom) return

                optionItemWrapper.value = optionItemWrapperDom

                // 先解绑旧的，再绑定
                optionItemWrapperDom.removeEventListener('scroll', scrollEventHandle)
                optionItemWrapperDom.addEventListener('scroll', scrollEventHandle)
            }, 100)
        }
    },
    {
        immediate: true
    }
)
function scrollEventHandle(e: Event) {
    infoHeaderWrap.value && (infoHeaderWrap.value.scrollLeft = (e.target as Element).scrollLeft)
}

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

// 下拉框出现/隐藏
const visibleChange = (flag: boolean) => {
    dropdownShow.value = flag

    // 关闭下拉框后，位移清零
    if (!flag && !!optionItemWrapper.value) {
        optionItemWrapper.value.scrollLeft = 0
    }
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
$--header-hieght: v-bind(optionItemBaseHeight);

.g-info-select {
    position: relative;
    width: 100%;
    min-width: 100px;

    /* 下拉框 */
    :deep(.el-select-v2) {
        z-index: 1;
        .info-select-popper {
            .el-select-dropdown__list {
                overflow-x: auto !important;
                margin-top: $--header-hieght !important;
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

                .select-option-custom-content {
                    display: flex;

                    li {
                        height: $--header-hieght;
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;

                        span {
                            &.option-text {
                                line-height: $--header-hieght;
                            }
                        }
                    }
                }

                .el-select-dropdown__option-item {
                    width: fit-content !important;
                    min-width: 100%;
                }
            }

            .el-select-v2__empty {
                margin-top: $--header-hieght;
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
        bottom: v-bind(headerBottom);
        z-index: 2;
        border-radius: 4px 4px 0 0;
        padding: 0 32px 0 20px;

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
<style lang="scss"></style>
