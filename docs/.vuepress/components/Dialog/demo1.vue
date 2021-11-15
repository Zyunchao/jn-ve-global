<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="handleClick">
            显示
        </el-button>
    </div>

    <g-dialog v-model="dialogShow" append-to-body title="弹框" :btns="btns">
        测试弹框内容
    </g-dialog>
</template>

<script lang="ts">
export default {
    name: 'DialogTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { BtnProps } from '@component/index'

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

<style lang="scss"></style>
