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

        <h1>表单集成</h1>
        <div class="box2">
            <g-form :config="formConfig" />

            <el-button type="primary" @click="getData">
                获取数据
            </el-button>
            <el-button type="primary" @click="resetForm">
                重置
            </el-button>
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
import { FormProps, InfoSelectControlConfig } from '@component/index'

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

// 表单集成
let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '120px',
    model: {
        name: ''
    },
    formItems: [
        {
            prop: 'name',
            label: '输入建议',
            span: 24,
            controlConfig: {
                type: 'infoAutocomplete',
                columns,
                fetchSuggestions: querySearchAsync,
                valueKey: 'name'
            }
        }
    ]
})

const getData = () => {
    console.log(`%c data =========== `, 'color: #67c23a;', formConfig.value.model)
}
const resetForm = () => {
    formConfig.value.instance.resetFields()
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    padding-top: 200px;
}

.box {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
        width: 110px;
        display: block;
        font-weight: 700;
        flex: none;
    }
}

.box2 {
    width: 400px;
    margin-top: 20px;
}
</style>
