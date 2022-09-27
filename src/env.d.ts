/*
 * @Descripttion: 
 * @Author: Jason hlbj105@qq.com
 * @Date: 2022-09-26
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-27
 */
/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_BASE_API: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
