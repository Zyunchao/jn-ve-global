module.exports = {
    printWidth: 100, // 指定换行的长度
    tabWidth: 4, // 缩进字符数
    semi: false, // 结尾是否需要分号
    singleQuote: true, // 使用单引号
    quoteProps: 'preserve', // 如果对象下的属性有一个带引号，则都带引号
    jsxSingleQuote: true, // 在jsx中使用单引号
    trailingComma: 'none', // 在任何可能的多行中不输入尾逗号
    jsxBracketSameLine: true, // 在多行JSX元素最后一行的末尾添加 > 而使 > 单独一行（不适用于自闭和元素）
    arrowParens: 'always', // 为单行箭头函数的参数添加圆括号
    endOfLine: 'lf' // 统一行结尾格式
}
