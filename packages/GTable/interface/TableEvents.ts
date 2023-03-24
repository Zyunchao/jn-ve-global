interface CustomTableEvents {
    onRefresh?: () => void
}

export default interface TableEvents extends CustomTableEvents {
    /**
     * 当用户手动勾选数据行的 Checkbox 时触发的事件	selection, row
     */
    onSelect?: (selection?: unknown, row?: unknown) => void
    /**
     * 当用户手动勾选全选 Checkbox 时触发的事件	selection
     */
    onSelectAll?: (selection?: unknown) => void
    /**
     * 当选择项发生变化时会触发该事件	selection
     */
    onSelectionChange?: (selection?: unknown) => void
    /**
     * 当单元格 hover 进入时会触发该事件	row, column, cell, event
     */
    onCellMouseEnter?: (row?: unknown, column?: unknown, cell?: unknown, event?: Event) => void
    /**
     * 当单元格 hover 退出时会触发该事件	row, column, cell, event
     */
    onCellMouseLeave?: (row?: unknown, column?: unknown, cell?: unknown, event?: Event) => void
    /**
     * 当某个单元格被点击时会触发该事件	row, column, cell, event
     */
    onCellClick?: (row?: unknown, column?: unknown, cell?: unknown, event?: Event) => void
    /**
     * 当某个单元格被双击击时会触发该事件	row, column, cell, event
     */
    onCellDblclick?: (row?: unknown, column?: unknown, cell?: unknown, event?: Event) => void
    /**
     * 当某个单元格被鼠标右键点击时会触发该事件	row, column, cell, event
     */
    onCellContextmenu?: (row?: unknown, column?: unknown, cell?: unknown, event?: Event) => void
    /**
     * 当某一行被点击时会触发该事件	row, column, event
     */
    onRowClick?: (row?: unknown, column?: unknown, event?: Event) => void
    /**
     * 当某一行被鼠标右键点击时会触发该事件	row, column, event
     */
    onRowContextmenu?: (row?: unknown, column?: unknown, event?: Event) => void
    /**
     * 当某一行被双击时会触发该事件	row, column, event
     */
    onRowDblclick?: (row?: unknown, column?: unknown, event?: Event) => void
    /**
     * 当某一列的表头被点击时会触发该事件	column, event
     */
    onHeaderClick?: (column?: unknown, event?: Event) => void
    /**
     * 当某一列的表头被鼠标右键点击时触发该事件	column, event
     */
    onHeaderContextmenu?: (column?: unknown, event?: Event) => void
    /**
     * 当表格的排序条件发生变化的时候会触发该事件	{ column, prop, order }
     */
    onSortChange?: (params?: unknown) => void
    /**
     * 当表格的筛选条件发生变化的时候会触发该事件，参数的值是一个对象，对象的 key 是 column 的 columnKey，对应的 value 为用户选择的筛选条件的数组。	filters
     */
    onFilterChange?: (filters?: unknown) => void
    /**
     * 当表格的当前行发生变化的时候会触发该事件，如果要高亮当前行，请打开表格的 highlightCurrent-row 属性	currentRow, oldCurrentRow
     */
    onCurrentChange?: (currentRow?: unknown, oldCurrentRow?: unknown) => void
    /**
     * 当拖动表头改变了列的宽度的时候会触发该事件	newWidth, oldWidth, column, event
     */
    onHeaderDragend?: (
        newWidth?: unknown,
        oldWidth?: unknown,
        column?: unknown,
        event?: Event
    ) => void
    /**
     * 当用户对某一行展开或者关闭的时候会触发该事件（展开行时，回调的第二个参数为 expandedRows；树形表格时第二参数为 expanded）	row, (expandedRows | expanded)
     */
    onExpandChange?: (row?: unknown, expandeds?: unknown) => void
}
