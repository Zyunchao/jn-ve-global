<template>
    <div class="examples-base-wrapper">
        <p>
            <span>本地Svg：</span>
            <g-icon icon="menu-open" />
            <g-icon icon="home-card-notify-icon" />
            <g-icon icon="notifiy-icon" />
        </p>
        <p>
            <span>Ele icon：</span>
            <g-icon icon="el-icon-s-goods" />
            <g-icon icon="el-icon-warning" />
            <g-icon icon="el-icon-s-operation" />
        </p>
        <p>
            <span>阿里 icon：</span>
            <g-icon icon="ali-icon-wushuju" />
            <g-icon icon="ali-icon-applications" />
            <g-icon icon="ali-icon-zhiwei" />
        </p>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'IconTest',
    setup() {}
})
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    font-size: 20px;
    p {
        margin-bottom: 20px;

        i,
        svg {
            font-size: 30px;
            margin-right: 10px;
            &:nth-of-type(2) {
                color: red !important;
            }
        }
    }
}
</style>
