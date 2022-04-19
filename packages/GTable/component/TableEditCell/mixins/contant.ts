import { computed, ref, inject, toRef } from 'vue'
import { FigureInputProps } from '../../../../GForm'
import { onCellEditKey, tableInstanceKey } from '../../../constant/InjectionKeys'
import { BaseTableDataItem } from '../../../index'

enum CellStatus {
    /**
     * 文本
     */
    TEXT = '1',
    /**
     * 控件
     */
    CONTROL = '2'
}

/**
 * 单元格的初始值有可能为
 * null | undefind | false | 0 | ''
 * 等一切可能的假值，只有保证初始值不为 “初始值” 的情况下，备份才是有效的
 * 否则为无效备份，不进行初始化
 */
const localCellPropInitValue = Symbol('localCellPropInitValue')

export default ({ props, editCellContentRef }) => {
    // 动画时间
    const animationTime = ref('200ms')
    // 获取用户传递的 cell 改变函数
    const onCellEdited = inject(onCellEditKey)
    // 获取 table 实例
    const tableInstance = inject(tableInstanceKey)
    // 当前单元格状态
    const cellStatus = ref<CellStatus>(!props.data.edit ? CellStatus.TEXT : CellStatus.CONTROL)
    // 行数据的本地引用
    const localData = computed<BaseTableDataItem>(() => props.data)
    // 行字段的同步引用
    // const localPropRef = toRef(props.data, props.columnConfig.prop)
    const localPropRef = computed({
        get: () => props.data[props.columnConfig.prop],
        set: (val) => {
            localData.value[props.columnConfig.prop] = val
        }
    })
    // 当前单元格数据备份
    const localPropCopy = ref<any>(localCellPropInitValue)
    // 控件类型
    const localControlType = ref(props.columnConfig.controlConfig?.type)
    // 控件配置 props
    const localControlProps = ref(props.columnConfig.controlConfig?.props)
    // esc 是否触发
    const escTrigger = ref<boolean>(false)

    // 必填项
    const controlIsRequired = computed<boolean>(() => {
        if (props.columnConfig.rules) {
            if (Array.isArray(props.columnConfig.rules)) {
                return props.columnConfig.rules.some((ruleItem) => ruleItem.required)
            }
            return props.columnConfig.rules.required
        }
        return false
    })

    // figureInput 特殊处理值
    const figureInputValue = computed(() => {
        if (localControlType.value !== 'figureInput') return null

        const figureInputProps = localControlProps.value as FigureInputProps

        if (figureInputProps.format) {
            return figureInputProps.format(localPropRef.value as string)
        }

        return localPropRef.value
    })

    // 控制 text 的创建
    const textCellShow = computed<boolean>(() => {
        /**
         * 优先级1
         * 如果行数据内拥有 edit（不为 undefined），说明需要总控
         * 如果传递了 controlConfig，且 edit 为 true，说明总控变为编辑状态
         * text 文本将销毁
         */
        if (localData.value.edit !== undefined) {
            if (localData.value.edit && props.columnConfig.controlConfig) {
                return false
            }
        }

        /**
         * 优先级2
         * 没有总控情况下，或总控为 false 情况下
         * 控制权回到当前组件中
         */
        return cellStatus.value === CellStatus.TEXT || !props.columnConfig.controlConfig
    })

    // 控制控件的创建
    const controlCellShow = computed<boolean>(() => {
        /**
         * 优先级1
         *  1. 没有传递 columnConfig.controlConfig
         */
        if (!props.columnConfig.controlConfig) return false

        /**
         * 优先级2
         *  总控：row.edit = true
         */
        if (localData.value.edit === true) {
            parentClassFlag('add')
            return true
        }

        /**
         * 优先级3
         *  自控：cellStatus === CellStatus.CONTROL
         */
        return cellStatus.value === CellStatus.CONTROL
    })

    function parentClassFlag(type: 'add' | 'remove') {
        if (!editCellContentRef.value) return
        const cell = editCellContentRef.value.parentElement
        cell.classList[type]('is-edit')
    }

    return {
        // 常量
        CellStatus,
        localCellPropInitValue,
        animationTime,
        onCellEdited,
        tableInstance,
        cellStatus,
        localData,
        localPropRef,
        localPropCopy,
        localControlType,
        localControlProps,
        escTrigger,

        // 计算
        controlIsRequired,
        figureInputValue,
        textCellShow,
        controlCellShow,

        // 工具
        parentClassFlag
    }
}
