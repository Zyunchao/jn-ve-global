<template>
    <div
        v-if="localPropRef !== undefined && localPropRef !== null"
        ref="editCellContentRef"
        class="edit-cell-content"
        @dblclick="handleDB"
    >
        <transition
            :name="`slide-${cellStatus === CellStatus.CONTROL ? 'right' : 'left'}`"
            mode="out-in"
        >
            <div v-if="textCellShow" class="text">
                <!-- 普通文本 -->
                <span v-if="!columnConfig.render">{{
                    figureInputValue === null ? localPropRef : figureInputValue
                }}</span>

                <!-- 自定义渲染 -->
                <FunctionalComponent
                    v-else-if="columnConfig.render && !tdIsHidden"
                    :render="columnConfig.render(localData, index)"
                />
            </div>

            <div
                v-else-if="controlCellShow"
                :class="[
                    'control',
                    { 'is-required': controlIsRequired && !tdIsHidden },
                    { 'is-error': !validateRes }
                ]"
                @dblclick.stop
            >
                <!-- input 输入框 -->
                <template v-if="localControlType === 'input'">
                    <el-input
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="small"
                        @blur="control2Text"
                    />
                </template>

                <!-- InputNumber -->
                <template v-if="localControlType === 'inputNumber'">
                    <div class="inputnumber-control-wrapper">
                        <el-input-number
                            v-model="localPropRef"
                            size="small"
                            v-bind="localControlProps"
                        />
                        <el-button type="text" size="small" @click="control2Text">
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
                        size="small"
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
                        @change="control2Text"
                    >
                        <el-radio
                            v-for="radioOption in columnConfig.controlConfig.options"
                            :key="radioOption.value"
                            :label="radioOption.value"
                            :disabled="radioOption.disabled"
                            size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                        size="small"
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
                                size="small"
                            >
                                {{ checkBoxOption.label }}
                            </el-checkbox>
                        </el-checkbox-group>
                        <div class="checkbox-confirm-btn-wrapper">
                            <el-button size="small" type="primary" @click="control2Text">
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
                        size="small"
                        @change="control2Text"
                    />
                </template>

                <!-- Rate 打分 -->
                <template v-if="localControlType === 'rate'">
                    <el-rate
                        v-if="typeof localPropRef === 'number'"
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="small"
                        @change="control2Text"
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
                        size="small"
                        :show-tooltip="false"
                        :class="{
                            'has-marks':
                                localControlProps.marks &&
                                Object.keys(localControlProps.marks).length > 0
                        }"
                        @change="control2Text"
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
                        size="small"
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

                <!-- 数字格式化 -->
                <template v-if="localControlType === 'figureInput'">
                    <LGFigureInput
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        size="small"
                        @table-edit-hide="control2Text"
                    />
                </template>

                <!-- 下拉框 多列展示（分页） -->
                <template v-if="localControlType === 'infoSelect'">
                    <LGInfoSelect
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        :total="columnConfig.controlConfig.total"
                        :options-data="columnConfig.controlConfig.options"
                        :columns="columnConfig.controlConfig.columns"
                        :option-props="columnConfig.controlConfig.optionProps"
                        size="small"
                        @closed="delayControlToText"
                    />
                </template>

                <!-- 下拉框 多列展示（虚拟滚动全量） -->
                <template v-if="localControlType === 'infoSelectAll'">
                    <LGInfoSelectAll
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        :options-data="columnConfig.controlConfig.options"
                        :columns="columnConfig.controlConfig.columns"
                        :option-props="columnConfig.controlConfig.optionProps"
                        size="small"
                        @closed="delayControlToText"
                    />
                </template>

                <!-- 带有输入建议且以表格形式展示的 input -->
                <template v-if="localControlType === 'infoAutocomplete'">
                    <LGInfoAutocomplete
                        v-model="localPropRef"
                        v-bind="localControlProps"
                        :columns="columnConfig.controlConfig.columns"
                        :fetch-suggestions="columnConfig.controlConfig.fetchSuggestions"
                        :value-key="columnConfig.controlConfig.valueKey"
                        size="small"
                        @closed="delayControlToText"
                    />
                </template>

                <!-- 错误信息，存在 rules 即创建 -->
                <template v-if="columnConfig.rules">
                    <el-tooltip
                        popper-class="edit-cell-error-msg-tooltip"
                        effect="dark"
                        :content="validateMsg"
                        placement="bottom"
                        :offset="0"
                    >
                        <transition :name="`slide-${validateMsg ? 'right' : 'left'}`">
                            <span v-if="validateMsg && !validateRes" class="error-msg">
                                <!-- {{ validateMsg }} -->
                            </span>
                        </transition>
                    </el-tooltip>
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
import { TableColumnProps, BaseTableDataItem } from '../index'
import { onCellEditKey, tableInstanceKey } from '../constant/InjectionKeys'
import FunctionalComponent from '../../FunctionalComponent'
import ResizeObserver from 'resize-observer-polyfill'
import {
    SelectProps,
    DatePickerControlConfig,
    SliderProps,
    SelectTreeProps,
    InfoSelectProps,
    InfoSelectAllProps
} from '../../GForm'
import LGSelectTree from '../../GSelectTree/index.vue'
import Schema, { ValidateError } from 'async-validator'
import { ElMessage } from 'element-plus'
import _ from 'lodash'
import LGFigureInput from '../../GFigureInput/index.vue'
import { FigureInputProps } from '../../GForm'
import { Local } from '@/utils/storage'
import LGInfoSelect from '../../GInfoSA/GInfoSelect/index.vue'
import LGInfoSelectAll from '../../GInfoSA/GInfoSelectAll/index.vue'
import LGInfoAutocomplete from '../../GInfoSA/GInfoAutocomplete/index.vue'

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

