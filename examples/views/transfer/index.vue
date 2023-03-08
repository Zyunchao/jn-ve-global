<template>
    <el-button type="success" @click="modalShow = true">打开</el-button>

    <g-modal v-model="modalShow">
        <g-tabs style="margin-bottom: 20px;" v-model="activeName" :list="tabList"></g-tabs>

        <g-transfer
            v-if="activeName === ActiveUserType.LIST"
            v-model="selectKeys"
            ref="transferRef"
            :titles="['待选', '已选']"
            :data="sourceData"
            :filterable="true"
            :paginationShow="true"
            :total="total"
            :filter-method="filterMethod"
            @pagination-change="handlePaginationChange"
        ></g-transfer>

        <GTransferTree
            v-if="activeName === ActiveUserType.ORG_TREE"
            v-model="treeSelectKeys"
            :data="treeData"
            :filterable="true"
        />
    </g-modal>
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
import { TabPaneProps } from '@component/index'
import _ from 'lodash'

interface Option {
    key: number
    label: string
    disabled?: boolean
}

enum ActiveUserType {
    LIST = '1',
    ORG_TREE = '2'
}

const tabList: TabPaneProps[] = [
    {
        label: '同机构',
        value: ActiveUserType.LIST
    },
    {
        label: '组织结构',
        value: ActiveUserType.ORG_TREE
    }
]

const activeName = ref<ActiveUserType>(ActiveUserType.LIST)
const modalShow = ref<boolean>(false)
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
const transferRef = ref<any>(null)

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

const filterMethod = (query) => {
    console.log(
        `%c generateData(20, 20).filter((item) => item.name.includes(query)) === `,
        'color: #e6a23c;',
        generateData(20, 20).filter((item) => item.name.includes(query))
    )

    if (query) {
        sourceData.value = generateData(20, 20).filter((item) => item.name.includes(query))
        transferRef.value.paginationConfig.currentPage = 1
    } else {
        sourceData.value = generateData(1, 10)
    }

    // console.log(`%c filterMethod query === `, 'color: #67c23a;', query)
    // sourceData.value = generateData(9, 10)
    // return true
}
</script>

<style lang="scss" scoped></style>
