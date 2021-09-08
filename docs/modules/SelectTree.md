# SelectTree

下拉树组件，基于 [Element Select](https://element-plus.gitee.io/#/zh-CN/component/select) && [Element Tree](https://element-plus.gitee.io/#/zh-CN/component/tree) 封装的下拉树组件

## 单选

<demo-block>

<SelectTree-demo1 />

<template #code>

@[code](@demoroot/SelectTree/demo1.vue)

</template>

</demo-block>

## 多选

<demo-block>

<SelectTree-demo2 />

<template #code>

@[code](@demoroot/SelectTree/demo2.vue)

</template>

</demo-block>

## SelectTree Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
v-mdoel | 绑定的数据 | string \| number \| array | ''
treeData | 树数据 | TreeData[] | []
multiple | 是否多选 | boolean | false
placeholder | 占位符 | string | '请选择'
treeProps | 修改 Tree 的 props | Object | {children: 'children', label: 'name'}
everyChoose | 这个参数具有针对性，在机构树中期望只选择机构，但是机构和区域不在同一张表中，存在重复的 id，故针对性的排除区域，只能选择机构，通过此参数，可以去除这个限制，意味着每个节点都可以选择 | boolean | false

```ts
interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    [k: string]: unknown
}
```
