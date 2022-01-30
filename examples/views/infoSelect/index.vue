<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="changeData">
            切换数据
        </el-button>
        <div class="box">
            下拉框1
            <g-info-select v-model="active" multiple :options-data="localData" :columns="columns" />
        </div>

        <div class="box">
            下拉框2
            <g-info-select v-model="active" multiple :options-data="localData" :columns="columns" />
        </div>

        <div class="box">
            <p>Input</p>
            <g-info-autocomplete
                v-model="activeInput"
                value-key="name"
                :columns="columns"
                :fetch-suggestions="querySearchAsync"
                @input="onChange"
            />
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'InfoSelectTest'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import mockData from './data/data.json'
import { InfoColumnProps } from '@component/index'

const active = ref<string | string[]>('')
const localData = ref(mockData)

const activeInput = ref<string>('')

watch(
    () => activeInput.value,
    (val) => {
        console.log(`%c 父级 activeInput ===== `, 'color: #67c23a;', activeInput.value)
    }
)

const changeData = () => {
    // if (localData.value.length) {
    //     localData.value = []
    // } else {
    //     localData.value = mockData
    // }

    loadSync.value([])
}

let timeout: NodeJS.Timeout
const loadSync = ref(null)
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString ? mockData.filter(createFilter(queryString)) : mockData

    clearTimeout(timeout)

    timeout = setTimeout(() => {
        loadSync.value = cb

        cb(results)
    }, 2000 * Math.random())
}
const createFilter = (queryString: string) => {
    return (restaurant) => {
        return restaurant.name.toLowerCase().indexOf(queryString.toLowerCase()) === 0
    }
}

const onChange = () => {
    setTimeout(() => {
        console.log(`%c ???????????`, 'color: #f56c6c;')
        loadSync.value([
            {
                'id': '1',
                'clientId': '9999',
                'instituId': '1',
                'name': '1',
                'type': '0',
                'category': '1',
                'certSystem': 'default',
                'certSystemUrl': null,
                'secret': '1234567',
                'scopes': 'ALL',
                'authorizedGrantTypes': 'password',
                'redirectUri': '1',
                'accessTokenValidity': 60000,
                'refreshTokenValidity': 6500000,
                'additionalInformation': '1',
                'trusted': '1',
                'autoApprove': '1',
                'enabled': '1',
                'isLock': '1',
                'details': '1',
                'createBy': null,
                'createTime': null,
                'updateBy': null,
                'updateTime': null
            },
            {
                'id': '1455411485270966274',
                'clientId': '3421',
                'instituId': 'SYS',
                'name': '1',
                'type': '0',
                'category': '0',
                'certSystem': 'default',
                'certSystemUrl': null,
                'secret': '1635819651810',
                'scopes': 'ALL',
                'authorizedGrantTypes': 'authorization_code',
                'redirectUri': 'http://172.31.33.72:8089/bpm-server/login',
                'accessTokenValidity': 1800,
                'refreshTokenValidity': 172800,
                'additionalInformation': null,
                'trusted': '0',
                'autoApprove': '0',
                'enabled': '0',
                'isLock': '2',
                'details': '',
                'createBy': null,
                'createTime': null,
                'updateBy': null,
                'updateTime': null
            }
        ])
    }, 4000)
}

const columns = ref<InfoColumnProps[]>([
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
</script>

<style lang="scss" scoped>
.box {
    width: 400px;
    margin-bottom: 20px;
}
</style>
