import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import viteSvgIcons from 'vite-plugin-svg-icons'
import sidebar from './slideBar'
const path = require('path')

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'Ve-Global',
    description: '基于 vue3+element-plus+ts 的组件库',

    // 主题配置
    themeConfig: {
        lastUpdated: true,
        lastUpdatedText: '上次更新：',
        sidebar
    },

    // 定义路径别名
    alias: {
        '@': path.resolve(__dirname, '../../'),
        '@component': '@/packages',
        '@examples': '@/examples',
        '@assets': '@/examples/assets'
    },

    // 打包工具：网站的开发和构建
    bundler: '@vuepress/vite',
    bundlerConfig: {
        viteOptions: {
            plugins: [
                viteSvgIcons({
                    iconDirs: [path.resolve(__dirname, '../../examples/assets/icons/svg')],
                    symbolId: 'custom-icon-[dir]-[name]'
                })
            ]
        }
    },

    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components')
            }
        ]
    ]
})
