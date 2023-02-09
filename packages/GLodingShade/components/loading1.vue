<template>
    <div class="loading">
        <LGIcon class="loading1" icon="el-Loading" />
    </div>
</template>

<script lang="ts" setup>
import LGIcon from '../../GIcon/index.vue'
</script>

<style lang="scss" scoped>
@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.loading {
    :deep(.g-icon) {
        font-size: 100px;
        color: #399ffb;
        font-weight: 700;
        animation: rotate 1.5s linear infinite;
    }
}
</style>
