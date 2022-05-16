import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const { resolve } = require('path')
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        createSvgIconsPlugin({
            // 指定需要缓存的图标文件夹
            iconDirs: [resolve(process.cwd(), 'packages/assets/icons/svg')],
            // 指定symbolId格式
            symbolId: 'custom-icon-[dir]-[name]'
        })
    ],

    build: {
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
                target: 'http://172.31.33.87:20000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },
            '/fileserve': {
                target: 'http://172.31.33.25:20000',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/fileserve/, '')
            }
        }
    }
})
