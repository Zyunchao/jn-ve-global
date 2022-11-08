<template>
    <div
        :class="[
            'g-choose',
            {
                'no-box': noBox,
                'one-line': isOneLine,
                'is-expansion': expansion
            }
        ]"
    >
        <component :is="groupComponent" v-bind="$attrs">
            <template v-for="(option, index) in options" :key="`${option.value}-${index}`">
                <component
                    :is="componentMapping[type]"
                    :label="option.value"
                    v-bind="getOptionProps(option)"
                >
                    {{ option.label }}
                </component>
            </template>
        </component>

        <LGIcon
            v-if="isOneLine"
            class="expansion-btn"
            :icon="expansion ? 'el-ArrowUp' : 'el-ArrowDown'"
            @click="expansion = !expansion"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GChoose',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import type {
    RadioOptionProps,
    RadioButtonOptionProps,
    CheckboxBoxOptionProps,
    CheckboxButtonOptionProps
} from '../../index'
import {
    ElCheckboxGroup,
    ElCheckbox,
    ElCheckboxButton,
    ElRadioGroup,
    ElRadio,
    ElRadioButton
} from 'element-plus'
import LGIcon from '../../../GIcon/index.vue'

const componentMapping = {
    checkBox: ElCheckbox,
    checkBoxButton: ElCheckboxButton,
    radio: ElRadio,
    radioButton: ElRadioButton
}

const props = withDefaults(
    defineProps<{
        /**
         * 选择适用类型
         */
        type: 'checkBox' | 'checkBoxButton' | 'radio' | 'radioButton'
        /**
         * 待选项列表
         */
        options:
            | RadioOptionProps[]
            | RadioButtonOptionProps[]
            | CheckboxBoxOptionProps[]
            | CheckboxButtonOptionProps[]
        /**
         * 没有选择框，只有文字
         */
        noBox?: boolean
        /**
         * 默认只显示一行
         */
        oneLine?: boolean
    }>(),
    {
        type: 'checkBox',
        options: () => [],
        noBox: false,
        oneLine: false
    }
)

// 获取对应的 “组” component
const groupComponent = computed(() => {
    return ['radio', 'radioButton'].includes(props.type) ? ElRadioGroup : ElCheckboxGroup
})
const isOneLine = computed(
    () => props.oneLine && !['checkBoxButton', 'radioButton'].includes(props.type)
)

const expansion = ref<boolean>(false)

const getOptionProps = (
    itemProps:
        | RadioOptionProps
        | RadioButtonOptionProps
        | CheckboxBoxOptionProps
        | CheckboxButtonOptionProps
) => {
    const { label, value, ...props } = itemProps
    return props
}
</script>

<style lang="scss" scoped>
.g-choose {
    &.no-box {
        :deep(.el-radio-group),
        :deep(.el-checkbox-group) {
            .el-radio__input,
            .el-checkbox__input {
                display: none;
            }

            .el-checkbox__label,
            .el-radio__label {
                &:hover {
                    color: var(--el-color-primary);
                }
            }

            .el-radio,
            .el-checkbox {
                position: relative;

                &::after {
                    content: '|';
                    position: absolute;
                    right: calc(-1 * ((8px + 24px) / 2));
                }

                &:last-of-type {
                    &::after {
                        display: none;
                    }
                }
            }
        }
    }

    &.one-line {
        max-height: var(--jn-ve-g-form-item-height);
        overflow: hidden;
        display: flex;
        transition: max-height 0.4s;

        &.is-expansion {
            max-height: calc(var(--jn-ve-g-form-item-height) * 4);
        }
    }

    :deep(.expansion-btn) {
        cursor: pointer;
        height: var(--jn-ve-g-form-item-height);
    }
}
</style>
