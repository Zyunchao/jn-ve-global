import { Ref, watch, ShallowRef } from 'vue'
import {
    TinyMCE,
    Editor as TinyMCEEditor,
    EditorEvent,
    RawEditorSettings
} from '../interface/tinymce'
import { getTinymce } from '../constant/TinyMCE'
import JnEditorProps from '../interface/JnEditorProps'
// import { Local } from '../../utils/storage'

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
        plugins: `print preview searchreplace autolink directionality visualblocks visualchars fullscreen image link media template code codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists wordcount textpattern emoticons ${myFunctionalList.plugins}`,
        toolbar: [
            'fullscreen preview undo redo | cut copy paste pastetext | forecolor backcolor bold italic underline strikethrough link anchor | alignleft aligncenter alignright alignjustify outdent indent indent2em lineheight | bullist numlist | blockquote subscript superscript removeformat ',
            'styleselect formatselect fontselect fontsizeselect | tpImportword image axupimgs media emoticons charmap hr pagebreak insertdatetime  selectall visualblocks searchreplace | code print formatpainter',
            'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol'
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
        min_height: 400,
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
        file_picker_callback: filPickerCallback, // 文件上传处理函数
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
            editor.on('change input undo redo', (e: EditorEvent<any>) => {
                emits('update:modelValue', editor.getContent())
                emits('change', e)
                emits('input', e)
                emits('undo', e)
                emits('redo', e)
            })

            emits('setup', editor)
        },
        init_instance_callback(editor: TinyMCEEditor) {
            emits('initInstanceCallback', editor)
        }
    }

    getTinymce()?.init(finalInit)
    editorMounted.value = true
}

/**
 * 图片上传自定义实现（闭包）
 * @param props 组件参数
 * @returns
 */
function getImagesUploadHandler(props: JnEditorProps) {
    const imagesUploadHandler: RawEditorSettings['images_upload_handler'] = (
        blobInfo,
        success,
        failure,
        progress
    ) => {
        /**
         * 图片转换 base64 存储到页面中
         */
        const oFileReader = new FileReader()
        oFileReader.onloadend = function (e) {
            success(e.target.result as string)
        }
        oFileReader.readAsDataURL(blobInfo.blob())

        /**
         * 上传到服务器的逻辑，暂不需要
         */
        // 获取鉴权信息，否则放弃
        // const uploadHeaders = new Headers()
        // // const vuexCache = Local.get('vuex')
        // // if (!vuexCache) {
        // //     failure('上传失败，未能获取登录信息')
        // //     return
        // // }
        // // if (vuexCache.loginInfo['access_token']) {
        // //     uploadHeaders.append('Authorization', `Bearer ${vuexCache.loginInfo['access_token']}`)
        // // } else {
        // //     failure('上传失败，未能获取登录信息')
        // //     return
        // // }

        // const file = blobInfo.blob()
        // const formData = new FormData()
        // formData.append('file', file)

        // console.log(`%c imagesUploadHandler file == `, 'color: #f56c6c;', file)
        // console.log(`%c uploadHeaders == `, 'color: #e6a23c;', uploadHeaders)

        // fetch(props.uploadUrl, {
        //     method: 'POST',
        //     headers: uploadHeaders,
        //     body: formData
        // })
        //     .then((response) => response.json())
        //     .then((result) => {
        //         if (result.code === '000000') {
        //             // console.log(`%c result.data === `, 'color: #e6a23c;', result.data)
        //             success(result.data.fileUrl)
        //         } else {
        //             failure(result.msg)
        //         }
        //     })
        //     .catch((error) => {
        //         failure(error)
        //     })
    }

    return imagesUploadHandler
}

/**
 * 文件上传处理函数
 * @param callback
 * @param value
 * @param meta
 */
function filPickerCallback(callback, value, meta) {
    let filetype // 限制文件的上传类型,需要什么就添加什么的后缀
    if (meta.filetype === 'image') {
        filetype = '.jpg, .jpeg, .png, .gif, .ico, .svg'
    } else if (meta.filetype === 'media') {
        filetype = '.mp3, .mp4, .avi, .mov'
    } else {
        filetype =
            '.pdf, .txt, .zip, .rar, .7z, .doc, .docx, .xls, .xlsx, .ppt, .pptx, .mp3, .mp4, .jpg, .jpeg, .png, .gif, .ico, .svg'
    }
    const inputElem = document.createElement('input') // 创建文件选择
    inputElem.setAttribute('type', 'file')
    inputElem.setAttribute('accept', filetype)
    inputElem.click()
    inputElem.onchange = () => {
        const file = inputElem.files[0] // 获取文件信息

        // 所有都转成base64文件流,来自官方文档https://www.tiny.cloud/docs/configure/file-image-upload/#file_picker_callback
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = function () {
            // Note: Now we need to register the blob in TinyMCEs image blob
            // registry. In the next release this part hopefully won't be
            // necessary, as we are looking to handle it internally.
            const id = 'blobid' + new Date().getTime()
            const blobCache = getTinymce().activeEditor.editorUpload.blobCache
            const base64 = (reader.result as string).split(',')[1]
            const blobInfo = blobCache.create(id, file, base64)
            blobCache.add(blobInfo)

            callback(blobInfo.blobUri(), { title: file.name })
        }
    }
}
