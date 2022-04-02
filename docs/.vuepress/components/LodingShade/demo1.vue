<template>
    <div class="box">
        <el-button @click="openShade">
            打开遮罩
        </el-button>
        <g-loding-shade :show="loadingShow" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GLodingShadeTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const loadingShow = ref<boolean>(false)

const openShade = () => {
    loadingShow.value = true
}

watch(
    () => loadingShow.value,
    (val) => {
        if (val) {
            setTimeout(() => {
                loadingShow.value = false
            }, 2000)
        }
    }
)
</script>

<style lang="scss" scoped>
.box {
    height: 500px;
}
</style>
