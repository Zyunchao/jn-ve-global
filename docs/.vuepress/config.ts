import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import viteSvgIcons from 'vite-plugin-svg-icons'
import sidebar from './slidebar'
import navbar from './navbar'
import vueJsx from '@vitejs/plugin-vue-jsx'
const path = require('path')

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'Ve-Global',
    description: '基于 vue3+element-plus+ts 的组件库',
    base: "/", //部署站点的基础路径
    // dest: path.resolve(__dirname,'../../public'),

    // 主题配置
    themeConfig: {
        logo: '/favicon.ico',
        lastUpdated: true,
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        sidebar,
        navbar
    },

    // 定义路径别名
    alias: {
        '@': path.resolve(__dirname, '../../examples'),
        '@component': path.resolve(__dirname, '../../packages'),
        '@examples': path.resolve(__dirname, '../../examples'),
        '@assets': path.resolve(__dirname, '../../examples/assets'),
        '@mdroot': path.resolve(__dirname, '../modules')
    },

    // 打包工具：网站的开发和构建
    bundler: '@vuepress/vite',
    bundlerConfig: {
        viteOptions: {
            plugins: [
                vueJsx(),
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
    ],

    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@demoroot/, path.resolve(__dirname, 'components'))
        }
    },

    host: 'localhost',
    port: 3067
})
