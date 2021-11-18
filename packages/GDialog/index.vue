<template>
    <el-dialog
        v-model="localDialogShow"
        width="70%"
        destroy-on-close
        top="5vh"
        v-bind="$attrs"
        :custom-class="`custom-dialog ${$attrs['custom-class']}`"
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
        <template v-if="!hideFooter || $slots.footer" #footer>
            <div v-if="!$slots.footer" class="dialog-btn-wrapper">
                <template v-if="btns && btns.length > 0">
                    <el-button
                        v-for="(btn, index) in btns"
                        :key="`${btn.label}-${index}`"
                        v-bind="btn"
                    >
                        {{ btn.label }}
                    </el-button>
                </template>

                <el-button @click="localDialogShow = false">
                    取消
                </el-button>
            </div>

            <!-- 用户自定义底部 -->
            <slot v-else name="footer" />
        </template>
    </el-dialog>
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
    /**
     * 控制显示的 flag
     */
    modelValue: {
        type: Boolean,
        default: false
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
    }
})

const emits = defineEmits(['update:modelValue'])

const localDialogShow = computed({
    get: () => props.modelValue,
    set: (val) => emits('update:modelValue', val)
})
</script>

<style lang="scss" scoped>
.dialog-btn-wrapper {
    display: flex;
    width: 100%;
    justify-content: center;
}
</style>
<style lang="scss">
.custom-dialog {
    .el-dialog__header {
        padding: 10px;
    }

    .el-dialog__body {
        padding: 14px;
        min-height: 150px;
    }
}
</style>
