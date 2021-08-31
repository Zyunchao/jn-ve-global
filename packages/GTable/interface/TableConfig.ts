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
     * 表格实例，用来调用表格的方法
     */
    instance: TableInstance | null
    /**
     * 分页
     */
    pagination?: PaginationProps | null
}
