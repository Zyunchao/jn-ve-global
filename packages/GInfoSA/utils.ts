export function getWidth (width: string | number){
    const widthVal = width ? parseFloat(`${width}`) : 100
    const unit =
        typeof width === 'number'
            ? 'px'
            : width && (width.includes('px') || width.includes('rem'))
                ? ''
                : 'px'

    return `${widthVal}${unit}`
}