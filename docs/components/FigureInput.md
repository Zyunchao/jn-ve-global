# FigureInput

FigureInput 意为数字、计算、的输入框；

1. 组件限制了只能输入数字或小数
2. 组件提供了自定义的 `format`（展示格式化）、`valueFormat`（存储数据格式化，反格式化）方法入口

:::tip 注意
这里需要弄清 `展示格式化` 和 `存储格式化` 的区别，

* 展示格式化：仅格式化展示效果，不会影响输入的数据（如：3.1415926 => 3.14，保存的值还是 3.1415926）
* 存储格式化：这个是对输入的数据，即保存的数据进行格式化的，组件本身已经对输入数据处理了一次（只能输入数字或小数），`valueFormat` 所返回的值，将会直接作用于存储，并会影响用户输入的行为
:::

:::tip
组件已集成到 Form 、EditTable 中
:::

<demo-block>

<FigureInput-demo1 />

<template #code>

@[code](@demoroot/FigureInput/demo1.vue)

</template>

</demo-block>

在工具库中，为用户提供了两个实用的方法，使用时引入：

```ts
 import { toThousands, restrictDecimals } from '@jsjn/utils'
 ```

```ts
/**
 * 数字转换成千分位
 * @param {numer | string} number 要格式化的数字
 * @returns 千分位分割字符串
 */
export function toThousands(str: string | number) {
    const reg = /\d{1,3}(?=(\d{3})+$)/g

    return `${str}`.replace(/^(\d+)((\.\d+)?)$/, function (s, s1, s2) {
        return s1.replace(reg, '$&,') + s2
    })
}

/**
 * 只允许存在数字或小数点后指定位数
 * @param str 要格式化的数字
 * @param s 小数点后位数
 * @returns 格式化后的值
 */
export function restrictDecimals(str: string, s: number = 2) {
    const regStr = `^\\D*(\\d*(?:\\.\\d{0,${s}})?).*$`
    const reg = new RegExp(regStr, 'g')
    return `${str}`.replace(reg, '$1')
}
```

## 格式化预设

:::tip 2.2.2+

组件内部预设了一些格式化的方法，传递对应的参数可开启预设

注意：组件依旧以 `format` 和 `valueFormat` 为第一优先级

:::

<demo-block>

<FigureInput-demo2 />

<template #code>

@[code](@demoroot/FigureInput/demo2.vue)

</template>

</demo-block>

## Attributes

参数|说明|类型|默认值
-----|-----|-----|-----
modelValue | 绑定的值 | string \| number | --
format | 展示的格式化方式（千分位、保留小数..） | (val: string \| number) => string \| number | null
valueFormat | 绑定的值的格式化方式（反格式化） | (val: string \| number) => string \| number | null
showUnitTip | 显示单位提示 | boolean | true
toThousands | 是否格式化成千分位（仅展示） | boolean | false
showDecimalsLength | 展示时小数位长度 | number | --
valDecimalsLength | 输入时小数位长度 | number | --
