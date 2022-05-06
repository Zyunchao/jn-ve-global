<template>
    <el-button type="success" style="margin-bottom: 20px" @click="backfillData">
        回填数据
    </el-button>
    <g-address v-model="currentData" />
</template>

<script lang="ts">
export default {
    name: 'AddressDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const currentData = ref<any>(null)

watch(
    () => currentData.value,
    (val) => {
        console.log(`%c currentData === `, 'color: #ff3040;', val)
    }
)

const backfillData = () => {
    currentData.value = [['140000', '140400', '140406'], '上元大街88号']
}
</script>

<style lang="scss" scoped></style>
