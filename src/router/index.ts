/*
 * @Autor: Jason
 * @Date: 2021-03-03 14:52:08
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-11 11:34:50
 * @FilePath: /src/router/index.ts
 * @description: description
 */
import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

/**
 * 本地通用权限
 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Splash",
    component: () => import("../pages/Splash.vue"),
  },
  {
    path: "/home",
    name: "Home",
    component: () => import("../pages/Home.vue"),
  },
  {
    path: "/404",
    name: "NotFound",
    meta: { title: "404", hidden: true },
    component: () => import("../pages/404.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: constantRoutes,
});

export default router;
