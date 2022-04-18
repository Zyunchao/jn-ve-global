<template>
    <div class="box">
        <span>单选：</span>
        <g-select-tree-v2
            v-model="activeData"
            :tree-data="treeData"
            placeholder="单选请选择"
            style="width: 400px"
        />
    </div>

    <div class="box">
        <span>多选：</span>
        <g-select-tree-v2
            v-model="activeDataM"
            :tree-data="treeData"
            multiple
            placeholder="多选请选择"
            style="width: 400px"
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'SelectTreeV2Demo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'

const activeData = ref('')
const activeDataM = ref([])
</script>

<style lang="scss" scoped>
.box {
    margin-bottom: 20px;
}
</style>
