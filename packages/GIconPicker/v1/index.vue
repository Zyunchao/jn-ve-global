<template>
    <div ref="gIconPickerRootRef" class="g-icon-picker-wrapper">
        <el-popover
            trigger="click"
            placement="bottom"
            :show-arrow="false"
            :width="popperWidth"
            :offset="6"
            popper-class="g-icon-picker-popper"
            :disabled="disabled"
        >
            <template #reference>
                <el-input
                    ref="elInputRef"
                    :model-value="localSelectedIcon"
                    readonly
                    placeholder="请选择图标"
                    :disabled="disabled"
                >
                    <template #prepend>
                        <g-icon :icon="localSelectedIcon" />
                    </template>

                    <template v-if="localSelectedIcon" #suffix>
                        <g-icon icon="el-CircleClose" @click="handleClearIcon" />
                    </template>
                </el-input>
            </template>

            <template #default>
                <el-scrollbar max-height="400px" @click="panelClick">
                    <el-collapse v-model="activeExpand" class="not-select">
                        <!-- 本地 svg 图标 -->
                        <el-collapse-item title="本地 SVG" name="local">
                            <el-scrollbar max-height="200px">
                                <div class="local-icons-wrapper">
                                    <template v-for="localIcon in localIcons" :key="localIcon">
                                        <LGIcon
                                            :class="{
                                                'is-active': localIcon === localSelectedIcon
                                            }"
                                            :icon="localIcon"
                                            @click.stop="handleSelect(localIcon)"
                                        />
                                    </template>
                                </div>
                            </el-scrollbar>
                        </el-collapse-item>

                        <!-- Element-plus icons -->
                        <el-collapse-item title="Element-plus Icons" name="el">
                            <el-scrollbar max-height="200px">
                                <template v-for="elIcon in elIconKeys" :key="elIcon">
                                    <LGIcon
                                        :class="{
                                            'is-active': `el-${elIcon}` === localSelectedIcon
                                        }"
                                        :icon="`el-${elIcon}`"
                                        @click.stop="handleSelect(`el-${elIcon}`)"
                                    />
                                </template>
                            </el-scrollbar>
                        </el-collapse-item>

                        <!-- 阿里图标 -->
                        <el-collapse-item title="阿里图标" name="ali">
                            <el-scrollbar max-height="200px">
                                <template v-for="aliIcon in aliIcons" :key="aliIcon">
                                    <LGIcon
                                        :class="{
                                            'is-active': aliIcon === localSelectedIcon
                                        }"
                                        :icon="aliIcon"
                                        @click.stop="handleSelect(aliIcon)"
                                    />
                                </template>
                            </el-scrollbar>
                        </el-collapse-item>
                    </el-collapse>
                </el-scrollbar>
            </template>
        </el-popover>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GIconPicker'
}
</script>

<script lang="ts" setup>
import { onMounted, watch, nextTick, ref, computed } from 'vue'
import LGIcon from '../../GIcon/index.vue'
import { elIconKeys, aliIcons, localIcons } from '../data/icons'

const props = defineProps({
    /**
     * 绑定的值
     */
    modelValue: {
        type: String,
        default: ''
    },
    disabled: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue'])

// 状态
const activeExpand = ref<string[]>(['local', 'el', 'ali'])
const popperWidth = ref<number>(0)

// ref
const gIconPickerRootRef = ref<HTMLElement>(null)
const elInputRef = ref(null)

// 绑定的值
const localSelectedIcon = computed<string>({
    get: () => props.modelValue,
    set: (val) => {
        emits('update:modelValue', val)
    }
})

// 获取组件宽度，弹出框同步宽度
watch(
    () => gIconPickerRootRef.value,
    (val) => {
        nextTick(() => {
            popperWidth.value = val.offsetWidth
        })
    }
)

const handleSelect = (icon: string) => {
    localSelectedIcon.value = icon
}

const handleClearIcon = () => {
    localSelectedIcon.value = ''
}

const panelClick = () => {
    elInputRef.value.focus()
}

defineExpose({
    elIconKeys,
    aliIcons,
    localIcons
})
</script>

<style lang="scss">
@import './styles.scss';
</style>
