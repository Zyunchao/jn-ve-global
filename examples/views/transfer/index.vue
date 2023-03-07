<template>
    <el-scrollbar>
        <g-transfer
            v-model="selectKeys"
            :titles="['待选', '已选']"
            :data="sourceData"
            :filterable="true"
            :paginationShow="true"
            :total="total"
            @pagination-change="handlePaginationChange"
        ></g-transfer>

        <hr style="margin: 20px 0" />

        <GTransferTree v-model="treeSelectKeys" :data="treeData" :filterable="true" />
    </el-scrollbar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'TransferTest'
})
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import mockOrgData from '../selectTreeTest/orgData.json'
import _ from 'lodash'

interface Option {
    key: number
    label: string
    disabled?: boolean
}

const treeData = ref()
const treeSelectKeys = ref<Array<string | number>>([])

setTimeout(() => {
    treeSelectKeys.value = ['1615264570391699457', '1621418109203738626']
}, 1000)

setTimeout(() => {
    treeData.value = _.cloneDeep(mockOrgData)

    machineData(treeData.value)
}, 2000)

const sourceData = ref<Option[]>(generateData())
const selectKeys = ref<Array<string | number>>([])
const total = ref<number>(100)

watch(
    () => treeSelectKeys.value,
    (list) => {
        console.log(`%c 外部的打印选中的值 ...................`, 'color: #f56c6c;', list)
    }
)

watch(
    () => selectKeys.value,
    (keys) => {
        console.log(`%c selectKeys ======= `, 'color: #67c23a;', keys)
    }
)

const handlePaginationChange = (currentPage, pageSize) => {
    sourceData.value = generateData(currentPage, pageSize)
}

function generateData(currentPage: number = 1, pageSize: number = 10) {
    const data = []

    for (let i = 1 + currentPage * pageSize; i <= (currentPage + 1) * pageSize; i++) {
        data.push({
            id: `${i}`,
            name: `数据数据数据数据数据数据数据数据数据数据 ${i} 数据数据数据数据数据数据数据数据`
        })
    }

    return data
}

// 处理模拟树数据
function machineData(treeData: any[]) {
    treeData.forEach((item) => {
        if (item.children && item.children.length) {
            machineData(item.children)
        }

        if (item.type === '10') {
            // console.log(`%c item.type === `, 'color: #e6a23c;', item.type)
            item.disabled = true
        }
    })
}
</script>

<style lang="scss" scoped></style>
