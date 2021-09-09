<template>
    <div class="tree-demo1">
        <g-tree :data="treeData" :btns="btns" show-checkbox @node-click="handle" @check="handle" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'TreeDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { BtnProps } from 'jn-ve-global/packages/index
import { BtnProps } from '@component/index'

// 通过 btns 传递要添加的扩展按钮组
const btns: BtnProps[] = [
    {
        label: '添加菜单',
        onClick: () => {
            console.log(`%c 添加菜单.....`, 'color: #e6a23c;')
        }
    }
]

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
