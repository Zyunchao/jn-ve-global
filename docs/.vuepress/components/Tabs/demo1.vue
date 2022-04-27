<template>
    <g-tabs v-model="activeName" :list="tabList">
        <div v-if="[TabVal.BASE_INFO].includes(activeName)" class="item">
            基本信息内容
        </div>
        <div v-if="[TabVal.USER_INFO].includes(activeName)" class="item">
            用户信息内容
        </div>
        <div v-if="[TabVal.ROLE_INFO].includes(activeName)" class="item">
            角色信息内容
        </div>
    </g-tabs>
</template>

<script lang="ts">
export default {
    name: 'TabsDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
// 注意：组件文档的 demo 是基于本地路径引用的，在使用 npm 包时，应改为
// import { TabPaneProps } from 'jn-ve-global/packages/GTabs
import { TabPaneProps } from '@component/GTabs'

/**
 * 注意：
 * 对于一些需要字符串来定义的状态，我们应该使用常量或枚举来定义
 * 以用来消除 “魔法字符串”
 */
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

watch(
    () => activeName.value,
    (val) => {
        console.log(`%c new activeName == `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped>
.content-wrapper {
    .item {
        padding: 20px;
    }
}
</style>
