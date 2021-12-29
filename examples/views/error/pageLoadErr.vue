<template>
    <h1 class="not-select">
        <g-icon icon="el-icon-error" />
        Page Loading Error
    </h1>
</template>

<script lang="ts">
import { defineComponent, toRaw, watch, watchEffect, computed, reactive, toRefs } from 'vue'

export default defineComponent({
    name: 'PageLoadErr',
    setup() {}
})
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 100px;
    text-align: center;
    color: #ff3040;
    font-weight: 700;
    font-size: 40px;
}
</style>
