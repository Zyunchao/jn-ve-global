<template>
    <div class="g-address">
        <el-cascader
            v-bind="attrs"
            v-model="selectedRegion"
            :filterable="true"
            :options="regionData"
            :props="cascaderProps"
        />
        <el-input v-model.trim="detailAddress" placeholder="详细地址" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GAddress'
}
</script>

<script lang="ts" setup>
import { toRaw, computed, useAttrs } from 'vue'
import regionData from './data/region.json'

const props = withDefaults(
    defineProps<{
        modelValue?: Array<any>
    }>(),
    {
        modelValue: () => []
    }
)

const emits = defineEmits(['update:modelValue'])
const attrs = useAttrs()

const cascaderProps = computed(() => ({
    ...(attrs as any).props,
    value: 'id',
    label: 'name'
}))

// 地区
const selectedRegion = computed<string[]>({
    get: () =>
        Array.isArray(props.modelValue) && props.modelValue[0] !== undefined
            ? props.modelValue[0]
            : [],
    set: (val) => {
        emits('update:modelValue', [toRaw(val), detailAddress.value])
    }
})

// 详细地址
const detailAddress = computed<string>({
    get: () =>
        Array.isArray(props.modelValue) && props.modelValue[1] !== undefined
            ? props.modelValue[1]
            : '',
    set: (val) => {
        emits('update:modelValue', [toRaw(selectedRegion.value), val])
    }
})
</script>

<style lang="scss" scoped>
.g-address {
    width: 100%;
    display: flex;
    justify-content: space-between;

    :deep(.el-cascader) {
        width: 40%;
    }

    > .el-input {
        width: 59%;
    }
}
</style>
