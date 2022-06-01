<template>
    <div class="box">
        <span>多色原彩图标：</span>
        <g-icon icon="lan" />
        <g-icon icon="lv" />
        <g-icon icon="orange" />
        <g-icon icon="new" />
    </div>

    <div class="box">
        <span>单色图标：</span>
        <g-icon icon="fenxianyujing" />
        <g-icon icon="wodeshijian" />
        <g-icon icon="zaibaoyue" />
        <g-icon icon="xiangguantongji" />
    </div>

    <div class="box custom-color">
        <span>自定义颜色：</span>
        <g-icon icon="fenxianyujing" custom-color />
        <g-icon icon="wodeshijian" custom-color />
        <g-icon icon="zaibaoyue" custom-color />
        <g-icon icon="xiangguantongji" custom-color />
    </div>
</template>

<script lang="ts">
export default {
    name: 'CustomColor'
}
</script>

<script lang="ts" setup></script>

<style lang="scss" scope>
.box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
        width: 120px;
        text-align: right;
    }

    .custom-svg-icon {
        font-size: 30px;
        margin-right: 8px;
    }

    &.custom-color {
        .custom-svg-icon {
            &:first-of-type {
                color: red;
            }

            &:nth-of-type(2) {
                color: skyblue;
            }

            &:nth-of-type(3) {
                color: rgb(91, 194, 146);
            }

            &:nth-of-type(4) {
                color: rgb(213, 1, 1);
            }
        }
    }
}
</style>
