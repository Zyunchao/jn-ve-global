# Object 

[[toc]]

操作对象的方法

:::tip 注意

操作 Object 的方法，大多是副作用函数

:::

## filterObj

```ts
/**
 * 过滤对象中为空的属性
 * @param obj
 * @returns
 */
const filterObj: (obj: object) => object;
```

## assignOwnProp

```ts
/**
 * b 对象赋值给 a 对象相同的字段
 * @param target 目标数组
 * @param provider 提供数据的数组
 * @param excludes 要排除的 key 数组
 * @param ignore 是否无视 undefined 或 null，即使提供者的字段无效，也进行赋值
 */
function assignOwnProp(target: object, provider: object, excludes?: Array<string>, ignore?: boolean): void;
```

## assignValidField

```ts
/**
 * 合并两个对象的有效字段，无效字段从目标对象中移除
 * @param source 来源对象
 * @param target 目标输出对象，是对源对象进行操作的
 */
function assignValidField(source: object, target: object): void;
```

## advanceSerialize

```ts
/**
 * 增强版序列化对象：可以将对象转换成字符串，通过 JSON.stringify 实现
 *  - JSON.stringify 不能序列化函数，当前方法可以序列化函数
 *  - 但是不能序列化简写的函数，如：对象函数简写方式
 *
 * 注意：可序列化的函数，只能是声明式或箭头函数
 */
const advanceSerialize: {
    FUNC_PREFIX: string;
    stringify(obj: any, space?: number | string, error?: (err: Error | unknown) => void): string;
    parse(jsonStr: string, error?: (err: Error | unknown) => void): any;
};
```

## emptyObj

```ts
/**
 * 清空 obj 所有的 key（非改变引用）
 * @param obj
 */
function emptyObj(obj: object): void;
```

## getLength

```ts
/**
 * 获取数组 or 对象的长度
 * @param target
 * @returns
 */
function getLength(target: Array<any> | object): number;
```

## difference

```ts
export interface KeyFound {
    key: string;
    type: 'add' | 'sub' | 'change';
    newValue: any;
    oldValue: any;
}
/**
 * 比较两个对象不同的属性值（常用于 vue watch 对象，且深度监听，获取改变的字段）
 * @param newObj 新对象
 * @param oldObj 旧对象
 * @returns
 */
function difference(newObj: object, oldObj: object): KeyFound[];
```

## clearEmpty

```ts
/**
 * 递归性的处理数据中无效的引用类型数据（数组 or 对象），直接改变源数据
 * @param source 源数据
 * @param parent 父级，在自身数据清空后，促使父级移除自身
 * @returns
 */
function clearEmpty(source: object | Array<any>, parent?: object | Array<any>): void;
```
