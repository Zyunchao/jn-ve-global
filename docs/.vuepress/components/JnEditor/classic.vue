<template>
    <jn-editor v-model="html" :config="cunstomConfig" />
</template>

<script lang="ts">
export default {
    name: 'ClassicDemo'
}
</script>

<script lang="ts" setup>
import { ref, watch } from 'vue'
/**
 * 实际开发中，请使用如下引用
 * import { RawEditorSettings } from 'jn-ve-global/packages'
 */
import { RawEditorSettings } from '@component/index'

const html = ref<string>('<h1>Hello Tiny!</h1>')

// 额外配置
const cunstomConfig: RawEditorSettings = {
    height: 500
}

watch(
    () => html.value,
    (val) => {
        console.log(`%c 编辑器内容变化 === `, 'color: #67c23a;', val)
    }
)
</script>

<style lang="scss" scoped></style>
