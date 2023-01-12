/*
 * @Author: Jason
 * @Date: 2021-10-11 11:37:24
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2023-01-12
 * @FilePath: /vite.config.ts
 * @description: description
 */
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import ElementPlus from 'unplugin-element-plus/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import { defineConfig, loadEnv } from 'vite'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    base: '/swagger2model/',
    plugins: [
      vue(),
      Components({
        resolvers: [ElementPlusResolver()]
      }),
      ElementPlus()
    ],
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    server: {
      proxy: {
        '/api': {
          // TODO: 自行修改为内网swagger json地址。目前无法动态配置，如有办法请pr
          target: 'http://',
          changeOrigin: true,
          rewrite: path => ''
        }
      }
    }
  }
})
