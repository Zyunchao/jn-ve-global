<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="reset">
            清空
        </el-button>
        <br>
        <g-select-tree v-model="avtiveVal" multiple style="width: 400px" :tree-data="mockData" />
    </div>
</template>

<script lang="ts" setup>
import { watch, reactive, ref } from 'vue'
import mockData from './data.json'

const avtiveVal = ref<string[]>(['1425375363846037505', '1423533477376192513'])

watch(
    () => avtiveVal.value,
    (val) => {
        console.log(`%c 父级状态发生变化 === `, 'color: #67c23a;', val)
    }
)

const reset = () => {
    avtiveVal.value = []
}
</script>

<style lang="scss" scoped></style>
