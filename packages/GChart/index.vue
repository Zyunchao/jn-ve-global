<template>
    <Bar v-if="chartType === 'bar'" ref="chartsInstance" :config="config" v-bind="$attrs" />
</template>

<script lang="ts">
export default {
    name: 'GChart'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, PropType, toRef } from 'vue'
import ChartConfig from './interface/ChartConfig'
import Bar from './component/bar.vue'

const props = defineProps({
    config: {
        type: Object as PropType<ChartConfig>,
        default: null
    }
})

const chartType = computed(() => props.config.type)
const chartsInstance = ref(null)
</script>

<style lang="scss" scoped></style>
