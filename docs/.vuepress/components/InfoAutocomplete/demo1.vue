<template>
    <div class="box">
        <g-info-autocomplete
            v-model="value"
            :columns="columns"
            value-key="name"
            :fetch-suggestions="querySearchAsync"
            placeholder="请输入"
        />
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
import { InfoColumnProps } from '@component/index'

const value = ref<string>('')

watch(
    () => value.value,
    (val) => {
        console.log(`%c 父级 value ===== `, 'color: #67c23a;', val)
    }
)

// 模拟异步请求加载数据
let timeout: NodeJS.Timeout
const querySearchAsync = (queryString: string, cb: (arg: any) => void) => {
    const results = queryString ? mockData.filter((item) => item.name === queryString) : mockData
    clearTimeout(timeout)
    timeout = setTimeout(() => {
        cb(results)
    }, 3000 * Math.random())
}

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
                <el-tag
                    size='small'
                    class='ml-2'
                    type={item.status === '0' ? 'success' : 'danger'}>
                    {item.status === '0' ? '正常' : '禁用'}
                </el-tag>
            )
        }
    }
])
</script>

<style lang="scss" scoped>
.box {
    width: 400px;
    height: 400px;

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
