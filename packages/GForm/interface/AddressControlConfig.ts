export interface AddressProps {
    /**
     * 是否支持清空选项
     * false
     */
    clearable?: boolean
    /**
     * 用于分隔选项的字符
     * '/'
     */
    separator?: string
    /**
     * 是否隐藏详细地址
     */
    hideDetail?: boolean
    /**
     * 级联选择的节点 props 配置
     */
    props?: {
        /**
         * 次级菜单的展开方式
         */
        expandTrigger?: 'click' | 'hover'
        /**
         * 是否多选
         */
        multiple?: boolean
        /**
         * 是否严格的遵守父子节点不互相关联
         */
        checkStrictly?: boolean
        /**
         * 在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组
         * 若设置 false，则只返回该节点的值
         */
        emitPath?: boolean
        /**
         * 是否动态加载子节点，需与 lazyLoad 方法结合使用
         */
        lazy?: boolean
        /**
         * 加载动态数据的方法，仅在 lazy 为 true 时有效
         */
        lazyLoad?: (node, resolve) => void
        /**
         * 指定选项的值为选项对象的某个属性值
         */
        value?: string
        /**
         * 指定选项标签为选项对象的某个属性值
         */
        label?: string
        /**
         * 指定选项的子选项为选项对象的某个属性值
         */
        children?: string
        /**
         * 指定选项的禁用为选项对象的某个属性值
         */
        disabled?: string
        /**
         * 指定选项的叶子节点的标志位为选项对象的某个属性值
         */
        leaf?: string
    }
}

export interface AddressCascaderEvents {
    /**
     * 当绑定值变化时触发的事件	value
     */
    onChange?: (val: string | string[]) => void
    /**
     * 当展开节点发生变化时触发	各父级选项值组成的数组
     */
    onExpandChange?: (val: string | string[]) => void
    /**
     * 当失去焦点时触发	(event: Event)
     */
    onBlur?: (e: Event) => void
    /**
     * 当获得焦点时触发	(event: Event)
     */
    onFocus?: (e: Event) => void
    /**
     * 下拉框出现/隐藏时触发	出现则为 true，隐藏则为 false
     */
    onVisibleChange?: (visible: boolean) => void
    /**
     * 在多选模式下，移除Tag时触发	移除的Tag对应的节点的值
     */
    onRemoveTag?: (val: string) => void
}

export default interface AddressContrilConfig {
    type: 'address'
    options?: Array<any>
    props?: AddressProps & AddressCascaderEvents
}
