# Storage

[[toc]]

关于操作浏览器缓存的方法

## localStorage

```ts
/**
 * window.localStorage 浏览器永久缓存
 * @method set 设置永久缓存
 * @method get 获取永久缓存
 * @method remove 移除永久缓存
 * @method clear 移除全部永久缓存
 */
const Local: {
    set(key: string, val: any): void;
    get(key: string): any;
    remove(key: string): void;
    clear(): void;
    push(key: string, val: any): void;
    unshift(key: string, val: any): void;
};
```

## sessionStorage

```ts
/**
 * window.sessionStorage 浏览器临时缓存
 * @method set 设置临时缓存
 * @method get 获取临时缓存
 * @method remove 移除临时缓存
 * @method clear 移除全部临时缓存
 */
const Session: {
    set(key: string, val: any): void;
    get(key: string): any;
    remove(key: string): void;
    clear(): void;
    push(key: string, val: any): void;
    unshift(key: string, val: any): void;
};
```

## cookie

```ts
/**
 * cookie
 */
const Cookie: {
    set(name: string, value: string, days: number): void;
    get(name: string): string;
    del(name: string): void;
};
```
