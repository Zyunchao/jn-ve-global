<template>
    <div class="examples-base-wrapper">
        <g-form :config="formConfig" />

        <el-button type="primary" @click="getData">
            获取数据
        </el-button>
        <el-button type="primary" @click="resetForm">
            重置
        </el-button>
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { FormProps, InfoColumnProps } from '@component/index'
import mockData from './data/data.json'

// 列配置
const columns = ref<InfoColumnProps[]>([
    {
        prop: 'name',
        label: '姓名',
        width: 150
    },
    {
        prop: 'instituId',
        label: '机构编码',
        width: 160
    },
    {
        prop: 'instituName',
        label: '机构名称',
        width: 200
    },
    {
        prop: 'loginName',
        label: '用户登录名',
        width: 150
    },
    {
        prop: 'identity',
        label: '用户身份',
        width: 140
    },
    {
        prop: 'sex',
        label: '性别',
        width: 100
    },
    {
        prop: 'idType',
        label: '证件类型',
        width: 240
    },
    {
        prop: 'idNumber',
        label: '证件号码',
        width: 240
    },
    {
        prop: 'phone',
        label: '手机',
        width: 200
    },
    {
        prop: 'email',
        label: '邮箱',
        width: 200
    },
    {
        prop: 'status',
        label: '用户状态',
        width: 80,
        render(item, index) {
            return (
                <el-tag size='small' class='ml-2' type={item.status === '0' ? 'success' : 'danger'}>
                    {item.status === '0' ? '正常' : '禁用'}
                </el-tag>
            )
        }
    }
])

// 表单配置
let timeout: NodeJS.Timeout
let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '220px',
    // disabled: true,
    model: {
        user: ''
    },
    formItems: [
        {
            prop: 'user',
            label: '多列数据展示输入建议',
            span: 12,
            controlConfig: {
                type: 'infoAutocomplete',
                columns: columns.value,
                valueKey: 'name',
                fetchSuggestions: (queryString, cb) => {
                    const results = queryString
                        ? mockData.filter((item) => item.name === queryString)
                        : mockData

                    clearTimeout(timeout)

                    timeout = setTimeout(() => {
                        cb(results)
                    }, 3000 * Math.random())
                }
            }
        }
    ]
})

const getData = () => {
    console.log(`%c model == `, 'color: #67c23a;', formConfig.value.model)
}

const resetForm = () => {
    formConfig.value.instance?.resetFields()
}
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    height: 300px;

    :deep(*) {
        box-sizing: border-box;
    }

    :deep(ul) {
        list-style: none;
        padding: 0;
        margin: 0;
    }

    :deep(.el-button) {
        &:first-of-type {
            margin-left: 80px;
        }
    }
}
</style>
