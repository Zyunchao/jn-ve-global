export function getWidth(width: string | number) {
    const widthVal = width ? parseFloat(`${width}`) : 100
    const unit =
        typeof width === 'number'
            ? 'px'
            : width && (width.includes('px') || width.includes('rem'))
                ? ''
                : 'px'

    return `${widthVal}${unit}`
}

/**
 * 包装普通数据到 select 适应的数据
 * @param source 源数据
 * @param optionProps 映射字段配置项
 * @returns 
 */
export function packagingOptionData(source: any[], optionProps: { value: string; label: string }) {
    const VALUE_K = 'value'
    const LABEL_K = 'label'

    return source.map((item) => {
        const target = { ...item }

        // value
        if (target[VALUE_K] === undefined || target[VALUE_K] === null) {
            target[VALUE_K] = target[optionProps.value]
        }

        // key
        if (target[LABEL_K] === undefined || target[LABEL_K] === null) {
            target[LABEL_K] = item[optionProps.label]
        }

        return target
    })
}
