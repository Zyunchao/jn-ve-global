<template>
    <div class="g-button-group button-wrapper">
        <template v-for="(btn, index) in btns" :key="`${btn.label}-${index}`">
            <!-- 权限校验 -->
            <el-button
                v-if="btn.authCode"
                v-show="!getStatus(btn, 'hide', index)"
                v-auth="btn.authCode"
                v-bind="getElButtonProps(btn)"
                :type="btn.type || 'primary'"
                :disabled="getStatus(btn, 'disabled', index)"
                :loading="getStatus(btn, 'loading', index)"
            >
                <g-icon v-if="btn.icon" :icon="btn.icon" custom-color />
                {{ btn.label }}
            </el-button>

            <!-- 无权限校验的 -->
            <el-button
                v-else
                v-show="!getStatus(btn, 'hide', index)"
                v-bind="getElButtonProps(btn)"
                :type="btn.type || 'primary'"
                :disabled="getStatus(btn, 'disabled', index)"
                :loading="getStatus(btn, 'loading', index)"
            >
                <g-icon v-if="btn.icon" :icon="btn.icon" custom-color />
                {{ btn.label }}
            </el-button>
        </template>
    </div>
</template>

<script lang="ts">
export default {
    name: 'GButtonGroup'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import BtnProps from './interface/BtnProps'

const props = withDefaults(
    defineProps<{
        btns: BtnProps[]
    }>(),
    {
        btns: () => []
    }
)

const getStatus = (
    btnConfig: BtnProps,
    fieldKey: 'disabled' | 'loading' | 'hide',
    index: number
) => {
    const field = btnConfig[fieldKey]

    // 简单的布尔值
    if (typeof field === 'boolean') return field

    // 函数
    if (typeof field === 'function') return field(btnConfig, index)

    return false
}

// 排除部分属性
const getElButtonProps = (config: BtnProps) => {
    const { icon, authCode, ...props } = config
    return props
}
</script>

<style lang="scss" scoped>
.g-button-group {
    :deep(.el-button) {
        > span {
            .custom-svg-icon,
            > i {
                font-size: 20px;
                margin-right: 4px;
            }
        }
    }
}
</style>
