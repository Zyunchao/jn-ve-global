<template>
    <h1 class="not-select">
        500 Server Error
    </h1>
</template>

<script lang='ts'>
import { defineComponent, toRaw, watch, watchEffect, computed, reactive, toRefs } from 'vue'
export default {
    name: '500',
    setup() {}
}
</script>

<style lang='scss' scoped>
h1 {
    margin-top: 100px;
    text-align: center;
    color: orange;
    font-size: 40px;
}
</style>