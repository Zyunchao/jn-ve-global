<template>
    <div class="form-item-control-group-wrapper">
        <!-- 组分发到 item -->
        <template
            v-for="(extControlConfig, index) in controlConfigs"
            :key="`${extControlConfig.type}-${index}`"
        >
            <!-- 单控件 -->
            <FormItemControl
                :form-item-config="formItemConfig"
                :control-config="extendControlConfig2ControlConfig(extControlConfig)"
                :prop="toRef(localPropRef, index)"
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
import { PropType, ref, toRef } from 'vue'
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

const localPropRef = ref<any[]>(props.prop)

/**
 * 控件组需要保证绑定的值为数组（将以下标绑定给控件）
 */
if (!Array.isArray(localPropRef.value)) {
    throw new Error(`控件组绑定的值（${props.formItemConfig.prop}）需要是数组`)
}

/**
 * 且数组内的初始元素不能小于控件的数量
 */
if (localPropRef.value.length < props.controlConfigs.length) {
    throw new Error(
        `控件组绑定的值（${props.formItemConfig.prop}）数组初始长度不满足条件，应有 ${props.controlConfigs.length} 个元素`
    )
}

/**
 * 解刨 ExtendControlConfig，去除 after
 */
const extendControlConfig2ControlConfig = (config: ExtendControlConfig): ControlConfig => {
    const { after, ...controlConfig } = config
    return controlConfig
}
</script>

<style lang="scss" scoped>
.form-item-control-group-wrapper {
    width: 100%;
    display: flex;
    align-items: center;

    .control-separator {
        padding: 0 6px;
    }
}
</style>
