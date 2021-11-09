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
                <el-col v-if="!item.hide" :span="item.span ?? 6">
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
                            <FormItemControl
                                :form-item-config="item"
                                :control-config="item.controlConfig"
                                :prop="toRef(localConfig.model, item.prop)"
                            />
                        </template>
                    </el-form-item>
                </el-col>
            </template>
        </el-row>
    </el-form>
</template>
<script lang="ts">
export default {
    name: 'GForm'
}
</script>

<script lang="ts" setup>
import { watch, PropType, ref, toRef, nextTick } from 'vue'
import { FormProps, FormItemProps, FormInstance } from './index'
import FunctionalComponent from '../FunctionalComponent'
import FormItemControl from './component/formItemControl.vue'

const props = defineProps({
    config: {
        type: Object as PropType<FormProps>,
        required: true
    }
})

const localInstance = ref<FormInstance | null>(null)
const refreshLoad = ref(true)
const localConfig = ref<FormProps>(props.config)

/**
 * 监听 props config 与本地建立关联
 * 总的来说，props.config 必须是一个 Proxy
 */
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
