<template>
    <div class="examples-base-wrapper icon-test-wrapper">
        <p>
            <span>本地 Svg：</span>
            <g-icon icon="tongzhi2" custom-color />
            <g-icon icon="lan" />
            <g-icon icon="fenxianyujing" custom-color />
        </p>
        <p>
            <span>Ele icon：</span>
            <g-icon icon="el-WalletFilled" />
            <g-icon icon="el-Basketball" />
            <g-icon icon="el-ArrowDown" />
        </p>
        <p>
            <span>阿里 icon：</span>
            <g-icon icon="ali-icon-wushuju" />
            <g-icon icon="ali-icon-applications" />
            <g-icon icon="ali-icon-zhiwei" />
        </p>

        <h3>IconPicker</h3>
        <div class="box">
            <g-icon-picker v-model="selectedIcon" />
        </div>
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
    font-size: 20px;
    p {
        margin-bottom: 20px;
        display: flex;
        align-items: center;

        i,
        svg.custom-svg-icon {
            font-size: 30px !important;
            margin-right: 10px;
        }

        svg.custom-svg-icon {
            color: green;
        }
    }

    .box {
        width: 600px;
    }
}
</style>
