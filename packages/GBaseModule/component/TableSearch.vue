<template>
    <div ref="self" :class="['search-wrapper not-select', `${mode}-mode`]">
        <div v-if="showTitle" class="top">
            <span class="title">查询条件</span>
            <div v-if="moreSearchMode" :class="['more', modeClass]" @click="handleMoreSearch">
                <img :src="tableSearchMoreIcon" alt="" srcset="">
                <span>更多查询</span>
            </div>
        </div>

        <!-- 核心表单 -->
        <div class="form-wrapper">
            <div :class="['search-field-form-wrapper', modeClass]">
                <LGForm class="search-field-form" :config="(localSearchFormConfig as FormProps)" />
            </div>

            <!-- 
                搜索条件创建分为两种情况
                1. 追加（push 到搜索条件中）
                2. 独占一行（表明独占一行 或 显示更多查询）
             -->
            <LGForm
                v-if="searchBtnHorizontal || moreSearchMode"
                :config="(localSearchBtnsFormConfig as FormProps)"
            />
        </div>

        <!-- 扁平化模式下的查看更多操作按钮 -->
        <div v-if="mode === 'tabular'" class="show-more-btn-wrapper" @click="handleMoreSearch">
            <span>{{ modeTriggerLabel }}</span>
            <g-icon
                v-if="moreSearchMode === 'pull-down'"
                :icon="pullDownFlag ? 'el-ArrowUp' : 'el-ArrowDown'"
            />
        </div>
    </div>

    <!-- 更多查询弹出框 -->
    <LGModal
        v-if="moreSearchMode === 'popup'"
        v-model="dialogVisible"
        custom-class="base-module-search-more-dialog"
        title="更多查询"
        width="80%"
        top="5vh"
        :destroy-on-close="false"
    >
        <el-scrollbar max-height="400px">
            <LGForm :config="(localSearchFormConfig as FormProps)" />
        </el-scrollbar>
        <LGForm :config="(localSearchBtnsFormConfig as FormProps)" />
    </LGModal>
</template>

<script lang="tsx">
export default {
    name: 'GBaseModuleTableSearch'
}
</script>

<script lang="tsx" setup>
import { PropType, watch, ref, computed, reactive, onMounted } from 'vue'
import { FormProps, FormItemProps } from '../../GForm'
import LGForm from '../../GForm/index.vue'
import tableSearchMoreIcon from '@component/assets/icons/svg/old/table-search-more.svg'
import { getStyle } from '@jsjn/utils'
import LGModal from '../../GModal/index.vue'
import type { BaseModuleMode } from '@component/_globalConstant/baseModuleMode'

interface Props {
    /**
     * 搜索条件表单配置
     */
    searchFormProps?: FormProps
    /**
     * 按钮组
     */
    searchBtnsConfig?: FormItemProps
    /**
     * 去除 “查询条件” label
     */
    noSearchLabel?: boolean
    /**
     * 搜索按钮是否独占一行
     */
    searchBtnHorizontal?: boolean
    /**
     * 更多查询展示方式
     * pullDown：下拉
     * popup：弹出
     */
    moreSearchMode?: 'pull-down' | 'popup'
    /**
     * 基础布局的模式，同步父级
     */
    mode?: BaseModuleMode
}

const props = withDefaults(defineProps<Props>(), {
    searchFormProps: null,
    searchBtnsConfig: null,
    noSearchLabel: false,
    searchBtnHorizontal: false,
    moreSearchMode: undefined,
    mode: 'classic'
})

const showTitle = computed(
    () => !props.noSearchLabel || (props.moreSearchMode && props.mode === 'classic')
)

/**
 * 按钮组 form config
 */
const localSearchBtnsFormConfig = reactive<FormProps>({
    instance: null,
    model: {},
    formItems: [props.searchBtnsConfig]
})

/**
 * 判断是否需要将按钮组追加到搜索条件中
 * 1. 是否独占一行
 * 2. 是否显示更多查询
 * 3. 是否已包含（用户配置自定义按钮组权限更高）
 */
const localSearchFormConfig = ref<FormProps>(props.searchFormProps)
if (
    !localSearchFormConfig.value.formItems.some((formItem) => formItem.prop === 'opertion-btn') &&
    !props.searchBtnHorizontal &&
    !props.moreSearchMode
) {
    localSearchFormConfig.value.formItems.push(props.searchBtnsConfig)
}

// 弹框
const dialogVisible = ref<boolean>(false)
// 下拉
const pullDownFlag = ref<boolean>(false)

const modeClass = computed<string>(() => {
    return `${props.moreSearchMode ? props.moreSearchMode : ''} ${
        props.moreSearchMode === 'pull-down' && pullDownFlag.value ? 'active' : ''
    }`
})

const modeTriggerLabel = computed<string>(() =>
    props.moreSearchMode === 'pull-down' ? (!pullDownFlag.value ? '展开' : '收起') : '查看更多'
)

/**
 * 下拉模式，原 form 高度
 * 这里获取的是 dom 的实际 height，故不需要 rem 的转换
 */
const self = ref<HTMLElement>(null)
const searchFieldFormHeight = ref<string>('auto')
onMounted(() => {
    if (props.moreSearchMode !== 'pull-down') return
    const searchFieldFormDom = self.value.querySelector('.search-field-form')
    const domHeight = getStyle(searchFieldFormDom, 'height')
    searchFieldFormHeight.value = domHeight
})

// 更多查询
const handleMoreSearch = () => {
    if (props.moreSearchMode === 'popup') {
        dialogVisible.value = true
    } else if (props.moreSearchMode === 'pull-down') {
        pullDownFlag.value = !pullDownFlag.value
    }
}

defineExpose({
    closePopup: () => {
        dialogVisible.value = false
    },
    popupShow: dialogVisible
})
</script>

<style lang="scss" scoped>
@import './styles/classic-mode.scss';
@import './styles/tabular-mode.scss';

.search-wrapper {
    .form-wrapper {
        padding: 0 var(--jn-ve-g-base-module-padding-lr);

        // 搜索条件表单
        .search-field-form-wrapper {
            // 弹框
            &.pull-down,
            &.popup {
                height: calc(var(--jn-ve-g-form-item-height) + var(--jn-ve-g-form-item-margin-b));
                overflow: hidden;
            }

            // 下拉
            &.pull-down {
                transition: height 0.2s;

                &.active {
                    height: v-bind(searchFieldFormHeight);
                }
            }
        }

        // 按钮
        :deep(.search-btn-item) {
            .el-form-item__content {
                .el-button {
                    --jn-ve-g-btn-padding-lr: var(--jn-ve-g-btn-padding-lr2);
                    --jn-ve-g-base-font-size-s: 17px;

                    span {
                        margin-left: 10px;
                        line-height: 1;
                        height: 100%;
                    }

                    i {
                        font-size: calc(var(--jn-ve-g-base-font-size-s) + 2px);
                        height: 100%;
                    }
                }
            }
        }
    }
}
</style>
<style lang="scss">
.base-module-search-more-dialog {
    .el-dialog__body {
        padding: 14px 0 14px 28px;

        .el-scrollbar {
            margin-bottom: 10px;
            .el-scrollbar__view {
                padding-right: 28px;
            }
        }
    }
}
</style>
