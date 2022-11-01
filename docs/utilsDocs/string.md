# String

[[toc]]

关于 string 的方法

## hump2Partition

```ts
/**
 * 小驼峰转短横线
 * @param str 字符串
 * @returns 短横线
 */
function hump2Partition(str: string): string;
```

## humpObj2PartitionObj

```ts
/**
 * 将小驼峰字段的对象转换成短横线字段的对象
 * @param obj 要转换的对象
 * @param excludes 排除的字段（字段将在最终的映射对象中排除）
 * @returns 短横线命名的对象
 */
function humpObj2PartitionObj(obj: object, excludes?: Array<string> | string): object;
```

## partition2Hump

```ts
/**
 * 短横线转小驼峰
 * @param str 字符串
 * @returns 驼峰
 */
function partition2Hump(str: string): string;
```

## partitionObj2HumpObj

```ts
/**
 * 将短横线字段的对象转换成驼峰字段的对象
 * @param obj 要转换的对象
 * @param excludes 排除的字段（字段将在最终的映射对象中排除）
 * @returns 短横线命名的对象
 */
function partitionObj2HumpObj(obj: object, excludes?: Array<string> | string): object;
```

## isJSON

```ts
/**
 * 判断字符串是否为 json
 * @param str 要判断的字符串
 * @returns
 */
function isJSON(str: string): boolean;
```

## modifyJson

```ts
/**
 * 进阶处理 json 字符串
 * @param json 源数据
 * @param keyHandle key 的处理函数，接收 key 值，返回处理后的 key 值。格式为 '"key"' 带有双引号的 字符串
 * @param valHandle value 的处理函数，接收 value 值，返回处理后的 value 值。格式为 '"value"' 带有双引号的 字符串
 * @returns
 */
function modifyJson(json: string, keyHandle?: (key: string) => string, valHandle?: (val: string) => string): string;
```

## funStr2FuncBody

```ts
/**
 * 函数字符串转函数体，遇到非函数字符串则抛出错误
 * @param str
 */
function funStr2FuncBody(str: string): any;
```

## deserialize

```ts
/**
 * 反序列化函数，本质上是通过 new Function 将字符串转换成环境值
 * 常用于一些需要将字符串转换成特定对象的情况，如：
 *  - 将正则字符串转换成正则对象
 *  - 将从 json 截取的字符串（内部特殊字符如：\n 会被转换成 \\n），通过 new Function 转换成普通字符串
 *
 * 其实和 funStr2FuncBody 做的事情一样，为了命名区分及扩展，封装新的函数
 * 注意：在字符串中 \ 是特殊转义符，一般在书写正则时，如果想要书写的正则是带有 \ 的，在字符串中，应该体现为 \\
 * @param str
 */
function deserialize(str: string): any;
```

## getStrSize

```ts
/**
 * 获取字符串占据内存的大小
 * @param str 字符串
 * @param charset Unicode 编码集
 * @returns
 */
function getStrSize(str: string, charset?: string): number;
```

## getRangeStr

```ts
/**
 * 获取指定范围（以 a 开头，c 结尾）的字符串，不包含开头结尾
 * @param source 源数据
 * @param start 开头
 * @param end 结尾
 * @param handle 二次处理
 * @returns
 */
function getRangeStr(source: string, start: string, end: string, handle?: (res: string) => string): string;
```

## isBase64

```ts
/**
 * 是否是 base64 字符串
 * @param str
 */
function isBase64(str: string): boolean;
```

## percent2percent25

```ts
/**
 * 由于decodeURI转码时，通过%进行解析，如果字符串中存在%(如： ‘0.9%氯化钠注射液’)
 * 则会出现URI malformed
 */
function percent2percent25(str: string): string;
```
