<template>
    <template v-if="controlConfig">
        <!-- Input -->
        <template v-if="localControlType === 'input'">
            <el-input
                v-show="!inputDisabled || !exceedBoxWidht"
                ref="elInputRef"
                v-model.trim="localPropRef"
                v-bind="getItemControlProps()"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />

            <template v-if="inputDisabled && exceedBoxWidht">
                <el-tooltip :content="localPropRef" placement="top-start">
                    <el-input :model-value="localPropRef" v-bind="getItemControlProps()" />
                </el-tooltip>
            </template>
        </template>

        <!-- InputNumber -->
        <template v-if="localControlType === 'inputNumber'">
            <el-input-number
                v-model.number="localPropRef"
                v-bind="getItemControlProps()"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />
        </template>

        <!-- Select -->
        <template v-if="localControlType === 'select'">
            <el-select
                v-model="localPropRef"
                style="width: 100%"
                v-bind="getItemControlProps()"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            >
                <el-option
                    v-for="selectOption in controlConfig.options"
                    :key="selectOption.value"
                    :label="selectOption.label"
                    :value="selectOption.value"
                    :disabled="selectOption.disabled"
                >
                    <!-- 自定义渲染 Select 模板 -->
                    <template v-if="controlConfig.optionRender">
                        <FunctionalComponent :render="controlConfig.optionRender(selectOption)" />
                    </template>
                </el-option>
            </el-select>
        </template>

        <!-- Radio -->
        <template v-if="['radio', 'radioButton'].includes(localControlType)">
            <el-radio-group v-model="localPropRef" v-bind="controlConfig.props">
                <!-- radio 样式 -->
                <template v-if="localControlType === 'radio'">
                    <el-radio
                        v-for="radioOption in controlConfig.options"
                        :key="radioOption.value"
                        :label="radioOption.value"
                        v-bind="getOptionProps(radioOption)"
                    >
                        {{ radioOption.label }}
                    </el-radio>
                </template>

                <!-- 按钮样式 -->
                <template v-if="localControlType === 'radioButton'">
                    <el-radio-button
                        v-for="radioOption in controlConfig.options"
                        :key="radioOption.value"
                        :label="radioOption.value"
                        v-bind="getOptionProps(radioOption)"
                    >
                        {{ radioOption.label }}
                    </el-radio-button>
                </template>
            </el-radio-group>
        </template>

        <!-- Switch -->
        <template v-if="localControlType === 'switch'">
            <el-switch v-model="localPropRef" v-bind="controlConfig.props" />
        </template>

        <!-- 选择 时间&日期 类 -->
        <template v-if="localControlType === 'timePicker'">
            <el-time-picker
                v-model="localPropRef"
                v-bind="controlConfig.props"
                style="width: 100%"
            />
        </template>

        <template v-if="localControlType === 'timeSelect'">
            <el-time-select
                v-model="localPropRef"
                v-bind="controlConfig.props"
                style="width: 100%"
            />
        </template>

        <template v-if="localControlType === 'datePicker'">
            <el-date-picker
                v-model="localPropRef"
                v-bind="controlConfig.props"
                style="width: 100%"
            />
        </template>

        <template v-if="localControlType === 'dateTimePicker'">
            <el-date-picker
                v-model="localPropRef"
                type="datetime"
                v-bind="controlConfig.props"
                style="width: 100%"
            />
        </template>

        <!-- Checkbox -->
        <template v-if="['checkBox', 'checkBoxButton'].includes(localControlType)">
            <el-checkbox-group v-model="localPropRef" v-bind="controlConfig.props">
                <template v-if="localControlType === 'checkBox'">
                    <el-checkbox
                        v-for="checkBoxOption in controlConfig.options"
                        :key="checkBoxOption.value"
                        :label="checkBoxOption.value"
                        v-bind="getOptionProps(checkBoxOption)"
                    >
                        {{ checkBoxOption.label }}
                    </el-checkbox>
                </template>

                <template v-if="localControlType === 'checkBoxButton'">
                    <el-checkbox-button
                        v-for="checkBoxOption in controlConfig.options"
                        :key="checkBoxOption.value"
                        :label="checkBoxOption.value"
                        v-bind="getOptionProps(checkBoxOption)"
                    >
                        {{ checkBoxOption.label }}
                    </el-checkbox-button>
                </template>
            </el-checkbox-group>
        </template>

        <!-- Rate 打分 -->
        <template v-if="localControlType === 'rate'">
            <el-rate v-model="localPropRef" v-bind="controlConfig.props" />
        </template>

        <!-- Slider 滑块 -->
        <template v-if="localControlType === 'slider'">
            <el-slider v-model="localPropRef" v-bind="controlConfig.props" />
        </template>

        <!-- ColorPicker 颜色选择器 -->
        <template v-if="localControlType === 'colorPicker'">
            <el-color-picker v-model="localPropRef" v-bind="controlConfig.props" />
        </template>

        <!-- 下拉树 -->
        <template v-if="localControlType === 'selectTree'">
            <LGSelectTree
                v-model="localPropRef"
                :tree-data="controlConfig.treeData"
                v-bind="controlConfig.props"
            />
        </template>

        <!-- 上传文件 -->
        <template v-if="localControlType === 'upload'">
            <LGUpload
                v-model="localPropRef"
                v-model:fileList="localUploadFileList"
                v-bind="controlConfig.props"
            />
        </template>

        <!-- 数值格式化、计算；输入框 -->
        <template v-if="localControlType === 'figureInput'">
            <LGFigureInput
                v-model="localPropRef"
                v-bind="getItemControlProps()"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />
        </template>

        <!-- 图标选择器 -->
        <template v-if="localControlType === 'iconPicker'">
            <LGIconPicker v-model="localPropRef" v-bind="controlConfig.props" />
        </template>
    </template>
