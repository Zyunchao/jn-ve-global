<template>
    <div class="examples-base-wrapper">
        <el-button type="primary" @click="handleClick">
            显示
        </el-button>
    </div>

    <g-dialog v-model="dialogShow" append-to-body title="弹框">
        测试弹框内容

        <template #footer>
            自定义底部内容
        </template>
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

const handleClick = () => {
    dialogShow.value = true
}
</script>

<style lang="scss" scoped></style>

<style lang="scss"></style>
