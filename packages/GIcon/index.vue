<template>
    <i
        v-if="icon && ['el-', 'ali-'].some((prefix) => icon.indexOf(prefix) !== -1)"
        :class="[icon, { 'iconfont': icon.indexOf('ali-') !== -1 }]"
    />
    <SvgIcon v-else-if="icon" :name="icon" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import SvgIcon from '../SvgIcon/index.vue'

export default defineComponent({
    name: 'GIcon',
    components: {
        SvgIcon
    },
    props: {
        icon: String
    },
    setup() {}
})
</script>

<style lang="scss" scoped></style>
