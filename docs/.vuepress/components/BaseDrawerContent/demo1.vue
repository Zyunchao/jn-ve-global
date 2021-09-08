<template>
    <el-button type="primary" @click="drawerState.show = true">打开 Drawer</el-button>
    <el-drawer v-model="drawerState.show" :title="DrawerTitle[drawerState.type]" destroy-on-close>
        <GBaseDrawerContent>
            <g-form :config="infoFormConfig" />

            <template #footer>
                <el-button> 重置 </el-button>
                <el-button type="primary"> 保存 </el-button>
            </template>
        </GBaseDrawerContent>
    </el-drawer>
</template>

<script lang="ts">
export default {
    name: 'BaseDrawerContent-demo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps } from '@component/GForm'

enum DrawerType {
    ADD = 'add',
    UPDATE = 'update'
}

const DrawerTitle = {
    [DrawerType.ADD]: '新增',
    [DrawerType.UPDATE]: '编辑'
}

const drawerState = reactive({
    show: false,
    type: DrawerType.ADD
})

const infoFormConfig = reactive<FormProps>({
    instance: null,
    labelWidth: '100px',
    model: {
        name: ''
    },
    formItems: [
        {
            prop: 'name',
            label: '姓名',
            span: 24,
            controlConfig: {
                type: 'input'
            }
        }
    ]
})
</script>

<style lang="scss" scoped></style>
