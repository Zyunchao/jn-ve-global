<template>
    <div class="examples-base-wrapper">
        <div class="box">
            <span>输入建议：</span>
            <g-info-autocomplete
                v-model="activeInput"
                value-key="name"
                :columns="columns"
                :fetch-suggestions="querySearchAsync"
                placeholder="请输入"
            />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'InfoAutocompleteTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { columns } from '../data/columns'
import userList from '../data/userList.json'

const activeInput = ref<string>('')

let timeout: NodeJS.Timeout
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString ? userList.filter(createFilter(queryString)) : userList

    clearTimeout(timeout)

    timeout = setTimeout(() => {
        cb(results)
    }, 2000 * Math.random())
}
const createFilter = (queryString: string) => {
    return (restaurant) => {
        return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
        width: 110px;
        display: block;
        font-weight: 700;
    }
}
</style>
