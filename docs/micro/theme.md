# 主题

系统后续会接入换肤功能，需要在开发时，注意 css 变量的使用

系统的 css 变量存放于基座应用下 `/src/assets/theme` 目录

![them-dir](@imgs/micro/theme-dir.png)

## 目前已经添加公用 css 变量

```scss
:root {
    // 基础字体颜色
    --jn-base-font-color: #595959;
    // 基础加黑字体颜色
    --jn-base-font-color-black: #333333;
    // 基础字体大小
    --jn-base-font-size: 18px;
    // 基础中号字体
    --jn-base-font-size-m: 16px;
    // 基础小号字体
    --jn-base-font-size-s: 14px;
    // 基础边框颜色
    --jn-base-border-color: #e8e8e8;
    // 基础字体间距
    --jn-base-letter-spacing: 0.75px;
    // 基础激活颜色
    --jn-base-active-color: #399ffb;
    // 基础圆角
    --jn-base-border-radius: 8px;
    // 基础动画时间
    --jn-base-animation-date: 0.2s;
}
```

## Element 提供的 css 变量

这里列出了颜色变量，更多变量请查看系统 html 的样式

```scss
:root {
    --el-color-white: #ffffff;
    --el-color-black: #000000;
    --el-color-primary: #409eff;
    --el-color-primary-light-1: #53a8ff;
    --el-color-primary-light-2: #66b1ff;
    --el-color-primary-light-3: #79bbff;
    --el-color-primary-light-4: #8cc5ff;
    --el-color-primary-light-5: #a0cfff;
    --el-color-primary-light-6: #b3d8ff;
    --el-color-primary-light-7: #c6e2ff;
    --el-color-primary-light-8: #d9ecff;
    --el-color-primary-light-9: #ecf5ff;
    --el-color-success: #67c23a;
    --el-color-success-light: #e1f3d8;
    --el-color-success-lighter: #f0f9eb;
    --el-color-warning: #e6a23c;
    --el-color-warning-light: #faecd8;
    --el-color-warning-lighter: #fdf6ec;
    --el-color-danger: #f56c6c;
    --el-color-danger-light: #fde2e2;
    --el-color-danger-lighter: #fef0f0;
    --el-color-error: #f56c6c;
    --el-color-error-light: #fde2e2;
    --el-color-error-lighter: #fef0f0;
    --el-color-info: #909399;
    --el-color-info-light: #e9e9eb;
    --el-color-info-lighter: #f4f4f5;
    --el-bg-color: #f5f7fa;
    --el-text-color-primary: #303133;
    --el-text-color-regular: #606266;
    --el-text-color-secondary: #909399;
    --el-text-color-placeholder: #c0c4cc;
    --el-border-color-base: #dcdfe6;
    --el-border-color-light: #e4e7ed;
    --el-border-color-lighter: #ebeef5;
    --el-border-color-extra-light: #f2f6fc;
}
```

## 用法

:::tip

这里的变量是 css 的原生变量，不是 css 的预处理器的变量，预处理的变量为静态编译处理，css 原生变量是动态处理的

:::

在任意样式（*.scss, *.css, *.less, *.vue\[scss\]）中

```scss
.box {
    color: var(--jn-base-font-color);
    font-size: var(--jn-base-font-size-m);
    border-radius: var(--jn-base-border-radius);
}
```
