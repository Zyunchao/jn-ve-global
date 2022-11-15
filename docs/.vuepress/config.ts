import { defineUserConfig } from 'vuepress'
import { defaultTheme } from '@vuepress/theme-default'
import { viteBundler } from '@vuepress/bundler-vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import sidebar from './slidebar'
import navbar from './navbar'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import path from 'path'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { searchPlugin } from '@vuepress/plugin-search'

/**
 * 部署站点的基础路径
 * 生产 & 非github 添加二级路径
 * 生产 & gitHub || dev 取根路径
 */
const base = process.env.NODE_ENV === 'production' && !process.argv[4] ? '/element-component/' : '/'

export default defineUserConfig({
    lang: 'zh-CN',
    title: 'JN Frontend Docs',
    description: '江苏金农股份有限公司前端文档站，站内包含内部组件库、微前端框架等文档',
    base,
    head: [['script', { type: 'text/javascript', src: `${base}lib/tinymce5.10.5/tinymce.min.js` }]],

    // 定义路径别名
    alias: {
        '@': path.resolve(__dirname, '../../examples'),
        '@component': path.resolve(__dirname, '../../packages'),
        '@examples': path.resolve(__dirname, '../../examples'),
        '@assets': path.resolve(__dirname, '../../examples/assets'),
        '@mdroot': path.resolve(__dirname, '../modules'),
        '@imgs': path.resolve(__dirname, './public/images')
    },

    // 主题配置
    theme: defaultTheme({
        logo: '/favicon.ico',
        lastUpdated: true,
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',
        sidebar,
        navbar
    }),

    // Vite 打包工具的配置项
    bundler: viteBundler({
        viteOptions: {
            plugins: [
                vueJsx() as any,
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
            ]
        }
    }),

    plugins: [
        registerComponentsPlugin({
            componentsDir: path.resolve(__dirname, './components')
        }),
        searchPlugin()
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
