<template>
    <div class="examples-base-wrapper">
        <el-button type="success" style="margin-bottom: 10px" @click="reset">
            清空单选
        </el-button>
        <br>
        <g-select-tree
            ref="sltRef"
            v-model="avtiveVal"
            style="width: 400px"
            :tree-data="mockData"
        />

        <hr style="margin: 20px 0">

        <el-button type="warning" style="margin-bottom: 10px" @click="resetMultiple">
            清空多选
        </el-button>
        <br>
        <g-select-tree
            ref="sltRef"
            v-model="avtiveValM"
            multiple
            style="width: 400px"
            :tree-data="mockData"
            :tree-config="treeConfig"
        />
    </div>
</template>

<script lang="ts" setup>
import { watch, reactive, ref, onMounted } from 'vue'
import mockData from './data.json'
import TreeConfig from '@component/GSelectTree/interface/TreeConfig'

const avtiveValM = ref<string[]>(['1425375363846037505', '1423533477376192513'])
const avtiveVal = ref<string | string[]>('')

const treeConfig = ref<TreeConfig>({
    checkStrictly: true
})

const sltRef = ref(null)

onMounted(() => {
    console.log(`%c sltRef == `, 'color: #67c23a;', sltRef.value.elSelectRef)
})

watch(
    () => avtiveVal.value,
    (val) => {
        console.log(`%c 单选 父级状态发生变化 ============ `, 'color: #67c23a;', val)
    }
)

watch(
    () => avtiveValM.value,
    (val) => {
        console.log(`%c 多选 父级状态发生变化 ============ `, 'color: #ff3040;', val)
    },
    {
        deep: true
    }
)

const reset = () => {
    avtiveVal.value = ''
}

const resetMultiple = () => {
    avtiveValM.value = []
}
</script>

<style lang="scss" scoped></style>
