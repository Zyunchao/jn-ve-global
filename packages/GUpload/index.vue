<template>
    <el-upload
        ref="uploadRef"
        :class="[{ 'g-upload': true, 'is-disabled': disabled }, attrs['list-type']]"
        :file-list="localFileList"
        v-bind="getUploadProps()"
        :disabled="disabled"
        :accept="localAccept"
        :list-type="uploadListType"
        :limit="localLimit"
        :show-file-list="localShowFileList"
        :on-success="onSuccess"
        :on-error="onError"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
        :on-change="onChange"
        :on-remove="onRemove"
    >
        <!-- 自定义默认内容 -->
        <template #default>
            <slot v-if="attrs['list-type'] !== 'avatar'">
                <div :class="['upload-btn', uploadListType]">
                    <g-icon v-if="['picture-card'].includes(uploadListType)" icon="el-Plus" />

                    <el-button v-else size="small" type="primary" :disabled="disabled">
                        上传附件
                    </el-button>
                </div>
            </slot>
            <div v-else class="avatar-upload">
                <g-icon icon="el-Plus" />
                <img v-if="currentFile && currentFile.url" :src="currentFile.url" alt="">
                <div v-if="currentFile && currentFile.url" class="operation" @click.stop="">
                    <g-icon icon="el-View" @click="modalShow = true" />
                    <g-icon
                        v-if="!disabled"
                        icon="el-Delete"
                        class="del-btn-icon"
                        @click="delAvatar"
                    />
                </div>
            </div>
        </template>

        <!-- picture file list -->
        <template #file="{ file }">
            <div :class="['file-list-item', uploadListType]">
                <!-- 略缩 -->
                <div class="info">
                    <img class="preview" :src="getFileTypeIcon(file.name, file.url)">
                    <span class="file-name">
                        {{ file.name }}
                    </span>
                </div>

                <!-- 按钮 -->
                <div class="btns">
                    <g-icon
                        v-if="showPreview(file.name)"
                        icon="el-View"
                        @click="filePreview(file)"
                    />
                    <g-icon v-if="!downloadHide" icon="el-Bottom" @click="fileDownload(file)" />
                    <g-icon
                        v-if="!delHide"
                        icon="el-Delete"
                        class="del-btn-icon"
                        @click="delFile(file)"
                    />
                </div>

                <!-- 进度条 -->
                <el-progress
                    v-if="file.status === 'uploading'"
                    :percentage="+file.percentage"
                    :type="uploadListType === 'picture-card' ? 'circle' : 'line'"
                    :stroke-width="strokeWidth"
                    :show-text="['picture', 'text'].includes(uploadListType)"
                />

                <!-- 成功角标 -->
                <label v-if="file.status === 'success'" class="status-label">
                    <g-icon icon="el-Check" />
                </label>
            </div>
        </template>
    </el-upload>

    <!-- 预览 -->
    <g-modal
        v-if="currentFile"
        v-model="modalShow"
        append-to-body
        :show-close="!imgSuffix.includes(getFileType(currentFile.name))"
        :custom-class="`upload-preview-modal 
        ${imgSuffix.includes(getFileType(currentFile.name)) ? 'img-modal' : ''} 
        ${officeSuffix.includes(getFileType(currentFile.name)) ? 'office-modal' : ''}`"
    >
        <div class="file-preview-wrapper">
            <img
                v-if="imgSuffix.includes(getFileType(currentFile.name))"
                :src="currentFile.url"
                alt=""
            >

            <embed
                v-if="['pdf'].includes(getFileType(currentFile.name))"
                :src="currentFile.url"
                type="application/pdf"
                width="100%"
                height="100%"
            >

            <!-- 各文件方式预览可参考：https://juejin.cn/post/6844903561017425927 -->
            <!-- 微软接口在线预览 word、excel、ppt，但不支持内网文件，保留代码 -->
            <!-- <iframe
                v-if="['doc', 'docx', 'xls', 'xlsx'].includes(getFileType(currentFile.name))"
                :src="`https://view.officeapps.live.com/op/view.aspx?src=${currentFile.url}`"
                width="100%"
                height="100%"
                frameborder="1"
            /> -->
        </div>
    </g-modal>
</template>

