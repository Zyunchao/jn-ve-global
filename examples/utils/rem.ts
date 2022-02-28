const rootValue = 100 // 根数值  1rem = 100px
const baseSize = 1920 // 设计稿基础尺寸 1920 基准
const minClientWidth = 1366 // 适配的最小 屏幕 1366

let docEl = document.documentElement
let resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize'
let recalc = function () {
    let clientWidth = docEl.clientWidth
    if (!clientWidth) return
    docEl.style.fontSize = rootValue * ((clientWidth > minClientWidth ? clientWidth : minClientWidth) / baseSize) + 'px'
}

window.addEventListener(resizeEvt, recalc, false)
document.addEventListener('DOMContentLoaded', recalc, false)
