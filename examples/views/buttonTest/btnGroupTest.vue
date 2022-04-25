<template>
    <div class="examples-base-wrapper">
        <div class="btn-box">
            普通：<g-button-group :btns="btnsNomal" />
        </div>
        <div class="btn-box">
            禁用：<g-button-group :btns="disabledBtns" />
        </div>
        <div class="btn-box">
            隐藏：<g-button-group :btns="hideBtns" />
        </div>
        <div class="btn-box">
            加载：<g-button-group :btns="loadingBtns" />
        </div>
    </div>
</template>

<script lang="ts">
export default {
    name: 'BtnGroupTest'
}
</script>

<script lang="ts" setup>
import { toRaw, watch, ref, computed, reactive, toRefs } from 'vue'
import BtnProps from '@component/GButtonGroup/interface/BtnProps'

const isHide = ref<boolean>(false)
const isLoading = ref<boolean>(false)
const isDis = ref<boolean>(false)

const btnsNomal: BtnProps[] = [
    {
        label: 'primary',
        type: 'primary'
    },
    {
        label: 'success',
        type: 'success'
    },
    {
        label: 'warning',
        type: 'warning'
    },
    {
        label: 'danger',
        type: 'danger'
    },
    {
        label: 'info',
        type: 'info'
    },
    {
        label: 'default',
        type: 'default'
    },
    {
        label: '文本',
        type: 'text'
    },
    {
        label: '自定义样式',
        type: 'default',
        style: {
            backgroundColor: '#ff3040',
            color: '#fff'
        }
    }
]

const disabledBtns: BtnProps[] = [
    {
        label: '控制禁用',
        type: 'danger',
        onClick() {
            isDis.value = !isDis.value
            disabledBtns[1].disabled = !disabledBtns[1].disabled
        }
    },
    {
        label: '值控制',
        type: 'success',
        disabled: false
    },
    {
        label: '值传递',
        type: 'success',
        disabled: isDis.value
    },
    {
        label: '函数返回',
        type: 'success',
        disabled() {
            return isDis.value
        }
    }
]

const hideBtns: BtnProps[] = [
    {
        label: '控制隐藏',
        type: 'danger',
        onClick() {
            isHide.value = !isHide.value
            hideBtns[1].hide = !hideBtns[1].hide
        }
    },
    {
        label: '值控制',
        type: 'warning',
        hide: false
    },
    {
        label: '值传递',
        type: 'warning',
        hide: isHide.value
    },
    {
        label: '函数返回',
        type: 'warning',
        hide() {
            return isHide.value
        }
    }
]

const loadingBtns: BtnProps[] = [
    {
        label: '控制加载',
        type: 'danger',
        onClick() {
            isLoading.value = !isLoading.value
            loadingBtns[1].loading = !loadingBtns[1].loading
        }
    },
    {
        label: '值控制',
        type: 'info',
        loading: false
    },
    {
        label: '值传递',
        type: 'info',
        loading: isLoading.value
    },
    {
        label: '函数返回',
        type: 'info',
        loading() {
            return isLoading.value
        }
    }
]
</script>

<style lang="scss" scoped>
.btn-box {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}
</style>
