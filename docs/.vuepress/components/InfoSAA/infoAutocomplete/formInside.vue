<template>
    <div class="box">
        <g-form :config="formConfig" />

        <el-button type="primary" @click="getData">
            获取数据
        </el-button>
        <el-button type="primary" @click="resetForm">
            重置
        </el-button>
    </div>
</template>

<script lang="ts">
export default {
    name: 'InfoAutocompleteFormInsideTest'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { columns } from '../data/columns'
import userList from '../data/userList.json'
import { FormProps, InfoSelectControlConfig } from '@component/index'

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

let timeout: NodeJS.Timeout
function querySearchAsync(queryString: string, cb: (arg: any) => void) {
    const results = queryString ? userList.filter(createFilter(queryString)) : userList

    clearTimeout(timeout)

    timeout = setTimeout(() => {
        cb(results)
    }, 2000 * Math.random())
}
function createFilter(queryString: string) {
    return (restaurant) => {
        return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
}
</script>

<style lang="scss" scoped>
.box {
    width: 500px;
    height: 400px;
}
</style>
