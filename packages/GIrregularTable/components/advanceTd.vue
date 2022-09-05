<template>
    <td
        v-if="data && !data.destroyed"
        :rowspan="data.rowspan"
        :colspan="data.colspan"
        :class="[data.align, data.class]"
    >
        <span v-if="typeof data.content === 'string'">{{ data.content }}</span>
        <component :is="data.content" v-else />
    </td>
</template>

<script lang="ts">
export default {
    name: 'AdvanceTd'
}
</script>

<script lang="ts" setup>
import type Cell from '../interface/Cell'

const props = withDefaults(
    defineProps<{
        data: Cell
    }>(),
    {
        data: null
    }
)
</script>

<style lang="scss" scoped></style>
