import { ref, onMounted, watch, watchEffect, Ref } from 'vue'
import { getStyle } from '../../../../utils/utils'
import { useMutationObserver } from '@vueuse/core'
import { ElInput as ElInputCom } from 'element-plus'

/**
 * input 禁用时，tooltip 处理
 */
export default (modelValue: Ref<string | number>) => {
    const elInputRef = ref<InstanceType<typeof ElInputCom> | null>(null)
    const inputDisabled = ref<boolean>(null)
    const exceedBoxWidth = ref<boolean>(false)

    onMounted(() => {
        if (!elInputRef.value) return
        // 选择需要观察变动的节点
        const targetNode = elInputRef.value.$el as HTMLElement
        // 挂载立即执行一次
        setInputDisabled(targetNode)
    })

    // 监听属性变化
    onMounted(() => {
        useMutationObserver(
            elInputRef,
            (mutations) => {
                for (let mutation of mutations) {
                    if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                        setInputDisabled(mutation.target as HTMLElement)
                    }
                }
            },
            { attributes: true }
        )
    })

    // watch(
    //     () => elInputRef.value,
    //     (instance) => {
    //         console.log(`%c input instance ============= `, 'color: #f56c6c;', instance)
    //     }
    // )

    watchEffect(() => {
        if (!modelValue.value) {
            exceedBoxWidth.value = false
            return
        }

        if (!inputDisabled.value) return
        if (!elInputRef.value) return

        const targetDom = elInputRef.value.$el as HTMLElement
        const inputDom = targetDom.querySelector('.el-input__inner')
        const fontSize = parseFloat(getStyle(inputDom, 'font-size'))
        const inputWidth = inputDom.clientWidth
        const contentLength = `${modelValue.value}`.length

        // 判断内容是否超出 input 的宽度
        exceedBoxWidth.value = contentLength * fontSize > inputWidth
    })

    /**
     * 依据 dom 节点的类名确定组件是否处于禁用
     * @param dom
     * @returns
     */
    function setInputDisabled(dom: HTMLElement) {
        if (!dom) return
        const classList = dom.classList
        inputDisabled.value = classList.value.includes('is-disabled')
    }

    return {
        elInputRef,
        inputDisabled,
        exceedBoxWidth
    }
}
