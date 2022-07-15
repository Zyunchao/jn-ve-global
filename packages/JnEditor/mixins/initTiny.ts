import { Ref, watch, ShallowRef } from 'vue'
import {
    TinyMCE,
    Editor as TinyMCEEditor,
    EditorEvent,
    RawEditorSettings
} from '../interface/tinymce'
import { getTinymce } from '../constant/TinyMCE'
import JnEditorProps from '../interface/JnEditorProps'
import { getStrSize } from '../../utils/utils'
import { Local } from '../../utils/storage'
import { ElMessage } from 'element-plus'

export type EditorOptions = Parameters<TinyMCE['init']>[0]

const imgSuffix = ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.webp', '.psd', '.svg', '.tiff']

export default (
    id: string,
    props: JnEditorProps,
    emits: (
        event:
            | 'update:modelValue'
            | 'initInstanceCallback'
            | 'setup'
            | 'init'
            | 'change'
            | 'input'
            | 'undo'
            | 'redo',
        ...args: any[]
    ) => void,
    currentEditor: ShallowRef<TinyMCEEditor | null>,
    editorMounted: Ref<boolean>
) => {
    /**
     * 扩展插件：
     *
     * 收费破解版：
     *  - formatpainter: 格式刷
     *  - powerpaste: 增强粘贴
     *
     * 社区：
     *  - tpImportword: 导入 word
     *  - axupimgs: 多图片上传
     *  - indent2em: 首行缩进
     */
    const myFunctionalList = {
        plugins: 'imagetools quickbars powerpaste axupimgs tpImportword formatpainter indent2em'
    }
    const functionalList = {
        plugins: `print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern emoticons ${
            myFunctionalList.plugins
        } ${props.config?.plugins ? props.config.plugins : ''}`,
        toolbar: [
            'fullscreen preview undo redo | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent indent2em lineheight | bullist numlist | blockquote subscript superscript removeformat ',
            'styleselect formatselect fontselect fontsizeselect | tpImportword image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print formatpainter',
            `table tabledelete | tableprops tablerowprops tablecellprops | tablemergecells tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol ${
                props.config?.toolbar ? props.config.toolbar : ''
            }`
        ]
    }

    /**
     * 不同模式下的初始化条件配置
     */
    const base_quickbars_selection_toolbar =
        'bold italic | quicklink h1 h2 h3 h4 h5 blockquote insertdatetime lineheight emoticons'
    const distraction_free_extend_toolbal =
        'alignleft aligncenter alignright alignjustify outdent indent indent2em'

    const modeInit = {
        inline: props.mode === 'inline' || props.mode === 'distraction-free',
        toolbar: props.mode !== 'distraction-free' && functionalList.toolbar,
        menubar: props.mode !== 'distraction-free' ? undefined : false,
        quickbars_insert_toolbar: props.mode !== 'distraction-free' ? '' : undefined, // 设置 快速插入 触发提供的工具栏
        // 设置 快速选择 触发提供的工具栏
        quickbars_selection_toolbar: `${base_quickbars_selection_toolbar} ${
            props.mode !== 'distraction-free' ? '' : distraction_free_extend_toolbal
        }`
    }

    /**
     * 配置参考：https://www.tiny.cloud/docs/configure/integration-and-setup/#setup
     * 事件：https://www.tiny.cloud/docs/advanced/events/
     */
    const finalInit: Parameters<TinyMCE['init']>[0] = {
        ...props.config,
        ...modeInit,
        selector: `#${id}`,
        language: 'zh_CN',
        readonly: props.disabled, // 只读（禁用）
        branding: true, // 品牌推广：免费和开源用户需要产品归属（避免出现不必要的纠纷）
        min_height: 440,
        elementpath: false, // 底栏的元素路径
        placeholder: '请输入...',
        font_formats:
            '微软雅黑=Microsoft YaHei,Helvetica Neue,PingFang SC,sans-serif;苹果苹方=PingFang SC,Microsoft YaHei,sans-serif;宋体=simsun,serif;仿宋体=FangSong,serif;黑体=SimHei,sans-serif;Arial=arial,helvetica,sans-serif;Arial Black=arial black,avant garde;Book Antiqua=book antiqua,palatino;',
        plugins: functionalList.plugins,
        axupimgs_filetype: imgSuffix.join(','), // 多图片上传，文件类型
        powerpaste_allow_local_images: true, // 设置为 时true，粘贴后不会删除复制内容中使用数据 URI 的 Base64 编码图像
        powerpaste_word_import: 'merge', // 控制如何过滤从 Microsoft Word 粘贴的内容 'clean' | 'merge' | 'prompt'
        powerpaste_html_import: 'prompt', // 控制如何过滤从 Microsoft Word 和 Google Docs 以外的来源粘贴的内容
        powerpaste_googledocs_import: 'prompt', // 控制如何过滤从 Google 文档粘贴的内容
        paste_data_images: true,
        images_upload_handler: getImagesUploadHandler(props), // 自定义上传
        file_picker_callback: getFilePickerCallback(props), // 文件上传处理函数
        textpattern_patterns: [
            { start: '*', end: '*', format: 'italic' },
            { start: '**', end: '**', format: 'bold' },
            { start: '#', format: 'h1' },
            { start: '##', format: 'h2' },
            { start: '###', format: 'h3' },
            { start: '####', format: 'h4' },
            { start: '#####', format: 'h5' },
            { start: '######', format: 'h6' },
            { start: '1. ', cmd: 'InsertOrderedList' },
            { start: '* ', cmd: 'InsertUnorderedList' },
            { start: '- ', cmd: 'InsertUnorderedList' },
            { start: '---', replacement: '<hr/>' },
            { start: '--', replacement: '—' },
            { start: '-', replacement: '—' }
        ],
        setup(editor: TinyMCEEditor) {
            currentEditor.value = editor

            /**
             * 回填
             * 编辑器完全初始化，设置值
             */
            editor.on('init', (e: EditorEvent<any>) => {
                watch(
                    () => props.modelValue,
                    (val: string, prevVal: string) => {
                        if (
                            typeof val === 'string' &&
                            val !== prevVal &&
                            val !== editor.getContent()
                        ) {
                            editor.setContent(val)
                        }
                    },
                    { immediate: true }
                )

                emits('init', e)
            })

            /**
             * 抛出
             * change：变化
             * input：输入
             * redo：重做
             * undo：撤消更改
             */
            editor
                .on('change input undo redo', () => {
                    const content = editor.getContent()
                    const contentSize = getStrSize(content)
                    const maxSize = props.maxSize * 1024 * 1024

                    if (contentSize > maxSize) {
                        editor.windowManager.alert(
                            `您输入的内容已超出${props.maxSize}M，后续输入的内容将不会被存储，请联系管理员`
                        )
                        return
                    }

                    // 抛出
                    emits('update:modelValue', content)
                })
                .on('change', (e: EditorEvent<any>) => emits('change', e))
                .on('input', (e: EditorEvent<any>) => emits('input', e))
                .on('undo', (e: EditorEvent<any>) => emits('undo', e))
                .on('redo', (e: EditorEvent<any>) => emits('redo', e))

            // 执行用户传递的 setup
            emits('setup', editor)
        },
        init_instance_callback(editor: TinyMCEEditor) {
            emits('initInstanceCallback', editor)
        }
    }

    getTinymce()?.init(finalInit)
    editorMounted.value = true
}

