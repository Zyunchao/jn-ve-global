<template>
    <el-tooltip :placement="placement" :popper-class="popperClass">
        <template #content>
            <!-- 组件 || jsx 元素 -->
            <component :is="content" v-if="isVNode(content)" />

            <!-- 文本 -->
            <span v-if="_.isString(content)">
                {{ content }}
            </span>

            <!-- render 函数 -->
            <FunctionalComponent v-if="_.isFunction(content)" :render="content()" />
        </template>

        <span class="item-tip">
            <LGIcon :icon="icon" />
        </span>
    </el-tooltip>
</template>

<script lang="ts">
export default {
    name: 'FormItemLabelTip'
}
</script>

<script lang="ts" setup>
import { isVNode } from 'vue'
import LGIcon from '../../../../GIcon/index.vue'
import { FormItemProps } from '../../../index'
import FunctionalComponent from '../../../../FunctionalComponent'
import _ from 'lodash'

const props = withDefaults(
    defineProps<{
        content: FormItemProps['tip']
        icon?: string
        popperClass?: FormItemProps['tipPopperClass']
        placement?: FormItemProps['tipPlacement']
    }>(),
    {
        content: null,
        icon: 'el-QuestionFilled',
        popperClass: '',
        placement: 'top'
    }
)
</script>

<style lang="scss" scoped></style>
