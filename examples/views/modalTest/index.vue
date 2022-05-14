<template>
    <div class="examples-base-wrapper">
        <g-button-group :btns="btns" />
    </div>

    <g-modal
        v-model="drawerShow"
        :show-close="true"
        custom-class="abcd"
        width="70%"
        title="评级登记"
        :btns="modalBtns"
        type="drawer"
    >
        <FormTest is-component />
    </g-modal>

    <g-modal
        v-model="dialogShow"
        :show-close="true"
        width="70%"
        title="评级登记"
        :btns="modalBtns"
        type="dialog"
    >
        <FormTest is-component />
    </g-modal>

    <g-modal
        v-model="baseModuleDialogShow"
        :show-close="true"
        width="70%"
        title="基础模块容器"
        :btns="modalBtns"
        type="dialog"
    >
        <BaseModuleDemo />
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
import BaseModuleDemo from './component/index.vue'

const dialogShow = ref<boolean>(false)
const drawerShow = ref<boolean>(false)
const baseModuleDialogShow = ref<boolean>(false)

const modalBtns = reactive<BtnProps[]>([
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

const btns = reactive<BtnProps[]>([
    {
        label: '显示 Drawer',
        type: 'primary',
        onClick: () => {
            drawerShow.value = true
        }
    },
    {
        label: '显示 Dialog',
        type: 'primary',
        onClick: () => {
            dialogShow.value = true
        }
    },
    {
        label: '显示 BaseModule Dialog',
        type: 'success',
        onClick: () => {
            baseModuleDialogShow.value = true
        }
    },
    {
        label: 'Show MessageBox',
        type: 'primary',
        onClick: () => {
            ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
                confirmButtonText: 'OK',
                cancelButtonText: 'Cancel',
                type: 'warning'
            })
                .then(() => {})
                .catch(() => {})
        }
    }
])
</script>

<style lang="scss" scoped></style>
