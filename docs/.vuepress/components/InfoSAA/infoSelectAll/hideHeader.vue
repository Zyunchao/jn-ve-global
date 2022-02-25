<template>
    <div class="root">
        <div class="box">
            <span>单选：</span>
            <g-info-select-all
                v-model="active"
                hide-header
                :options-data="userList"
                :columns="columns"
            />
        </div>

        <div class="box">
            <span>多选：</span>
            <g-info-select-all
                v-model="multipleActive"
                multiple
                hide-header
                :options-data="userList"
                :columns="columns"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'InfoSelectTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { columns } from '../data/columns'
import userList from '../data/userList.json'

const total = userList.length
const active = ref<string>('')
const multipleActive = ref<string[]>([])
const selectOptions = ref([])

watch(
    () => active.value,
    (val) => {
        console.log(`%c 单选 选中值变化 === `, 'color: #f56c6c;', val)
    }
)

watch(
    () => multipleActive.value,
    (val) => {
        console.log(`%c 多选选中值变化 === `, 'color: green;', val)
    }
)
</script>

<style lang="scss" scoped>
.root {
    height: 400px;
}

.box {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
        width: 60px;
        display: block;
        font-weight: 700;
    }
}
</style>
