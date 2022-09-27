/*
 * @Descripttion: 数据库类
 * @Author: Jason hlbj105@qq.com
 * @Date: 2022-09-27
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-27
 */

import { APP_DB_NAME, APP_DB_VERSION } from './config'

interface Item {
  id?: number
  url: string
  data: any
}

export default class IndexedDB {
  private static _instance: IndexedDB
  private request!: IDBOpenDBRequest
  private db!: IDBDatabase
  private tname = 'log'
  constructor() {}

  static get I() {
    return (IndexedDB._instance ??= new IndexedDB())
  }

  /**
   * 初始化数据库
   */
  init() {
    return new Promise((resolve, reject) => {
      this.request = window.indexedDB.open(APP_DB_NAME, APP_DB_VERSION)
      this.request.onsuccess = async (event: Event) => {
        // @ts-ignore
        this.db = event?.target?.result! ?? {}
        console.log('%c数据库打开成功', 'color:green;')
        resolve(true)
      }

      this.request.onupgradeneeded = event => {
        // @ts-ignore
        this.db = event.target.result
        var objectStore
        if (!this.db.objectStoreNames.contains(this.tname)) {
          objectStore = this.db.createObjectStore(this.tname, {
            keyPath: 'id',
            autoIncrement: true
          })
          objectStore.createIndex('url', 'url', { unique: true })
          objectStore.createIndex('data', 'data', { unique: false })
        }
        console.log('%c upgradeneeded', 'color:gary;')
      }
      this.request.onerror = function (event) {
        console.log('%c数据库打开报错', 'color: red;')
        reject()
      }
    })
  }

  /**
   * 关闭数据库
   */
  close() {
    this.db.close()
  }
  /**
   * 删除数据库
   */
  deleteDatabase() {
    window.indexedDB.deleteDatabase(APP_DB_NAME)
  }

  /**
   * 新建一条数据
   * @param book
   */
  add(item: Item) {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }
      var request = this.db
        .transaction([this.tname], 'readwrite') //新建事务，readwrite, readonly(默认), versionchange
        .objectStore(this.tname) //拿到IDBObjectStore 对象
        .add({
          // 插入记录
          url: item.url,
          data: item.data
        })
      request.onsuccess = function (event) {
        console.log('数据写入成功')
        resolve(true)
      }
      request.onerror = function (event) {
        console.log('数据写入失败')
        reject()
      }
      // @ts-ignore
      request.onabort = function (event) {
        console.log('事务回滚')
        reject()
      }
    })
  }

  /**
   * 读取一条数据
   */
  read(id: IDBValidKey | IDBKeyRange) {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }

      var transaction = this.db.transaction(this.tname)
      var objectStore = transaction.objectStore(this.tname)
      var request = objectStore.get(id) //传主键
      request.onerror = function (event) {
        console.log('事务失败')
        reject()
      }
      request.onsuccess = function (event) {
        if (request.result) {
          resolve(request.result)
        } else {
          console.log('未获得数据记录')
          resolve({})
        }
      }
    })
  }

  /**
   * 读取所有记录要依靠游标
   */
  readAll() {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }

      const arr: Item[] = []
      var objectStore = this.db.transaction(this.tname).objectStore(this.tname)
      objectStore.openCursor().onsuccess = function (event) {
        // @ts-ignore
        var cursor = event.target.result
        if (cursor) {
          arr.push(cursor.value)
          cursor.continue()
        } else {
          // 没有更多数据了！
          resolve(arr)
        }
      }
    })
  }

  /**
   * 更新记录
   */
  update(data: Item) {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }
      var request = this.db.transaction([this.tname], 'readwrite').objectStore(this.tname).put(data)
      request.onsuccess = function (event) {
        console.log('数据更新成功')
        resolve(true)
      }
      request.onerror = function (event) {
        console.log('数据更新失败')
        reject()
      }
    })
  }

  /**
   * 删除记录
   */
  remove(query: IDBValidKey | IDBKeyRange) {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }
      var request = this.db.transaction([this.tname], 'readwrite').objectStore(this.tname).delete(query)
      request.onsuccess = function (event) {
        console.log('数据删除成功')
        resolve(true)
      }
    })
  }

  /**
   * 清空记录
   */
  clear() {
    return new Promise(async (resolve, reject) => {
      if (!this.db) {
        await this.init()
      }
      var request = this.db.transaction([this.tname], 'readwrite').objectStore(this.tname).clear()
      request.onsuccess = function (event) {
        console.log('数据清除成功')
        resolve(true)
      }
    })
  }
}
