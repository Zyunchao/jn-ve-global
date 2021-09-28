<template>
    <el-form
        v-if="config && refreshLoad"
        ref="localInstance"
        class="g-form"
        v-bind="getFormRootConfigs()"
    >
        <!-- 栅格 row -->
        <el-row :gutter="localConfig.gutter ?? 20">
            <template v-for="item in localConfig.formItems" :key="item.prop">
                <!-- 栅格 col -->
                <el-col v-show="!item.hide" :span="item.span ?? 6">
                    <el-form-item
                        v-bind="getFormItemConfigs(item)"
                        :label="
                            item.label
                                ? localConfig.colon === undefined || localConfig.colon
                                    ? `${item.label}：`
                                    : item.label
                                : ''
                        "
                        :label-width="
                            item.label
                                ? item.labelWidth
                                    ? item.labelWidth
                                    : localConfig.labelWidth
                                    ? localConfig.labelWidth
                                    : 'auto'
                                : '0px'
                        "
                    >
                        <!-- 自定义 Render 控件 -->
                        <template v-if="item.render">
                            <FunctionalComponent
                                :render="item.render(toRef(localConfig.model, item.prop))"
                            />
                        </template>

                        <!-- 配置式控件 -->
                        <template v-else>
                            <!-- Input -->
                            <template v-if="item.controlConfig.type === 'input'">
                                <el-input
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="getItemControlProps(item)"
                                />
                            </template>

                            <!-- InputNumber -->
                            <template v-if="item.controlConfig.type === 'inputNumber'">
                                <el-input-number
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="getItemControlProps(item)"
                                />
                            </template>

                            <!-- Select -->
                            <template v-if="item.controlConfig.type === 'select'">
                                <el-select
                                    v-model="localConfig.model[item.prop]"
                                    style="width: 100%"
                                    v-bind="getItemControlProps(item)"
                                >
                                    <el-option
                                        v-for="selectOption in item.controlConfig.options"
                                        :key="selectOption.value"
                                        :label="selectOption.label"
                                        :value="selectOption.value"
                                        :disabled="selectOption.disabled"
                                    >
                                        <!-- 自定义渲染 Select 模板 -->
                                        <template v-if="item.controlConfig.optionRender">
                                            <FunctionalComponent
                                                :render="
                                                    item.controlConfig.optionRender(selectOption)
                                                "
                                            />
                                        </template>
                                    </el-option>
                                </el-select>
                            </template>

                            <!-- Radio -->
                            <template
                                v-if="['radio', 'radioButton'].includes(item.controlConfig.type)"
                            >
                                <el-radio-group
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                >
                                    <!-- radio 样式 -->
                                    <template v-if="item.controlConfig.type === 'radio'">
                                        <el-radio
                                            v-for="radioOption in item.controlConfig.options"
                                            :key="radioOption.value"
                                            :label="radioOption.value"
                                            v-bind="getOptionProps(radioOption)"
                                        >
                                            {{ radioOption.label }}
                                        </el-radio>
                                    </template>

                                    <!-- 按钮样式 -->
                                    <template v-if="item.controlConfig.type === 'radioButton'">
                                        <el-radio-button
                                            v-for="radioOption in item.controlConfig.options"
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
                            <template v-if="item.controlConfig.type === 'switch'">
                                <el-switch
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                />
                            </template>

                            <!-- 选择 时间&日期 类 -->
                            <template v-if="item.controlConfig.type === 'timePicker'">
                                <el-time-picker
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                    style="width: 100%"
                                />
                            </template>

                            <template v-if="item.controlConfig.type === 'timeSelect'">
                                <el-time-select
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                    style="width: 100%"
                                />
                            </template>

                            <template v-if="item.controlConfig.type === 'datePicker'">
                                <el-date-picker
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                    style="width: 100%"
                                />
                            </template>

                            <template v-if="item.controlConfig.type === 'dateTimePicker'">
                                <el-date-picker
                                    v-model="localConfig.model[item.prop]"
                                    type="datetime"
                                    v-bind="item.controlConfig.props"
                                    style="width: 100%"
                                />
                            </template>

                            <!-- Checkbox -->
                            <template
                                v-if="
                                    ['checkBox', 'checkBoxButton'].includes(item.controlConfig.type)
                                "
                            >
                                <el-checkbox-group
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                >
                                    <template v-if="item.controlConfig.type === 'checkBox'">
                                        <el-checkbox
                                            v-for="checkBoxOption in item.controlConfig.options"
                                            :key="checkBoxOption.value"
                                            :label="checkBoxOption.value"
                                            v-bind="getOptionProps(checkBoxOption)"
                                        >
                                            {{ checkBoxOption.label }}
                                        </el-checkbox>
                                    </template>

                                    <template v-if="item.controlConfig.type === 'checkBoxButton'">
                                        <el-checkbox-button
                                            v-for="checkBoxOption in item.controlConfig.options"
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
                            <template v-if="item.controlConfig.type === 'rate'">
                                <el-rate
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                />
                            </template>

                            <!-- Slider 滑块 -->
                            <template v-if="item.controlConfig.type === 'slider'">
                                <el-slider
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                />
                            </template>

                            <!-- ColorPicker 颜色选择器 -->
                            <template v-if="item.controlConfig.type === 'colorPicker'">
                                <el-color-picker
                                    v-model="localConfig.model[item.prop]"
                                    v-bind="item.controlConfig.props"
                                />
                            </template>

                            <!-- 下拉树 -->
                            <template v-if="item.controlConfig.type === 'selectTree'">
                                <LGSelectTree
                                    v-model="localConfig.model[item.prop]"
                                    :tree-data="item.controlConfig.treeData"
                                    v-bind="item.controlConfig.props"
                                />
                            </template>

                            <!-- 上传文件 -->

                            <template v-if="item.controlConfig.type === 'upload'">
                                <el-upload
                                    v-bind="getUploadProps(item.controlConfig)"
                                    :on-success="
                                        (res, file, fileList) => {
                                            onSuccess(res, file, fileList, item.prop)
                                        }
                                    "
                                    :on-error="
                                        (err, file, fileList) => {
                                            onError(err, file, fileList, item.prop)
                                        }
                                    "
                                    :before-upload="
                                        (file) => {
                                            beforeUpload(file, item.prop)
                                        }
                                    "
                                    :on-exceed="
                                        (files, fileList) => {
                                            onExceed(files, fileList, item.prop)
                                        }
                                    "
                                >
                                    <el-button size="mini" type="primary">点击上传</el-button>
                                </el-upload>
                            </template>
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>

