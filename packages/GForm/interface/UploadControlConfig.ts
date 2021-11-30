import UploadFile from '../../GUpload/interface/UploadFile'

export interface BaseResponse {
    code: '000000' | '500000' | '800403'
    data: any
    msg: string
    status: number | string
    success: boolean
}

export interface UploadEvents {
    /**
     * 点击文件列表中已上传的文件时的钩子
     */
    onPreview?: (file?: UploadFile) => void
    /**
     * 删除文件之前的钩子，参数为上传的文件和文件列表
     * 若返回 false 或者返回 Promise 且被 reject，则停止删除
     */
    beforeRemove?: (file?: UploadFile, fileList?: UploadFile[]) => boolean | Promise<any>
    /**
     * 文件列表移除文件时的钩子
     */
    onRemove?: (file?: UploadFile, fileList?: UploadFile[]) => void
    /**
     * 文件状态改变时的钩子
     * 添加文件、上传成功和上传失败时都会被调用
     */
    onChange?: (file?: UploadFile, fileList?: UploadFile[]) => void
    /**
     * 文件上传成功时的钩子
     * 注意：文件上传成功后，将期望存储的值（文件url || fileId）存储到表单的 model 字段中
     * 存什么值取决于后台，这里目前和虞鹏飞对接的文件上传接口，需要存储 data 的 fileId
     * 故：将返回的信息的 fileId 赋值给 model 中对应的字段
     */
    onSuccess?: (response?: BaseResponse, file?: UploadFile, fileList?: UploadFile[]) => void
    /**
     * 文件上传失败时的钩子
     */
    onError?: (err?: Error, file?: UploadFile, fileList?: UploadFile[]) => void
    /**
     * 文件上传时的钩子
     */
    onProgress?: (event?: ProgressEvent, file?: UploadFile, fileList?: UploadFile[]) => void
    /**
     * 上传文件之前的钩子，参数为上传的文件，
     * 若返回 false 或者返回 Promise 且被 reject，则停止上传。
     */
    beforeUpload?: (file?: UploadFile) => boolean | Promise<any>
    /**
     * 文件超出个数限制时的钩子
     */
    onExceed?: (files?: UploadFile[], fileList?: UploadFile[]) => void

    // -------- 扩展 --------------------------------------
    /**
     * 下载的钩子，将会覆盖本地操作
     */
    onDownload?: (file: UploadFile) => void
    /**
     * 预览的钩子，将会覆盖本地操作
     */
    onMagnify?: (file: UploadFile) => void
}

export interface UploadProps extends UploadEvents {
    /**
     * 必填参数，上传的地址
     */
    action: string
    /**
     * 必填，接受上传的文件类型（thumbnail-mode 模式下此参数无效）
     * 用逗号隔开的 MIME 类型列表
     * 参见：https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types
     */
    accept?: string
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
     * 	是否启用拖拽上传
     */
    drag?: boolean
    /**
     * 文件列表的类型
     * default: text
     */
    listType?: 'text' | 'picture' | 'picture-card' | 'avatar'
    /**
     * 是否在选取文件后立即进行上传
     * default: true
     */
    autoUpload?: boolean
    /**
     * 上传的文件列表
     */
    fileList?: UploadFile[]
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
     * 	覆盖默认的上传行为，可以自定义上传的实现
     */
    httpRequest?: Function

    // 自定义扩展 Props -----------------------------------------------------------------------
    /**
     * 单个文件上传最大大小(单位：MB)
     */
    size?: number
    /**
     * 上传头像回显的 img url
     */
    imgUrl?: any
    /**
     * 隐藏下载按钮
     */
    downloadHide?: boolean
    /**
     * 隐藏删除按钮
     */
    delHide?: boolean
}

export default interface UploadControlConfig {
    type: 'upload'
    props: UploadProps
}
