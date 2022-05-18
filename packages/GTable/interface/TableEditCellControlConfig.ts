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
    InfoAutocompleteControlConfig,
    SelectTreeV2ControlConfig,
    AddressControlConfig
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
    | SelectTreeV2ControlConfig
    | AddressControlConfig

export default TableEditCellControlConfig
