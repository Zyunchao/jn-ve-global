<template>
    <div class="examples-base-wrapper">
        <el-button @click="modalShow = true">
            打开弹框
        </el-button>
        <el-button type="success" @click="fillData('single')">
            填充数据
        </el-button>

        <g-modal v-model="modalShow" title="表单集成" :btns="modalBtns" width="30%" top="20vh">
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

            <g-form :config="formConfig" />
        </g-modal>
    </div>
</template>

<script lang="ts">
export default {
    name: 'InfoSelectTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs, nextTick, onBeforeMount } from 'vue'
import { columns } from '../data/columns'
import userList from '../data/userList.json'
import { BtnProps, FormProps, InfoSelectControlConfig } from '@component/index'

const total = userList.length
const active = ref<string>('')
const multipleActive = ref<string[]>([])
const selectOptions = ref([])
const modalShow = ref<boolean>(false)

const paramsChange = (params) => {
    const { pageSize, currentPage, ...queryParams } = params
    setTimeout(() => {
        selectOptions.value = dataScoper(params.currentPage, queryParams)
    }, 300)
}

onBeforeMount(() => {
    // selectOptions.value = dataScoper(1)
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
            hide: false,
            controlConfig: {
                type: 'infoSelect',
                columns,
                options: [],
                total: 29,
                props: {
                    onParamsChange: (params) => {
                        // const { pageSize, currentPage, ...queryParams } = params
                        // ;(
                        //     formConfig.value.formItems.find((item) => item.prop === 'single')
                        //         .controlConfig as InfoSelectControlConfig
                        // ).options = dataScoper(params.currentPage, queryParams) as any
                    }
                }
            }
        },
        {
            prop: 'multiple',
            label: '多选',
            span: 24,
            hide: false,
            controlConfig: {
                type: 'infoSelect',
                columns,
                options: [],
                total: 29,
                props: {
                    multiple: true,
                    onParamsChange: (params) => {
                        setTimeout(() => {
                            const { pageSize, currentPage, ...queryParams } = params
                            ;(
                                formConfig.value.formItems.find((item) => item.prop === 'multiple')
                                    .controlConfig as InfoSelectControlConfig
                            ).options = dataScoper(params.currentPage, queryParams) as any
                        }, 300)
                    }
                }
            }
        }
    ]
})

const modalBtns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c data =========== `, 'color: #67c23a;', formConfig.value.model)
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.value.instance.resetFields()
        }
    },
    {
        label: '填充数据',
        type: 'success',
        onClick() {
            fillData()
        }
    }
]

// setTimeout(() => {
//     fillData()
//     // refresh()
// }, 5000)

const fillData = (prop = 'multiple') => {
    console.log(`%c prop === `, 'color: #67c23a;', prop)
    ;(
        formConfig.value.formItems.find((item) => item.prop === prop)
            .controlConfig as InfoSelectControlConfig
    ).options = dataScoper(1) as any
}

const refresh = (prop = 'multiple') => {
    formConfig.value.formItems.find((item) => item.prop === prop).hide = true

    nextTick(() => {
        formConfig.value.formItems.find((item) => item.prop === prop).hide = false
    })
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
