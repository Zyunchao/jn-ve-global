import { InputProps, InputEvents, InputSlots } from './InputControlConfig'

export interface FigureInputProps extends InputProps, InputEvents, InputSlots {
    /**
     * 展示的格式化方式（千分位、保留小数..）
     */
    format?: (val: string | number) => string | number
    /**
     * 绑定的值的格式化方式（反格式化）
     */
    valueFormat?: (val: string | number) => string | number
    /**
     * 显示单位提示
     */
    showUnitTip?: boolean
    /**
     * 是否格式化成千分位（仅展示）
     */
    toThousands?: boolean
    /**
     * 展示时小数位长度
     */
    showDecimalsLength?: number
    /**
     * 输入时小数位长度
     */
    valDecimalsLength?: number
}

export default interface FigureInputControlConfig {
    type: 'figureInput'
    props?: FigureInputProps
}
