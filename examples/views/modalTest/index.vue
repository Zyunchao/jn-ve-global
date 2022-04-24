<template>
    <div class="examples-base-wrapper">
        <el-button type="success" @click="drawerShow = true">
            显示 Drawer
        </el-button>
        <el-button type="primary" @click="dialogShow = true">
            显示 Dialog
        </el-button>
        <el-button @click="showMessageBox">
            Show MessageBox
        </el-button>
    </div>

    <g-modal
        v-model="drawerShow"
        :show-close="true"
        custom-class="abcd"
        width="70%"
        title="评级登记"
        :btns="btns"
        type="drawer"
    >
        <FormTest is-component />
    </g-modal>

    <g-modal
        v-model="dialogShow"
        :show-close="true"
        width="70%"
        title="评级登记"
        :btns="btns"
        type="dialog"
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
import { ElMessageBox } from 'element-plus'

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

const showMessageBox = () => {
    ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
    })
        .then(() => {})
        .catch(() => {})
}
</script>

<style lang="scss" scoped></style>
