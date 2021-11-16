import { InputProps } from './InputControlConfig'

export interface FigureInputProps extends InputProps {
    /**
     * 展示的格式化方式（千分位、保留小数..）
     */
    format?: (val: string | number) => string | number
    /**
     * 绑定的值的格式化方式（反格式化）
     */
    valueFormat?: (val: string | number) => string | number
}

export default interface FigureInputControlConfig {
    type: 'figureInput'
    props?: FigureInputProps
}
