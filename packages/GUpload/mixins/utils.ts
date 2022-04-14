import { getFileType } from '../utils'
import { imgSuffix, officeSuffix } from '../constant/fileTypeList'

export default ({ attrs }) => {
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
                    'on-remove',
                    'headers'
                ].includes(key)
            ) {
                props[key] = attrs.value[key]
            }
        })

        return props
    }

    /**
     * 不同的文件类型决定是否展示预览按钮
     */
    const showPreview = (fileName: string) => {
        const fileType = getFileType(fileName)
        return [...imgSuffix, ...officeSuffix].includes(fileType)
    }

    return {
        getUploadProps,
        showPreview
    }
}
