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
    FigureInputControlConfig,
    InfoSelectControlConfig,
    InfoSelectAllControlConfig,
    InfoAutocompleteControlConfig
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
    | InfoSelectControlConfig
    | InfoSelectAllControlConfig
    | InfoAutocompleteControlConfig

export default TableEditCellControlConfig
