<template>
    <jn-editor v-model="html" />
</template>

<script lang="ts">
export default {
    name: 'ContentStorage'
}
</script>

<script lang="ts" setup>
import { watch, ref } from 'vue'

const html = ref<string>('')

watch(
    () => html.value,
    (val) => {
        console.log(`%c 编辑器内容 ==== `, 'color: yellow;', val)
    }
)
</script>

<style lang="scss" scoped></style>
