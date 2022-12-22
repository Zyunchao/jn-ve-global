<template>
    <div class="wrapper">
        <g-collapse v-model="activeNames" mode="card">
            <GCollapseItem title="自定义" name="1">
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
                <p>自定义内容........</p>
            </GCollapseItem>
            <GCollapseItem title="自定义2自定义2自定义2自定义2" name="2">
                <p>自定义内容2........</p>
                <p>自定义内容2........</p>
                <p>自定义内容2........</p>
                <p>自定义内容2........</p>
            </GCollapseItem>
        </g-collapse>
    </div>
</template>

<script lang="ts">
export default {
    name: 'CollapseCardTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'

const activeNames = ref<string[]>(['1', '2'])
</script>

<style lang="scss" scoped>
.wrapper {
    height: 440px;
}
</style>
