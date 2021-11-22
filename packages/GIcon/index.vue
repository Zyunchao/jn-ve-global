<template>
    <!-- 阿里图标 -->
    <i
        v-if="iconIsValid && ['ali-'].some((prefix) => icon.indexOf(prefix) === 0)"
        :class="[icon, 'iconfont']"
    />

    <!-- El Icon -->
    <el-icon v-else-if="iconIsValid && elIconComponentName" v-bind="$attrs">
        <component :is="elIcons[elIconComponentName]" />
    </el-icon>

    <!-- 本地svg -->
    <svg-icon v-else-if="iconIsValid" :name="icon" />
</template>

<script lang="ts">
export default {
    name: 'GIcon',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { computed } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'
import * as elIcons from '@element-plus/icons'

const props = defineProps({
    icon: String
})

// 有值且为字符串，保险
const iconIsValid = computed(() => props.icon && typeof props.icon === 'string')

// 截取 el icon 组件的名字
const elIconComponentName = computed(() => {
    if (!iconIsValid.value) return null
    const name = props.icon.indexOf('el-') === 0 ? props.icon.replace(/^el-/, '') : null
    return elIcons[name] ? name : null
})
</script>

<style lang="scss" scoped></style>
