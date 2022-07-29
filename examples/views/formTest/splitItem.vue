<template>
    <div class="examples-base-wrapper">
        <div class="form-content">
            <el-scrollbar>
                <g-form :config="formConfig">
                    <template #default="{ formItems }">
                        <el-row :gutter="formConfig.gutter ?? 20">
                            <template v-for="item in formItems" :key="item.prop">
                                <el-col v-if="!item.hide" :span="item.span">
                                    <g-form-item
                                        :form-config="formConfig"
                                        :form-item-config="item"
                                    />
                                </el-col>
                            </template>
                        </el-row>
                    </template>
                </g-form>
            </el-scrollbar>
        </div>

        <g-button-group :btns="btns" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'SplitItem'
}
</script>

<script lang="tsx" setup>
import { BtnProps, FormProps, SelectControlConfig } from '@component/index'

const formConfig: FormProps = {
    instance: null,
    labelPosition: 'right',
    labelWidth: '180px',
    // disabled: true,
    model: {
        name: '',
        sex1: ''
    },
    formItems: [
        {
            prop: 'name',
            label: 'Input',
            span: 12,
            required: true,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'sex1',
            label: 'Select',
            span: 12,
            controlConfig: {
                type: 'select',
                options: [
                    { label: '男', value: 'm' },
                    { label: '女', value: 'f' },
                    { label: '中', value: 'z' }
                ]
            }
        }
    ]
}

const btns: BtnProps[] = [
    {
        label: '获取数据',
        onClick() {
            console.log(`%c model == `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '重置',
        onClick() {
            formConfig.instance?.resetFields()
        }
    },
    {
        label: '禁用',
        type: 'danger',
        hide: () => formConfig.disabled,
        onClick() {
            formConfig.disabled = true
        }
    },
    {
        label: '解除禁用',
        type: 'warning',
        hide: () => !formConfig.disabled,
        onClick() {
            formConfig.disabled = false
        }
    }
]
</script>

<style lang="scss">
.examples-base-wrapper {
    .form-content {
        height: calc(100% - 50px);

        .el-scrollbar__view {
            padding-right: 20px;
        }
    }

    .g-button-group {
        margin-top: 10px;
    }

    .form-test-custom-label {
        span {
            &:first-of-type {
                color: red;
            }
            &:nth-of-type(2) {
                color: orange;
            }
            &:nth-of-type(3) {
                color: blue;
            }
            &:nth-of-type(4) {
                color: green;
            }
            &:nth-of-type(5) {
                color: purple;
            }
        }
    }
}
</style>
