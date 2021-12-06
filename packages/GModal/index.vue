<template>
    <!-- dialog 对话框 -->
    <el-dialog
        v-if="localType === 'dialog'"
        v-model="localModalShow"
        :width="localWidth"
        destroy-on-close
        top="5vh"
        v-bind="$attrs"
        :custom-class="`g-custom-dialog ${$attrs['custom-class'] || ''}`"
    >
        <!-- title -->
        <template v-if="$slots.title" #title>
            <slot name="title" />
        </template>

        <!-- 弹框内容 -->
        <template #default>
            <slot />
        </template>

        <!-- 底部按钮 -->
        <template v-if="!hideFooter && ($slots.footer || (btns && !!btns.length))" #footer>
            <slot name="footer">
                <!-- 按钮组 -->
                <div v-if="btns && !!btns.length" class="modal-btn-wrapper">
                    <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                        <el-button v-show="!btn.hide" v-bind="btn">
                            {{ btn.label }}
                        </el-button>
                    </template>
                </div>
            </slot>
        </template>
    </el-dialog>

    <!-- drawer 抽屉 -->
    <el-drawer
        v-if="localType === 'drawer'"
        v-model="localModalShow"
        :size="localWidth"
        destroy-on-close
        v-bind="$attrs"
        :custom-class="`g-custom-drawer ${$attrs['custom-class'] || ''}`"
    >
        <!-- title -->
        <template v-if="$slots.title" #title>
            <slot name="title" />
        </template>

        <!-- 内容 -->
        <div class="drawer-content">
            <el-scrollbar class="drawer-content-scrollbar">
                <slot />
            </el-scrollbar>
        </div>

        <!-- 底 -->
        <div v-if="!hideFooter && ($slots.footer || (btns && !!btns.length))" class="drawer-footer">
            <slot name="footer">
                <!-- 按钮组 -->
                <div v-if="btns && !!btns.length" class="modal-btn-wrapper">
                    <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
                        <el-button v-show="!btn.hide" v-bind="btn">
                            {{ btn.label }}
                        </el-button>
                    </template>
                </div>
            </slot>
        </div>
    </el-drawer>
</template>

<script lang="ts">
export default {
    name: 'GDialog',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, PropType, useAttrs } from 'vue'
import { BtnProps } from '../GBaseModule/interface/BaseModuleConfig'

const props = defineProps({
    type: {
        type: String as PropType<'dialog' | 'drawer'>,
        default: 'dialog'
    },
    /**
     * 控制显示的 flag
     */
    modelValue: {
        type: Boolean
    },
    /**
     * 按钮组
     */
    btns: {
        type: Array as PropType<BtnProps[]>,
        default: () => []
    },
    /**
     * 隐藏底部
     */
    hideFooter: {
        type: Boolean,
        default: false
    },
    /**
     * 宽度
     */
    width: {
        type: [String, Number],
        default: ''
    }
})

const emits = defineEmits(['update:modelValue'])

// 与父级通信
const localModalShow = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val)
})

// 本地类型（做统一化控制）
const localType = computed(() => props.type)

// 本地 width
const localWidth = computed(() => {
    if (props.width) return props.width
    if (props.type === 'dialog') return '70%'
    return '50%'
})
</script>

<style lang="scss" scoped>
.modal-btn-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
}
</style>
<style lang="scss">
@import './styles.scss';
</style>
