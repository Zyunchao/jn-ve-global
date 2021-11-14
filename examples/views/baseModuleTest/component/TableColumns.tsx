import { reactive } from 'vue'
import { TableColumnProps } from '@component/GTable'

export default () =>
    reactive<TableColumnProps[]>([
        {
            prop: 'date',
            label: '日期',
            width: 180
        },
        {
            prop: 'name',
            label: '姓名',
            width: 180
        },
        {
            prop: 'address',
            label: '地址'
        },
        {
            prop: 'opertion',
            label: '操作',
            width: 260,
            fixed: 'right',
            render(row) {
                return (
                    <>
                        <el-button
                            type='text'
                            onClick={() => console.log(`%c 编辑 row == `, 'color: #e6a23c;', row)}>
                            编辑
                        </el-button>
                        <el-button
                            type='text'
                            onClick={() => console.log(`%c 详情 row == `, 'color: #e6a23c;', row)}>
                            详情
                        </el-button>
                        <el-button
                            type='text'
                            class='btn-danger'
                            onClick={() => console.log(`%c 删除 row == `, 'color: #e6a23c;', row)}>
                            删除
                        </el-button>
                    </>
                )
            }
        }
    ])
