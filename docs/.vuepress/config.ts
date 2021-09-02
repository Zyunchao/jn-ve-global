import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
const path = require('path')

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'Ve-Global',
    description: '基于 vue3+element-plus+ts 的组件库',

    themeConfig: {
        lastUpdated: true,
        lastUpdatedText: '上次更新：',
        sidebar: [
            {
                text: '输入控制组件',
                children: ['/modules/Form.md', '/modules/Table.md']
            },
            {
                text: '展示组件'
            },
            {
                text: '图标组件'
            }
        ]
    },

    alias: {
        '@': path.resolve(__dirname, '../../'),
        '@component': path.resolve(__dirname, '../../packages')
    }

    // plugins: ['demo-container']
})
