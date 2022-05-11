import { FormProps, FormItemBaseProps, ControlConfig } from '../../GForm'

export interface FormGenerateItemProps extends FormItemBaseProps {
    /**
     * 控件配置
     */
    controlConfig: ControlConfig
    /**
     * 默认值
     */
    defaultValue?: string | number | Array<any>
}

export default interface FormGenerateProps extends FormProps {
    formItems: FormGenerateItemProps[]
}
