<template>
    <g-irregular-table :col-num="38" :row-num="6" :cell-list="efficaciousCellList" />
</template>

<script lang="ts">
export default {
    name: 'IrregularTableDesign'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import getEfficaciousCellList from './data/efficaciousCellList'

const { efficaciousCellList } = getEfficaciousCellList()
</script>

<style lang="scss" scoped></style>
