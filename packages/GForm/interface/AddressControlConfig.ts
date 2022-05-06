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
    props?: AddressProps & AddressCascaderEvents
}
