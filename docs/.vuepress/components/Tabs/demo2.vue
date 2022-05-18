<template>
    <div class="examples-base-wrapper">
        <g-tabs v-model="activeName" :list="tabList" type="big-card" />
        <div class="box">
            {{ activeName }}
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'TabsDemo2'
}
</script>

<script lang="ts" setup>
import { ref } from 'vue'
import { TabPaneProps } from '@component/GTabs'

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
</script>

<style lang="scss" scoped>
.examples-base-wrapper {
    padding: 10px;
    background-color: #f8f8f8;
    height: 200px;

    .box {
        height: 100%;
        background-color: #fff;
    }
}
</style>
