/*
 * @Autor: Jason
 * @Date: 2021-10-09 17:51:27
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-10-19
 * @FilePath: /src/utils/index.ts
 * @description: description
 */

import axios from 'axios'
import { isReactive } from 'vue'

import IndexedDB from './indexedDB'

/**
 * 清除reactive所有内容
 * @param reactive
 */
export const clearReactive = (reactive: any) => {
  if (!isReactive(reactive)) {
    return
  }
  if (Array.isArray(reactive)) {
    reactive.length = 0
  } else {
    Object.keys(reactive).forEach(e => delete reactive[e])
  }
}

/**
 * 获取数据
 * @param url
 */
export const getDataByUrl = (url: string) => {
  return new Promise<{ url: string; data: any }>(async (resolve, reject) => {
    const db = IndexedDB.I
    try {
      let data
      if (import.meta.env.DEV) {
        const res = await axios.get('/api?url=' + url)
        data = res.data
      } else {
        const res = await axios.post(import.meta.env.VITE_BASE_API, {
          url: url
        })
        data = res.data?.data
      }
      const item = { url: url, data: data || {} }
      await db.update(item)

      resolve(item)
    } catch (error) {
      reject(error)
    }
  })
}
