<template>
    <div class="icon-test-wrapper">
        <g-icon icon="menu-open" />
        <g-icon icon="home-card-notify-icon" />
        <g-icon icon="notifiy-icon" />
        <g-icon icon="el-WalletFilled" />
        <g-icon icon="el-Basketball" />
        <g-icon icon="el-ArrowDown" />
        <g-icon icon="ali-icon-wushuju" />
        <g-icon icon="ali-icon-applications" />
        <g-icon icon="ali-icon-zhiwei" />
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const selectedIcon = ref<string>('')

watch(
    () => selectedIcon.value,
    (icon) => {
        console.log(`%c 所选 icon == `, 'color: #67c23a;', icon)
    }
)
</script>

<style lang="scss">
.icon-test-wrapper {
    > i,
    > svg {
        font-size: 34px;
        margin-right: 10px;
    }
}
</style>
