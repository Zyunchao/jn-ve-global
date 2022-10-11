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

    <g-modal v-model="echartsModelShow" width="70%" title="图表" @closed="closeHandle">
        <div v-if="create" style="height: 600px">
            <GChart :config="chartConfig" />
        </div>
    </g-modal>

    <!-- <el-dialog v-model="echartsModelShow" width="70%" title="Tips">
        <div v-if="create" style="height: 600px">
            <GChart :config="chartConfig" />
        </div>
    </el-dialog> -->
</template>

<script lang="ts">
export default {
    name: 'DialogTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { BtnProps, ChartConfig } from '@component/index'
import FormTest from '../formTest/index.vue'
import { ElMessageBox } from 'element-plus'
import BaseModuleDemo from './component/index.vue'

const dialogShow = ref<boolean>(false)
const drawerShow = ref<boolean>(false)
const baseModuleDialogShow = ref<boolean>(false)
const echartsModelShow = ref<boolean>(false)
const create = ref<boolean>(false)

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
    },
    {
        label: 'Show Echarts Modal',
        type: 'danger',
        onClick() {
            echartsModelShow.value = true

            setTimeout(() => {
                create.value = true
            }, 0)
        }
    }
])

const chartConfig = ref<ChartConfig>({
    type: 'bar',
    x: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
    data: {
        '销量': [5, 20, 36, 10, 10, 20],
        '价格': [50, 10, 16, 40, 60, 20],
        '人数': [60, 20, 46, 10, 40, 70]
    }
})

const closeHandle = () => {
    create.value = false
}
</script>

<style lang="scss" scoped></style>
