export function getStyle(element, attr) {
    return window.getComputedStyle(element, null).getPropertyValue(attr)
}