// 闭包获取自定义上传
function getImagesUploadHandler(props: JnEditorProps) {
    /**
     * 上传行为有两种：
     *  - 上传到服务器，需要同时传递 uploadUrl、downloadUrl
     *  - 以 base64 存储到页面资源中，文本资源较大
     *
     * @param blobInfo
     * @param success
     * @param failure
     * @param progress
     */
    const imagesUploadHandler: RawEditorSettings['images_upload_handler'] = (
        blobInfo,
        success,
        failure,
        progress
    ) => {
        // 上传到服务器中
        if (props.uploadUrl && props.downloadUrl) {
            uploadFile(blobInfo.blob(), props, success)
        } else {
            // base64 存储
            const oFileReader = new FileReader()
            oFileReader.onloadend = function (e) {
                success(e.target.result as string)
            }
            oFileReader.readAsDataURL(blobInfo.blob())
        }
    }

    return imagesUploadHandler
}

// 闭包获取文件上传（按钮）处理函数
function getFilePickerCallback(props: JnEditorProps) {
    /**
     * 文件上传处理函数
     *
     * @param callback
     * @param value
     * @param meta
     */
    return function filePickerCallback(callback, value, meta) {
        // 限制文件的上传类型,需要什么就添加什么的后缀
        let filetype: string

        if (meta.filetype === 'image') {
            filetype = imgSuffix.join(',')
        } else if (meta.filetype === 'media') {
            filetype = '.mp3, .mp4, .avi, .mov'
        } else {
            filetype =
                '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg'
        }

        // 创建文件选择
        const inputElem = document.createElement('input')
        inputElem.setAttribute('type', 'file')
        inputElem.setAttribute('accept', filetype)
        inputElem.click()

        // 文件列表发生变化，获取文件信息执行上传
        inputElem.onchange = () => {
            const file = inputElem.files[0]

            // 上传到服务器
            if (props.uploadUrl && props.downloadUrl) {
                uploadFile(file, props, (url) => {
                    callback(url, { title: file.name })
                })
            } else {
                // base64 存储
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = function () {
                    const id = 'blobid' + new Date().getTime()
                    const blobCache = getTinymce().activeEditor.editorUpload.blobCache
                    const base64 = (reader.result as string).split(',')[1]
                    const blobInfo = blobCache.create(id, file, base64)
                    blobCache.add(blobInfo)

                    callback(blobInfo.blobUri(), { title: file.name })
                }
            }
        }
    }
}

/**
 * 上传文件 handle
 * @param file 文件
 * @param props 组件参数
 * @param success 成功回调
 * @returns
 */
function uploadFile(file: Blob | File, props: JnEditorProps, success: (url: string) => void) {
    // 获取鉴权信息，否则放弃
    const uploadHeaders = new Headers()

    const vuexCache = Local.get('vuex')
    if (!vuexCache) {
        ElMessage.error('上传失败，未能获取登录信息')
        return
    }
    if (vuexCache.loginInfo['access_token']) {
        uploadHeaders.append('Authorization', `Bearer ${vuexCache.loginInfo['access_token']}`)
    } else {
        ElMessage.error('上传失败，未能获取登录信息')
        return
    }

    const formData = new FormData()
    formData.append('file', file)

    // 通信
    fetch(props.uploadUrl, {
        method: 'POST',
        headers: uploadHeaders,
        body: formData
    })
        .then((response) => response.json())
        .then((result) => {
            if (result.code === '000000') {
                success(`${props.downloadUrl}/${result.data.fileId}`)
            } else {
                ElMessage.error(result.msg)
            }
        })
        .catch((error) => {
            ElMessage.error(error)
        })
}
