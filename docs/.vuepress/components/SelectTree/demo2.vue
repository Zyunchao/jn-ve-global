<template>
    <g-select-tree
        v-model="activeData"
        :tree-data="treeData"
        multiple
        placeholder="请选择"
        everyChoose
        style="width: 400px"
    />
</template>

<script lang="ts">
export default {
    name: 'SelectTree-demo2'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'

/**
 * 在使用多选时，绑定数据要为数组
 */
const activeData = ref([])

watch(
    () => activeData.value,
    (val) => {
        console.log(`%c activeData on change == `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped></style>
