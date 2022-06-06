import GetVariables, { VarableHookProps } from './variables'
import ListenPopper from './listenPopper'
import ListenScroll from './listenScroll'
import ToBody from './toBody'
import { SelectOptionProps } from '../../index'
import { Ref } from 'vue'

interface HooksProps {
    /**
     * 适用组件
     */
    type: VarableHookProps['type']
    /**
     * 监听根容器的 observer 类
     */
    mutationOb: MutationObserver
    /**
     * 根容器的 class
     */
    popperClassSpecific: string
    /**
     * 滚动容器的 class
     */
    scrollWrapDomClass?: string
    /**
     * 数据（响应式）
     */
    optionsData?: Ref<SelectOptionProps[]>
    /**
     * 数据变化时的额外执行函数
     */
    dataChangeEffect?: () => void
}

export default (props: HooksProps) => {
    const {
        randomId,
        popperClass,
        dropdownShow,
        animationFlag,
        currentRootRef,
        elSelectRef,
        popperRoot,
        infoHeaderWrapRef,
        scrollWrapper,
        paginationRef,
        popperTop,
        popperLeft,
        popperZIndex,
        scrollLeft,
        infoHeaderHeight,
        optionItemWrapperHeight,
        currentRootWidth
    } = GetVariables({ type: props.type })

    // 监听下拉弹出根容器
    ListenPopper({
        popperClass,
        randomId,
        popperRoot,
        popperClassSpecific: props.popperClassSpecific,
        mutationOb: props.mutationOb
    })

    /**
     * 监听滚动容器
     *  - select & selectAll
     *  - autocomplete 自处理
     */
    if (!!props.optionsData && !!props.optionsData.value && !!props.scrollWrapDomClass) {
        ListenScroll({
            popperClass,
            randomId,
            scrollWrapDomClass: props.scrollWrapDomClass,
            scrollWrapper,
            scrollLeft,
            optionsData: props.optionsData,
            dataChangeEffect: props.dataChangeEffect,
            scrollEventHandle
        })
    }

    // 表头 & 分页 dom 处理
    ToBody({
        infoHeaderWrapRef,
        paginationRef
    })

    // 滚动同步到 header 处理函数
    function scrollEventHandle(e: Event) {
        scrollLeft.value = (e.target as Element).scrollLeft
    }

    return {
        randomId,
        popperClass,
        dropdownShow,
        animationFlag,
        currentRootRef,
        elSelectRef,
        popperRoot,
        infoHeaderWrapRef,
        scrollWrapper,
        paginationRef,
        popperTop,
        popperLeft,
        popperZIndex,
        scrollLeft,
        infoHeaderHeight,
        optionItemWrapperHeight,
        currentRootWidth,
        scrollEventHandle
    }
}
