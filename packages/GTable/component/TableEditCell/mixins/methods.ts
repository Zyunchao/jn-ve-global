import _ from 'lodash'
import { DatePickerControlConfig } from '../../../../GForm'

export default ({
    cellStatus,
    CellStatus,
    tableInstance,
    animationTime,
    editCellContentRef,
    validateRes,
    localData,
    escTrigger,
    localPropCopy,
    localPropRef,
    onCellEdited,
    props,
    localControlProps,
    controlRef,
    parentClassFlag
}) => {
    /**
     * 文本转换到控件
     */
    const text2Control = () => {
        if (cellStatus.value === CellStatus.TEXT) {
            parentClassFlag('add')
            cellStatus.value = CellStatus.CONTROL
            setTimeout(() => {
                tableInstance.value.doLayout()
            }, parseInt(animationTime.value) + 50)
        }
    }

    /**
     * 控件到文本
     */
    const control2Text = () => {
        // 校验失败，无意义触发
        if (!validateRes.value) return
        // 总控编辑，不需要单独触发
        if (localData.value.edit) return
        // esc 取消，无效改变
        if (escTrigger.value) return

        parentClassFlag('remove')

        cellStatus.value = CellStatus.TEXT
        localPropCopy.value = _.cloneDeep(localPropRef.value)
        onCellEdited?.(localData.value, props.index, props.columnConfig.prop)
    }

    // 延迟从 控件 => 文本（部分控件的子控件收起存在动画延迟，如时间类控件）
    const delayControlToText = () => {
        setTimeout(control2Text, parseInt(animationTime.value))
    }

    // 校验时间选择类绑定值的格式是否正确
    const datePickerValueVerify = () => {
        // 传递了 props
        if (!!localControlProps.value) {
            const isValFm =
                typeof (localControlProps.value as DatePickerControlConfig['props']).valueFormat ===
                'string'
            const isRange =
                (localControlProps.value as DatePickerControlConfig['props']).type === 'daterange'

            if (isRange) {
                if (Array.isArray(localPropRef.value)) {
                    return isValFm
                        ? !localPropRef.value.some((item) => typeof item !== 'string')
                        : !localPropRef.value.some((item) => !(item instanceof Date))
                } else {
                    return false
                }
            } else {
                return isValFm
                    ? typeof localPropRef.value === 'string'
                    : localPropRef.value instanceof Date
            }
        }

        // 未传递 props，校验值是否为 Date
        return localPropRef.value instanceof Date
    }

    // 转换到编辑状态
    const toEditStatusMethod = () => {
        text2Control()

        /**
         * 转换编辑状态，个别控件（输入框）获取焦点
         *  - Input
         *  - InputNumber
         *  - FigureInput
         */
        setTimeout(() => {
            controlRef.value && controlRef.value.focus()
        }, parseInt(animationTime.value) + 50)
    }

    // 双击开启编辑
    const handleDB = () => {
        if (!props.columnConfig.openDB || props.columnConfig.openSC) return
        toEditStatusMethod()
    }

    // 单击开启编辑
    const handleSC = () => {
        if (!props.columnConfig.openSC || props.columnConfig.openDB) return
        toEditStatusMethod()
    }

    return {
        text2Control,
        control2Text,
        delayControlToText,
        datePickerValueVerify,
        handleDB,
        handleSC
    }
}