/**
 * 单元格的初始值有可能为
 * null | undefind | false | 0 | ''
 * 等一切可能的假值，只有保证初始值不为 “初始值” 的情况下，备份才是有效的
 * 否则为无效备份，不进行初始化
 */
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
const cellStatus = ref<CellStatus>(!props.data.edit ? CellStatus.TEXT : CellStatus.CONTROL)
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
/**
 * 校验结果
 *  成功：正常流程
 *  失败：组织一切关闭控件的操作
 */
let validateRes = ref<boolean>(true)
const currentCellValidator = ref<Schema>(null)
const validateMsg = ref<string>('')

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

/**
 * figureInput 特殊处理值
 */
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
     *  1. 传递了 columnConfig.controlConfig
     *  2. 不是隐藏的 cell（横向滚动隐藏表格）
     */
    if (!props.columnConfig.controlConfig || tdIsHidden.value) return false

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

// 行编辑总控
watch(
    () => localData.value.edit,
    (edit) => {
        if (edit) {
            text2Control()
        } else {
            /**
             * 隐藏的单元格、没有 rules 的单元格直接放行
             * 1. 将状态切换回 Text
             * 2. 备份最新的数据
             */
            if (currentCellValidator.value === null) {
                cellStatus.value = CellStatus.TEXT
                localPropCopy = _.cloneDeep(localPropRef.value)
                return
            }

            /**
             * 有 rules，且不为隐藏
             * 主动触发校验
             */
            currentCellValidator.value
                .validate(localData.value)
                .then((res) => {
                    validateRes.value = true
                    validateMsg.value = ''

                    // 校验成功，切换状态，并备份最新的编辑结果
                    cellStatus.value = CellStatus.TEXT
                    localPropCopy = _.cloneDeep(localPropRef.value)
                })
                .catch((errProps: { errors: ValidateError[] }) => {
                    validateRes.value = false

                    // 校验失败，阻止关闭编辑状态
                    localData.value.edit = true

                    const msg: string = errProps.errors.find((item) => {
                        return item.field === props.columnConfig.prop
                    })?.message
                    validateMsg.value = msg
                })
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

        // 检验器
        let validator: Schema = new Schema(descriptor)

        currentCellValidator.value = validator

        // 监听数据改变，执行校验
        watch(
            () => localPropRef.value,
            (val) => {
                validator
                    .validate(localData.value)
                    .then((res) => {
                        validateRes.value = true
                        validateMsg.value = ''
                    })
                    .catch((errProps: { errors: ValidateError[] }) => {
                        validateRes.value = false

                        const msg: string = errProps.errors.find((item) => {
                            return item.field === props.columnConfig.prop
                        })?.message
                        validateMsg.value = msg
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
            (localControlProps.value as SelectTreeProps)?.multiple) ||
        // 多信息展示下拉（分页）
        (localControlType.value === 'infoSelect' &&
            (localControlProps.value as InfoSelectProps)?.multiple) ||
        // 多信息展示下拉（全量）
        (localControlType.value === 'infoSelectAll' &&
            (localControlProps.value as InfoSelectAllProps)?.multiple)
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

const parentClassFlag = (type: 'add' | 'remove') => {
    if (!editCellContentRef.value) return
    const cell = editCellContentRef.value.parentElement
    cell.classList[type]('is-edit')
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
    localPropCopy = _.cloneDeep(localPropRef.value)
    onCellEdited?.(localData.value, props.index, props.columnConfig.prop)
}

// 延迟从 控件 => 文本（部分控件的子控件收起存在动画延迟，如时间类控件）
const delayControlToText = () => {
    setTimeout(control2Text, parseInt(animationTime.value))
}

// 键盘 esc 退出编辑（优先级最高）
const taskCacheKey = 'TASK_IDS'
Local.remove(taskCacheKey)
function cancelEdit(e: KeyboardEvent) {
    if (e.key !== 'Escape') return
    isEscTrigger()
    if (cellStatus.value === CellStatus.TEXT) return

    // 初始化单元格数据
    localPropCopy !== localCellPropInitValue && (localPropRef.value = localPropCopy)
    // 初始化校验结果
    validateRes.value = true
    // 转换为文本模式
    cellStatus.value = CellStatus.TEXT

    const taskId = setTimeout(() => {
        const taskIds = Local.get(taskCacheKey)
        const lastTaskId = taskIds[taskIds.length - 1]

        if (taskId !== lastTaskId) {
            clearTimeout(taskId)
            return
        }

        /**
         * 取消总控编辑
         * 在 esc 取消行总控时，将使所有的控件切换状态
         * 在这里要保证所有的值都初始化后，再进行切换行总控
         */
        localData.value.edit && (localData.value.edit = false)
        tableInstance.value.doLayout()

        // 清除此次 esc 任务缓存
        Local.remove(taskCacheKey)
    }, parseInt(animationTime.value) + 50)

    /**
     * 在执行 esc 事件时，需要将行的状态初始
     * 1. 如果行内存在校验不通过的字段，程序就会将这一行的 edit 修改为 true（编辑状态）
     * 2. 同时，这边的 timeout 还在队列中，虽然在 timeout 事件中判断了 edit 为 true 时才置为 false
     * 3. 这时，由于 第一条 的作用，队列与 watch 交替更改这一行的 edit，造成严重的切换操作
     *
     * 解决思路：
     *  1. 每一个单元格的 esc 初始化肯定是要执行的
     *  2. 但是改变行的 edit 并不是每一个执行环境（组件）必须的
     *  3. 我们只需要尽可能的在最后一个执行环境中，改变行的 edit 状态即可
     *  4. 所有的 timeout 都是运行在当前 window 中的，那么只要拿到每一个 timeout 的 id，再根据 id 去决定要不要改变行的 edit
     *  5. 所有组件的加载，esc 的执行，是有执行顺序的，也就意味着 timeout 开启也是有顺序的，那么我们将所有的 timeout id 收集起来
     *  6. 在执行任务的时候，判断当前是不是期望的最后一个任务：
     *      1）不是最后一个，清除当前环境的任务id，且不改变 tale状态
     *      2）是最后一个，执行任务
     *  7. 在执行完期望任务后，初始化存储的这一次 esc 操作所开启的所有的任务 id
     */
    const taskIds = Local.get(taskCacheKey) || []
    taskIds.push(taskId)
    Local.set(taskCacheKey, taskIds)
}

function isEscTrigger() {
    escTrigger.value = true
    setTimeout(() => {
        escTrigger.value = false
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

// 双击是否开启编辑
const handleDB = () => {
    if (props.columnConfig.openDB) text2Control()
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
        width: 100%;

        > span {
            flex: 1;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
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
                left: -10px;
                font-size: 20px;
                top: 0;
            }
        }

        .el-input__inner {
            transition: border, box-shadow v-bind(animationTime);
        }

        &.is-error {
            .el-input__inner,
            .checkbox-wrapper .el-checkbox-group {
                border-color: #f56c6c;
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

        > div {
            z-index: 2;
            position: relative;
        }

        // 错误信息
        .error-msg {
            width: 100%;
            display: block;
            color: #f56c6c;
            font-size: 10px;
            line-height: 12px;
            height: 12px;
            text-align: left;
            position: absolute;
            left: 0;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            height: 200%;
            background-color: rgba(197, 194, 194, 0.4);
            bottom: -50%;
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
<style lang="scss">
.edit-cell-error-msg-tooltip {
    color: #f56c6c !important;
}
</style>
