<template>
    <el-upload
        class="upload-control"
        v-bind="getUploadProps(controlConfig.props)"
        :on-success="onSuccess"
        :on-error="onError"
        :before-upload="beforeUpload"
        :on-exceed="onExceed"
    >
        <!-- 按钮 -->
        <el-button
            v-if="controlConfig.props.listType !== 'picture-card'"
            size="mini"
            type="primary"
        >
            点击上传
        </el-button>

        <!-- 图片 -->
        <template v-else>
            <!-- 
                在 listType === 'picture-card' 的情况下，上传触发器会自动变成卡片形式，默认情况下会显示为上传文件的回显列表 
                但是上传头像只需要一个回显框即可，所以需要将 showFileList 置为 false，关闭 upload 的默认行为
                在以上基础之上，要手动创建 img 用于回显
            -->
            <div
                v-if="controlConfig.props.imgUrl && !controlConfig.props.showFileList"
                class="avatar-wrapper"
            >
                <img :src="controlConfig.props.imgUrl" class="avatar">
                <div v-if="!controlConfig.props.disabled" class="shade" @click.stop="handleDeleImg">
                    <g-icon icon="el-icon-delete" />
                </div>
            </div>
            <g-icon icon="el-icon-plus" />
        </template>
    </el-upload>
</template>

<script lang="ts">
export default {
    name: 'GFromUploadControl'
}
</script>

<script lang="ts" setup>
import { PropType, watch, ref, computed, reactive, toRefs } from 'vue'
import { FormItemProps, UploadProps, UploadControlConfig, ControlConfig } from '../index'
import { ElMessage, ElMessageBox } from 'element-plus'

const props = defineProps({
    controlConfig: {
        type: Object as PropType<UploadControlConfig>,
        required: true,
        default: null
    },
    prop: {
        type: [String, Number, Boolean, Object, Array],
        required: true
    }
})

const localPropRef = ref(props.prop)
const localControlConfig = ref(props.controlConfig)

/**
 * 过滤自定义参数
 */
const getUploadProps = (uploadProps: UploadControlConfig['props']): UploadProps => {
    const { onSuccess, onError, beforeUpload, onExceed, size, imgUrl, ...props } = uploadProps
    return props
}

// 上传文件之前的钩子
const beforeUpload: UploadProps['beforeUpload'] = (file) => {
    const controlConfig = props.controlConfig

    // 文件大小
    const size: number = controlConfig.props['size']
    if (size) {
        if (file.size / 1024 / 1024 > size) {
            ElMessage.warning(`单个文件上传大小不能超过 ${size}MB!`)
            return false
        }
    }

    // 用户传递的优先执行
    if (controlConfig.props.beforeUpload) return controlConfig.props.beforeUpload(file)

    return true
}

// 文件超出个数限制时的钩子
const onExceed: UploadProps['onExceed'] = (files, fileList) => {
    const controlConfig = props.controlConfig
    // 用户传递的优先执行
    if (controlConfig.props.onExceed) {
        controlConfig.props.onExceed()
        return
    }

    let num = controlConfig.props.limit
    ElMessage.warning(
        `当前限制选择 ${num} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
            files.length + fileList.length
        } 个文件`
    )
}

/**
 * 文件上传成功时的钩子
 * 注意：文件上传成功后，将期望存储的值（文件url || fileId）存储到表单的 model 字段中
 * 存什么值取决于后台，这里目前和虞鹏飞对接的文件上传接口，需要存储 data 的 fileId
 * 故：将返回的信息的 fileId 赋值给 model 中对应的字段
 */
const onSuccess: UploadProps['onSuccess'] = (res, file, fileList) => {
    // 用户传递的优先执行
    const controlConfig = props.controlConfig
    if (controlConfig.props.onSuccess) {
        controlConfig.props.onSuccess(res, file, fileList)
        return
    }

    // 默认赋值行为
    if (res.code === '000000') {
        localPropRef.value = res.data.fileId
        ElMessage.success(`上传成功!`)
    } else {
        ElMessage.error(res.msg)
        localPropRef.value = ''
    }
}

// 文件上传失败时的钩子
const onError: UploadProps['onError'] = (err, file, fileList) => {
    localPropRef.value = ''
    ElMessage.error(`上传失败!`)

    // 同时执行用户传递的 onError
    const controlConfig = props.controlConfig
    controlConfig.props.onError?.(err, file, fileList)
}

// 删除预览图片
const handleDeleImg = () => {
    ElMessageBox.confirm('是否删除当前图片重新上传？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
    }).then(() => {
        localControlConfig.value.props.imgUrl = ''
        localPropRef.value = ''
    })
}
</script>

<style lang="scss" scoped>
.upload-control {
    :deep(.el-upload) {
        position: relative;
        overflow: hidden;

        .avatar-wrapper {
            padding: 2px;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: #fff;

            .avatar {
                width: 100%;
                height: 100%;
            }

            .shade {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.2);
                opacity: 0;
                transition: opacity 0.2s;

                i {
                    color: #fff;
                }

                &:hover {
                    opacity: 1;
                }
            }
        }
    }
}
</style>
