import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
const { resolve } = require('path')
import viteSvgIcons from 'vite-plugin-svg-icons'

export default defineConfig({
    plugins: [
        vue(),
        vueJsx(),
        viteSvgIcons({
            // 指定需要缓存的图标文件夹
            iconDirs: [resolve(process.cwd(), 'examples/assets/icons/svg')],
            // 指定symbolId格式
            symbolId: 'custom-icon-[dir]-[name]'
        })
    ],

    build: {
        minify: 'esbuild',
        sourcemap: false,
        lib: {
            entry: resolve(__dirname, 'packages/register.ts'),
            name: 'jn-ve-global',
            fileName: 'jn-ve-global'
        },
        rollupOptions: {
            // 确保外部化处理那些你不想打包进库的依赖
            external: ['vue', 'element-plus', 'vue-router', 'lodash'],
            output: {
                // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
                globals: {
                    vue: 'Vue'
                }
            }
        }
    },

    define: {
        'SVG_ROOT': JSON.stringify(resolve(__dirname, 'examples/assets/icons/svg'))
    },

    optimizeDeps: {
        include: [
            'element-plus/lib/locale/lang/zh-cn',
            'element-plus/lib/locale/lang/en',
            'element-plus/lib/locale/lang/zh-tw'
        ]
    },

    // 别名
    resolve: {
        alias: {
            '@': resolve(__dirname, 'examples'),
            '@views': resolve(__dirname, 'examples/views'),
            '@component': resolve(__dirname, 'packages')
        }
    },

    // 开发服务器
    server: {
        open: '/index.html',
        port: 3066
    }
})
