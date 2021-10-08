<template>
    <el-button
        v-if="columnsConfig"
        size="small"
        type="primary"
        v-bind="$attrs"
        @click="handleTriggerBtn"
    >
        <slot>{{ mode === 'import' ? '导入Excel' : '下载模板' }}</slot>
        <LGIcon
            style="margin-left: 6px"
            :icon="mode === 'import' ? 'el-icon-upload2' : 'el-icon-download'"
        />
    </el-button>

    <!-- 导入 trigger -->
    <input
        v-if="mode === 'import'"
        ref="uploadTriggerRef"
        style="display: none"
        type="file"
        accept=".xlsx, .xls"
        @change="onUploadChange"
    >
</template>

<script lang="ts">
export default {
    name: 'GOperateExcel',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, PropType, useAttrs } from 'vue'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { TableColumnProps } from '../GTable'
import LGIcon from '../GIcon/index.vue'
// import XLSXStyle from 'xlsx-style'

const props = defineProps({
    columnsConfig: {
        type: Object as PropType<TableColumnProps[]>,
        required: true,
        default: null
    },
    mode: {
        type: String as PropType<'import' | 'template'>,
        default: 'import'
    },
    fileName: {
        type: String,
        default: 'xxx模板'
    }
})

const emits = defineEmits(['parsed'])

// 上传 input ref
const uploadTriggerRef = ref<HTMLElement>(null)

// 表格配置的有效数据列（包含 prop 且 type 不为 ['selection', 'index', 'expand'] 的列皆为有效列）
const localColumns = computed(() =>
    props.columnsConfig.filter(
        (column) =>
            !['selection', 'index', 'expand'].includes(column.type) &&
            column.prop &&
            column.prop !== 'opertion'
    )
)

const handleTriggerBtn = () => {
    if (props.mode === 'import') {
        uploadTriggerRef.value.click()
    } else if (props.mode === 'template') {
        outputTemplate()
    }
}

const onUploadChange = (e) => {
    if (e.target.files.length > 0) {
        parse(e.target.files[0])
    }
}

const parse = (file) => {
    if (!props.columnsConfig) {
        ElMessage.warning('未传递 columnsConfig')
        return
    }

    if (!file) return

    // 通过FileReader对象读取文件
    const fileReader = new FileReader()

    fileReader.onload = (event) => {
        try {
            const { result } = event.target
            const workbook = XLSX.read(result, { type: 'binary' })
            let data = []
            for (const sheet in workbook.Sheets) {
                if (workbook.Sheets.hasOwnProperty(sheet)) {
                    data = data.concat(XLSX.utils.sheet_to_json(workbook.Sheets[sheet]))
                    // break; // 如果只取第一张表，就取消注释这行
                }
            }

            // 最终获取到并且格式化后的 json 数据
            const tableDataFormatted = []
            for (let rowI = 0; rowI < data.length; rowI++) {
                let rowData = {}
                let rowSource = data[rowI]

                localColumns.value.forEach((column, columnIndex) => {
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

            emits('parsed', tableDataFormatted)

            // 重复上传同一个文件
            ;(uploadTriggerRef.value as any).value = ''
        } catch (e) {
            ElMessage.error('parse error')
        }
    }
    // 以二进制方式打开文件
    fileReader.readAsBinaryString(file)
}

// 导出模板
const outputTemplate = () => {
    const titles = localColumns.value.map((column) => column.label)
    const ws = XLSX.utils.aoa_to_sheet([titles])

    ws['A1'].s = {
        //为某个单元格设置单独样式
        font: {
            name: '宋体',
            sz: 24,
            bold: true,
            color: { rgb: 'FFFFAA00' }
        },
        alignment: { horizontal: 'center', vertical: 'center', wrap_text: true },
        fill: { bgcolor: { rgb: 'ffff00' } }
    }

    const tmpWB = {
        SheetNames: [props.fileName],
        Sheets: {
            [props.fileName]: ws
        }
    }

    try {
        XLSX.writeFile(tmpWB, `${props.fileName}.xlsx`)
    } catch (error) {
        console.log(`%c export template error:`, 'color: #f56c6c;', error)
    }
}
</script>

<style lang="scss" scoped></style>
