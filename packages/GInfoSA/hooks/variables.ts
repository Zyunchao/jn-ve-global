import { ref, computed } from 'vue'
import { v4 as uuidv4 } from 'uuid'

export interface VarableHookProps {
    type: 'info-select' | 'info-select-all' | 'info-autocomplete'
}

export default (props: VarableHookProps) => {
    const randomId = `random-id-${uuidv4()}`
    const popperClass = `${props.type}-popper`
    const dropdownShow = ref<boolean>(false)
    const animationFlag = ref<boolean>(true)

    // ref 引用
    const currentRootRef = ref<HTMLElement>() // 组件根
    const elSelectRef = ref<any>() // select 实例
    const popperRoot = ref<HTMLElement>() // 弹出根容器
    const infoHeaderWrapRef = ref<{ el: HTMLElement; height: string }>() // 表格头
    const scrollWrapper = ref<HTMLElement>() // 待选项的滚动容器
    const paginationRef = ref<HTMLElement>() // 分页

    // DOM Position
    const popperTop = ref<string>('')
    const popperLeft = ref<string>('')
    const popperZIndex = ref<string>('1')
    const scrollLeft = ref<number>(0)

    // DOM Size
    const infoHeaderHeight = ref<string>('34px')
    const optionItemWrapperHeight = ref<number>(0)
    const currentRootWidth = computed(() => `${currentRootRef.value?.clientWidth}px`)

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
        currentRootWidth
    }
}
