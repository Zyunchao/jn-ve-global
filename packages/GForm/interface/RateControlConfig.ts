export interface RateProps {
    /**
     * 最大分值
     * default: 5
     */
    max?: number
    /**
     * 是否为只读
     * default: false
     */
    disabled?: boolean
    /**
     * 是否允许半选
     * default: false
     */
    allowHalf?: boolean
    /**
     * 低分和中等分数的界限值，值本身被划分在低分中
     * default: 2
     */
    lowThreshold?: number
    /**
     * 高分和中等分数的界限值，值本身被划分在高分中
     * default: 4
     */
    highThreshold?: number
    /**
     * icon 的颜色。若传入数组，共有 3 个元素，为 3 个分段所对应的颜色；
     * 若传入对象，可自定义分段，键名为分段的界限值，键值为对应的颜色
     * default: ['#F7BA2A', '#F7BA2A', '#F7BA2A']
     */
    colors?: string[] | object
    /**
     * 未选中 icon 的颜色
     * default: #C6D1DE
     */
    voidColor?: string
    /**
     * 只读时未选中 icon 的颜色
     * default: #EFF2F7
     */
    disabledVoidColor?: string
    /**
     * icon 的类名。若传入数组，共有 3 个元素，为 3 个分段所对应的类名；
     * 若传入对象，可自定义分段，键名为分段的界限值，键值为对应的类名
     * default：['el-icon-star-on', 'el-icon-star-on','el-icon-star-on']
     */
    iconClasses?: string[] | object
    /**
     * 未选中 icon 的类名
     * default: el-icon-star-off
     */
    voidIconClass?: string
    /**
     * 只读时未选中 icon 的类名
     * default: el-icon-star-on
     */
    disabledVoidIconClass?: string
    /**
     * 是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容
     * default: false
     */
    showText?: boolean
    /**
     * 是否显示当前分数，show-score 和 show-text 不能同时为真
     * default: false
     */
    showScore?: boolean
    /**
     * 辅助文字的颜色
     * default: #1F2D3D
     */
    textColor?: string
    /**
     * 辅助文字数组
     * default: ['极差', '失望', '一般', '满意', '惊喜']
     */
    texts?: string[]
    /**
     * 	分数显示模板
     */
    scoreTemplate?: string

    /**
     * 分值改变时触发
     */
    onChange?: (newValue: string | number) => void
}

export default interface RateControlConfig {
    type: 'rate'
    props?: RateProps
}
