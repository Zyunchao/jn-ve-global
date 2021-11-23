<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="handleClick">
            显示
        </el-button>
    </div>

    <g-modal
        v-model="dialogShow"
        :show-close="true"
        custom-class="abcd"
        width="70%"
        title="评级登记"
        :btns="btns"
        type="drawer"
    >
        <FormTest is-component />
    </g-modal>
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

const dialogShow = ref<boolean>(false)

watch(
    () => dialogShow.value,
    (val) => {
        console.log(`%c 父级 dialogShow onchange == `, 'color: green;', val)
    },
    {
        deep: true
    }
)

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
        onClick: () => {
            console.log(`%c 保存`, 'color: #67c23a;')
        }
    }
])

const handleClick = () => {
    dialogShow.value = true
}
</script>

<style lang="scss" scoped></style>
