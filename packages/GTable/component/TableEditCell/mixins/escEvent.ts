import { onMounted, onBeforeUnmount } from 'vue'
import _ from 'lodash'
import { Local } from '@jsjn/utils'

export default ({
    localPropCopy,
    localPropRef,
    cellStatus,
    CellStatus,
    localCellPropInitValue,
    validateRes,
    localData,
    tableInstance,
    animationTime,
    escTrigger,
    editCellContentRef
}) => {
    onMounted(() => {
        if (!editCellContentRef.value) return

        // 复制当前单元格的值（取消编辑备用）
        localPropCopy.value = _.cloneDeep(localPropRef.value)

        // 有效创建为 documnet 绑定 esc 事件
        document.addEventListener('keyup', cancelEdit)
    })

    // 键盘 esc 退出编辑（优先级最高）
    const taskCacheKey = 'TASK_IDS'
    Local.remove(taskCacheKey)
    function cancelEdit(e: KeyboardEvent) {
        if (e.key !== 'Escape') return
        isEscTrigger()
        if (cellStatus.value === CellStatus.TEXT) return

        // 初始化单元格数据
        localPropCopy.value !== localCellPropInitValue && (localPropRef.value = localPropCopy.value)
        // 初始化校验结果
        validateRes.value = true
        // 转换为文本模式
        cellStatus.value = CellStatus.TEXT

        const taskId = setTimeout(() => {
            const taskIds = Local.get(taskCacheKey)
            const lastTaskId = taskIds[taskIds.length - 1]

            if (taskId !== lastTaskId) {
                clearTimeout(taskId)
                return
            }

            /**
             * 取消总控编辑
             * 在 esc 取消行总控时，将使所有的控件切换状态
             * 在这里要保证所有的值都初始化后，再进行切换行总控
             */
            localData.value.edit && (localData.value.edit = false)
            tableInstance.value.doLayout()

            // 清除此次 esc 任务缓存
            Local.remove(taskCacheKey)
        }, parseInt(animationTime.value) + 50)

        /**
         * 在执行 esc 事件时，需要将行的状态初始
         * 1. 如果行内存在校验不通过的字段，程序就会将这一行的 edit 修改为 true（编辑状态）
         * 2. 同时，这边的 timeout 还在队列中，虽然在 timeout 事件中判断了 edit 为 true 时才置为 false
         * 3. 这时，由于 第一条 的作用，队列与 watch 交替更改这一行的 edit，造成严重的切换操作
         *
         * 解决思路：
         *  1. 每一个单元格的 esc 初始化肯定是要执行的
         *  2. 但是改变行的 edit 并不是每一个执行环境（组件）必须的
         *  3. 我们只需要尽可能的在最后一个执行环境中，改变行的 edit 状态即可
         *  4. 所有的 timeout 都是运行在当前 window 中的，那么只要拿到每一个 timeout 的 id，再根据 id 去决定要不要改变行的 edit
         *  5. 所有组件的加载，esc 的执行，是有执行顺序的，也就意味着 timeout 开启也是有顺序的，那么我们将所有的 timeout id 收集起来
         *  6. 在执行任务的时候，判断当前是不是期望的最后一个任务：
         *      1）不是最后一个，清除当前环境的任务id，且不改变 tale状态
         *      2）是最后一个，执行任务
         *  7. 在执行完期望任务后，初始化存储的这一次 esc 操作所开启的所有的任务 id
         */
        const taskIds = Local.get(taskCacheKey) || []
        taskIds.push(taskId)
        Local.set(taskCacheKey, taskIds)
    }

    function isEscTrigger() {
        escTrigger.value = true
        setTimeout(() => {
            escTrigger.value = false
        }, parseInt(animationTime.value) + 50)
    }

    onBeforeUnmount(() => {
        document.removeEventListener('keyup', cancelEdit)
    })
}
