<template>
    <jn-editor v-model="html" mode="inline" />
</template>

<script lang="ts">
export default {
    name: 'InlineDemo'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const html = ref<string>('<h1>Hello Tiny!</h1>')

watch(
    () => html.value,
    (val) => {
        console.log(`%c 编辑器内容变化 === `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped></style>
