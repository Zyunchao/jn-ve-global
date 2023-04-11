# Tree

一些操作树数据的方法

## findTargetById

```ts
/**
 * 根据 id 查找目标对象，或目标对象的指定字段
 * @param source 源数据
 * @param id 目标id
 * @param field 是否返回目标的指定字段
 * @returns 目标对象 || 目标的指定字段
 */
function findTargetById(source: any[], id: string | number, field?: string): any;
```

<CodeGroup>

<CodeGroupItem title="code">

```ts
import { findTargetById } from '@jsjn/utils'

const targetObj = findTargetById(treeData, '1425374958969872386') 
// {id: '1425374958969872386', appId: 1, appName: '统一管理平台', parentId: '1424688522159378434', …}

const targetName = findTargetById(treeData, '1425374958969872386', 'name') 
// 部门管理
```

</CodeGroupItem>

<CodeGroupItem title="treeData.json">

@[code](@demoroot/Tree/data/treeData.json)

</CodeGroupItem>

</CodeGroup>

## getAllLeaf

```ts
/**
 * 获取树的所有叶子节点（没有 children 字段或 children 为空的节点）
 * @param tree 树数据
 * @returns
 */
export declare function getAllLeaf(tree: any[]): any[];
```

## nodeHasChildren

```ts
/**
 * 目标节点是否包含子元素，且子元素长度不为0
 * @param source 源数据（树）
 * @param targetFieldVal 查找依据值
 * @param targetFieldName 依据字段名称，默认 'id'
 * @returns
 */
export declare function nodeHasChildren(source: any[], targetFieldVal: string | number, targetFieldName?: string): boolean;
```
