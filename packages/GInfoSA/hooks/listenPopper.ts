import { watch, ref, Ref, onMounted, onUnmounted, onBeforeUnmount } from 'vue'
import { global } from '@jsjn/utils'

export interface LisenPopperProps {
    popperClass: string
    randomId: string
    popperClassSpecific: string
    popperRoot: Ref<HTMLElement>
    mutationOb: MutationObserver
}

export default (props: LisenPopperProps) => {
    const mutationObConfig: MutationObserverInit = { attributes: true }
    onMounted(() => {
        // 当前组件的 popper 根
        const currentPopperRootDom = global.document.querySelector(
            `.${props.popperClass}.${props.randomId}.${props.popperClassSpecific}`
        ) as HTMLElement

        if (!currentPopperRootDom) return null

        // 存储及监听
        props.popperRoot.value = currentPopperRootDom
        props.mutationOb.observe(currentPopperRootDom, mutationObConfig)
    })
}
