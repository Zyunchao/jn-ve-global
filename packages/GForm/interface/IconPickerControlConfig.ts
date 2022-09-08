import { InputProps, InputEvents } from './InputControlConfig'

export interface IconPickerProps extends InputProps, InputEvents {}

export default interface IconPickerControlConfig {
    type: 'iconPicker'
    props?: IconPickerProps
}
