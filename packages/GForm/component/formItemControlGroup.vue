<template>
    <div ref="groupWrapperRef" class="form-item-control-group-wrapper">
        <!-- 组分发到 item -->
        <template
            v-for="(extControlConfig, index) in controlConfigs"
            :key="`${extControlConfig.type}-${index}`"
        >
            <!-- 单控件 -->
            <FormItemControl
                :form-item-config="formItemConfig"
                :control-config="extendControlConfig2ControlConfig(extControlConfig)"
                :prop="toRef(localControlBindObjRef, `_${index}`)"
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
import { ref, toRef, watch, reactive, computed } from 'vue'
import { FormItemProps, ExtendControlConfig, ControlConfig } from '../index'
import FormItemControl from './formItemControl.vue'
import _ from 'lodash'

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
     * 表单 model 源数据
     */
    sourceModel: object
    /**
     * 当前 item 要绑定的字段 key
     */
    propKey: string
}

const props = withDefaults(defineProps<Props>(), {
    formItemConfig: null,
    controlConfigs: () => [],
    sourceModel: () => null,
    propKey: ''
})

const groupWrapperRef = ref<HTMLElement>(null)

const currentSourceProp = computed(() => props.sourceModel[props.propKey])

/**
 * 本地绑定（以对象的 key 进行绑定）
 * 本地和源需要进行平行区分
 * 二者关系：
 *  - 初始化，取外部源的值
 *  - 本地改变，抛出，使源改变
 *  - 源改变，内部获取
 */
const localControlBindObjRef = reactive<{ [key: string]: any }>({})

/**
 * 赋予初始化值
 */
props.controlConfigs.forEach((item, index) => {
    localControlBindObjRef[`_${index}`] = _.clone(props.sourceModel[props.propKey][index])
})

/**
 * 数据抛出
 * 获取对象 values，作为实际需要的数据
 *
 * 注意：这里通过 props 的引用传递，对外面的源数据进行了修改
 * 这里是一个危险行为，如果后续出现问题，请重点排查这里
 */
watch(
    () => localControlBindObjRef,
    (val) => {
        /* eslint-disable vue/no-mutating-props */
        props.sourceModel[props.propKey] = _.cloneDeep(Object.values(localControlBindObjRef))
    },
    {
        deep: true
    }
)

/**
 * 数据回填
 * 基于本地数据抛出后，响应数组的变化
 * 如果源数据与本地数据不一致，说明是远程数据的改变
 *  - 初始化
 *  - 赋值（回填）
 *
 * 故需要将本地与远程同步更改
 */
watch(
    () => currentSourceProp.value,
    (val) => {
        // 源数据 和 本地数据 比对
        if (!_.isEqual(val, Object.values(localControlBindObjRef))) {
            Object.keys(localControlBindObjRef).forEach((key) => {
                const index = (key.replace('_', '') as any) - 0
                const item = val[index]

                if (!_.isEqual(item, localControlBindObjRef[key])) {
                    localControlBindObjRef[key] = item
                }
            })
        }
    },
    {
        deep: true
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
    :deep(.el-input__wrapper),
    :deep(.el-input__inner),
    :deep(.el-select .el-input.is-focus .el-input__inner),
    :deep(.el-select .el-input.is-focus .el-input__wrapper) {
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
