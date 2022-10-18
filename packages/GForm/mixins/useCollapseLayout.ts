import { computed, ShallowRef, Ref, watch } from 'vue'
import type { FormProps, FormItemProps } from '../index'

export interface CustomCollapseItem {
    name: string
    /**
     * 索引
     */
    index: number
    /**
     * 标题
     */
    title: string
    /**
     * 控件内容
     */
    content: FormItemProps[]
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
}

export default (props: { config: FormProps }) => {
    // 基于所有的表单项操作
    const formItems = computed<FormItemProps[]>(() => props.config.formItems)

    /**
     * 不属于 collapse 控制的表单项：第一个 collapseItem 之前的项，被认为不予控制
     */
    const collapseBeforeFormItems = computed<FormItemProps[]>(() => {
        const firstCollapseItemIndex = formItems.value.findIndex((item) => {
            return item.controlConfig.type === 'collapseItem'
        })

        return props.config.formItems.filter((_, index) => index < firstCollapseItemIndex)
    })

    const collapseItems = computed<CustomCollapseItem[]>(() => {
        // 原始的控件标识为 collapseItem 的 formItem 列表
        const collapseFormItems = formItems.value.filter((item, index) => {
            if (item.controlConfig && item.controlConfig.type === 'collapseItem') {
                item['__index__'] = index
            }

            return item.controlConfig && item.controlConfig.type === 'collapseItem' && !item.hide
        })

        // 原始的映射成 CustomCollapseItem
        return collapseFormItems.map((item, collapseFormItemIndex) => {
            const currentIndex = item.__index__

            /**
             * 获取当前 CustomCollapseItem 到下一个 CustomCollapseItem 之间的 formItem
             * 如果没有下一个 CollapseItem，则取到表单结尾
             * 这里是物理下标，及 formConfig tsx 中的下标
             */
            const currentAfterFormItems = formItems.value.filter((item, formItemIndex) => {
                const nextCollapseItemIndex =
                    collapseFormItems[collapseFormItemIndex + 1]?.__index__ ||
                    formItems.value.length

                return formItemIndex > currentIndex && formItemIndex < nextCollapseItemIndex
            })

            // 收集数据组装展开项
            const collapseItem: CustomCollapseItem = {
                ...(item.controlConfig?.props as any),
                index: currentIndex,
                name: `${currentIndex}`,
                title: item.label as string,
                content: currentAfterFormItems
            }

            // 标识结尾禁用
            if (collapseItem.isTail) {
                collapseItem.disabled = true
                collapseItem.active = true
            }

            return collapseItem
        })
    })

    // 如果 collapseItem 列表不为空，说明是 collapse 布局
    const isCollapseLayout = computed<boolean>(() => !!collapseItems.value.length)

    // 默认激活的菜单
    const activeCollapses = computed({
        get: () =>
            collapseItems.value.map((collapseItem) =>
                collapseItem.active !== false ? collapseItem.name : undefined
            ),
        set(val) {}
    })

    return {
        isCollapseLayout,
        collapseItems,
        collapseBeforeFormItems,
        activeCollapses
    }
}
