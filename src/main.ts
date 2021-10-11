/*
 * @Autor: Jason
 * @Date: 2021-10-11 11:05:06
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 11:33:58
 * @FilePath: /src/main.ts
 * @description: main
 */
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";

// highlight==================================================
import hljs from "highlight.js/lib/core";
import javascript from "highlight.js/lib/languages/javascript";
import typescript from "highlight.js/lib/languages/typescript";
import json from "highlight.js/lib/languages/json";
import dart from "highlight.js/lib/languages/dart";
import hljsVuePlugin from "@highlightjs/vue-plugin";
import "highlight.js/styles/github.css";

hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("dart", dart);
hljs.registerLanguage("json", json);
// highlight==================================================

const app = createApp(App);
app.use(router);
app.use(hljsVuePlugin);
app.mount("#app");
