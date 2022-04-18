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
treeProps | 修改 Tree 的 props | [TreeProps](https://element-plus.gitee.io/zh-CN/component/tree.html#props) | {children: 'children', label: 'name'}
treeConfig | [select 的原生配置](https://element-plus.gitee.io/zh-CN/component/select.html#select-%E5%B1%9E%E6%80%A7)，可直接加到标签上面；tree 的原生配置，需要以对象的形式传递给当前组件 | [TreeConfig](https://element-plus.gitee.io/zh-CN/component/tree.html#%E5%B1%9E%E6%80%A7) | null
multiple | 是否多选 | boolean | false
placeholder | 占位符 | string | '请选择'
everyChoose | 这个参数具有针对性，在机构树中期望只选择机构，但是机构和区域不在同一张表中，存在重复的 id，故针对性的排除区域，只能选择机构，通过此参数，可以去除这个限制，意味着每个节点都可以选择 | boolean | false
nonselectable | 向外暴露判断不可选择的节点的 type 数组 | string[] | ['QH', 'QW', 'QZ']

```ts
interface TreeData {
    id: number | string
    name: string
    children: TreeData[]
    value?: string
    label?: string
    [k: string]: unknown
}
```
