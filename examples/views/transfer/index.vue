<template>
    <g-transfer
        v-model="selectKeys"
        :titles="['待选', '已选']"
        :data="sourceData"
        :filterable="true"
        :paginationShow="true"
        :total="total"
        @pagination-change="handlePaginationChange"
    ></g-transfer>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'TransferTest'
})
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive, onMounted, onUnmounted, nextTick } from 'vue'

interface Option {
    key: number
    label: string
    disabled?: boolean
}

const sourceData = ref<Option[]>(generateData())
const selectKeys = ref<Array<string | number>>([])
const total = ref<number>(100)

watch(
    () => selectKeys.value,
    (keys) => {
        console.log(`%c selectKeys ======= `, 'color: #67c23a;', keys)
    }
)

const handlePaginationChange = (currentPage, pageSize) => {
    sourceData.value = generateData(currentPage, pageSize)

    // console.log(`%c handlePaginationChange === `, 'color: #67c23a;', pageSize, currentPage)
}

function generateData(currentPage: number = 1, pageSize: number = 10) {
    const data = []

    for (let i = 1 + currentPage * pageSize; i <= (currentPage + 1) * pageSize; i++) {
        data.push({
            key: i,
            label: `Option ${i}`
        })
    }

    return data
}
</script>

<style lang="scss" scoped></style>
