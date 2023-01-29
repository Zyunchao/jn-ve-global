# 页面级别权限控制

结合实际业务，需要根据用户（角色）的可操作范围进行权限的控制

权限分为多分为两大类：

* 路由级别：用户可以看到的菜单
* 页面级别：页面内，用户可看到的内容（如：按钮、表单项、表单列）

框架支持

* 按钮
* Tabs 标签
* 表单项
* 表格列

:::tip

权限的处理，属于业务层面的，并不是组件库级别的

:::

其中，按钮、Tabs 的处理，请参考[指令](./directives.md)

<strong style="color: red; ">请在熟悉指令权限的配置前提下，阅读后续文档</strong>

## 表单项控制

:::tip

2.0.0 起，支持表单项、表格列的权限控制

:::

表单项的配置，和表单的基础使用保持一致，唯一区别就是要在需要控制（是否显示）的 `formItem` 下，添加 `authCode` 字段（参考[指令](./directives.md)）

在创建好表单配置对象后，**再使用公用 hook 进行包装（增强）一遍（业务层与组件库解耦）表单配置对象**

公用 hook 指： `@/mixins/useAuthFormConfig`

<CodeGroup>
<CodeGroupItem title="useFormConfig.tsx" active>

```tsx
import { FormProps } from 'jn-ve-global'
import { reactive } from 'vue'

export default () => {
    const formConfig = reactive<FormProps>({
        instance: null,
        labelPosition: 'right',
        labelWidth: '180px',
        // disabled: true,
        model: {
            name: '',
            radio: 'f',
            radio2: 'f',
        },
        formItems: [
            {
                prop: 'name',
                label: 'Input',
                span: 12,
                required: true,
                authCode: 'field:name',
                controlConfig: {
                    type: 'input',
                    props: {
                        append: <g-icon icon='ali-icon-riqi' />,
                        prepend: <g-icon icon='ali-icon-riqi' />
                    }
                }
            },
            {
                prop: 'radio',
                label: 'Radio',
                span: 12,
                controlConfig: {
                    type: 'radioButton',
                    options: [
                        { label: '男', value: 'm' },
                        { label: '女', value: 'f' },
                        { label: '中', value: 'z' }
                    ]
                }
            },
            {
                prop: 'radio2',
                label: 'Radio',
                span: 12,
                tip: '性别',
                authCode: 'field:sex',
                controlConfig: {
                    type: 'radio',
                    options: [
                        { label: '男', value: 'm' },
                        { label: '女', value: 'f' },
                        { label: '中', value: 'z' }
                    ]
                }
            }
        ]
    })

    return formConfig
}
```

</CodeGroupItem>

<CodeGroupItem title="index.vue" >

```vue
<template>
    <g-form :config="authFormConfig" />
</template>

<script lang="tsx">
export default {
    name: 'FormTest'
}
</script>

<script lang="tsx" setup>
import useFormConfig from './component/useFormConfig'
import useAuthFormConfig from '@/mixins/useAuthFormConfig'

// 表单增强
const authFormConfig = useAuthFormConfig(useFormConfig())
</script>

<style lang="scss"></style>
```

</CodeGroupItem>
</CodeGroup>

## 表格列控制

表格列的权限控制思想与表单项控制完全一致，即：保持原有 `columns` 的配置下，使用公用 hook 增强 `tableColumns`

唯二区别：

* 包装目标转换为 `tableColumns`
* 公用 hook 为 `@/mixins/useAuthTableColumns`

<CodeGroup>
<CodeGroupItem title="useTableColumns.tsx" active>

```tsx
import { reactive } from 'vue'
import { TableColumnProps } from 'jn-ve-global'

export default () =>
    reactive<TableColumnProps[]>([
        {
            prop: 'date',
            label: '日期',
            width: 480,
            fixed: 'left'
        },
        {
            prop: 'name',
            label: '姓名',
            width: 480,
            showOverflowTooltip: true,
            authCode: 'table:columns:name'
        },
        {
            prop: 'address',
            width: 480,
            label: '地址',
            authCode: 'table:columns:address'
        },
        {
            prop: 'tag',
            label: '标签',
            width: 480,
            render() {
                return (
                    <el-tag class='ml-2' type='danger'>
                        Tag 52222
                    </el-tag>
                )
            }
        },
        {
            prop: 'tag',
            label: '标签',
            width: 480,
            render(row) {
                return (
                    <el-switch
                        v-model={row.tag}
                        class='ml-2'
                        active-color='#13ce66'
                        inactive-color='#ff4949'
                        active-text='Open'
                        inactive-text='Close'
                    />
                )
            }
        }
    ])
```

</CodeGroupItem>

<CodeGroupItem title="index.vue" >

```vue
<script lang="tsx" setup>
import useTableColumns from './component/useTableColumns'
import useAuthTableColumns from '@/mixins/useAuthTableColumns'

// 表格列增强
const authTableColumns = useAuthTableColumns(useTableColumns())
</script>
```

</CodeGroupItem>
</CodeGroup>

## 建议

进行页面内容权限控制时，需要在业务系统中配置对应的应用功能下的 `按钮/权限` ，由于表单/表格的可控单元较多，就会导致一个应用功能下挂载较多的子节点

:::tip

在这里，建议子节点采用范围式命名，如：

```text
表单字段：xxx
表格列：yyy
按钮：zzz
```

:::

如图，可以清晰的知道节点对应的范围：

![范围](/images/realize/quanxianpeizhi.jpg)
