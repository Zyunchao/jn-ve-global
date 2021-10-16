<template>
    <div class="update-log-block">
        <div class="title">
            <div class="version">
                <slot name="version" />
            </div>
            <div class="date">
                <slot name="date" />
            </div>
        </div>

        <div class="content">
            <slot />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'UpdateLogBlock'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
</script>

<style lang="scss" scoped>
.update-log-block {
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-bottom: 40px;
    box-shadow: 1px 2px 10px rgba(0, 0, 0, 0.1);

    :deep(p) {
        margin: 0;
    }

    .title {
        display: flex;
        padding: 15px 30px;
        justify-content: space-between;
        border-bottom: 1px solid #ddd;

        .version {
            font-weight: 700;
            font-size: 20px;
        }

        .date {
            display: flex;
            align-items: center;
        }
    }

    .content {
        padding: 20px 50px;
    }
}
</style>
