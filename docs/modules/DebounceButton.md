# DebounceButton

基于 [Element Button](https://element-plus.gitee.io/zh-CN/component/button.html#button-%E6%8C%89%E9%92%AE) 添加防抖功能的按钮

在进行发送请求的按钮操作中，经常发生连续点击导致发送多次请求的情况，当前按钮内置的防抖功能

:::tip

按钮的点击事件不要通过 @click 绑定，而是以 `:on-click` 的方式传递

@click 属于 vue 的事件处理，任意元素通过 @ 绑定都会触发事件，这个是不可控的，故采用参数传递的方式控制事件处理函数
:::

<demo-block>

<DebounceButton-demo1 />

<template #code>

@[code](@demoroot/DebounceButton/demo1.vue)

</template>

</demo-block>

参数|说明|类型|默认值
-----|-----|-----|-----
debounce | 是否开启防抖 | boolean | true
wait | 间隔时间（毫秒） | number | 1000
onClick | 点击事件处理函数 | Function | null