</template>

<script lang="ts">
export default {
    name: 'FormItemControl',
    inheritAttrs: false
}
</script>

<script lang="ts" setup>
import { ref, computed, toRef, onMounted, watch, onUnmounted } from 'vue'
import {
    FormItemProps,
    RadioOptionProps,
    RadioButtonOptionProps,
    ControlConfig,
    UploadControlConfig
} from '../index'
import FunctionalComponent from '../../FunctionalComponent'
import LGSelectTree from '../../GSelectTree/index.vue'
import LGFigureInput from '../../GFigureInput/index.vue'
import LGIconPicker from '../../GIconPicker/index.vue'
import LGUpload from '../../GUpload/index.vue'
import UploadFile from '../../GUpload/interface/UploadFile'

interface Props {
    /**
     * FormItem 的配置参数
     */
    formItemConfig: FormItemProps
    /**
     * 输入控件的配置参数
     */
    controlConfig: ControlConfig
    /**
     * 表单绑定的值（ref 引用）
     */
    prop: string | number | boolean | object | Array<any>
}

const props = withDefaults(defineProps<Props>(), {
    formItemConfig: null,
    controlConfig: null,
    prop: null
})

const emits = defineEmits(['controlFocus', 'controlBlur'])

const localControlType = computed(() => props.controlConfig.type)
const localPropRef = ref(props.prop)

/* -------------------- input 禁用时，tooltip 处理 ------------------------------------------------------------------------- */
const elInputRef = ref(null)
const inputDisabled = ref<boolean>(null)
const exceedBoxWidht = ref<boolean>(false)

if (props.controlConfig.type === 'input') {
    // 观察器的配置（需要观察什么变动）
    const config: MutationObserverInit = { attributes: true }

    // 当观察到变动时执行的回调函数
    const callback = function (mutationsList: MutationRecord[], observer: MutationObserver) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                setInputDisabled(mutation.target as HTMLElement)
            }
        }
    }

    const setInputDisabled = (dom: HTMLElement) => {
        const classList = dom.classList
        // null ===> boolean
        inputDisabled.value = classList.value.includes('is-disabled')
    }

    // 创建一个观察器实例并传入回调函数
    let observer = new MutationObserver(callback)

    onMounted(() => {
        // 选择需要观察变动的节点
        const targetNode = elInputRef.value.$el as HTMLElement
        // 以上述配置开始观察目标节点
        observer.observe(targetNode, config)
        // 挂载立即执行一次
        setInputDisabled(targetNode)
    })

    onUnmounted(() => {
        // 卸载，停止观察
        observer.disconnect()
        observer = null
    })

    watch(
        () => inputDisabled.value,
        (disabled) => {
            if (!disabled) return

            const targetDom = elInputRef.value.$el as HTMLElement
            const fontSize = 16
            const baseP = 15
            const boxWidth = targetDom.offsetWidth
            const contentLength = (localPropRef.value as string).length

            // 判断内容是否超出 input 的宽度
            exceedBoxWidht.value = contentLength * fontSize > boxWidth - baseP * 2
        }
    )
}
/* -------------------- input 禁用时，tooltip 处理 ------------------------------------------------------------------------- */

/**
 * 特殊处理 upload 的 fileList
 */
let localUploadFileList = null
if (localControlType.value === 'upload') {
    const config = props.controlConfig as UploadControlConfig
    localUploadFileList = toRef(config.props, 'fileList')
}

// 获取 控件 的配置（三级配置）
const getItemControlProps = () => {
    let controlProps = {
        ...props.controlConfig!.props
    }

    // 具体控件的差异配置
    switch (props.controlConfig!.type) {
    case 'input':
    case 'figureInput':
        controlProps['placeholder'] = controlProps['placeholder']
            ? controlProps['placeholder']
            : `请输入${props.formItemConfig.label}`
        break
    case 'select':
        controlProps['placeholder'] = controlProps['placeholder']
            ? controlProps['placeholder']
            : `请选择${props.formItemConfig.label}`
        break
    }

    return controlProps
}

// 获取控件（Radio、Checkbox）的 item 的配置（四级配置）
const getOptionProps = (radioOption: RadioOptionProps | RadioButtonOptionProps) => {
    const { label, value, ...props } = radioOption
    return props
}
</script>

<style lang="scss" scoped></style>