<script lang="ts">
import { watch, PropType, ref, toRef, nextTick } from 'vue'
import {
    FormProps,
    FormItemProps,
    FormInstance,
    RadioOptionProps,
    RadioButtonOptionProps,
    UploadProps
} from './index'
import FunctionalComponent from '../FunctionalComponent'
import LGSelectTree from '../GSelectTree/index.vue'
import { ElMessage } from 'element-plus'

export default {
    name: 'GForm',
    components: {
        FunctionalComponent,
        LGSelectTree
    },
    props: {
        config: {
            type: Object as PropType<FormProps>,
            required: true
        }
    },
    setup(props, { attrs, slots, emit }) {
        const localInstance = ref<FormInstance | null>(null)
        const refreshLoad = ref(true)
        const localConfig = ref<FormProps>(props.config)

        // 监听 props config 与本地建立关联
        // 总的来说，props.config 必须是一个 Proxy
        watch(
            () => props.config,
            (config) => {
                // 配置对象发生变化 RefInstance 需要重建
                refreshLoad.value = false
                nextTick(() => {
                    refreshLoad.value = true
                })

                localConfig.value = config
            }
        )

        // 监听实例的变化，抛出
        watch(
            () => localInstance.value,
            (instance) => {
                instance && (localConfig.value.instance = instance)
            }
        )

        /**
         * 获取 form 配置（一级配置）
         * 抛出自定义配置，剩余的即为 elemen-plus 原生配置
         */
        const getFormRootConfigs = () => {
            const { instance, formItems, gutter, colon, ...formConfigs } = localConfig.value
            return formConfigs
        }

        // 获取 formItem 的配置（二级配置）
        const getFormItemConfigs = (item: FormItemProps) => {
            const { span, controlConfig, render, hide, ...formItemConfigs } = item
            return formItemConfigs
        }

        // 获取 控件 的配置（三级配置）
        const getItemControlProps = (item: FormItemProps) => {
            // console.log(`%c ${item.label}: props === `, 'color: #e6a23c;', item.controlConfig.props)

            let controlProps = {
                // placeholder: '',
                ...item.controlConfig!.props
            }

            // 具体控件的差异配置
            switch (item.controlConfig!.type) {
                case 'input':
                    controlProps['placeholder'] = controlProps['placeholder']
                        ? controlProps['placeholder']
                        : `请输入${item.label}`
                    break
                case 'select':
                    controlProps['placeholder'] = controlProps['placeholder']
                        ? controlProps['placeholder']
                        : `请选择${item.label}`
                    break
            }

            return controlProps
        }

        // 获取控件的 item 的配置（四级配置）
        const getOptionProps = (radioOption: RadioOptionProps | RadioButtonOptionProps) => {
            const { label, value, ...props } = radioOption
            return props
        }

        // 获取upload控件属性
        const getUploadProps = (item): UploadProps => {
            for (const key in item.props) {
                if (Object.prototype.hasOwnProperty.call(item.props, key)) {
                    // 以下4个钩子函数已内部封装，不向外暴露
                    if (
                        key === 'onSuccess' ||
                        key === 'onError' ||
                        key === 'beforeUpload' ||
                        key === 'onExceed'
                    ) {
                        delete item.props[key]
                    }
                }
            }
            console.log(item.props)
            return { ...item.props }
        }

        // 上传文件之前的钩子
        const beforeUpload = (file, prop): boolean => {
            let singleSize: number
            let flag: boolean = true
            localConfig.value.formItems.forEach((el) => {
                if (el.prop === prop) {
                    if (el.controlConfig.props['size']) {
                        singleSize = el.controlConfig.props['size']
                        flag = file.size / 1024 / 1024 < el.controlConfig.props['size']
                    }
                }
            })
            if (!flag) {
                ElMessage.warning(`单个文件上传大小不能超过 ${singleSize}MB!`)
                return false
            }
            return true
        }

        // 文件超出个数限制时的钩子
        const onExceed = (files, fileList, prop): void => {
            let num
            localConfig.value.formItems.forEach((el) => {
                if (el.prop === prop) {
                    num = el.controlConfig.props['limit']
                }
            })
            ElMessage.warning(
                `当前限制选择 ${num} 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
                    files.length + fileList.length
                } 个文件`
            )
        }

        // 文件上传成功时的钩子
        const onSuccess = (res, file, fileList, prop): void => {
            localConfig.value.model[prop] = res
            ElMessage.success(`上传成功!`)
        }

        // 文件上传失败时的钩子
        const onError = (err, file, fileList, prop): void => {
            localConfig.value.model[prop] = null
            ElMessage.warning(`上传失败!`)
        }

        return {
            refreshLoad,
            localConfig,
            localInstance,
            getFormRootConfigs,
            getFormItemConfigs,
            getItemControlProps,
            getOptionProps,
            getUploadProps,
            beforeUpload,
            onSuccess,
            onError,
            onExceed,
            toRef
        }
    }
}
</script>

