import { reactive, watch } from 'vue'

export default (params: {
    props: {
        total?: number
        [k: string]: any
    }
    emits: {
        (e: 'update:modelValue', arr: Array<string | number>): void
        (e: 'pagination-change', currentPage: number, pageSize: number): void
        (e: 'change', vals: number[], toDirection: 'left' | 'right', moveKeys: number[]): void
    }
}) => {
    const { props, emits } = params

    const paginationConfig = reactive<{
        pageSize: number
        currentPage: number
        total: number
    }>({
        pageSize: 10,
        currentPage: 1,
        total: 0
    })

    watch(
        () => paginationConfig.pageSize,
        () => {
            paginationConfig.currentPage = 1
        }
    )

    watch(
        () => props.total,
        (total) => {
            paginationConfig.total = total
        },
        { immediate: true }
    )

    watch(
        () => [paginationConfig.currentPage, paginationConfig.pageSize],
        ([currentPage, pageSize]) => {
            emits('pagination-change', currentPage, pageSize)
        }
    )

    return {
        paginationConfig
    }
}
