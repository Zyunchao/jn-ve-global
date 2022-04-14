import { ref, watch } from 'vue'
export default ({ emits }) => {
    // 控件实例
    const uploadRef = ref(null)
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
