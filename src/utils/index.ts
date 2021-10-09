/*
 * @Autor: Jason
 * @Date: 2021-10-09 17:51:27
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-09 17:52:41
 * @FilePath: /src/utils/index.ts
 * @description: description
 */

import { isReactive } from "vue";

/**
 * 清除reactive所有内容
 * @param reactive
 */
export const clearReactive = (reactive: any) => {
  if (!isReactive(reactive)) {
    return;
  }
  if (Array.isArray(reactive)) {
    reactive.length = 0;
  } else {
    Object.keys(reactive).forEach((e) => delete reactive[e]);
  }
};
