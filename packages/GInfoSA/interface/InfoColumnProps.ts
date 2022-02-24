import { VNode } from 'vue'

export default interface InfoColumnProps {
    /**
     * 显示的标题
     */
    label: string
    /**
     * 对应列内容的字段名，也可以使用 property 属性
     */
    prop: string
    /**
     * 对应列的宽度
     */
    width?: string | number
    /**
     * 自定义渲染
     */
    render?: (item?: any, index?: number) => JSX.Element | VNode | string | number
    /**
     * 对齐方式
     */
    align?: 'left' | 'center' | 'right'
    /**
     * 当内容过长被隐藏时显示 tooltip
     */
    showOverflowTooltip?: boolean
    /**
     * 是否是查询条件
     * 当前列的 prop 将作为 查询字段抛出
     */
    isQuery?: boolean
    /**
     * 查询控件类型
     * 默认为 input，即不传递类型，就使用 input 控件
     */
    queryType?: 'input' | 'select'
    /**
     * 下拉框的待选列表
     */
    querySelectOptions?: {
        value: string | number
        label: string
    }[]
}
