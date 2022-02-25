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
    name: 'InfoSelectAllFormInsideTest'
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
    labelWidth: '80px',
    model: {
        single: '',
        multiple: []
    },
    formItems: [
        {
            prop: 'single',
            label: '单选',
            span: 24,
            controlConfig: {
                type: 'infoSelectAll',
                columns,
                options: userList as any
            }
        },
        {
            prop: 'multiple',
            label: '多选',
            span: 24,
            controlConfig: {
                type: 'infoSelectAll',
                columns,
                options: userList as any,
                props: {
                    multiple: true,
                    optionMaxItemNum: 5,
                    hideHeader: true
                }
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
.box {
    width: 500px;
    height: 400px;
}
</style>
