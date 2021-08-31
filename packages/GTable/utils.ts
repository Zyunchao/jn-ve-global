import { TableConfig, TableColumnProps } from './index'
/**
 * 剔除扩展属性，获取表格的原生配置属性
 * @param props TableConfig
 */
export function getTableProps(props: TableConfig<any>) {
    const { columns, instance, pagination, ...tableProps } = props

    return tableProps
}

/**
 * 剔除扩展属性，获取 Column 原生配置属性
 * @param props
 */
export function getColumnProps(props: TableColumnProps) {
    const { render, children, ...columnProps } = props

    return columnProps
}
