<template>
    <el-collapse class="custom-collapse">
        <slot />
    </el-collapse>
</template>

<script lang="ts">
export default {
    name: 'GCollapse'
}
</script>
<style lang="scss" scoped>
.custom-collapse {
    border: none;
}
</style>
