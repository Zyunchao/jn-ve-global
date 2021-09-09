<template>
    <div class="tree-demo1">
        <g-tree :data="treeData" mode="other" @node-click="handle" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'TreeDemo2'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'

const handle = (data, node) => {
    console.log(`%c data == `, 'color: #e6a23c;', data)
    console.log(`%c node == `, 'color: #67c23a;', node)
}
</script>

<style lang="scss" scoped>
.tree-demo1 {
    width: 400px;
    height: 600px;
    box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
