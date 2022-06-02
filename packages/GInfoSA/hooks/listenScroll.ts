import { watch, Ref } from 'vue'
import { SelectOptionProps } from '../../index'

export interface ListeneSrollProps {
    popperClass: string
    randomId: string
    scrollWrapDomClass: string
    scrollWrapper: Ref<HTMLElement>
    scrollLeft: Ref<number>
    optionsData: Ref<SelectOptionProps[]>
    dataChangeEffect: () => void
    scrollEventHandle: (e: Event) => void
}

export default (props: ListeneSrollProps) => {
    watch(
        () => props.optionsData.value,
        (data) => {
            /**
             * 只有在待选项的数据不为空时，列表容器才会生成
             * 反之生成无数据提示
             */
            if (data && !!data.length) {
                setTimeout(() => {
                    listeneSroll()
                    props.dataChangeEffect?.()
                }, 100)
            }
        },
        {
            immediate: true
        }
    )

    // 监听容器滚动
    function listeneSroll() {
        const scrollWrapperDom = document.querySelector(
            `.${props.popperClass}.${props.randomId} .${props.scrollWrapDomClass}`
        )
        if (!scrollWrapperDom) return
        props.scrollWrapper.value = scrollWrapperDom as HTMLElement
        scrollWrapperDom.removeEventListener('scroll', props.scrollEventHandle)
        scrollWrapperDom.addEventListener('scroll', props.scrollEventHandle)
    }
}
