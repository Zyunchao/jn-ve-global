export interface UploadProps {
    /**
     * 必填参数，上传的地址
     */
    action: string
    /**
     * 必填，接受上传的文件类型（thumbnail-mode 模式下此参数无效）
     */
    accept: string
    /**
     * 设置上传的请求头部
     */
    headers?: object
    /**
     * 设置上传的请求方法
     * default: post
     */
    method?: 'post' | 'put'
    /**
     * 是否支持多选文件
     * default: false
     */
    multiple?: boolean
    /**
     * 上传时附带的额外参数
     */
    data?: object
    /**
     * 上传的文件字段名
     * default: file
     */
    name?: string
    /**
     * 支持发送 cookie 凭证信息
     * default: false
     */
    withCredentials?: boolean
    /**
     * 是否显示已上传文件列表
     * default: true
     */
    showFileList?: boolean
    /**
     * 文件列表的类型
     * default: text
     */
    listType?: 'text' | 'picture' | 'picture-card'
    /**
     * 是否在选取文件后立即进行上传
     * default: true
     */
    autoUpload?: boolean
    /**
     * 上传的文件列表
     */
    fileList?: any[]
    /**
     * 是否禁用
     * default: false
     */
    disabled?: boolean
    /**
     * 最大允许上传文件个数
     */
    limit?: number
    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    onPreview?: (file?: File) => void
    /**
     * 删除文件之前的钩子，参数为上传的文件和文件列表
     * 若返回 false 或者返回 Promise 且被 reject，则停止删除
     */
    beforeRemove?: (file?: File, fileList?: File[]) => boolean | Promise<any>
    /**
     * 文件列表移除文件时的钩子
     */
    onRemove?: (file?: File, fileList?: File[]) => void
    /**
     * 文件状态改变时的钩子
     * 添加文件、上传成功和上传失败时都会被调用
     */
    onChange?: (file?: File, fileList?: File[]) => void
    /**
     * 文件上传成功时的钩子
     */
    onSuccess?: (response?: any, file?: File, fileList?: File[]) => void
    /**
     * 文件上传失败时的钩子
     */
    onError?: (err?: Error, file?: File, fileList?: File[]) => void
    /**
     * 上传文件之前的钩子，参数为上传的文件，
     * 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    beforeUpload?: (file?: File) => boolean | Promise<any>
    /**
     * 文件超出个数限制时的钩子
     */
    onExceed?: (files?: File[], fileList?: File[]) => void

    // 自定义扩展 Props -----------------------------------------------------------------------
    /**
     * 单个文件上传最大大小(单位：MB)
     */
    size?: number
}

export default interface UploadControlConfig {
    type: 'upload'
    props: UploadProps
}