<script lang="ts">
export default {
    name: 'GUpload',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { useAttrs, watch, ref, computed, reactive, toRefs, PropType } from 'vue'
import { getFileType, getFileTypeIcon } from './utils'
import { imgSuffix, officeSuffix, officeSuffixNoPre } from './constant/fileTypeList'
import UploadFile from './interface/UploadFile'
import { ElMessage, ElMessageBox } from 'element-plus'
import { humpObj2PartitionObj } from '../utils/utils'

const props = defineProps({
    /**
     * 抛出的值
     */
    modelValue: {
        type: [String, Array],
        default: () => []
    },
    /**
     * 文件列表（双向绑定）
     */
    fileList: {
        type: Array as PropType<UploadFile[]>,
        default: () => []
    },
    /**
     * 禁用
     */
    disabled: {
        type: Boolean,
        default: false
    },
    /**
     * 单个文件上传最大大小(单位：MB)
     */
    size: {
        type: Number,
        default: 5
    },
    /**
     * 上传头像回显的 img url
     */
    imgUrl: {
        type: [String, Object],
        default: null
    },
    /**
     * 下载的钩子，将会覆盖本地操作
     */
    onDownload: {
        type: Function as PropType<(file: UploadFile) => void>,
        default: null
    },
    /**
     * 预览的钩子，将会覆盖本地操作
     */
    onMagnify: {
        type: Function as PropType<(file: UploadFile) => void>,
        default: null
    },
    /**
     * 隐藏下载按钮
     */
    downloadHide: {
        type: Boolean,
        default: false
    },
    /**
     * 隐藏删除按钮
     */
    delHide: {
        type: Boolean,
        default: false
    },
    /**
     * 上传成功后不显示消息
     */
    successNoMsg: {
        type: Boolean,
        default: false
    }
})

const emits = defineEmits(['update:modelValue', 'update:fileList', 'getUploadRef'])
const attrsSource = useAttrs()

/**
 * 传递参数有两种情况：
 *  1. 单独使用：传递的参数为短横线分割
 *  2. Form 中使用：传递的参数为驼峰命名
 *
 * 驼峰需要转换成短横线
 */
const attrs = computed<{ [k: string]: any }>(() => humpObj2PartitionObj(attrsSource))

/**
 * 控件的类型：
 *  除去原有的三种，扩展了 'avatar' 类型
 *  avatar 实际取得 'picture-card'；（内置配置，方便用户）
 */
const uploadListType = computed<'text' | 'picture' | 'picture-card' | 'avatar' | unknown>(() => {
    const type = attrs.value['list-type']
    return type === 'avatar' ? 'picture-card' : attrs.value['list-type']
})

const strokeWidth = computed(() => {
    let width: number

    switch (uploadListType.value) {
    case 'picture-card':
        width = 6
        break
    case 'picture':
        width = 4
        break
    case 'text':
        width = 2
        break
    default:
        width = 6
    }

    return width
})

/**
 * avatar 模式将限制只能存在一个文件；（内置配置，方便用户）
 * 其他则取用户传递或不限制
 */
const localLimit = computed(() =>
    attrs.value['list-type'] === 'avatar' ? 1 : attrs.value['limit']
)

/**
 * avatar 模式将限制文件类型为 'image/*'
 * 其他这由用户指定
 */
const localAccept = computed(() =>
    attrs.value['list-type'] === 'avatar' ? 'image/*' : attrs.value['accept']
)

/**
 * avatar 模式将取消文件列表的显示；（内置配置，方便用户）
 * avatar 相当于单选
 */
const localShowFileList = computed(() =>
    attrs.value['list-type'] === 'avatar' ? false : attrs.value['show-file-list']
)

/**
 * 普通的列表模式，将抛出有效的 fileList
 */
const localFileList = computed({
    get: () => props.fileList,
    set: (list) => {
        emits('update:fileList', list)
    }
})

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

// 预览框
const modalShow = ref<boolean>(false)

/**
 * 当前活跃的 file
 *  1. 列表模式能够获取到点击的文件信息
 *  2. avatar 只能够获取用户默认传递 | 上传成功的 file
 */
const currentFile = ref(null)

/**
 * 不同的文件类型决定是否展示预览按钮
 */
const showPreview = (fileName: string) => {
    const fileType = getFileType(fileName)
    return [...imgSuffix, ...officeSuffix].includes(fileType)
}

/**
 * 头像将类似于单选，imgUrl 服务头像
 * fileList 服务文件列表上传
 */
watch(
    () => props.imgUrl,
    (url) => {
        if (url && attrs.value['list-type'] === 'avatar') {
            /**
             * avatar 模式将意味着查看照片模式，而 currentFile 需要一个 name 属性
             * 这里的 name 只是一个假象，为弹框模式做判断
             */
            currentFile.value = {
                name: '*.png',
                url: url
            }
        }
    },
    {
        immediate: true
    }
)

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

/**
 * 删除头像：
 * 1. 清空文件列表（因为 Avatar 限制了只能存在一个文件）
 * 2. 清空当前活跃的 file
 * 3. 清空绑定的 fileID
 * 4. 触发用户传递的 om-remove
 *
 * 清空列表的方法并不能触发组件的 onRemove 事件，所以要在这里抛出绑定的值
 */
const delAvatar = () => {
    ElMessageBox.confirm(`是否删除，重新上传`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        uploadRef.value.clearFiles()
        currentFile.value = null
        emits('update:modelValue', '')

        // 同时执行用户传递的
        attrs.value['on-remove']?.()
    })
}

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
        file['fileId'] = res.data.fileId

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

/**
 * 过滤自定义参数
 */
const getUploadProps = () => {
    let props = {}
    Object.keys(attrs.value).forEach((key) => {
        if (
            ![
                'accept',
                'list-type',
                'limit',
                'size',
                'imgUrl',
                'show-file-list',
                'on-success',
                'on-error',
                'before-upload',
                'on-exceed',
                'on-change',
                'on-remove'
            ].includes(key)
        ) {
            props[key] = attrs.value[key]
        }
    })

    return props
}
</script>

<style lang="scss" scoped>
@import './upload.scss';
</style>
<style lang="scss">
@import './preview.scss';
</style>
