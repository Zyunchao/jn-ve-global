# 流程平台

基座应用提供了流程平台的展示页面，业务开发时，一般来说只需要关心其业务页面就可以了，通过特定的方式，进入系统的流程平台页面

## 跳转流程平台

:::tip

跳转流程平台，如下参数是必须的：

* appId: `string`
* secretId: `string`
* processInstId: `string`

可添加额外的参数，传递给业务页面
:::

基座应用跳转：

```ts
router.replace({
    path: '/workflow',
    query: {
        appId: 'app-1654758327662',
        secretId: '45b37db981f04883bfdf0246902ace34',
        processInstId: '631509035987763205',
        abc: '12345'
    }
})
```

微应用跳转：

```ts
import { toPage } from '@/microApp/navTo'

toPage({
    path: '/workflow',
    query: {
        appId: 'app-1654758327662',
        secretId: '45b37db981f04883bfdf0246902ace34',
        processInstId: '631509035987763205',
        abc: '12345'
    }
})
```

## 微应用业务页面开发

流程平台所运行的每一个节点，都会包含一个业务页面，业务页面存在于微应用中

我在微应用框架中，提供了一个高阶组件： `@/components/business/workflowModuleAdvance/index.vue`

将其称为：流程模块增强组件

:::tip

微应用流程业务页面的开发，都是在与流程平台通讯，我将通讯的过程封装进了这个增强组件，在使用过程中，只需要关注如何给增强组件数据就可以了

注意：写在增强组件中的业务页面，在非流程平台中运行时，与普通页面运行无异，只有运行在流程平台中时，才会进行通讯的处理

:::

### 组件参数

参数|说明|类型|默认值
-----|-----|-----|-----
btns | 业务页面的按钮配置 | [BtnProps](./ButtonGroup.md)[] | --
isSaved | 标识业务页面数据保存完成 | boolean | --

`isSaved` 说明：在业务功能保存之后，需要通知到流程平台，流程平台才会显示出提交按钮，这个通知到操作，增强组件已经封装，只需要在合适的时候，通知增强组件就可以了

### 获取数据

工作流平台会下发数据给业务页面，目前来说，可下发的数据有：

* 动态表单数据
* 页面传递的参数

增强组件通过自定义事件抛出数据：

```vue
<WorkflowModuleAdvance
    :btns="opertions"
    :is-saved="isSaved"
    @get-supplemental-form-config="getSupplementalFormConfigHandle"
    @get-route-query="getRouteQueryHandle"
>
    <h1>工作流内嵌页面</h1>

    <div class="box">
        <g-form :config="formConfig" />
    </div>
</WorkflowModuleAdvance>
```

参数|说明|类型|默认值
-----|-----|-----|-----
@getSupplementalFormConfig | 获取工作流下发的额外动态表单配置 | (data: FormProps) => void | --
@getRouteQuery | 进入工作流时，传递的路由参数 | (data: objet) => void | --

:::tip

动态表单请[参考](../components/DynamicForm/FormGenerate.md)

:::

## 完整示例

```vue
<template>
    <WorkflowModuleAdvance
        :btns="opertions"
        :is-saved="isSaved"
        @get-supplemental-form-config="getSupplementalFormConfigHandle"
        @get-route-query="getRouteQueryHandle"
    >
        <h1>工作流内嵌页面</h1>

        <div class="box">
            <g-form :config="formConfig" />
        </div>
    </WorkflowModuleAdvance>
</template>

<script lang="ts">
export default {
    name: 'Aceraceae'
}
</script>

<script lang="ts" setup>
import { reactive, ref } from 'vue'
import { BtnProps, FormProps } from 'jn-ve-global/packages'
import WorkflowModuleAdvance from '@/components/business/workflowModuleAdvance/index.vue'
import FormConfig from './component/formConfig'
import AdvanceFormConfig from 'jn-ve-global/packages/GFormGenerate/implements/AdvanceFormConfig'

const formConfig = FormConfig()
const advanceFormConfig = new AdvanceFormConfig({
    formConfigRef: formConfig
})

const isSaved = ref<boolean>(false)

const opertions = reactive<BtnProps[]>([
    {
        label: '保存',
        type: 'success',
        onClick() {
            // console.log(`%c 获取数据 === `, 'color: #67c23a;', formConfig.model)
            setTimeout(() => {
                isSaved.value = true
            }, 500)
        }
    },
    {
        label: '获取数据',
        type: 'success',
        onClick() {
            console.log(`%c 获取数据 === `, 'color: #67c23a;', formConfig.model)
        }
    },
    {
        label: '校验',
        type: 'success',
        onClick() {
            formConfig.instance.validate()
        }
    },
    {
        label: '重置',
        type: 'default',
        onClick() {
            formConfig.instance.resetFields()
        }
    },
    {
        label: '添加按钮',
        type: 'danger',
        onClick() {
            opertions.push({
                label: `${+new Date()}`,
                type: 'danger'
            })
        }
    }
])

const getSupplementalFormConfigHandle = (data: FormProps) => {
    console.log(`%c 阿波罗获取到的追加 表单配置 === `, 'color: #67c23a;', data)
    advanceFormConfig.parseJson(data)
}

const getRouteQueryHandle = (data) => {
    console.log(`%c 阿波罗获取路由传参 === `, 'color: #f56c6c;', data)
}
</script>

<style lang="scss" scoped>
.box {
    padding: 10px;
}
</style>
```
