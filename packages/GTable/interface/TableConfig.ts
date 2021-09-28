import { TableColumnProps, TableProps, TableMethods as TableInstance } from '../index'

export interface PaginationProps {
    show?: boolean
    pageSize: number
    currentPage: number
    total: number
    onChange?: (currentPage?: number, currentPageSize?: number) => void
}

export default interface TableConfig<TBD> extends TableProps<TBD> {
    /**
     * 列的配置
     */
    columns: TableColumnProps[]
    /**
     * 一键开启多选
     */
    showSelection?: boolean
    /**
     * 已选数组
     */
    selectedRows?: TBD[]
    /**
     * 表格实例，用来调用表格的方法
     */
    instance: TableInstance | null
    /**
     * 可编辑行编辑完成事件
     */
    onCellEdited?: (row: TBD, index?: number | string, field?: string) => void
    /**
     * 分页
     */
    pagination?: PaginationProps | null
    /**
     * 可粘贴的
     */
    pastable?: boolean
    /**
     * 粘贴完成
     * @param tableData 粘贴处理后的数据
     */
    onPasted?: (tableData: TBD[]) => void
}
