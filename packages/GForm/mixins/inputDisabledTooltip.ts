import { ref, onMounted, onUnmounted, watchEffect } from 'vue'
import { getStyle } from '../../utils/utils'

/**
 * input 禁用时，tooltip 处理
 */
export default ({ props, localPropRef }) => {
    const elInputRef = ref(null)
    const inputDisabled = ref<boolean>(null)
    const exceedBoxWidth = ref<boolean>(false)

    if (props.controlConfig.type === 'input') {
        // 观察器的配置（需要观察什么变动）
        const config: MutationObserverInit = { attributes: true }

        // 当观察到变动时执行的回调函数
        const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
            for (let mutation of mutationsList) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    setInputDisabled(mutation.target as HTMLElement)
                }
            }
        }

        const setInputDisabled = (dom: HTMLElement) => {
            const classList = dom.classList
            // null ===> boolean
            inputDisabled.value = classList.value.includes('is-disabled')
        }

        // 创建一个观察器实例并传入回调函数
        let observer = new MutationObserver(callback)

        onMounted(() => {
            // 选择需要观察变动的节点
            const targetNode = elInputRef.value.$el as HTMLElement
            // 以上述配置开始观察目标节点
            observer.observe(targetNode, config)
            // 挂载立即执行一次
            setInputDisabled(targetNode)
        })

        // onUnmounted(() => {
        //     // if (elInputRef.value && observer) {
        //     // console.log(`%c elInputRef.value =========== `, 'color: #67c23a;', elInputRef.value)
        //     //     // 卸载，停止观察
        //     //     elInputRef.value && observer.disconnect()
        //     //     observer = null
        //     // }
        // })

        watchEffect(() => {
            if (!localPropRef.value) {
                exceedBoxWidth.value = false
                return
            }

            if (!inputDisabled.value) return
            if (!elInputRef.value) return

            const targetDom = elInputRef.value.$el as HTMLElement
            const inputDom = targetDom.querySelector('.el-input__inner')
            const fontSize = parseFloat(getStyle(inputDom, 'font-size'))
            const inputWidth = inputDom.clientWidth
            const contentLength = `${localPropRef.value}`.length

            // 判断内容是否超出 input 的宽度
            exceedBoxWidth.value = contentLength * fontSize > inputWidth
        })
    }

    return {
        elInputRef,
        inputDisabled,
        exceedBoxWidth
    }
}
