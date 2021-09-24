import {
    InputControlConfig,
    InputNumberControlConfig,
    SelectControlConfig,
    RadioControlConfig,
    TimePickerControlConfig,
    TimeSelectControlConfig,
    DatePickerControlConfig,
    DateTimePickerControlConfig,
    CheckboxControlConfig,
    ColorPickerControlConfig,
    RateControlConfig,
    SliderControlConfig,
    SelectTreeControlConfig
} from '../../GForm'

type TableEditCellControlConfig =
    | InputControlConfig
    | InputNumberControlConfig
    | SelectControlConfig
    | RadioControlConfig
    | TimePickerControlConfig
    | TimeSelectControlConfig
    | DatePickerControlConfig
    | DateTimePickerControlConfig
    | CheckboxControlConfig
    | ColorPickerControlConfig
    | RateControlConfig
    | SliderControlConfig
    | SelectTreeControlConfig

export default TableEditCellControlConfig
