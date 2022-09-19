<template>
    <div class="form-test" :class="!isComponent ? 'examples-base-wrapper' : ''">
        <div class="form-content">
            <el-scrollbar>
                <g-form :config="formConfig" />
            </el-scrollbar>
        </div>

        <g-button-group v-if="!isComponent" :btns="btns" />
    </div>
</template>

<script lang="tsx">
export default {
    name: 'FormTest'
}
</script>

<script lang="tsx" setup>
import { BtnProps, SelectControlConfig } from '@component/index'
import getInfoSelectColumns from './component/infoSelectColumns'
import getFormConfig from './component/formConfig'

const props = defineProps({
    isComponent: {
        type: Boolean,
        default: false
    }
})

const infoSelectColumns = getInfoSelectColumns()
const formConfig = getFormConfig()

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
        label: '缓存（保存）',
        onClick() {
            formConfig.instance.cacheModel()
        }
    },
    {
        label: '比对（自上次主动缓存）',
        onClick() {
            console.log(
                `%c 是否改变 ===== `,
                'color: #67c23a;',
                formConfig.instance.isChangeByCache()
            )
        }
    },
    {
        label: '数据回填',
        type: 'success',
        onClick() {
            formConfig.model.selectMValue = ['m', 'f']
            ;(
                formConfig.formItems.find((item) => item.prop === 'selectMValue')
                    .controlConfig as SelectControlConfig
            ).options = [
                {
                    label: 'M',
                    value: 'm'
                },
                {
                    label: 'F',
                    value: 'f'
                }
            ]
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
.form-test {
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
