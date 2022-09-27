/*
 * @Autor: Jason
 * @Date: 2021-10-11 11:37:24
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-27
 * @FilePath: /vite.config.ts
 * @description: description
 */
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'swagger2model'
  },
  plugins: [
    vue(),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    ElementPlus(),
  ],
  resolve: {
    alias: {
      "@": resolve("src"),
    },
  },
});