<style lang="scss" scoped>
$--base-font-size-m: 16px;
$--base-font-color: #595959;

.g-form {
    font-size: $--base-font-size-m;

    :deep(.el-form-item) {
        .el-form-item__label {
            font-size: $--base-font-size-m;
        }

        .el-form-item__content {
            font-size: $--base-font-size-m;

            .el-textarea,
            .el-input {
                font-size: inherit;
            }

            .el-rate {
                height: 100%;
                display: flex;
                align-items: center;
            }
        }

        // 自定义类名
        &.content-left {
            .el-form-item__content {
                text-align: left;
            }
        }

        &.content-right {
            .el-form-item__content {
                text-align: right;
            }
        }

        &.content-center {
            .el-form-item__content {
                text-align: center;
            }
        }

        &.no-margin-b {
            margin-bottom: 0;
        }

        &.search-btn-item {
            .el-form-item__content {
                .el-button {
                    padding: 0 22px;
                    // display: inline-flex;
                    // align-items: center;

                    span {
                        font-size: 16px;
                        margin-left: 8px;
                    }

                    i {
                        font-size: 18px;
                    }
                }
            }
        }

        // 禁用
        .is-disabled {
            // color: red;
            input,
            .el-textarea__inner {
                color: $--base-font-color;
            }

            .el-radio__inner {
                border: 1px solid $--base-font-color;

                &:after {
                    background-color: $--base-font-color;
                    border-color: $--base-font-color;
                }
            }
        }

        .el-select {
            .el-tag.el-tag--info {
                color: #606266;
            }
        }
    }
}
</style>
