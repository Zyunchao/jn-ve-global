import { VNode } from 'vue'

export default interface InfoSelectColumnProps {
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
}
