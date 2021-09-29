<template>
    <el-button v-if="columnConfig" size="small" type="primary" @click="uploadTrigger.click()">
        <span>导入Excel</span>
    </el-button>
    <input
        ref="uploadTrigger"
        style="display: none"
        type="file"
        accept=".xlsx, .xls"
        @change="onUploadChange"
    >
</template>

<script lang="ts">
export default {
    name: 'GFilereadr'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, PropType } from 'vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { TableColumnProps } from '../GTable'

const props = defineProps({
    columnConfig: {
        type: Object as PropType<TableColumnProps[]>,
        required: true,
        default: null
    }
})

const emits = defineEmits(['getData'])

const uploadTrigger = ref<HTMLElement>(null)

const onUploadChange = (e) => {
    parse(e.target.files[0])
}

const parse = (file) => {
    if (!props.columnConfig) {
        ElMessage.warning('为传递 columnConfig')
        return
    }

    // 过滤有效列
    const localColumns = props.columnConfig.filter(
        (column) => !['selection', 'index', 'expand'].includes(column.type)
    )

    // 通过FileReader对象读取文件
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
        try {
            const { result } = event.target
            // 以二进制流方式读取得到整份excel表格对象
            const workbook = XLSX.read(result, { type: 'binary' })
            // 存储获取到的数据
            let data = []
            // 遍历每张工作表进行读取（这里默认只读取第一张表）
            for (const sheet in workbook.Sheets) {
                // esline-disable-next-line
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    // 利用 sheet_to_json 方法将 excel 转成 json 数据
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }

            // 最终获取到并且格式化后的 json 数据
            const tableDataFormatted = []
            for (let rowI = 0; rowI < data.length; rowI++) {
                let rowData = {}
                let rowSource = data[rowI]

                localColumns.forEach((column, columnIndex) => {
                    if (column.excelValueFormat) {
                        const preField = rowI > 0 ? tableDataFormatted[rowI - 1][column.prop] : null

                        const currentField = column.excelValueFormat(
                            rowSource[column.label] || '',
                            preField,
                            rowI
                        )
                        rowData[column['prop']] = currentField
                    } else {
                        rowData[column['prop']] = rowSource[column.label] || ''
                    }
                })

                tableDataFormatted.push(rowData)
            }

            emits('getData', tableDataFormatted)
        } catch (e) {
            ElMessage.error('parse error')
        }
    }
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file)
}
</script>

<style lang="scss" scoped></style>
