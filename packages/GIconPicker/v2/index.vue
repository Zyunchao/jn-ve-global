<template>
    <el-input
        ref="inputRef"
        v-model="localModelValue"
        class="icon-picker"
        clearable
        placeholder="请输入或点击右侧"
        :disabled="disabled"
        v-bind="$attrs"
    >
        <template #prepend>
            <LGIcon :icon="localModelValue" />
        </template>

        <template #append>
            <div class="trigger" @click="!disabled && (modalShow = true)">
                <LGIcon icon="ali-icon-xiaolian" />
            </div>
        </template>
    </el-input>

    <g-modal v-model="modalShow" title="选择图标" custom-class="icon-picker-modal">
        <div>
            <div class="title">
                项目图标
            </div>
            <ul class="icon-wrapper">
                <li
                    v-for="icon in localIcons"
                    :key="icon"
                    class="icon-item local-svg"
                    :class="{ 'is-active': icon === localModelValue }"
                    @click="selecteHandle(icon)"
                >
                    <LGIcon :icon="icon" />
                </li>
            </ul>
        </div>
        <div>
            <div class="title">
                Element
            </div>
            <ul class="icon-wrapper">
                <li
                    v-for="icon in elIconKeys.map((item) => `el-${item}`)"
                    :key="icon"
                    class="icon-item el"
                    :class="{ 'is-active': icon === localModelValue }"
                    @click="selecteHandle(icon)"
                >
                    <LGIcon :icon="icon" />
                </li>
            </ul>
        </div>
        <div>
            <div class="title">
                IconFont
            </div>
            <ul class="icon-wrapper">
                <li
                    v-for="icon in aliIcons"
                    :key="icon"
                    class="icon-item ali"
                    :class="{ 'is-active': icon === localModelValue }"
                    @click="selecteHandle(icon)"
                >
                    <LGIcon :icon="icon" />
                </li>
            </ul>
        </div>
    </g-modal>
</template>

<script lang="ts">
export default {
    name: 'GIconPickerV2'
}
</script>

<script lang="ts" setup>
import { watch, ref, computed, nextTick } from 'vue'
import { elIconKeys, aliIcons, localIcons } from '../data/icons'
import { ElInput } from 'element-plus'
import LGIcon from '../../GIcon/index.vue'

const props = withDefaults(
    defineProps<{
        /**
         * 双向绑定的图标值
         */
        modelValue: string
        /**
         * 禁用
         */
        disabled?: boolean
    }>(),
    {
        modelValue: '',
        disabled: false
    }
)

const emits = defineEmits(['update:modelValue'])

const modalShow = ref<boolean>(false)
const inputRef = ref<InstanceType<typeof ElInput> | null>(null)

const localModelValue = computed({
    get: () => props.modelValue,
    set(val) {
        emits('update:modelValue', val)
    }
})

watch(
    () => modalShow.value,
    (show) => {
        if (show) {
            nextTick(() => {
                inputRef.value.blur()
            })
        }
    }
)

const selecteHandle = (icon: string) => {
    localModelValue.value = icon
    modalShow.value = false
}
</script>

<style lang="scss" scoped>
.icon-picker {
    --input-icon-prepend-width: 45px;

    :deep(.el-input__wrapper) {
        width: calc(100% - var(--input-icon-prepend-width) * 2);
    }

    :deep(.el-input-group__prepend),
    :deep(.el-input-group__append) {
        padding: 0;
        width: var(--input-icon-prepend-width);

        .custom-svg-icon,
        i {
            font-size: 20px;
        }

        &.el-input-group__append {
            cursor: pointer;

            .trigger {
                width: 100%;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
            }
        }
    }
}
</style>
<style lang="scss">
.icon-picker-modal {
    .title {
        font-size: 20px;
        margin: 10px 0;
    }
    .icon-wrapper {
        display: flex;
        flex-wrap: wrap;
        background: #eee;
        border-radius: 4px;

        .icon-item {
            box-sizing: border-box;
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            padding: 10px;
            transition: all 0.3s;
            width: calc(100% / 14);
            cursor: pointer;
            border: 1px dashed transparent;
            border-radius: 4px;

            &:hover,
            &.is-active {
                border: 1px dashed #53a8ff;

                .custom-svg-icon,
                i {
                    color: #53a8ff;
                }
            }

            .custom-svg-icon,
            i {
                transition: all 0.3s;
                font-size: 32px;
            }
        }
    }
}
</style>
