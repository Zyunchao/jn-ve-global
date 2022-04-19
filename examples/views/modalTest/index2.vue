<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="drawerShow = true">
            显示 Drawer
        </el-button>
        <el-button type="primary" @click="dialogShow = true">
            显示 Dialog
        </el-button>

        <DateTest />
    </div>

    <g-modal
        v-model="dialogShow"
        :show-close="true"
        width="70%"
        title="评级登记"
        :btns="btns"
        type="dialog"
    >
        <g-tabs v-model="activeName" :list="tabList" />

        <ul>
            <li v-for="num in liNums" :key="num">
                {{ num }}
            </li>
        </ul>

        <DateTest />
    </g-modal>

    <el-dialog v-model="drawerShow" title="DateTest" width="30%">
        <DateTest />
    </el-dialog>
</template>

<script lang="ts">
export default {
    name: 'DialogTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { BtnProps } from '@component/index'
import FormTest from '../formTest/index.vue'
import { TabPaneProps } from '@component/GTabs'
import DateTest from './dateTest.vue'

const dialogShow = ref<boolean>(false)
const drawerShow = ref<boolean>(false)

const btns = reactive<BtnProps[]>([
    {
        label: '提交',
        type: 'primary',
        loading: true,
        onClick: () => {
            console.log(`%c 提交`, 'color: #67c23a;')
        }
    },
    {
        label: '保存',
        type: 'primary',
        hide: false,
        onClick: () => {
            console.log(`%c 保存`, 'color: #67c23a;')
        }
    }
])

watch(
    () => dialogShow.value,
    (flag) => {
        console.log(`%c dialogShow === `, 'color: #67c23a;', flag)
    }
)

enum TabVal {
    BASE_INFO = 'base_info',
    USER_INFO = 'user_info',
    ROLE_INFO = 'role_info'
}

/**
 * 对于一些可能不需要改变的数据模型，可以不定义为响应式数据
 * 如同 vue2 中的冻结 data 中的某个字段，来拒绝数据的监听
 */
const tabList: TabPaneProps[] = [
    {
        label: '基本信息',
        value: TabVal.BASE_INFO
    },
    {
        label: '用户信息',
        value: TabVal.USER_INFO
    },
    {
        label: '角色信息',
        value: TabVal.ROLE_INFO
    }
]

const activeName = ref<string>(TabVal.BASE_INFO)

const liNums = computed(() => {
    let num = 100
    switch (activeName.value) {
    case TabVal.BASE_INFO:
        num = 30
        break
    case TabVal.USER_INFO:
        num = 20
        break
    case TabVal.ROLE_INFO:
        num = 10
        break
    }

    return num
})
</script>

<style lang="scss" scoped></style>
