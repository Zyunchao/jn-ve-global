<template>
    <div class="root">
        <div class="box">
            <span>单选：</span>
            <g-info-select
                v-model="active"
                :options-data="selectOptions"
                :columns="columns"
                :total="total"
                filterable
                @params-change="paramsChange"
            />
        </div>

        <div class="box">
            <span>多选：</span>
            <g-info-select
                v-model="multipleActive"
                multiple
                :options-data="selectOptions"
                :columns="columns"
                :total="total"
                @params-change="paramsChange"
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

const paramsChange = (params) => {
    console.log(`%c 参数生变化 ==== `, 'color: #67c23a;', params)
    const { pageSize, currentPage, ...queryParams } = params
    selectOptions.value = dataScoper(params.currentPage, queryParams)
}

onBeforeMount(() => {
    selectOptions.value = dataScoper(1)
})

const dataScoper = (num: number, params?: object) => {
    const start = (num - 1) * 10
    const end = num * 10

    return userList
        .filter((item, index) => {
            return index >= start && index < end
        })
        .filter((item) => {
            if (params && !!Object.keys(params).length) {
                const keys = Object.keys(params)
                let res = false

                keys.forEach((key) => {
                    if (item[key]?.includes(params[key])) {
                        res = true
                    }
                })

                return res
            }

            return true
        })
}
</script>

<style lang="scss" scoped>
.root {
    height: 500px;
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
