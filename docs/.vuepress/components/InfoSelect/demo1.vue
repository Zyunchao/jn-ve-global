<template>
    <div class="examples-base-wrapper">
        <div class="box">
            单选：
            <g-info-select v-model="active" :options-data="mockData" :columns="columns" />
        </div>

        <div class="box">
            多选：
            <g-info-select v-model="active2" multiple :options-data="mockData" :columns="columns" />
        </div>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'InfoSelectDemo1'
}
</script>

<script lang="tsx" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import mockData from './data/data.json'
import InfoSelectColumnProps from '@component/GInfoSelect/interface/InfoSelectColumnProps'

const active = ref<string | string[]>('')
const active2 = ref<string | string[]>([])

watch(
    () => active.value,
    (val) => {
        console.log(`%c 父级 active ===== `, 'color: #67c23a;', active.value)
    }
)

const columns = ref<InfoSelectColumnProps[]>([
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

    :deep(*) {
        box-sizing: border-box;
    }
    
    :deep(ul) {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}

.examples-base-wrapper {
    height: 400px;
}
</style>
