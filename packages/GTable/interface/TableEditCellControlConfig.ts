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
    SelectTreeControlConfig,
    FigureInputControlConfig
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
    | FigureInputControlConfig

export default TableEditCellControlConfig
