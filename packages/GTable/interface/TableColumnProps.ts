import { VNode } from 'vue'
import TableEditCellControlConfig from './TableEditCellControlConfig'
import { BaseTableDataItem } from '../../index'
import { Rule } from 'async-validator'

export default interface TableColumnProps {
    /**
     * 显示的标题
     */
    label: string
    /**
     * 对应列内容的字段名，也可以使用 property 属性
     */
    prop?: string
    /**
     * 对应列的类型。
     * 如果设置了 selection 则显示多选框；
     * 如果设置了 index 则显示该行的索引（从 1 开始计算）；
     * 如果设置了 expand 则显示为一个可展开的按钮
     */
    type?: 'selection' | 'index' | 'expand'
    /**
     * 如果设置了 type=index，可以通过传递 index 属性来自定义索引
     */
    index?: number | ((index: number) => number)
    /**
     * column 的 key，如果需要使用 filterChange 事件，则需要此属性标识是哪个 column 的筛选条件
     */
    columnKey?: string
    /**
     * 对应列的宽度
     */
    width?: string | number
    /**
     * 对应列的最小宽度，与 width 的区别是 width 是固定的，minWidth 会把剩余宽度按比例分配给设置了 minWidth 的列
     */
    minWidth?: string | number
    /**
     * 列是否固定在左侧或者右侧，true 表示固定在左侧
     */
    fixed?: boolean | 'left' | 'right'
    /**
     * 列标题 Label 区域渲染使用的 Function
     */
    renderHeader?: (current?: {
        column?: TableColumnProps
        $index?: string | number
    }) => JSX.Element | VNode | string | number
    /**
     * 对应列是否可以排序，如果设置为 'custom'，则代表用户希望远程排序，需要监听 Table 的 sortChange 事件
     */
    sortable?: boolean | 'custom'
    /**
     * 对数据进行排序的时候使用的方法，仅当 sortable 设置为 true 的时候有效，需返回一个数字
     * 和 Array.sort 表现一致	function(a, b)
     * */
    sortMethod?: (a: any, b: any) => number
    /**
     * 指定数据按照哪个属性进行排序，仅当 sortable 设置为 true 且没有设置 sortMethod 的时候有效。
     * 如果 sortBy 为数组，则先按照第 1 个属性排序，
     * 如果第 1 个相等，再按照第 2 个排序，以此类推	string / array / function(row, index)	—	—
     */
    sortBy?: string | Array<any> | ((row?: any, index?: number) => any)
    /**
     * 数据在排序时所使用排序策略的轮转顺序，
     * 仅当 sortable 为 true 时有效。
     * 需传入一个数组，随着用户点击表头，该列依次按照数组中元素的顺序进行排序
     * array数组中的元素需为以下三者之一：
     * - ascending 表示升序
     * - descending 表示降序
     * - null 表示还原为原始顺序
     *
     * ['ascending', 'descending', null]
     */
    sortOrders?: ('ascending' | 'descending' | null)[]
    /**
     * 对应列是否可以通过拖动改变宽度（需要在 elTable 上设置 border 属性为真） — true
     */
    resizable?: boolean
    /**
     * 用来格式化内容	function(row, column, cellValue, index)	—	—
     */
    formatter?: (
        row?: any,
        column?: TableColumnProps,
        cellValue?: any,
        index?: number
    ) => string | any
    /**
     * 当内容过长被隐藏时显示 tooltip — false
     */
    showOverflowTooltip?: boolean
    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 表头对齐方式，若不设置该项，则使用表格的对齐方式
     */
    headerAlign?: 'left' | 'center' | 'right'
    /**
     * 列的 className
     */
    className?: string
    /**
     * 当前列标题的自定义类名
     */
    labelClassName?: string
    /**
     * 仅对 type=selection 的列有效，类型为 Function
     * Function 的返回值用来决定这一行的 CheckBox 是否可以勾选
     */
    selectable?: (row?: any, index?: number) => boolean
    /**
     * 仅对 type=selection 的列有效，类型为 Boolean
     * 为 true 则会在数据更新之后保留之前选中的数据（需指定 rowKey） —	false
     */
    reserveSelection?: boolean
    /**
     * 数据过滤的选项，数组格式，数组中的元素需要有 text 和 value 属性
     */
    filters?: { text: string | number; value: string | number }[]
    /**
     * 过滤弹出框的定位	string 与 Tooltip 的 placement 属性相同
     */
    filterPlacement?:
        | 'top'
        | 'top-start'
        | 'top-end'
        | 'bottom'
        | 'bottom-start'
        | 'bottom-end'
        | 'left'
        | 'left-start'
        | 'left-end'
        | 'right'
        | 'right-start'
        | 'right-end'
    /**
     * 	数据过滤的选项是否多选  — true
     */
    filterMultiple?: boolean
    /**
     * 数据过滤使用的方法，如果是多选的筛选项，对每一条数据会执行多次，任意一次返回 true 就会显示
     */
    filterMethod?: (value?: string, row?: any, column?: TableColumnProps) => boolean
    /**
     * 选中的数据过滤项，如果需要自定义表头过滤的渲染方式，可能会需要此属性
     */
    filteredValue?: any[]

    // 扩展属性 -----------------------------------------------------------------------
    /**
     * 自定义渲染
     */
    render?: (row?: any, index?: number) => JSX.Element | VNode | string | number
    /**
     * 多级嵌套表头
     */
    children?: TableColumnProps[]
    /**
     * 是否可编辑
     */
    editable?: boolean
    /**
     * 编辑控件类型
     */
    controlConfig?: TableEditCellControlConfig
    /**
     * 控件验证规则
     * rules 服务于两种情况：
     *  1. 可编辑表格控件校验
     *  2. 复制粘贴源数据校验
     */
    rules?: Rule
    /**
     * 粘贴数据的格式化
     */
    excelValueFormat?: (
        currentField: string | number,
        preField?: any,
        index?: number
    ) => string | number | boolean | Date | any[] | object,
    /**
     * 隐藏列
     */
    hide?: boolean
    /**
     * 是否开启双击编辑
     */
    openDB?: boolean
}
