<template>
    <el-pagination :pager-count="5" small background layout="prev, pager, next, total" />
</template>

<script lang="ts">
export default {
    name: 'GInfoSOrAPagination'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped></style>
