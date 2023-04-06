<template>
    <div class="examples-base-wrapper">
        <div class="demo1">
            <g-tree
                v-loading="dataLaoding"
                :data="mockData"
                :btns="btns"
                :show-checkbox="false"
                :show-btn-area="true"
                :default-checked-keys="defaultCheckedKeys"
                :filter-parent-checked-keys-flag="true"
                :expand-on-click-node="true"
                @node-click="nodeClick"
                @check="nodeClick"
            />
        </div>

        <!-- <div class="demo2">
            <g-tree :data="treeData" :btns="btns" :node-click="nodeClick" />
        </div> -->
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
import orgTreeData from './data/orgTreeData.json'
import { BtnProps } from '@component/index'
import regionalTree from './data/regionalTree.json'
import areaOrgTree from './data/areaOrgTree.json'
import industryTree from './data/industryTree.json'

const mockIndustryTree = industryTree.map((industry) => ({
    ...industry,
    id: industry.itemValue,
    name: industry.itemText
}))

const dataLaoding = ref<boolean>(false)
const mockData = ref([])
const defaultCheckedKeys = ref<string[]>([])

const btns: BtnProps[] = [
    {
        label: '机构树',
        onClick() {
            dataLaoding.value = true

            setTimeout(() => {
                // mockData.value = mockIndustryTree
                // mockData.value = orgTreeData
                mockData.value = areaOrgTree
                dataLaoding.value = false
            }, 500)
        }
    },
    {
        label: '区域树',
        onClick() {
            dataLaoding.value = true

            setTimeout(() => {
                mockData.value = regionalTree
                dataLaoding.value = false
            }, 500)
        }
    },
    {
        label: '选择带有父级(instituId)',
        type: 'success',
        onClick() {
            defaultCheckedKeys.value = ['3200009521950001', '3201026633500001']
        }
    },
    {
        label: '选中',
        onClick() {
            defaultCheckedKeys.value = ['1591976254600773633', '1591978997189050370']
        }
    },
    {
        label: '清空',
        onClick() {
            defaultCheckedKeys.value = []
        }
    }
]

watch(
    () => defaultCheckedKeys.value,
    (val) => {
        console.log(`%c defaultCheckedKeys ==   `, 'color: #e6a23c;', val)
    },
    { deep: true }
)

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
        width: 700px;
        margin-right: 100px;
        background-color: #fff;
        border-radius: 8px;

        box-shadow: 2px 3px 10px rgba(0, 0, 0, 0.2);
    }
}
</style>
