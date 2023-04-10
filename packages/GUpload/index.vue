<template>
    <el-upload
        ref="uploadRef"
        :class="[{ 'g-upload': true, 'is-disabled': disabled }, attrs['list-type']]"
        :file-list="localFileList"
        v-bind="getUploadProps()"
        :headers="localReqHeaders"
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
        <!-- 触发器 -->
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

        <!-- 文件列表 -->
        <template #file="{ file }">
            <div v-if="!isRedrawFileList" :class="['file-list-item', uploadListType]">
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
                    type="line"
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
// import { watch, ref } from 'vue'
import { getFileType, getFileTypeIcon } from './utils'
import { imgSuffix, officeSuffix } from './constant/fileTypeList'
import UploadFile from './interface/UploadFile'
import { getHooks, getMethods, getUtils, getRefStore, getFileStore, getConstant } from './mixins'
import { ElUpload } from 'element-plus'

interface UploadCustomProps {
    instance?: InstanceType<typeof ElUpload> | null
    /**
     * 抛出的值
     */
    modelValue: string | Array<string>
    /**
     * 文件列表（双向绑定）
     */
    fileList?: UploadFile[]
    /**
     * 禁用
     */
    disabled?: boolean
    /**
     * 单个文件上传最大大小(单位：MB)
     */
    size?: number
    /**
     * 上传头像回显的 img url
     */
    imgUrl?: string | object
    /**
     * 隐藏下载按钮
     */
    downloadHide?: boolean
    /**
     * 隐藏删除按钮
     */
    delHide?: boolean
    /**
     * 上传成功后不显示消息
     */
    successNoMsg?: boolean
    /**
     * 下载的钩子，将会覆盖本地操作
     */
    onDownload?: (file: UploadFile) => void
    /**
     * 预览的钩子，将会覆盖本地操作
     */
    onMagnify?: (file: UploadFile) => void
    /**
     * 下载 & 预览文件的 url
     */
    downloadUrl?: string
}

const props = withDefaults(defineProps<UploadCustomProps>(), {
    instance: null,
    modelValue: '',
    fileList: () => [],
    disabled: false,
    size: 5,
    imgUrl: null,
    onDownload: null,
    onMagnify: null,
    downloadHide: false,
    delHide: false,
    successNoMsg: false,
    downloadUrl: '/kinso-basic-open-server/v1/document/file/download'
})

const emits = defineEmits([
    'update:modelValue',
    'update:fileList',
    'getUploadRef',
    'update:instance'
])

const {
    modalShow,
    attrs,
    uploadListType,
    strokeWidth,
    localReqHeaders,
    localShowFileList,
    localLimit,
    localAccept
} = getConstant()

// elUpload ref
const { uploadRef } = getRefStore({ emits })

// 文件、文件列表（回填）
const { currentFile, localFileList, isRedrawFileList } = getFileStore({
    props,
    emits,
    attrs,
    uploadRef
})

// 钩子
const { beforeUpload, onExceed, onSuccess, onError, onChange, onRemove } = getHooks({
    attrs,
    emits,
    localFileList,
    currentFile,
    props,
    uploadRef,
    localLimit
})

// 方法
const { filePreview, fileDownload, delAvatar, delFile } = getMethods({
    attrs,
    emits,
    uploadRef,
    currentFile,
    props,
    modalShow
})

// 工具
const { getUploadProps, showPreview } = getUtils({ attrs })
</script>

<style lang="scss" scoped>
@import './styles';
</style>
<style lang="scss">
@import './styles/preview.scss';
</style>
