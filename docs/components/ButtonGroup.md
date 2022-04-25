# ButtonGroup

按钮组，基础组件，可配置的按钮列表

组件服务于：

* [BaseModule](./BaseModule.md)
* [Modal](./Modal.md)

```ts
/**
 * 按钮组的配置
 */
interface BtnProps {
    /**
     * 按钮名称
     */
    label: string
    /**
     * 授权标识
     */
    authCode?: string
    /**
     * 按钮的类型，同 Element Button
     */
    type?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text' | 'default'
    /**
     * 禁用
     */
    disabled?: boolean | ((row?: any, index?: number) => boolean)
    /**
     * 事件
     */
    onClick?: () => void
    /**
     * 按钮尺寸
     */
    size?: 'large' | 'default' | 'small'
    /**
     * 加载中
     */
    loading?: boolean | ((row?: any, index?: number) => boolean)
    /**
     * 是否为朴素按钮
     */
    plain?: boolean
    /**
     * 是否为圆角按钮
     */
    round?: boolean
    /**
     * 是否为圆形按钮
     */
    circle?: boolean
    /**
     * 是否隐藏
     */
    hide?: boolean | ((row?: any, index?: number) => boolean)
    /**
     * 类名
     */
    class?: string
    /**
     * 具体的行内样式
     */
    style?: { [k: string]: any } | string
}
```

## 案例

<demo-block>

<ButtonGroup-demo1 />

<template #code>

@[code](@demoroot/ButtonGroup/demo1.vue)

</template>

</demo-block>
