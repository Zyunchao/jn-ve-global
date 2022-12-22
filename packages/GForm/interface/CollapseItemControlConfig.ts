import type { BtnProps } from '../../index'
export default interface CollapseItemControlConfig {
    type: 'collapseItem'
    props?: {
        /**
         * 禁用
         */
        disabled?: boolean
        /**
         * 前缀图标
         */
        prefix?: string
        /**
         * 是否默认展开
         */
        active?: boolean
        /**
         * 是否是尾巴，闭合标签作用
         */
        isTail?: boolean
        /**
         * 按钮组
         */
        btns?: BtnProps[]
    }
}
