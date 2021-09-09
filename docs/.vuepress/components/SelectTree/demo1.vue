<template>
    <g-select-tree
        v-model="activeData"
        :tree-data="treeData"
        placeholder="请选择"
        every-choose
        style="width: 400px"
    />
</template>

<script lang="ts">
export default {
    name: 'SelectTreeDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'

const activeData = ref('')

watch(
    () => activeData.value,
    (val) => {
        console.log(`%c activeData on change == `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped></style>
