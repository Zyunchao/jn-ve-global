module.exports = {
    parser: 'vue-eslint-parser',
    extends: ['plugin:vue/vue3-recommended'],
    parserOptions: {
        // parserOptions.parser属性来指定自定义解析器来解析<script>标签
        parser: '@typescript-eslint/parser',
        ecmaVersion: 2020,
        ecmaFeatures: {
            jsx: true
        }
    },
    rules: {
        //在computed properties中禁用异步actions
        'vue/no-async-in-computed-properties': 'error',
        //不允许重复的 keys
        'vue/no-dupe-keys': 'error',
        //不允许重复的 attributes
        'vue/no-duplicate-attributes': 'warn',
        //在 <template> 标签下不允许解析错误
        'vue/no-parsing-error': [
            'error',
            {
                'x-invalid-end-tag': false
            }
        ],
        //不允许覆盖保留关键字
        'vue/no-reserved-keys': 'error',
        //强制data必须是一个带返回值的函数
        // 'vue/no-shared-component-data': 'error',
        //不允许在computed properties中出现副作用。
        'vue/no-side-effects-in-computed-properties': 'error',
        //<template>不允许key属性
        'vue/no-template-key': 'warn',
        //在 <textarea> 中不允许mustaches
        'vue/no-textarea-mustache': 'error',
        //不允许在v-for或者范围内的属性出现未使用的变量定义
        'vue/no-unused-vars': 'warn',
        //<component>标签需要v-bind:is属性
        'vue/require-component-is': 'error',
        // render 函数必须有一个返回值
        'vue/require-render-return': 'error',
        //保证 v-bind:key 和 v-for 指令成对出现
        'vue/require-v-for-key': 'error',
        // 检查默认的prop值是否有效
        'vue/require-valid-default-prop': 'error',
        // 保证computed属性中有return语句
        'vue/return-in-computed-property': 'error',
        // 强制校验 template 根节点
        'vue/valid-template-root': 'error',
        // 强制校验 v-bind 指令
        'vue/valid-v-bind': 'error',
        // 强制校验 v-cloak 指令
        'vue/valid-v-cloak': 'error',
        // 强制校验 v-else-if 指令
        'vue/valid-v-else-if': 'error',
        // 强制校验 v-else 指令
        'vue/valid-v-else': 'error',
        // 强制校验 v-for 指令
        'vue/valid-v-for': 'error',
        // 强制校验 v-html 指令
        'vue/valid-v-html': 'error',
        // 强制校验 v-if 指令
        'vue/valid-v-if': 'error',
        // 强制校验 v-model 指令
        'vue/valid-v-model': 'error',
        // 强制校验 v-on 指令
        'vue/valid-v-on': 'error',
        // 强制校验 v-once 指令
        'vue/valid-v-once': 'error',
        // 强制校验 v-pre 指令
        'vue/valid-v-pre': 'error',
        // 强制校验 v-show 指令
        'vue/valid-v-show': 'error',
        // 强制校验 v-text 指令
        'vue/valid-v-text': 'error',
        'vue/comment-directive': 0,
        'vue/html-closing-bracket-newline': 0, // vue/html-结束括号换行
        'vue/max-attributes-per-line': 0, // 强制每行的最大属性数
        'vue/html-indent': [1, 4], // vue/html-缩进 强制使用一致的缩进
        // 'vue/script-indent': [1, 4, { baseIndent: 1 }],
        'vue/no-template-shadow': 0, // 不允许在外部范围中声明的阴影变量的可变声明
        'vue/require-default-prop': 0, // props 需要默认值
        'vue/no-unused-components': 1,
        'vue/multi-word-component-names': 0, // 要求组件名称总是多单词的

        // 非继承规则 --------------------------------------------------------
        'indent': [1, 4],
        'comma-dangle': ['error', 'never'], // 禁止使用拖尾逗号
        'eqeqeq': 2, // 禁止使用 ==，改为 ===
        'no-alert': 0, // 禁用 alert、confirm 和 prompt
        'semi': ['error', 'never'], // 禁止 分号 --fix
        'no-multi-spaces': 'error', // 多余的空格
        // 单引号 + 允许字符串使用反勾号
        'quotes': [
            2,
            'single',
            {
                allowTemplateLiterals: true
            }
        ],
        'no-unused-vars': [0, { vars: 'local' }], // 禁止出现未使用过的变量 - 仅仅检测本作用域中声明的变量是否使用，允许不使用全局环境中的变量。
        'array-callback-return': [
            'off',
            {
                allowImplicit: true
            }
        ], // 强制数组方法的回调函数中有 return 语句
        // "import/no-named-as-default": "off"
        'import/no-anonymous-default-export': ['off']
    }
}
