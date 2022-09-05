<template>
    <g-irregular-table :col-num="38" :row-num="5" :cell-list="[]" />
</template>

<script lang="ts">
export default {
    name: 'DrawingBoard'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped></style>
