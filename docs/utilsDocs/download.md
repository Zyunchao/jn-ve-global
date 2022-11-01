# Download

前端下载的方法

## downloadString

```ts
/**
 * 将字符串下载到本地
 * @param content 要下载的内容
 * @param fileName 文件名称
 */
function downloadString(content: string, fileName: string): void;
```

## downloadStream

```ts
/**
 * 注：后台返回的为流，需要定义 api 的时候声明 responseType: 'blob'
 * 当前方法接收的应为 Blob 类型
 * @param stream 请求响应回的 blob 对象
 */
function downloadStream(streamBlob: Blob, fileName: string): void;
```
