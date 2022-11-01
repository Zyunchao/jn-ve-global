# Bom

一些关于浏览器 bom 的方法

## getUrlParams

```ts
/**
 * 获取 url 中的参数，并转换为对象
 * @returns
 */
function getUrlParams(queryString?: string): {};
```

## detectBrowser

```ts

/**
 * 浏览器嗅探，获取浏览器信息
 * @param navigator
 * @returns
 */
export declare function detectBrowser(navigator?: Window['navigator']): {
    os: {
        [k: string]: any;
    };
    browser: {
        [k: string]: any;
    };
};
```
