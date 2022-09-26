import { ref, computed, watch } from 'vue'
import _ from 'lodash'

export default ({ emits, props }) => {
    /**
     * 当前活跃的 file
     *  1. 列表模式能够获取到点击的文件信息
     *  2. avatar 只能够获取用户默认传递 | 上传成功的 file
     */
    const currentFile = ref(null)

    /**
     * 普通的列表模式，将抛出有效的 fileList
     */
    const localFileList = computed({
        get: () =>
            _.cloneDeep(props.fileList).map((file) => {
                if (!file.url && file.fileId && props.downloadUrl) {
                    file.url = `${props.downloadUrl}/${file.fileId}`
                }
                return file
            }),
        set: (list) => {
            emits('update:fileList', list)
        }
    })

    return {
        currentFile,
        localFileList
    }
}
