<template>
    <div class="examples-base-wrapper">
        <div class="demo1">
            <g-tree
                :data="treeData"
                :btns="btns"
                show-checkbox
                @node-click="nodeClick"
                @check="nodeClick"
            />
        </div>

        <div class="demo2">
            <g-tree :data="treeData" :btns="btns" mode="other" :node-click="nodeClick" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'AsideTreeTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import treeData from './data/treeData.json'
import { BtnProps } from '@component/index'

const btns: BtnProps[] = [
    // {
    //     label: '新增机构',
    //     onClick() {
    //         console.log(`%c ??????`, 'color: #67c23a;')
    //     }
    // }
]

const nodeClick = (data, node) => {
    console.log(`%c data == `, 'color: #e6a23c;', data, node)
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    // max-width: 300px;
    // padding: 0;
    display: flex;

    background: transparent;

    .demo1,
    .demo2 {
        width: 300px;
        margin-right: 100px;
        background-color: #fff;
        border-radius: 8px;

        box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>
