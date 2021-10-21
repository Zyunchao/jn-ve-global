<template>
    <div class="examples-base-wrapper">
        <div class="demo1">
            <g-tree
                :data="treeData"
                :btns="btns"
                show-checkbox
                :show-btn-area="false"
                :default-checked-keys="defaultCheckedKeys"
                :filter-parent-checked-keys-flag="true"
                @node-click="nodeClick"
                @check="nodeClick"
            />
        </div>

        <div class="demo2">
            <g-tree :data="treeData" :btns="btns" mode="other" :node-click="nodeClick" />
        </div>

        <el-button @click="addNode">
            添加节点
        </el-button>
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

const defaultCheckedKeys = ref<string[]>(['1424688522159378434'])

watch(
    () => defaultCheckedKeys.value,
    (val) => {
        console.log(`%c defaultCheckedKeys ==   `, 'color: #e6a23c;', val)
    },
    {
        deep: true
    }
)

const addNode = () => {
    defaultCheckedKeys.value = [
        '1424688522159378434',
        '1425375466908475393',
        '1425375784899633153',
        '1425375928718123010',
        '1425374852916895745'
    ]
}

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
