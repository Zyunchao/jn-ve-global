import { InputProps } from './InputControlConfig'

export interface ThousandsInputProps extends InputProps {}

export default interface ThousandsInputControlConfig {
    type: 'thousands'
    props?: ThousandsInputProps
}
