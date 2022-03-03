import { BaseTableDataItem } from '../index'

export default interface TableMethods {
    /**
     * 用于多选表格，清空用户的选择
     */
    clearSelection: () => void
    /**
     * 用于多选表格
     * 切换某一行的选中状态，如果使用了第二个参数，则是设置这一行选中与否（selected 为 true 则选中）
     */
    toggleRowSelection: (row?: any, selected?: boolean) => void
    /**
     * 用于多选表格，切换全选和全不选
     */
    toggleAllSelection: (selected?: boolean) => void
    /**
     * 用于可展开表格与树形表格，切换某一行的展开状态
     * 如果使用了第二个参数，则是设置这一行展开与否（expanded 为 true 则展开）
     */
    toggleRowExpansion: (row?: any, expanded?: boolean) => void
    /**
     * 用于单选表格，设定某一行为选中行，如果调用时不加参数，则会取消目前高亮行的选中状态
     */
    setCurrentRow: (row?: any) => void
    /**
     * 用于清空排序条件，数据会恢复成未排序的状态
     */
    clearSort: () => void
    /**
     * 不传入参数时用于清空所有过滤条件，数据会恢复成未过滤的状态，也可传入由columnKey组成的数组以清除指定列的过滤条件
     */
    clearFilter: (columnKey?: string | number) => void
    /**
     * 对 Table 进行重新布局。当 Table 或其祖先元素由隐藏切换为显示时，可能需要调用此方法
     */
    doLayout: () => void
    /**
     * 手动对 Table 进行排序。
     * 参数 prop 属性指定排序列，order 指定排序顺序
     */
    sort: (prop?: string, order?: string) => void
}
