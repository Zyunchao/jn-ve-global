<template>
    <el-button @click="modalShow = true">
        打开弹框
    </el-button>

    <g-modal v-model="modalShow" title="测试图表">
        <!-- <Bar /> -->
        <Line />
    </g-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'ChartTestModalTest'
})
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive, onMounted, onUnmounted, nextTick } from 'vue'
import Bar from './bar.vue'
import Line from './line.vue'
import BarWithLine from './barWithLine.vue'
import Pie from './pie.vue'
import Custom from './custom.vue'

const modalShow = ref<boolean>(false)
</script>

<style lang="scss" scoped></style>
