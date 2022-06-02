<template>
    <div class="examples-base-wrapper">
        <div class="box">
            <span>单选：</span>
            <g-info-select-all
                v-model="active"
                :options-data="firstUserList"
                :columns="columns"
            />
        </div>

        <div class="box">
            <span>多选：</span>
            <g-info-select-all
                v-model="multipleActive"
                multiple
                :options-data="userList"
                :columns="columns"
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
import { FormProps, InfoSelectControlConfig, InfoSelectAllControlConfig } from '@component/index'

const total = userList.length
const active = ref<string>('')
const multipleActive = ref<string[]>([])
const selectOptions = ref([])

const firstUserList = ref<any[]>([])

setTimeout(() => {
    console.log(`%c 填充数据 ==== `, 'color: #f56c6c;')
    firstUserList.value = userList
}, 2000)

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
                    multiple: true
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
    }
}

.box2 {
    width: 400px;
    margin-top: 20px;
}
</style>
