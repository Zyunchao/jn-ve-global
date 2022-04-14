<template>
    <el-upload
        class="avatar-uploader"
        action="/api/kinso-basic-open-server/v1/document/file/upload"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
    >
        <template #default>
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <el-icon v-else class="avatar-uploader-icon">
                <Plus />
            </el-icon>
        </template>
    </el-upload>

    <br>

    <el-button type="success" @click="open">
        Click to open the Message Box
    </el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'

import type { UploadProps } from 'element-plus'

const imageUrl = ref('')

const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    // if (rawFile.type !== 'image/jpeg') {
    //     ElMessage.error('Avatar picture must be JPG format!')
    //     return false
    // } else if (rawFile.size / 1024 / 1024 > 2) {
    //     ElMessage.error('Avatar picture size can not exceed 2MB!')
    //     return false
    // }
    return true
}

const open = () => {
    ElMessageBox.confirm('proxy will permanently delete the file. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
    })
        .then(() => {
            ElMessage({
                type: 'success',
                message: 'Delete completed'
            })
        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled'
            })
        })
}
</script>

<style scoped>
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>
