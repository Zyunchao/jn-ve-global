/**
 * 图片压缩
 * @explain 借助canvas对图片进行重绘（canvas2DataURL）
 * @param path base64格式的图片字符串
 * @param imgAttr  重绘图片宽度、高度、质量等属性的设置
 * @param callback 该函数执行完毕后，要执行的回调函数
 * @returns
 */
export function imgCompress(
    path: string,
    imgAttr: {
        width?: number
        height?: number
        quality?: number
    },
    callback: (imgBase64: string) => void
) {
    var img = new Image()
    img.src = path
    img.setAttribute('crossOrigin', 'Anonymous')
    img.onload = function () {
        var that = this as any
        // 默认按比例压缩
        var w = that.width,
            h = that.height,
            scale = w / h
        w = imgAttr.width || w
        h = imgAttr.height || w / scale
        var quality = 0.7 // 默认图片质量为0.7
        // 生成 canvas
        var canvas = document.createElement('canvas')
        var ctx = canvas.getContext('2d')
        // 创建属性节点
        var anw = document.createAttribute('width')
        anw.nodeValue = w
        var anh = document.createAttribute('height')
        anh.nodeValue = h
        canvas.setAttributeNode(anw)
        canvas.setAttributeNode(anh)
        ctx.drawImage(that, 0, 0, w, h)
        // 图像质量
        if (imgAttr.quality && imgAttr.quality <= 1 && imgAttr.quality > 0) {
            quality = imgAttr.quality
        }
        // quality值越小，所绘制出的图像越模糊
        var base64 = canvas.toDataURL('image/jpeg', quality)
        // 回调函数返回base64的值
        callback(base64)
    }
}
