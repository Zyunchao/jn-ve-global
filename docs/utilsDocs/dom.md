# Dom

操作 html 原生 dom 的方法

## getStyle

```ts
/**
 * 获取 dom 的样式值
 * @param element dom 节点
 * @param attr 属性
 * @returns
 */
function getStyle(element: Element, attr: string): string;
```

## size2Rem

```ts
/**
 * 将传递的尺寸进行 rem 的换算
 * @param size
 * @returns
 */
function size2Rem(size: number): number;
```
