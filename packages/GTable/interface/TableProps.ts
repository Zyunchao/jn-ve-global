import { TableEvents } from '../index'

export interface BaseTableDataItem {
    id: string | number
    [k: string]: any
}

export default interface TableProps<TBD> extends TableEvents {
    /**
     * 显示的数据
     */
    data: TBD[]
    /**
     * Table 的高度，默认为自动高度。
     * 如果 height 为 number 类型，单位 px；
     * 如果 height 为 string 类型，则这个高度会设置为 Table 的 style.height 的值，Table 的高度会受控于外部样式。
     */
    height?: string | number
    /**
     * Table 的最大高度。合法的值为数字或者单位为 px 的高度。
     */
    maxHeight?: string | number
    /**
     * 是否为斑马纹  —	false
     */
    stripe?: boolean
    /**
     * 是否带有纵向边框 — false
     */
    border?: boolean
    /**
     * Table 的尺寸
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 列的宽度是否自撑开 —	true
     */
    fit?: boolean
    /**
     * 是否显示表头 — true
     */
    showHeader?: boolean
    /**
     * 是否要高亮当前行	— false
     */
    highlightCurrentRow?: boolean
    /**
     * 当前行的 key，只写属性
     */
    currentRowKey?: string | number
    /**
     * 行的 className 的回调方法，也可以使用字符串为所有行设置一个固定的 className
     */
    rowClassName?: string | ((current?: { row?: BaseTableDataItem; rowIndex?: number }) => string)
    /**
     * 行的 style 的回调方法，也可以使用一个固定的 Object 为所有行设置一样的 Style
     */
    rowStyle?: object | ((current?: { row?: BaseTableDataItem; rowIndex?: number }) => object)
    /**
     * 单元格的 className 的回调方法，也可以使用字符串为所有单元格设置一个固定的 className
     */
    cellClassName?:
        | string
        | ((current?: {
              row?: BaseTableDataItem
              column?: any
              rowIndex?: number
              columnIndex?: number
          }) => string)
    /**
     * 单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有单元格设置一样的 Style
     */
    cellStyle?:
        | object
        | ((current?: {
              row?: BaseTableDataItem
              column?: any
              rowIndex?: number
              columnIndex?: number
          }) => object)
    /**
     * 表头行的 className 的回调方法，也可以使用字符串为所有表头行设置一个固定的 className
     */
    headerRowClassName?:
        | string
        | ((current?: { row?: BaseTableDataItem; rowIndex?: number }) => string)
    /**
     * 表头行的 style 的回调方法，也可以使用一个固定的 Object 为所有表头行设置一样的 Style
     */
    headerRowStyle?: object | ((current?: { row?: BaseTableDataItem; rowIndex?: number }) => object)
    /**
     * 表头单元格的 className 的回调方法，也可以使用字符串为所有表头单元格设置一个固定的 className
     */
    headerCellClassName?:
        | string
        | ((current?: {
              row?: BaseTableDataItem
              column?: any
              rowIndex?: number
              columnIndex?: number
          }) => string)
    /**
     * 表头单元格的 style 的回调方法，也可以使用一个固定的 Object 为所有表头单元格设置一样的 Style
     */
    headerCellStyle?:
        | object
        | ((current?: {
              row?: BaseTableDataItem
              column?: any
              rowIndex?: number
              columnIndex?: number
          }) => object)
    /**
     * 行数据的 Key，用来优化 Table 的渲染；
     * 在使用 reserveSelection 功能与显示树形数据时，该属性是必填的。
     * 类型为 String 时，支持多层访问：user.info.id，但不支持 user.info[0].id，此种情况请使用 Function。
     *
     */
    rowKey?: string | ((row: BaseTableDataItem) => string)
    /**
     * 空数据时显示的文本内容，也可以通过 #empty 设置 —	暂无数据
     */
    emptyText?: string
    /**
     * 是否默认展开所有行，当 Table 包含展开行存在或者为树形表格时有效 — false
     */
    defaultExpandAll?: boolean
    /**
     * 可以通过该属性设置 Table 目前的展开行，需要设置 rowKey 属性才能使用，该属性为展开行的 keys 数组
     */
    expandRowKeys?: string[] | number[]
    /**
     * 默认的排序列的 prop 和顺序。它的 prop 属性指定默认的排序的列，order 指定默认排序的顺序	object
     * order: ascending / descending	如果只指定了 prop, 没有指定 order, 则默认顺序是 ascending
     */
    defaultSort?: object
    /**
     * tooltip effect 属性
     */
    tooltipEffect?: 'dark' | 'light'
    /**
     * 是否在表尾显示合计行 — false
     */
    showSummary?: boolean
    /**
     * 合计行第一列的文本 —	合计
     */
    sumText?: string
    /**
     * 自定义的合计计算方法	function({ columns, data })	—	—
     */
    summaryMethod?: (current?: { columns?: any; data?: any }) => any
    /**
     * 合并行或列的计算方法
     */
    spanMethod?: (current?: {
        row?: BaseTableDataItem
        column?: any
        rowIndex?: number
        columnIndex?: number
    }) => any
    /**
     * 在多选表格中，当仅有部分行被选中时，点击表头的多选框时的行为。
     * 若为 true，则选中所有行；
     * 若为 false，则取消选择所有行 — true
     */
    selectOnIndeterminate?: boolean
    /**
     * 展示树形数据时，树节点的缩进	 —	16
     */
    indent?: number
    /**
     * 是否懒加载子节点数据
     */
    lazy?: boolean
    /**
     * 加载子节点数据的函数，lazy 为 true 时生效，函数第二个参数包含了节点的层级信息	function(row, treeNode, resolve)	—	—
     */
    load?: (row?: BaseTableDataItem, treeNode?: BaseTableDataItem, resolve?: any) => any
    /**
     * 渲染嵌套数据的配置选项 —	{ hasChildren: 'hasChildren', children: 'children' }
     */
    treeProps?: { hasChildren?: string; children?: string; [k: string]: string }
}
