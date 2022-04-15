import { ref } from 'vue'

export default () => {
    // 组件 ref 引用
    const editCellContentRef = ref<HTMLElement>(null)
    const controlRef = ref(null)

    return {
        editCellContentRef,
        controlRef
    }
}
