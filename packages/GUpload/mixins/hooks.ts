import UploadFile from '../interface/UploadFile'
import { ElMessage } from 'element-plus'
import _ from 'lodash'

export default ({ attrs, emits, localFileList, currentFile, props, uploadRef, localLimit }) => {
    // 上传文件之前的钩子
    const beforeUpload = (file: UploadFile) => {
        /**
         * 文件类型
         *  1. avatar 模式只支持 'image/*'
         *  2. 其他由用户决定
         */
        if (attrs.value['list-type'] === 'avatar') {
            if (!file.type.includes('image/')) {
                ElMessage.warning('只能上传图片文件')
                return false
            }
        }

        // 文件大小
        const size: number = props.size
        if (size) {
            if (file.size / 1024 / 1024 > size) {
                ElMessage.warning(`单个文件上传大小不能超过 ${size}MB!`)
                return false
            }
        }

        // 用户传递的
        if (attrs.value['before-upload']) return attrs.value['before-upload'](file)

        return true
    }

    // 文件超出个数限制时的钩子
    const onExceed = (files: UploadFile, fileList: UploadFile[]) => {
        // 用户传递的优先执行
        if (attrs.value['on-exceed']) {
            attrs.value['on-exceed']()
            return
        }
        let num = localLimit.value
        ElMessage.warning(`限制存在 ${num} 个文件，本次选择了 ${files.length} 个文件`)
    }

    /**
     * 文件上传成功时的钩子
     * 注意：文件上传成功后，将期望存储的值（文件url || fileId）存储到表单的 model 字段中
     * 存什么值取决于后台，这里目前和虞鹏飞对接的文件上传接口，需要存储 data 的 fileId
     * 故：将返回的信息的 fileId 赋值给 model 中对应的字段
     */
    const onSuccess = (res, file: UploadFile, fileList: UploadFile[]) => {
        // 默认赋值行为
        if (res.code === '000000') {
            !props.successNoMsg && ElMessage.success(`上传成功!`)

            // 添加业务上的 fileId 到文件 <===> fileList[item]
            file['fileId'] = _.isArray(res.data) ? res.data[0].fileId : res.data.fileId

            // 本地上传，可以直接操作原 file，添加 url 的内存地址
            file['url'] = URL.createObjectURL(file.raw!)

            /**
             * avatar 可以理解为单选模式，每次上传成功后的 file
             * 也就变成了当前活跃的 file
             */
            if (attrs.value['list-type'] === 'avatar') {
                currentFile.value = file
            }
        } else {
            ElMessage.error(res.msg)
            uploadRef.value.handleRemove(file)
        }

        // 用户传递
        attrs.value['on-success']?.(res, file, fileList)
    }

    // 文件上传失败时的钩子
    const onError = (err, file: UploadFile, fileList: UploadFile[]) => {
        ElMessage.error(`上传失败!`)

        // 同时执行用户传递的
        attrs.value['on-error']?.(err, file, fileList)
    }

    // 变化时 抛出 fileList
    const onChange = (file: UploadFile, fileList: UploadFile[]) => {
        /**
         * 在当前操作的 file 中存在 fileId 时，才能视为上传成功
         *  1. 列表模式抛出数组
         *  2. avatar 抛出当前活跃的文件的 fileId
         */
        if (file.fileId) {
            const fileIds = fileList.map((item) => item.fileId || '')
            if (attrs.value['list-type'] === 'avatar') {
                emits('update:modelValue', file.fileId)
            } else {
                emits('update:modelValue', fileIds)
            }
        }

        // 抛出 fileList
        localFileList.value = fileList

        // 同时执行用户传递的
        attrs.value['on-change']?.(file, fileList)
    }

    // 移除事件时抛出列表
    const onRemove = (file: UploadFile, fileList: UploadFile[]) => {
        /**
         * 上传失败、调用 handleRemove 时会触发当前事件
         */
        if (attrs.value['list-type'] === 'avatar') {
            emits('update:modelValue', '')
        } else {
            const fileIds = fileList.map((item) => item.fileId)
            emits('update:modelValue', fileIds)
        }

        // 抛出 fileList
        localFileList.value = fileList

        // 同时执行用户传递的
        attrs.value['on-remove']?.(file, fileList)
    }

    return {
        beforeUpload,
        onExceed,
        onSuccess,
        onError,
        onChange,
        onRemove
    }
}
