<template>
    <h3>默认防抖</h3>
    <p>点击次数：{{ count1 }}</p>
    <g-d-button :on-click="handle1">
        Click
    </g-d-button>

    <h3>关闭防抖</h3>
    <p>点击次数：{{ count2 }}</p>
    <g-d-button :on-click="handle2" :debounce="false">
        Click
    </g-d-button>
</template>

<script lang="ts">
export default {
    name: 'DebounceButtonDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const count1 = ref<number>(0)
const count2 = ref<number>(0)

const handle1 = () => {
    count1.value++
}

const handle2 = () => {
    count2.value++
}
</script>

<style lang="scss" scoped></style>
