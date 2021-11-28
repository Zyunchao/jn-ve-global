import PPTFileTypeImg from './assets/images/PPT.png'
import ExcelFileTypeImg from './assets/images/Excel.png'
import PDFFileTypeImg from './assets/images/PDF.png'
import RadioFileTypeImg from './assets/images/Radio.png'
import TXTFileTypeImg from './assets/images/TXT.png'
import VideoFileTypeImg from './assets/images/Video.png'
import WordFileTypeImg from './assets/images/Word.png'
import ZARFileTypeImg from './assets/images/ZAR.png'
import DefaulrFileLogo from './assets/images/Other.png'

/**
 * 根据文件名称获取文件类型，转换小写
 * @param fileName 文件 name
 * @returns
 */
export function getFileType(fileName: string) {
    return fileName.replace(/.+\./, '').toLowerCase()
}

/**
 * 根据文件名获取对应的文件略缩图
 * @param fileName 文件 name
 * @param url 文件 url
 * @returns 文件略缩图
 */
export function getFileTypeIcon(fileName: string, url?: string) {
    const fileType = getFileType(fileName)

    // 图片取原url
    if (['png', 'jpg', 'jpeg', 'bmp', 'gif', 'webp', 'psd', 'svg', 'tiff'].includes(fileType))
        return url

    // word
    if (['rtf', 'doc', 'docx'].includes(fileType)) return WordFileTypeImg

    // excel
    if (['xls', 'xlsx'].includes(fileType)) return ExcelFileTypeImg

    // pdf
    if (['pdf'].includes(fileType)) return PDFFileTypeImg

    // txt
    if (['txt', 'text'].includes(fileType)) return TXTFileTypeImg

    // ppt
    if (['ppt', 'pptx'].includes(fileType)) return PPTFileTypeImg

    // 压缩包
    if (['rar', 'zip', 'arj', 'z', '7z'].includes(fileType)) return ZARFileTypeImg

    return DefaulrFileLogo
}

/**
 * 驼峰转短横线
 * @param str 字符串
 * @returns 短横线
 */
export function hump2partition(str: string) {
    return str.replace(/([A-Z])/g, (match, p1, offset, string) => {
        // 一个捕获组捕获全部，所以match等于p1
        return '-' + p1.toLowerCase()
    })
}

/**
 * 短横线转驼峰
 * @param str 字符串
 * @returns 驼峰
 */
export function partition2Hump(str: string) {
    return str.replace(/(\-([a-z]))/g, (match, p1, p2, offset, string) => {
        // 这里有两个捕获组，第一个捕获组捕获全部并包含了第二个捕获组，所以match等于p1
        return p2.toUpperCase()
    })
}
