import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import viteSvgIcons from 'vite-plugin-svg-icons'
import sidebar from './slideBar'
import vueJsx from '@vitejs/plugin-vue-jsx'
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
        '@assets': '@/examples/assets',
        '@mdroot': '../modules'
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
                // getComponentName: (filename) => {
                //     const name = filename.replace(/\/|\\/g, '-')
                //     console.log(`%c name ========== `, 'color: #e6a23c;', name)
                //     return name
                // }
            }
        ]
    ],

    markdown: {
        importCode: {
            handleImportPath: (str) =>
                str.replace(/^@demoroot/, path.resolve(__dirname, 'components'))
        }
    }
})
