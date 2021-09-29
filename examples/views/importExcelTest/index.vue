<template>
    <g-import-excel :column-config="tableColumns" @getData="getData" />
</template>

<script lang="ts">
export default {
    name: 'GFileReadrTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import { TableColumnProps, TableConfig } from '@component/index'

const tableColumns = reactive<TableColumnProps[]>([
    {
        type: 'index',
        label: ''
    },
    {
        prop: 'name',
        label: '姓名'
    },
    {
        prop: 'age',
        label: '年龄'
    },
    {
        prop: 'sex',
        label: '性别',
        excelValueFormat(current, pre) {
            if (pre && current === '') {
                return pre
            }

            return current
        }
    },
    {
        prop: 'height',
        label: '身高'
    },
    {
        prop: 'hobby',
        label: '爱好'
    }
])

const getData = (data) => {
    console.log(`%c 获取到的数据 == `, 'color: #67c23a;', data)
}
</script>

<style lang="scss" scoped></style>
