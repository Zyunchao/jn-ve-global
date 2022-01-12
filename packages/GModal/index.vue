<template>
    <!-- dialog 对话框 -->
    <el-dialog
        v-if="localType === 'dialog'"
        ref="modalRef"
        :width="localWidth"
        destroy-on-close
        top="5vh"
        append-to-body
        v-bind="$attrs"
        :custom-class="`g-custom-dialog${
            $attrs['custom-class'] ? ' ' + $attrs['custom-class'] : ''
        }${isVerticalCenter ? ' vertical-center' : ''}`"
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
        ref="modalRef"
        :size="localWidth"
        destroy-on-close
        append-to-body
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
    name: 'GModal',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, PropType, useAttrs } from 'vue'
import { BtnProps } from '../GBaseModule/interface/BaseModuleConfig'

interface Props {
    /**
     * 类型
     */
    type?: 'dialog' | 'drawer'
    /**
     * 底部按钮组
     */
    btns?: BtnProps[]
    /**
     * 隐藏底部，权重较高
     */
    hideFooter?: boolean
    /**
     * 宽度
     */
    width?: string | number
    /**
     * 是否垂直居中
     */
    verticalCenter?: boolean
}

const props = withDefaults(defineProps<Props>(), {
    type: 'dialog',
    btns: () => [],
    hideFooter: false,
    width: '',
    verticalCenter: false
})

// 本地类型（做统一化控制）
const localType = computed(() => props.type)

const modalRef = ref(null)

// 本地 width
const localWidth = computed(() => {
    if (props.width) return props.width
    if (props.type === 'dialog') return '70%'
    return '50%'
})

// 垂直居中仅对 dialog 生效
const isVerticalCenter = computed(() => props.type === 'dialog' && props.verticalCenter)

// 抛出的
defineExpose({
    localType,
    isVerticalCenter,
    modalRef
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
