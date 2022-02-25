<template>
    <div class="examples-base-wrapper">
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
    name: 'InfoSelectTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, onMounted, onBeforeMount } from 'vue'
import { columns } from '../data/columns'
import userList from '../data/userList.json'
import { FormProps, InfoSelectControlConfig } from '@component/index'

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
</script>

<style lang="scss" scoped>
.box {
    width: 400px;
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    span {
        width: 60px;
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
