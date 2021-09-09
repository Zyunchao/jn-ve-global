---
home: true
actions:
    - text: 组件文档
      link: /modules/guide
      type: primary

features:
    - title: 数据驱动
      details: 将组件繁琐的模板结构解放出来，以配置对象驱动组件

    - title: 类型提示
      details: 基于 ts，组件的配置对象都有灵活的类型提示

    - title: 集中维护
      details: 各项目集成组件库，方便维护

---

## 安装

```shell
# npm
npm i jn-ve-global -S

# yarn
yarn add jn-ve-global -S
```

## 引用

```js
// main.js 注册未全局组件
import GlobalComponents from 'jn-ve-global'
// 引入样式
import 'jn-ve-global/style.css'

const app = createApp(App)
app
    .use(GlobalComponents)
    .mount('#app')
```
