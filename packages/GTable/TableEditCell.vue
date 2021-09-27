<template>
    <div
        v-if="localPropRef !== undefined && localPropRef !== null"
        ref="editCellContentRef"
        class="edit-cell-content"
        @dblclick="textToControl"
    >
        <transition
            :name="`slide-${cellStatus === CellStatus.CONTROL ? 'right' : 'left'}`"
            mode="out-in"
        >
            <div v-if="cellStatus === CellStatus.TEXT || !columnConfig.controlConfig" class="text">
                <!-- 普通文本 -->
                <span v-if="!columnConfig.render">{{ localPropRef }}</span>

                <!-- 自定义渲染 -->
                <FunctionalComponent
                    v-else-if="columnConfig.render && !tdIsHidden"
                    :render="columnConfig.render(localData, index)"
                />
            </div>

            <div
                v-else-if="
                    columnConfig.controlConfig && !tdIsHidden && cellStatus === CellStatus.CONTROL
                "
                :class="[
                    'control',
                    { 'is-required': controlIsRequired && !tdIsHidden },
                    { 'validate-reject': !validateRes }
                ]"
                @dblclick.stop
            >
                <!-- input 输入框 -->
                <template v-if="localControlType === 'input'">
                    <el-input
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="mini"
                        @blur="controlToText"
                    />
                </template>

                <!-- InputNumber -->
                <template v-if="localControlType === 'inputNumber'">
                    <div class="inputnumber-control-wrapper">
                        <el-input-number
                            v-model="localPropRef"
                            size="mini"
                            v-bind="localControlProps"
                        />
                        <el-button type="text" size="mini" @click="controlToText">
                            确定
                        </el-button>
                    </div>
                </template>

                <!-- 下拉选择（多选情况特殊） -->
                <template v-if="localControlType === 'select'">
                    <el-select
                        v-if="
                            !localControlProps ||
                                localControlProps.multiple === undefined ||
                                localControlProps.multiple === false ||
                                (localControlProps.multiple && Array.isArray(localPropRef))
                        "
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="mini"
                        style="width: 100%"
                        @visible-change="
                            (show) => {
                                if (!show) delayControlToText()
                            }
                        "
                    >
                        <el-option
                            v-for="selectOption in columnConfig.controlConfig.options"
                            :key="selectOption.value"
                            :label="selectOption.label"
                            :value="selectOption.value"
                            :disabled="selectOption.disabled"
                        >
                            <!-- 自定义渲染 Select 模板 -->
                            <template v-if="columnConfig.controlConfig.optionRender">
                                <FunctionalComponent
                                    :render="columnConfig.controlConfig.optionRender(selectOption)"
                                />
                            </template>
                        </el-option>
                    </el-select>
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is multiple but prop is not array;
                        </el-tag>
                    </div>
                </template>

                <!-- 单选框 -->
                <template v-if="localControlType === 'radio'">
                    <el-radio-group
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        @change="controlToText"
                    >
                        <el-radio
                            v-for="radioOption in columnConfig.controlConfig.options"
                            :key="radioOption.value"
                            :label="radioOption.value"
                            :disabled="radioOption.disabled"
                            size="mini"
                        >
                            {{ radioOption.label }}
                        </el-radio>
                    </el-radio-group>
                </template>

                <!-- 选择日期&时间类 -->
                <template v-if="localControlType === 'timePicker'">
                    <el-time-picker
                        v-if="localPropRef instanceof Date"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        style="width: 100%"
                        size="mini"
                        :clearable="false"
                        @change="delayControlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is not Date;
                        </el-tag>
                    </div>
                </template>

                <template v-if="localControlType === 'timeSelect'">
                    <el-time-select
                        v-if="typeof localPropRef === 'string'"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        style="width: 100%"
                        size="mini"
                        :clearable="false"
                        @change="delayControlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is not string;
                        </el-tag>
                    </div>
                </template>

                <template v-if="localControlType === 'datePicker'">
                    <el-date-picker
                        v-if="datePickerValueVerify()"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        style="width: 100%"
                        size="mini"
                        :clearable="false"
                        @change="delayControlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' prop type inconformity;
                        </el-tag>
                    </div>
                </template>

                <template v-if="localControlType === 'dateTimePicker'">
                    <el-date-picker
                        v-if="datePickerValueVerify()"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        type="datetime"
                        style="width: 100%"
                        size="mini"
                        :clearable="false"
                        @change="delayControlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' prop type inconformity;
                        </el-tag>
                    </div>
                </template>

                <!-- 多选框 -->
                <template v-if="localControlType === 'checkBox'">
                    <div v-if="Array.isArray(localPropRef)" class="checkbox-wrapper">
                        <el-checkbox-group v-model="localPropRef" v-bind="localControlProps">
                            <el-checkbox
                                v-for="checkBoxOption in columnConfig.controlConfig.options"
                                :key="checkBoxOption.value"
                                :label="checkBoxOption.value"
                                :disabled="checkBoxOption.disabled"
                                size="mini"
                            >
                                {{ checkBoxOption.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <div class="checkbox-confirm-btn-wrapper">
                            <el-button size="mini" type="primary" @click="controlToText">
                                确定
                            </el-button>
                        </div>
                    </div>
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is not array;
                        </el-tag>
                    </div>
                </template>

                <!-- ColorPicker 颜色选择器 -->
                <template v-if="localControlType === 'colorPicker'">
                    <el-color-picker
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="mini"
                        @change="controlToText"
                    />
                </template>

                <!-- Rate 打分 -->
                <template v-if="localControlType === 'rate'">
                    <el-rate
                        v-if="typeof localPropRef === 'number'"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="mini"
                        @change="controlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is not number;
                        </el-tag>
                    </div>
                </template>

                <!-- Slider 滑块 -->
                <template v-if="localControlType === 'slider'">
                    <el-slider
                        v-if="typeof localPropRef === 'number'"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="mini"
                        :show-tooltip="false"
                        :class="{
                            'has-marks':
                                localControlProps.marks &&
                                Object.keys(localControlProps.marks).length > 0
                        }"
                        @change="controlToText"
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is not number;
                        </el-tag>
                    </div>
                </template>

                <!-- 下拉树 -->
                <template v-if="localControlType === 'selectTree'">
                    <LGSelectTree
                        v-if="
                            !localControlProps ||
                                localControlProps.multiple === undefined ||
                                localControlProps.multiple === false ||
                                (localControlProps.multiple && Array.isArray(localPropRef))
                        "
                        v-model="localPropRef"
                        :tree-data="columnConfig.controlConfig.treeData"
                        v-bind="localControlProps"
                        size="mini"
                        @visible-change="
                            (show) => {
                                if (!show) delayControlToText()
                            }
                        "
                    />
                    <div v-else>
                        <el-tag type="danger" size="small">
                            error: '{{ columnConfig.prop }}' is multiple but prop is not array;
                        </el-tag>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script lang="tsx">
export default {
    name: 'TableEditCell'
}
</script>

<script lang="tsx" setup>
import {
    PropType,
    ref,
    computed,
    toRef,
    inject,
    nextTick,
    watch,
    onBeforeMount,
    onMounted,
    onBeforeUnmount,
    onUnmounted
} from 'vue'
import { TableColumnProps, BaseTableDataItem } from './index'
import { onCellEditKey, tableInstanceKey } from './constant/InjectionKeys'
import FunctionalComponent from '../FunctionalComponent'
import ResizeObserver from 'resize-observer-polyfill'
import { SelectProps, DatePickerControlConfig, SliderProps, SelectTreeProps } from '../GForm'
import LGSelectTree from '../GSelectTree/index.vue'
import Schema, { ErrorList, FieldErrorList, RuleItem } from 'async-validator'
import { ElMessage } from 'element-plus'
import _ from 'lodash'

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

const props = defineProps({
    /**
     * 当前列配置
     */
    columnConfig: {
        type: Object as PropType<TableColumnProps>,
        required: true,
        default: null
    },
    /**
     * row 数据
     */
    data: {
        type: Object as PropType<BaseTableDataItem>,
        default: null
    },
    /**
     * row index
     */
    index: [Number, String]
})

const localCellPropInitValue = Symbol('localCellPropInitValue')

// 组件 ref 引用
const editCellContentRef = ref<HTMLElement>(null)
// 动画时间
const animationTime = ref('200ms')
// 获取用户传递的 cell 改变函数
const onCellEdited = inject(onCellEditKey)
// 获取 table 实例
const tableInstance = inject(tableInstanceKey)
// 当前单元格状态
const cellStatus = ref<CellStatus>(CellStatus.TEXT)
// 行数据的本地引用
const localData = computed<BaseTableDataItem>(() => props.data)
// 行字段的同步引用
const localPropRef = toRef(localData.value, props.columnConfig.prop)
let localPropCopy: any = localCellPropInitValue
// 控件类型
const localControlType = ref(props.columnConfig.controlConfig?.type)
// 控件配置 props
const localControlProps = ref(props.columnConfig.controlConfig?.props)
// ResizeObserver 实例，供取消监听使用
let ob: ResizeObserver = null
// 当前组件所处的 td 是否隐藏
const tdIsHidden = ref<boolean>(false)
// esc 是否触发
const escTrigger = ref<boolean>(false)
// 检验器
let validator: Schema = null
/**
 * 校验结果
 *  成功：正常流程
 *  失败：组织一切关闭控件的操作
 */
let validateRes = ref<boolean>(true)
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

// 行编辑总控
watch(
    () => localData.value.edit,
    (edit) => {
        if (edit) {
            textToControl()
        } else {
            // 校验失败
            if (!validateRes.value) {
                localData.value.edit = true
                return
            }

            cellStatus.value = CellStatus.TEXT
            localPropCopy = _.cloneDeep(localPropRef.value)
        }
    }
)

onMounted(() => {
    if (!editCellContentRef.value) return

    /**
     * 判断单元格的无意义创建（隐藏的单元格）
     */
    const tdDom = editCellContentRef.value.parentNode.parentNode as HTMLElement
    tdIsHidden.value = tdDom.classList.value.includes('is-hidden')
    if (tdIsHidden.value) return

    // 复制当前单元格的值（取消编辑备用）
    localPropCopy = _.cloneDeep(localPropRef.value)

    // 有效创建为 documnet 绑定 esc 事件
    document.addEventListener('keyup', cancelEdit)

    // 添加校验器
    if (props.columnConfig.rules) {
        const descriptor = {
            [props.columnConfig.prop]: props.columnConfig.rules
        }
        validator = new Schema(descriptor)

        // 监听数据改变，执行校验
        watch(
            () => localPropRef.value,
            (val) => {
                validator
                    .validate(localData.value)
                    .then((res) => {
                        validateRes.value = true
                    })
                    .catch((errProps: { errors: ErrorList; fields: FieldErrorList }) => {
                        validateRes.value = false

                        const msg: string = errProps.errors.find((item) => {
                            return item.field === props.columnConfig.prop
                        })?.message
                        ElMessage.error(msg)
                    })
            }
        )
    }

    // 以下情况可能造成 cell 高度产生较大变化
    if (
        // 多选框
        localControlType.value === 'checkBox' ||
        // 下拉框多选
        (localControlType.value === 'select' &&
            (localControlProps.value as SelectProps)?.multiple) ||
        // slider 包含 marks
        (localControlType.value === 'slider' && (localControlProps.value as SliderProps)?.marks) ||
        // 下拉树多选
        (localControlType.value === 'selectTree' &&
            (localControlProps.value as SelectTreeProps)?.multiple)
    ) {
        // 获取当前控件所处的表格，以判断是哪种表格
        const currentTableDom =
            editCellContentRef.value.parentNode.parentNode.parentNode.parentNode.parentNode
                .parentNode

        if (!currentTableDom) return

        /**
         * 表格有三种
         *  1. el-table__body-wrapper   == 主表格
         *  2. el-table__fixed          == 左侧固定的
         *  3. el-table__fixed-right    == 右侧固定的
         *
         * 只需要监听主表格的控件的尺寸变化
         */
        const isCoreTableControl = (currentTableDom as HTMLElement).classList.value.includes(
            'el-table__body-wrapper'
        )

        // 非主表格的控件，监听无意义
        if (!isCoreTableControl) return

        ob = new ResizeObserver((entries) => {
            // 只有在编辑状态下，才执行函数
            // if (cellStatus.value !== CellStatus.CONTROL) return

            for (let entry of entries) {
                const currentHeight: number = entry.contentRect.height
                /**
                 * 获取当前主表格中编辑 cell 所处列的关键字 index
                 */
                const currentEditTdDom = editCellContentRef.value.parentNode
                    .parentNode as HTMLElement
                const currentEditTdClassIndex = currentEditTdDom.classList[0]

                /**
                 * 获取当前主表格中编辑 cell 所处行的 index
                 */
                const currentEditTrDom = currentEditTdDom.parentNode as HTMLElement
                let currentEditTrIndex: number
                const currentTableTrList = currentTableDom.querySelectorAll('tbody tr')
                currentTableTrList.forEach(
                    (tr, index) => tr === currentEditTrDom && (currentEditTrIndex = index)
                )

                /**
                 * 查找左右表格的目标 cell
                 */
                const tableRoot = currentTableDom.parentNode as HTMLElement
                const leftTableDom = tableRoot.querySelector('.el-table__fixed')
                const rightTableDom = tableRoot.querySelector('.el-table__fixed-right')

                if (leftTableDom) {
                    const leftTargetEditCellContent = leftTableDom
                        .querySelectorAll('tbody tr')
                        [currentEditTrIndex].querySelector(
                            `.${currentEditTdClassIndex} .edit-cell-content`
                        ) as HTMLElement

                    leftTargetEditCellContent.style.height = `${currentHeight}px`
                }

                if (rightTableDom) {
                    const rightTargetEditCellContent = rightTableDom
                        .querySelectorAll('tbody tr')
                        [currentEditTrIndex].querySelector(
                            `.${currentEditTdClassIndex} .edit-cell-content`
                        ) as HTMLElement

                    rightTargetEditCellContent.style.height = `${currentHeight}px`
                }
            }
        })

        ob.observe(editCellContentRef.value)
    }
})

const textToControl = () => {
    if (cellStatus.value === CellStatus.TEXT) {
        cellStatus.value = CellStatus.CONTROL
        setTimeout(() => {
            tableInstance.value.doLayout()
        }, parseInt(animationTime.value) + 50)
    }
}

const controlToText = () => {
    // 校验失败，无意义触发
    if (!validateRes.value) return
    // 总控编辑，不需要单独触发
    if (localData.value.edit) return
    // esc 取消，无效改变
    if (escTrigger.value) return

    cellStatus.value = CellStatus.TEXT
    localPropCopy = _.cloneDeep(localPropRef.value)
    onCellEdited?.(localData.value, props.index, props.columnConfig.prop)
}

// 延迟从 控件 => 文本（部分控件的子控件收起存在动画延迟，如时间类控件）
const delayControlToText = () => {
    setTimeout(controlToText, parseInt(animationTime.value))
}

// 键盘 esc 退出编辑（优先级最高）
function cancelEdit(e: KeyboardEvent) {
    if (e.key !== 'Escape' || cellStatus.value === CellStatus.TEXT) return
    escTrigger.value = true

    // 初始化单元格数据
    localPropCopy !== localCellPropInitValue && (localPropRef.value = localPropCopy)
    // 初始化校验结果
    validateRes.value = true
    // 取消总控编辑
    localData.value.edit = false
    // 转换为文本模式
    cellStatus.value = CellStatus.TEXT

    setTimeout(() => {
        escTrigger.value = false
        tableInstance.value.doLayout()
    }, parseInt(animationTime.value) + 50)
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

onBeforeUnmount(() => {
    if (tdIsHidden.value) return
    document.removeEventListener('keyup', cancelEdit)
    ob && ob.disconnect()
})
</script>

<style lang="scss" scoped>
$--cell-min-height: 29px;

.edit-cell-content {
    cursor: pointer;
    min-height: $--cell-min-height;
    display: flex;
    align-items: center;

    .text {
        flex: 1;
        min-height: $--cell-min-height;
        display: flex;
        align-items: center;

        > span {
            flex: 1;
        }
    }

    :deep(.el-slider) {
        width: 100%;
        // padding: 0 20px;

        .el-slider__runway {
            margin: 10px 0;
            background-color: rgb(221, 220, 220);

            &.disabled {
                .el-slider__bar {
                    background-color: #6aaef3;
                }
            }
        }

        &.has-marks {
            height: 50px;
        }
    }

    :deep(.control) {
        width: 100%;
        position: relative;

        &.is-required {
            &::before {
                content: '*';
                color: red;
                position: absolute;
                left: -9px;
                font-size: 20px;
                top: 50%;
                transform: translateY(-50%);
            }
        }

        .el-input__inner {
            transition: border, box-shadow v-bind(animationTime);
        }

        &.validate-reject {
            .el-input__inner,
            .checkbox-wrapper .el-checkbox-group {
                border-color: #f56c6c;
                box-shadow: 0 0 10px rgba(245, 108, 108, 0.6), 0 0 10px rgba(245, 108, 108, 0.6);
            }
        }

        .inputnumber-control-wrapper {
            display: flex;
            justify-content: space-between;

            .el-input-number {
                flex: 1;
            }

            .el-button {
                margin-left: 4px;
            }
        }

        // checkbox
        .checkbox-wrapper {
            .el-checkbox-group {
                padding: 4px;
                border-radius: 4px;
                border: 1px dashed var(--el-border-color-base);
                margin-bottom: 4px;

                .el-checkbox {
                    height: 16px;
                    margin-right: 12px;
                }
            }

            .checkbox-confirm-btn-wrapper {
                text-align: center;

                .el-button {
                    min-height: 20px;
                    height: 20px;
                    padding: 4px 16px;
                }
            }
        }

        // radio
        .el-radio-group {
            display: flex;

            .el-radio {
                margin-right: 20px;
                &:last-of-type {
                    margin-right: 0;
                }
            }
        }

        // color-picker
        .el-color-picker {
            display: block;

            .el-color-picker__trigger {
                padding: 0;
            }
        }
    }

    .slide-right-enter-active,
    .slide-right-leave-active,
    .slide-left-enter-active,
    .slide-left-leave-active {
        will-change: transform;
        transition: all v-bind(animationTime) ease;
    }
    // slide-right
    .slide-right-enter-from {
        opacity: 0;
        transform: translateX(-20px);
    }
    .slide-right-leave-to {
        opacity: 0;
        transform: translateX(20px);
    }
    // slide-left
    .slide-left-enter-from {
        @extend .slide-right-leave-to;
    }
    .slide-left-leave-to {
        @extend .slide-right-enter-from;
    }
}
</style>
