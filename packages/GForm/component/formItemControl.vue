<template>
    <template v-if="controlConfig">
        <!-- Input -->
        <template v-if="localControlType === 'input'">
            <LGAdvanceInput
                v-model="localPropRef"
                v-bind="localControlProps"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />
        </template>

        <!-- InputNumber -->
        <template v-if="localControlType === 'inputNumber'">
            <el-input-number
                v-model.number="localPropRef"
                v-bind="localControlProps"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />
        </template>

        <!-- Select -->
        <template v-if="localControlType === 'select'">
            <el-select
                v-model="localPropRef"
                style="width: 100%"
                v-bind="localControlProps"
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
            <el-time-picker v-model="localPropRef" v-bind="localControlProps" style="width: 100%" />
        </template>

        <template v-if="localControlType === 'timeSelect'">
            <el-time-select v-model="localPropRef" v-bind="localControlProps" style="width: 100%" />
        </template>

        <template v-if="localControlType === 'datePicker'">
            <el-date-picker v-model="localPropRef" v-bind="localControlProps" style="width: 100%" />
        </template>

        <template v-if="localControlType === 'dateTimePicker'">
            <el-date-picker
                v-model="localPropRef"
                type="datetime"
                v-bind="localControlProps"
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

        <!-- 下拉树版本2 -->
        <template v-if="localControlType === 'selectTreeV2'">
            <LGSelectTreeV2
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
                :disabled="controlDisabled"
            />
        </template>

        <!-- 数值格式化、计算；输入框 -->
        <template v-if="localControlType === 'figureInput'">
            <LGFigureInput
                v-model="localPropRef"
                v-bind="localControlProps"
                @focus="emits('controlFocus')"
                @blur="emits('controlBlur')"
            />
        </template>

        <!-- 图标选择器 -->
        <template v-if="localControlType === 'iconPicker'">
            <LGIconPickerV2 v-model="localPropRef" v-bind="controlConfig.props" />
        </template>

        <!-- 下拉框 多列展示（分页） -->
        <template v-if="localControlType === 'infoSelect'">
            <LGInfoSelect
                v-model="localPropRef"
                v-bind="localControlProps"
                :total="controlConfig.total"
                :options-data="controlConfig.options"
                :columns="controlConfig.columns"
                :option-props="controlConfig.optionProps"
            />
        </template>

        <!-- 下拉框 多列展示（虚拟滚动全量） -->
        <template v-if="localControlType === 'infoSelectAll'">
            <LGInfoSelectAll
                v-model="localPropRef"
                v-bind="localControlProps"
                :options-data="controlConfig.options"
                :columns="controlConfig.columns"
                :option-props="controlConfig.optionProps"
            />
        </template>

        <!-- 带有输入建议且以表格形式展示的 input -->
        <template v-if="localControlType === 'infoAutocomplete'">
            <LGInfoAutocomplete
                v-model="localPropRef"
                v-bind="localControlProps"
                :columns="controlConfig.columns"
                :fetch-suggestions="controlConfig.fetchSuggestions"
                :value-key="controlConfig.valueKey"
            />
        </template>

        <!-- 地址输入 -->
        <template v-if="localControlType === 'address'">
            <LGAddress
                v-model="localPropRef"
                :options="controlConfig.options"
                v-bind="controlConfig.props"
            />
        </template>

        <!-- 富文本 -->
        <template v-if="localControlType === 'jnEditor'">
            <LJnEditor
                v-model="localPropRef"
                v-bind="controlConfig.props"
                :disabled="controlDisabled"
            />
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
import { ref, computed, toRef, inject, watch, onUnmounted, Ref } from 'vue'
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
import LGIconPickerV2 from '../../GIconPicker/v2/index.vue'
import LGUpload from '../../GUpload/index.vue'
import LGInfoSelect from '../../GInfoSA/GInfoSelect/index.vue'
import LGInfoSelectAll from '../../GInfoSA/GInfoSelectAll/index.vue'
import LGInfoAutocomplete from '../../GInfoSA/GInfoAutocomplete/index.vue'
import LGSelectTreeV2 from '../../GSelectTreeV2/index.vue'
import LGAddress from '../../GAddress/index.vue'
import LJnEditor from '../../JnEditor/index.vue'
import LGAdvanceInput from './GAdvanceInput/index.vue'

import formConfigProvideKey from '../constant/formConfigProvideKey'
import getControlOprions from '../mixins/getControlOprions'

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
     * 表单绑定的值
     */
    prop: Ref<string | number | boolean | object | Array<any>>
}

const props = withDefaults(defineProps<Props>(), {
    formItemConfig: null,
    controlConfig: null,
    prop: null
})

const emits = defineEmits(['controlFocus', 'controlBlur'])
const rootFormConfig = inject(formConfigProvideKey)

const localControlType = computed(() => props.controlConfig.type)
const localPropRef = ref(props.prop)

// 个别控件需要手动同步 form 的 disabled 状态
const controlDisabled = computed(() =>
    rootFormConfig.value.disabled
        ? rootFormConfig.value.disabled
        : (props.controlConfig.props as any).disabled
)

/**
 * 控件增强：自动获取控件的待选 options
 */
getControlOprions({ props: props as any })

/**
 * 特殊处理 upload 的 fileList
 */
let localUploadFileList = null
if (localControlType.value === 'upload') {
    const config = props.controlConfig as UploadControlConfig
    localUploadFileList = toRef(config.props, 'fileList')
}

// 获取 控件 的配置（三级配置）
const localControlProps = computed(() => {
    let controlProps = {
        ...props.controlConfig.props
    }

    // 具体控件的差异配置
    /* eslint-disable indent */
    switch (props.controlConfig!.type) {
        case 'input':
        case 'figureInput':
        case 'infoAutocomplete':
            controlProps['placeholder'] = controlProps['placeholder']
                ? controlProps['placeholder']
                : `请输入`
            break
        case 'select':
        case 'infoSelect':
        case 'datePicker':
        case 'timeSelect':
        case 'timePicker':
        case 'dateTimePicker':
            controlProps['placeholder'] = controlProps['placeholder']
                ? controlProps['placeholder']
                : `请选择`
            break
    }

    return controlProps
})

// 获取控件（Radio、Checkbox）的 item 的配置（四级配置）
const getOptionProps = (radioOption: RadioOptionProps | RadioButtonOptionProps) => {
    const { label, value, ...props } = radioOption
    return props
}
</script>

<style lang="scss" scoped></style>
