<template>
    <el-container class="business-layout">
        <el-aside width="200px">
            Aside
        </el-aside>
        <el-container>
            <el-header>Header</el-header>
            <el-main>
                <slot />
            </el-main>
        </el-container>
    </el-container>
</template>

<script lang="ts">
export default {
    name: 'BusinessLayout'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped>
.business-layout {
    height: 100%;

    :deep(.el-aside) {
        width: 250px !important;
        background-color: #00284d;
        color: #fff;
    }

    :deep(.el-header) {
        height: 148px;
        background-color: #cfe1f1;
        color: #00284d;
    }
    
    :deep(.el-main) {
        padding: 12px 17px 16px;
        background-color: #eef3f6;

        .content-wrapper {
            width: 100%;
            height: 100%;
            background-color: #fff;
            border-radius: 8px;
        }
    }
}
</style>
