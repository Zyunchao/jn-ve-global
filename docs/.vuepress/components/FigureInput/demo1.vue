<template>
    <div class="item">
        <span class="label">收集的数据：</span>
        <span class="content">{{ figureVal }}</span>
    </div>

    <div class="item">
        <span class="label">千分位：</span>
        <GFigureInput
            v-model="figureVal"
            :format="format1"
            placeholder="请输入...."
        />
    </div>
    <div class="item">
        <span class="label">展示保留两位小数：</span>
        <GFigureInput
            v-model="figureVal"
            :format="format2"
            placeholder="请输入...."
        />
    </div>
    <div class="item">
        <span class="label">展示保留四位小数：</span>
        <GFigureInput
            v-model="figureVal"
            :format="format3"
            placeholder="请输入...."
        />
    </div>
    <div class="item">
        <span class="label">至多输入两位小数：</span>
        <GFigureInput
            v-model="figureVal"
            :format="format1"
            :value-format="valueFormat"
            placeholder="请输入...."
        />
    </div>
</template>

<script lang="ts">
export default {
    name: 'FigureInputDemo1'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { toThousands, restrictDecimals } from '@component/GFigureInput/utils'

const figureVal = ref<number | string>('')

// 千分位
const format1 = (val: string) => toThousands(val)

// 保留两位小数
const format2 = (val: number) => (val ? (val - 0).toFixed(2) : val)

// 保留四位小数
const format3 = (val: number) => (val ? (val - 0).toFixed(4) : val)

// 至多输入两位小数
const valueFormat = (val: string) => restrictDecimals(val as string, 2)
</script>

<style lang="scss" scoped>
.item {
    display: flex;
    height: 40px;
    line-height: 40px;
    margin-bottom: 20px;

    .label {
        width: 220px;
        text-align: right;
        line-height: 40px;
        padding-right: 20px;
    }

    .content {
        width: 100%;
        font-weight: 700;
    }
}
</style>
