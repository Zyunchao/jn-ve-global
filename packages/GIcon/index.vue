<template>
    <i
        v-if="icon && ['el-', 'ali-'].some((prefix) => icon.indexOf(prefix) !== -1)"
        :class="[icon, { 'iconfont': icon.indexOf('ali-') !== -1 }]"
    />
    <svg-icon v-else-if="icon" :name="icon" />
</template>

<script lang="ts">
export default {
    name: 'GIcon'
}
</script>

<script lang="ts" setup>
import { defineComponent } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'

const props = defineProps({
    icon: String
})
</script>

<style lang="scss" scoped></style>
