# InfoAutocomplete

带有输入建议的 Input 框，基于 [Element 自动补全输入框](https://element-plus.gitee.io/zh-CN/component/input.html#%E8%87%AA%E5%8A%A8%E8%A1%A5%E5%85%A8%E8%BE%93%E5%85%A5%E6%A1%86)

## 基础使用

::: tip

不同于 InfoSelect 待选数据以数组的方式传递，输入建议框通过传递加载数据的回调方法进行待选数据的填充

fetchSuggestions 属性是必传的，内部通过主动调用回调，进行装填数据，这个方法内部，本身就是异步的，对于异步请求的数据，在请求回来后，调用 cb 即可

:::

<demo-block>

<InfoAutocomplete-demo1 />

<template #code>

@[code](@demoroot/InfoAutocomplete/demo1.vue)

</template>

</demo-block>
