<template>
    <el-button style="margin-bottom: 10px" type="primary" @click="handleClick">
        切换数据
    </el-button>

    <div class="wrapper">
        <g-hint-box :text="text" :width="300" placement="bottom-start" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'HintBoxDemo3'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const text = ref<string>('千里之行，始于足下')

const handleClick = () => {
    text.value =
        text.value === '千里之行，始于足下'
            ? '今日所做之事勿候明天，自我所做之事勿候他人。——歌德'
            : '千里之行，始于足下'
}
</script>

<style lang="scss" scoped>
.wrapper {
    width: 600px;
    background-color: pink;

    .tool-tip-by-width-box {
        background-color: skyblue;
    }
}
</style>
