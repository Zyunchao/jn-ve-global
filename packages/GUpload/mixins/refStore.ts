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

    return { uploadRef }
}
