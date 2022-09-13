import { watch, reactive, ref, nextTick, Ref } from 'vue'
import { InputControlConfig } from '../../../index'

export default (attrs: InputControlConfig['props']) => {
    /**
     * 获取有效的 slot
     */
    const inputSlots = reactive<{ [k: string]: any }>({})
    watch(
        () => attrs,
        (inputProps) => {
            /**
             * 每次 props 发生变化
             * 从 props 中提取 4 个 slot
             */
            const { prefix, suffix, prepend, append } = inputProps

            /**
             * 进行筛选有效值
             * 如果有效则添加到 inputSlots 对象中，只有 inputSlots 对象发生改变时，才进行重绘
             * 避免改变 props 的其他属性时，重绘组件
             */
            const collection = {
                prefix,
                suffix,
                prepend,
                append
            }
            Object.keys(collection).forEach((key) => {
                if (collection[key]) inputSlots[key] = collection[key]
                else delete inputSlots[key]
            })
        },
        {
            deep: true,
            immediate: true
        }
    )

    /**
     * 这里的重建操作是为了解决尾部内容 suffix 添加不上去的问题
     * 有问题的版本：
     *  - vue: 3.2.31
     *  - element-plus: 2.2.0
     * 后续版本可能会修复（不确定），官方修复后可移除
     */
    const reload = ref<boolean>(false)
    watch(
        () => inputSlots,
        () => {
            reload.value = true
            nextTick(() => {
                reload.value = false
            })
        },
        { deep: true }
    )

    return {
        inputSlots,
        reload
    }
}
