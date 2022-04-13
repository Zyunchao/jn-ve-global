<template>
    <div ref="groupWrapperRef" class="form-item-control-group-wrapper">
        <!-- 组分发到 item -->
        <template
            v-for="(extControlConfig, index) in controlConfigs"
            :key="`${extControlConfig.type}-${index}`"
        >
            <!-- 单控件 -->
            <FormItemControl
                v-if="!propRefChangeFlag"
                :form-item-config="formItemConfig"
                :control-config="extendControlConfig2ControlConfig(extControlConfig)"
                :prop="toRef(localPropRef, index)"
                @controlFocus="wrapperClass('add')"
                @controlBlur="wrapperClass('remove')"
            />

            <!-- 分隔符 -->
            <span
                v-if="extControlConfig.after && index < controlConfigs.length - 1"
                class="control-separator"
            >
                {{ extControlConfig.after }}
            </span>
        </template>
    </div>
</template>

<script lang="ts">
export default {
    name: 'FormItemControlGroup'
}
</script>

<script lang="ts" setup>
import { PropType, ref, toRef, watch, nextTick } from 'vue'
import { FormItemProps, ExtendControlConfig, ControlConfig } from '../index'
import FormItemControl from './formItemControl.vue'

interface Props {
    /**
     * 当前控件 formItem 的配置对象
     */
    formItemConfig: FormItemProps
    /**
     * 当前控制组的配置列表
     */
    controlConfigs: ExtendControlConfig[]
    /**
     * 绑定的值，必须是数组
     */
    prop: any[] | object
}

const props = withDefaults(defineProps<Props>(), {
    formItemConfig: null,
    controlConfigs: () => [],
    prop: () => []
})

let localPropRef = ref(props.prop)
const groupWrapperRef = ref<HTMLElement>(null)
const propRefChangeFlag = ref<boolean>(false)

/**
 * 在重置表单的 model 时，因为当前组件使用的是数组引用
 * 届时 props.prop 会更换引用
 * 但是控件绑定的还是上一个数组引用的某一个 item 的引用
 * 所以，要在 prop 更换引用时，更换控件绑定最新数组的 item 的引用
 * 在这里使用销毁控件再重新创建的方式，如果有更好的方法，请替换
 */
watch(
    () => localPropRef.value,
    (val) => {
        propRefChangeFlag.value = true
        nextTick(() => {
            propRefChangeFlag.value = false
        })
    }
)

/**
 * 解刨 ExtendControlConfig，去除 after
 */
const extendControlConfig2ControlConfig = (config: ExtendControlConfig): ControlConfig => {
    const { after, ...controlConfig } = config
    return controlConfig
}

// 给容器添加 | 移除类名
const wrapperClass = (type: 'add' | 'remove') => {
    groupWrapperRef.value.classList[type]('is-focus')
}
</script>

<style lang="scss" scoped>
.form-item-control-group-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    border: 1px solid var(--el-border-color);
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-border);
    box-sizing: border-box;
    min-height: var(--jn-ve-g-form-item-height) !important;

    &:hover {
        border-color: var(--el-input-hover-border, var(--el-border-color-hover));
    }

    &.is-focus {
        border-color: var(--el-input-focus-border, var(--el-color-primary));
    }

    .control-separator {
        padding: 0 6px;
        color: var(--el-text-color-regular);
        min-height: calc(var(--jn-ve-g-form-item-height) - 2px) !important;
        line-height: calc(var(--jn-ve-g-form-item-height) - 2px) !important;
        display: block;
    }

    // 控件原始边框
    :deep(.el-input__inner),
    :deep(.el-select .el-input.is-focus .el-input__inner) {
        box-shadow: none !important;
    }

    /* el-input-number */
    :deep(.el-input-number) {
        min-width: 180px;
    }

    /* el-radio-group */
    :deep(.el-radio-group) {
        max-height: 40px;
    }

    /* 禁用 */
    :deep(.is-disabled + .control-separator) {
        background-color: var(--el-disabled-bg-color);
    }

    /* 组件容器 */
    > :deep(div) {
        flex: 1;
    }
}
</style>
<style lang="scss">
.el-form-item.is-error {
    .form-item-control-group-wrapper {
        border-color: var(--el-color-danger);
    }
}
</style>
