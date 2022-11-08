<template>
    <div class="examples-base-wrapper">
        <div class="box">
            <GChoose v-model="select" type="radio" :options="optinos" @change="checkboxOnChange" />

            <GChoose
                v-model="select2"
                type="checkBox"
                :options="optinos"
                @change="checkboxOnChange"
            />
        </div>

        <GChoose v-model="select" type="radioButton" :options="optinos" />
        <GChoose v-model="select2" type="checkBoxButton" :options="optinos" one-line />
    </div>
</template>

<script lang="ts">
export default {
    name: 'AdvanceCheckboxTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const optinos = ref([
    { label: '肯德基', value: '0' },
    { label: '麦当劳', value: '1' },
    { label: '必胜客', value: '2' },
    { label: '华莱士', value: '34', border: true },
    { label: '华莱士', value: '3' },
    { label: '肯德基', value: '01' },
    { label: '麦当劳', value: '12' },
    { label: '必胜客', value: '23' }
])

const select = ref<string>('')
const select2 = ref<any>([])

const checkboxOnChange = (val) => {
    console.log(`%c checkboxOnChange === `, 'color: #67c23a;', val)
}
</script>

<style lang="scss" scoped>
.box {
    width: 500px;
    margin-bottom: 20px;
}
</style>
