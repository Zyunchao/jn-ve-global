<template>
    <div v-loading="!loadDataFinished" class="g-form-generate">
        <LGForm v-if="loadDataFinished" :config="localFormConfig" />
    </div>
</template>

<script lang="ts">
export default {
    name: 'GFormGenerate'
}
</script>

<script lang="ts" setup>
import { watch, ref, computed, reactive, toRefs } from 'vue'
import { FormProps, FormGenerateProps } from '../index'
import LGForm from '../GForm/index.vue'
import AdvanceFormConfig from './implements/AdvanceFormConfig'

interface Props {
    /**
     * 表单的配置，远程获取，格式：
     *  - JSON
     *  - 配置对象格式
     */
    config: string | FormGenerateProps | object
}

const props = withDefaults(defineProps<Props>(), {
    config: ''
})

// 只有在加载完远程数据，且映射完毕后，才创建表单
const loadDataFinished = ref<boolean>(false)

// 本地基础表单配置对象
const localFormConfig = reactive<FormProps>({
    instance: null,
    labelPosition: 'right',
    labelWidth: '100px',
    model: {},
    formItems: []
})

const advanceFormConfig = new AdvanceFormConfig({
    formConfigRef: localFormConfig as FormGenerateProps
})

// 远端配置对象
const localRemoteConfig = computed<FormGenerateProps>(() => {
    advanceFormConfig.parseJson(props.config)
    return advanceFormConfig.getJsonConfig()
})

watch(
    () => localRemoteConfig.value,
    (remoteConfig) => {
        loadDataFinished.value = false
        if (remoteConfig) {
            loadDataFinished.value = true
        }
    },
    {
        immediate: true
    }
)

/**
 * 抛出实例
 */
defineExpose({
    ...toRefs(localFormConfig)
})
</script>

<style lang="scss" scoped>
.g-form-generate {
    min-height: calc(38px + 18px);
}
</style>
