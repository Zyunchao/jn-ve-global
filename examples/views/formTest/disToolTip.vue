<template>
    <div class="examples-base-wrapper">
        <div class="box">
            <g-form :config="formConfig" />
            <el-button type="primary" @click="setDisabled">
                {{ formConfig.disabled ? '解除禁用' : '禁用' }}
            </el-button>

            <el-button type="success" @click="addData">
                添加数据
            </el-button>

            <el-input v-model="formConfig.model.synopsis" style="margin-top: 20px;" :rows="4" type="textarea" show-word-limit />
        </div>
    </div>
</template>

<script lang="tsx" setup>
import { ref } from 'vue'
import type { FormProps } from '@component/index'

let formConfig = ref<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '160px',
    disabled: true,
    model: {
        synopsis: ''
    },
    formItems: [
        {
            prop: 'synopsis',
            label: '简介',
            span: 12,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'synopsis',
            label: '简介',
            span: 24,
            controlConfig: {
                type: 'input'
            }
        },
        {
            prop: 'synopsis',
            label: '简介',
            span: 24,
            controlConfig: {
                type: 'input',
                props: {
                    type: 'textarea',
                    showWordLimit: true,
                    append: '%',
                    rows: 4
                }
            }
        }
    ]
})

const setDisabled = () => {
    formConfig.value.disabled = !formConfig.value.disabled
}

const addData = () => {
    formConfig.value.model.synopsis = formConfig.value.model.synopsis
        ? ''
        : `君不见黄河之水天上来，奔流到海不复回。
            君不见高堂明镜悲白发，朝如青丝暮成雪。
            人生得意须尽欢，莫使金樽空对月。
            天生我材必有用，千金散尽还复来。
            烹羊宰牛且为乐，会须一饮三百杯。
            岑夫子，丹丘生，将进酒，杯莫停。
            与君歌一曲，请君为我倾耳听。(倾耳听 一作：侧耳听)
            钟鼓馔玉不足贵，但愿长醉不愿醒。(不足贵 一作：何足贵；不愿醒 一作：不复醒)
            古来圣贤皆寂寞，惟有饮者留其名。(古来 一作：自古；惟 通：唯)
            陈王昔时宴平乐，斗酒十千恣欢谑。
            主人何为言少钱，径须沽取对君酌。
            五花马、千金裘，呼儿将出换美酒，与尔同销万古愁`
}
</script>

<style lang="scss" scoped>
.box {
    width: 800px;
    padding-top: 100px;
}
</style>
