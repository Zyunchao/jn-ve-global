export interface ColorPickerProps {
    /**
     * 是否禁用
     * default: false
     */
    disabled?: boolean
    /**
     * 尺寸
     */
    size?: 'medium' | 'small' | 'mini'
    /**
     * 是否支持透明度选择
     * default: false
     */
    showAlpha?: boolean
    /**
     * 写入 v-model 的颜色的格式
     * default: hex（show-alpha 为 false）/ rgb（show-alpha 为 true）
     */
    colorFormat?: 'hsl' | 'hsv' | 'hex' | 'rgb'
    /**
     * ColorPicker 下拉框的类名
     */
    popperClass?: string
    /**
     * 预定义颜色
     */
    predefine?: string[]
    /**
     * 当绑定值变化时触发
     */
    onChange?: (color: string) => void
    /**
     * 面板中当前显示的颜色发生改变时触发
     */
    onActiveChange?: (color: string) => void
}

export default interface ColorPickerControlConfig {
    type: 'colorPicker'
    props?: ColorPickerProps
}
