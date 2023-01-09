import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import dts from 'vite-plugin-dts'
import eslintPlugin from 'vite-plugin-eslint'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import esbuild from 'rollup-plugin-esbuild'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        // legacy({
        //     targets: ['defaults', 'not IE 11']
        // }),
        // 生成 .d.ts
        dts({
            outputDir: resolve(__dirname, '@types'),
            include: [
                'packages/**/*.ts',
                'packages/**/*.d.ts',
                'packages/**/*.tsx',
                'packages/**/*.vue'
            ],
            exclude: [
                'packages/**/utils/**/*.ts',
                'packages/**/mixins/**/*.ts',
                'packages/**/hooks/**/*.ts',
                'packages/**/utils.ts'
            ],
            beforeWriteFile(filePath: string, content: string) {
                return {
                    filePath: filePath.replace('/packages', ''),
                    content
                }
            },
            insertTypesEntry: false
        }),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [
                resolve(process.cwd(), 'packages/assets/icons/svg/newCore'),
                resolve(process.cwd(), 'packages/assets/icons/svg/old'),
                resolve(process.cwd(), 'packages/assets/icons/svg/regtech')
            ],
            // 指定symbolId格式
            symbolId: 'custom-icon-[dir]-[name]'
        }),
        // setup 增强，标签添加 name 属性
        vueSetupExtend(),
        // vite eslint 集成
        eslintPlugin({
            include: ['src/**/*.{js,jsx,ts,tsx,vue}']
        }),
        {
            ...esbuild({
                target: 'chrome70',
                include: /[\.vue,\.tsx,\.ts]$/,
                loaders: {
                    '.vue': 'js'
                }
            }),
            enforce: 'post'
        } as any
    ],

    build: {
        target: 'es2015',
        minify: 'esbuild',
        sourcemap: false,
        lib: {
            entry: resolve(__dirname, 'packages/register.ts'),
            name: 'VeGlobal',
            fileName: 'jn-ve-global',
            formats: ['es', 'umd']
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: [
                'vue',
                'element-plus',
                '@element-plus/icons-vue',
                'vue-router',
                'lodash',
                // 'async-validator',
                'resize-observer-polyfill',
                'xlsx',
                'echarts'
            ],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量 ElementPlusIconsVue
                globals: {
                    vue: 'Vue',
                    'element-plus': 'ElementPlus',
                    '@element-plus/icons-vue': 'ElementPlusIconsVue',
                    'vue-router': 'VueRouter',
                    lodash: '_',
                    // 'async-validator': 'Schema',
                    'resize-observer-polyfill': 'ResizeObserver',
                    'xlsx': 'XLSX',
                    'echarts': 'echarts'
                }
            }
        }
    },

    define: {
        'SVG_ROOT': JSON.stringify(resolve(__dirname, 'packages/assets/icons/svg'))
    },

    // 别名
    resolve: {
        alias: {
            '@': resolve(__dirname, 'examples'),
            '@views': resolve(__dirname, 'examples/views'),
            '@component': resolve(__dirname, 'packages'),
            '@assets': resolve(__dirname, 'examples/assets')
        }
    },

    // 开发服务器
    server: {
        // open: '/index.html',
        port: 3066,
        host: '0.0.0.0',
        proxy: {
            '/api': {
                target: 'http://172.31.33.70',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/fileserve': {
                target: 'http://172.31.33.20',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fileserve/, '')
            }
        }
    }
})
