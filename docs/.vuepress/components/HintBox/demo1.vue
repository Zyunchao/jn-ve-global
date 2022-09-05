<template>
    <div class="wrapper">
        <g-hint-box text="今日所做之事勿候明天，自我所做之事勿候他人。——歌德" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'HintBoxDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped>
.wrapper {
    width: 300px;
}
</style>
