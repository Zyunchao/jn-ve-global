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
    name: 'InfoSelectFormInsideTest'
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
                type: 'infoSelect',
                columns,
                options: dataScoper(1) as any,
                total: 29,
                props: {
                    onParamsChange: (params) => {
                        console.log(`%c 表单集成 参数变化 ==== `, 'color: red;', params)
                        const { pageSize, currentPage, ...queryParams } = params
                        ;(
                            formConfig.value.formItems.find((item) => item.prop === 'single')
                                .controlConfig as InfoSelectControlConfig
                        ).options = dataScoper(params.currentPage, queryParams) as any
                    }
                }
            }
        },
        {
            prop: 'multiple',
            label: '多选',
            span: 24,
            controlConfig: {
                type: 'infoSelect',
                columns,
                options: dataScoper(1) as any,
                total: 29,
                props: {
                    multiple: true,
                    onParamsChange: (params) => {
                        console.log(`%c 表单集成 参数变化 ==== `, 'color: red;', params)
                        const { pageSize, currentPage, ...queryParams } = params
                        ;(
                            formConfig.value.formItems.find((item) => item.prop === 'single')
                                .controlConfig as InfoSelectControlConfig
                        ).options = dataScoper(params.currentPage, queryParams) as any
                    }
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

function dataScoper(num: number, params?: object) {
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
.box {
    width: 500px;
    height: 600px;
}
</style>
