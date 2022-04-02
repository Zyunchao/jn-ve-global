<template>
    <transition name="shade-opactitys">
        <div v-if="show" class="loading-next">
            <LGIcon icon="el-Loading" />
        </div>
    </transition>
</template>

<script lang="ts">
export default {
    name: 'GLodingShade'
}
</script>

<script lang="ts" setup>
import LGIcon from '../GIcon/index.vue'
const props = withDefaults(defineProps<{ show: boolean }>(), {
    show: false
})
</script>

<style lang="scss" scoped>
$--base-active-color: #399ffb;

@keyframes rotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.loading-next {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    background-color: #fff;

    :deep(.g-icon) {
        font-size: 100px;
        color: $--base-active-color;
        font-weight: 700;
        animation: rotate 1.5s linear infinite;
    }
}

.shade-opactitys-enter-active,
.shade-opactitys-leave-active {
	will-change: transform;
	transition: all 0.3s ease;
}

.shade-opactitys-enter-from,
.shade-opactitys-leave-to {
	opacity: 0;
}
</style>
