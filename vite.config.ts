/*
 * @Author: Jason
 * @Date: 2021-10-11 11:37:24
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-29
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
  const env = loadEnv(mode, process.cwd(), 'ENV')

  return {
    base: env.DEV ? '' : '/swagger2model/',
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
          target:
            'http://10.0.23.64:9145/datac/dview/v3/api-docs?group=%E8%BF%90%E8%90%A5%E5%86%B3%E7%AD%96%E5%88%86%E6%9E%90',
          changeOrigin: true,
          rewrite: path => getQueryVariable(path, 'url')
        }
      }
    }
  }
})

const getQueryVariable = (path: string, variable: string) => {
  const query = path.split('?').at(-1)
  if (!query) return ''

  const vars = query.split('&')
  for (let i = 0; i < vars.length; i++) {
    const pair = vars[i].split('=')
    if (pair[0] == variable) {
      return pair[1]
    }
  }
  return ''
}
