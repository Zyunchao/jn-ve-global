<template>
    <jn-editor ref="editorRef" v-model="html" />
</template>

<script lang="ts">
export default {
    name: 'GetInstance'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const html = ref<string>('<h1>Hello Tiny!</h1>')
const editorRef = ref<any>(null)

watch(
    () => editorRef.value,
    (instance) => {
        console.log(`%c JnEditor instance === `, 'color: red;', instance)
    }
)
</script>

<style lang="scss" scoped></style>
