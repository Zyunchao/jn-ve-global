import { ref, computed, watch, nextTick } from 'vue'
import _ from 'lodash'
import myAxios from '../../_http/http'
import { getFileType } from '../utils'

export default ({ emits, props }) => {
    /**
     * 当前活跃的 file
     *  1. 列表模式能够获取到点击的文件信息
     *  2. avatar 只能够获取用户默认传递 | 上传成功的 file
     */
    const currentFile = ref(null)

    // 文件列表内容改变，重绘
    const isRedrawFileList = ref<boolean>(false)

    /**
     * 普通的列表模式，将抛出有效的 fileList
     */
    const localFileList = computed({
        get: () => {
            return _.cloneDeep(props.fileList).map((file, index) => {
                // 异步获取文件的 url
                if (!file.url && file.fileId && props.downloadUrl) {
                    const fileType = getFileType(file.name)

                    const url = `${props.downloadUrl}/${file.fileId}`
                    myAxios
                        .get(url, {
                            responseType: 'blob'
                        })
                        .then((res) => {
                            let blob: Blob

                            if (res.status === 200) {
                                blob = res.data
                                if (fileType === 'pdf') {
                                    blob = new Blob([res.data], { type: 'application/pdf;' })
                                }
                            }

                            file.url = blob
                                ? window.URL.createObjectURL(blob)
                                : `${props.downloadUrl}/${file.fileId}`


                            // 列表更新获取地址时，不会实时的响应到预览图，重绘文件列表即可
                            isRedrawFileList.value = true
                            nextTick(() => {
                                isRedrawFileList.value = false
                            })
                        })
                }
                return file
            })
        },
        set: (list) => {
            emits('update:fileList', list)
        }
    })

    return {
        currentFile,
        localFileList,
        isRedrawFileList
    }
}
