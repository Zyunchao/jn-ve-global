import { reactive } from 'vue'
import { TableColumnProps } from '@component/GTable'

export default () =>
    reactive<TableColumnProps[]>([
        {
            prop: 'date',
            label: '日期',
            width: 480,
            fixed: 'left'
        },
        {
            prop: 'name',
            label: '姓名',
            width: 480,
            showOverflowTooltip: true
        },
        {
            prop: 'address',
            width: 480,
            label: '地址'
        },
        {
            prop: 'tag',
            label: '标签',
            width: 480,
            render() {
                return (
                    <el-tag class='ml-2' type='danger'>
                        Tag 52222
                    </el-tag>
                )
            }
        },
        {
            prop: 'tag',
            label: '标签',
            width: 480,
            render(row) {
                return (
                    <el-switch
                        v-model={row.tag}
                        class='ml-2'
                        active-color='#13ce66'
                        inactive-color='#ff4949'
                        active-text='Open'
                        inactive-text='Close'
                    />
                )
            }
        }
    ])
