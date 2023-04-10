import { ref, watch } from 'vue'
import { ElUpload } from 'element-plus'

export default ({ emits }) => {
    // 控件实例
    const uploadRef = ref<InstanceType<typeof ElUpload> | null>(null)
    watch(
        () => uploadRef.value,
        (instance) => {
            if (instance) {
                emits('getUploadRef', instance)
            }
        }
    )

    // 这里我也不知道当初为什么这么抛出，但为了历史遗留问题，保留吧
    watch(
        () => uploadRef.value,
        (instance) => {
            emits('update:instance', instance)
        }
    )

    return { uploadRef }
}
