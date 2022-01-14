<template>
    <div class="examples-base-wrapper">
        <el-scrollbar>
            <g-form :config="formConfig" />

            <el-button type="primary" @click="getData">
                获取数据
            </el-button>
            <el-button type="primary" @click="resetForm">
                重置
            </el-button>
        </el-scrollbar>
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import { FormProps, InfoColumnProps } from '@component/index'
import infoSelectData from './data/data.json'

const infoSelectColumns = ref<InfoColumnProps[]>([
    {
        prop: 'name',
        label: '客户端名称',
        width: 100
    },
    {
        prop: 'clientId',
        label: '客户端编码',
        width: 200,
        align: 'center'
    },
    {
        prop: 'type',
        label: '客户端类型',
        width: 100
    },
    {
        prop: 'category',
        label: '授权类型',
        width: 100
    },
    {
        prop: 'certSystem',
        label: '授权服务器来源',
        width: 150
    },
    {
        prop: 'secret',
        label: '客户端secret',
        width: 140
    },
    {
        prop: 'scopes',
        label: '可授权资源',
        width: 80
    },
    {
        prop: 'authorizedGrantTypes',
        label: '授权模式',
        width: 150
    },
    {
        prop: 'redirectUri',
        label: '认证成功后的回调URI',
        width: 140,
        showOverflowTooltip: true
    },
    {
        prop: 'accessTokenValidity',
        label: '登录维持时间(秒)',
        width: 80
    },
    {
        prop: 'refreshTokenValidity',
        label: '刷新Token有效时间(秒)',
        width: 80
    },
    {
        prop: 'trusted',
        label: '是否信赖',
        width: 80
    },
    {
        prop: 'autoApprove',
        label: '是否自动授权',
        width: 80
    },
    {
        prop: 'enabled',
        label: '状态',
        width: 80,
        render(item, index) {
            return (
                <el-tag
                    size='small'
                    class='ml-2'
                    type={item.enabled === '0' ? 'success' : 'danger'}>
                    {item.enabled === '0' ? '正常' : '禁用'}
                </el-tag>
            )
        }
    }
])

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    // disabled: true,
    model: {
        clientChannel: ''
    },
    formItems: [
        {
            prop: 'clientChannel',
            label: '多列数据展示下拉框',
            span: 12,
            controlConfig: {
                type: 'infoSelect',
                options: infoSelectData as any,
                columns: infoSelectColumns.value
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
}
</style>
