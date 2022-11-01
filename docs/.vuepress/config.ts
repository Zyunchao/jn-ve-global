import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import sidebar from './slidebar'
import navbar from './navbar'
import vueJsx from '@vitejs/plugin-vue-jsx'
import eslintPlugin from 'vite-plugin-eslint'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'

/**
 * 部署站点的基础路径
 * 生产 & 非github 添加二级路径
 * 生产 & gitHub || dev 取根路径
 */
const base = process.env.NODE_ENV === 'production' && !process.argv[4] ? '/element-component/' : '/'

export default defineUserConfig<DefaultThemeOptions>({
    lang: 'zh-CN',
    title: 'JN Frontend Docs',
    description: '江苏金农股份有限公司前端文档站，站内包含内部组件库、微前端框架等文档',
    base,
    head: [['script', { type: 'text/javascript', src: `${base}lib/tinymce5.10.5/tinymce.min.js` }]],

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
        '@mdroot': path.resolve(__dirname, '../modules'),
        '@imgs': path.resolve(__dirname, './public/images')
    },

    // 打包工具：网站的开发和构建
    bundler: '@vuepress/bundler-vite',
    bundlerConfig: {
        viteOptions: {
            plugins: [
                vueJsx(),
                createSvgIconsPlugin({
                    iconDirs: [
                        path.resolve(__dirname, '../../packages/assets/icons/svg/old'),
                        path.resolve(__dirname, '../../packages/assets/icons/svg/newCore'),
                        path.resolve(__dirname, '../../packages/assets/icons/svg/regtech')
                    ],
                    symbolId: 'custom-icon-[dir]-[name]'
                }),
                // setup 增强，标签添加 name 属性
                vueSetupExtend()
                // vite eslint 集成
                // eslintPlugin({
                //     include: ['src/**/*.{js,jsx,ts,tsx,vue}']
                // })
            ]
        }
    },

    plugins: [
        [
            '@vuepress/register-components',
            {
                componentsDir: path.resolve(__dirname, './components')
            }
        ],
        ['@vuepress/plugin-search']
    ],

    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@demoroot/, path.resolve(__dirname, 'components'))
        }
    },

    host: 'localhost',
    port: 3067
    // templateDev: path.resolve(__dirname, './templates/base.html'),
    // templateBuild: path.resolve(__dirname, './templates/base.html')
})
