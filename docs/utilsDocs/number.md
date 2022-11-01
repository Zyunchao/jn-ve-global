# Number

## toThousands

```ts
/**
 * 数字转换成千分位
 * @param {numer | string} number 要格式化的数字
 * @returns 千分位分割字符串
 */
export declare function toThousands(str: string | number): string;
```

## restrictDecimals

```ts
/**
 * 只允许存在数字或小数点后指定位数
 * @param str 要格式化的数字
 * @param s 小数点后位数
 * @returns 格式化后的值
 */
export declare function restrictDecimals(str: string, s?: number): string;
```

## clearNoNum

```ts
/**
 * 格式化成整数 or 小数（未指定小数位数）
 * @param str 需要格式化的值
 * @returns 数值
 */
export declare function clearNoNum(str: string | number): string;
```

## getNumUnit

```ts
/**
 * 依照数值，获取当前数值的单位
 * @param number
 * @returns
 */
export declare function getNumUnit(number: number): string | number;
```
