<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="handleClick">
            打开
        </el-button>
    </div>

    <g-modal v-model="drawerShow" append-to-body title="这是一个抽屉" :btns="btns" type="drawer">
        这是抽屉的内容
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
        onClick: () => {
            console.log(`%c 保存`, 'color: #67c23a;')
        }
    }
])

const handleClick = () => {
    drawerShow.value = true
}
</script>

<style lang="scss" scoped></style>
