import { ElMessageBox } from 'element-plus'
import UploadFile from '../interface/UploadFile'

export default ({ uploadRef, currentFile, props, modalShow, attrs, emits }) => {
    // 预览
    const filePreview = (file: UploadFile) => {
        // 预览行为，覆盖本地
        if (props.onMagnify) {
            props.onMagnify(file)
            return
        }

        // 组件默认行为
        currentFile.value = file
        modalShow.value = true
    }

    // 下载
    const fileDownload = (file: UploadFile) => {
        // 下载行为，覆盖本地
        if (props.onDownload) {
            props.onDownload(file)
            return
        }

        // 默认下载行为
        let aDom = document.createElement('a')
        aDom.href = file.url
        aDom.setAttribute('download', file.name)
        aDom.click()
        aDom = null
    }

    /**
     * 删除头像：
     * 1. 清空文件列表（因为 Avatar 限制了只能存在一个文件）
     * 2. 清空当前活跃的 file
     * 3. 清空绑定的 fileID
     * 4. 触发用户传递的 on-remove
     *
     * 清空列表的方法并不能触发组件的 onRemove 事件，所以要在这里抛出绑定的值
     */
    const delAvatar = () => {
        ElMessageBox.confirm(`是否删除，重新上传`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            /**
             * 如果当前 file 是上传的 file 对象，需要调用组件的 handleRemove 方法
             * 将 file 传递给方法，移除后触发 on-remove 方法
             */
            if (currentFile.value.raw && currentFile.value.raw) {
                uploadRef.value.handleRemove(currentFile.value)
            }

            if (currentFile.value && !currentFile.value.raw) {
                // 清空绑定的 fileId
                emits('update:modelValue', '')
                // 同时执行用户传递的
                attrs.value['on-remove']?.()
            }

            currentFile.value = null
        })
    }

    // 删除
    const delFile = (file: UploadFile) => {
        ElMessageBox.confirm(`是否删除 ${file.name}`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            uploadRef.value.handleRemove(file)
        })
    }

    return {
        filePreview,
        fileDownload,
        delAvatar,
        delFile
    }
}
