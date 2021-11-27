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
                @controlFocus="onFocus"
                @controlBlur="onBlur"
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

const props = defineProps({
    /**
     * 当前控件 formItem 的配置对象
     */
    formItemConfig: {
        type: Object as PropType<FormItemProps>
    },
    /**
     * 当前控制组的配置列表
     */
    controlConfigs: {
        type: Array as PropType<ExtendControlConfig[]>,
        required: true,
        default: () => []
    },
    /**
     * 绑定的值，必须是数组
     */
    prop: {
        type: Object as PropType<any[]>,
        required: true
    }
})

let localPropRef = ref(props.prop)
const groupWrapperRef = ref<HTMLElement>(null)
const propRefChangeFlag = ref<boolean>(false)

/**
 * 在重置表单的 model 时，props.prop 会更换引用
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

const onFocus = () => {
    wrapperClass('add')
}

const onBlur = () => {
    wrapperClass('remove')
}
</script>

<style lang="scss" scoped>
.form-item-control-group-wrapper {
    width: 100%;
    display: flex;
    align-items: center;
    border: var(--el-input-border, var(--el-border-base));
    border-radius: var(--el-input-border-radius, var(--el-border-radius-base));
    transition: var(--el-transition-border);

    &:hover {
        border-color: var(--el-input-hover-border, var(--el-border-color-hover));
    }

    &.is-focus {
        border-color: var(--el-input-focus-border, var(--el-color-primary));
    }

    .control-separator {
        padding: 0 6px;
        color: var(--el-text-color-regular);
    }

    /* input */
    :deep(.el-input) {
        input {
            border: none;
        }
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
        background-color: var(--el-disabled-fill-base);
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
