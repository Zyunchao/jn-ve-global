import { Ref, onMounted, onBeforeUnmount } from 'vue'

export interface ToBodyHookProps {
    infoHeaderWrapRef: Ref<{
        el: HTMLElement
        height: string
    }>
    paginationRef: Ref<HTMLElement>
}

export default (props: ToBodyHookProps) => {
    // 将 header & pagination 挂载到 body 上
    onMounted(() => {
        const headerDom = props.infoHeaderWrapRef.value?.el
        const paginationDom = props.paginationRef.value

        headerDom && document.body.appendChild(headerDom)
        paginationDom && document.body.appendChild(paginationDom)
    })

    // 移除时，将附加 dom 移除
    onBeforeUnmount(() => {
        const headerDom = props.infoHeaderWrapRef.value?.el
        const paginationDom = props.paginationRef.value

        headerDom && document.body.removeChild(headerDom)
        paginationDom && document.body.removeChild(paginationDom)
    })
}
