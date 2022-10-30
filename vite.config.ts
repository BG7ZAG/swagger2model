/*
 * @Author: Jason
 * @Date: 2021-10-11 11:37:24
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-10-30
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
          // 本地跑的话，此处修改成为swagger json地址，相当于固定访问，输入框随便输入
          target: 'https://api.dev20.cn/ham/docs-json',
          changeOrigin: true,
          rewrite: path => ''
        }
      }
    }
  }
})
