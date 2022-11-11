import { TableColumnProps, TableProps, TableMethods as TableInstance } from '../index'
import { BtnProps } from '../../index'

export interface PaginationProps {
    show?: boolean
    pageSize: number
    currentPage: number
    total: number
    pageSizes?: number[]
    onChange?: (currentPage?: number, currentPageSize?: number) => void
}

export interface TableRowBtnProps<TBD> extends BtnProps {
    /**
     * 按钮点击事件
     */
    onClick?: (row?: TBD, index?: number) => void
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
     * 一键开启多选
     */
    showSelection?: boolean
    /**
     * 已选数组
     */
    selectedRows?: TBD[]
    /**
     * 多选列 Selection 的配置
     * 常使用：class、selectable 等
     */
    selectionColumns?: TableColumnProps
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
    /**
     * 自定义渲染操作列的按钮组
     */
    rowBtnConfig?: {
        /**
         * 按钮组
         */
        btns: TableRowBtnProps<TBD>[]
        /**
         * 最多显示几个按钮，超出部分将于更多操作内显示
         */
        maxCount?: number
        /**
         * 列的宽度
         */
        width?: string | number
        /**
         * 操作列的对齐方式
         */
        align?: 'left' | 'center' | 'right'
        /**
         * 标识是否追加操作按钮列
         */
        hide?: boolean
        /**
         * 固定位置
         * 列是否固定在左侧或者右侧。 true 表示固定在左侧
         */
        fixed?: true | 'left' | 'right'
        /**
         * 列标题
         */
        label?: string
    }
}
