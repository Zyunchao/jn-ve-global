<template>
    <div class="examples-base-wrapper">
        <g-select-tree v-model="avtiveVal" style="width: 400px;" :tree-data="mockData" />
    </div>
</template>

<script lang="ts">
import { watch, reactive, toRefs } from 'vue'
import mockData from './data.json'

export default {
    name: 'SelectTreeTest',
    setup(props, context) {
        const state = reactive({
            avtiveVal: '1425375363846037505'
        })

        watch(
            () => state.avtiveVal,
            (val) => {
                console.log(`%c 父级状态发生变化 === `, 'color: #67c23a;', val)
            }
        )

        return {
            ...toRefs(state),
            mockData
        }
    }
}
</script>

<style lang="scss" scoped></style>
