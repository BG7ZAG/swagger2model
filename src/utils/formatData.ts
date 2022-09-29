/*
 * @Autor: Jason
 * @Date: 2021-10-11 16:28:26
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-09-29
 * @FilePath: /src/utils/formatData.ts
 * @description: description
 */
import { Swigger } from '../swiggerTypes'

/**
 * 转化类型
 * @param e 类型
 * @param items 对象类型
 * @returns
 */
const formatType = (e?: string, items?: Swigger.PropertiesItem): string => {
  if (!e) return ''

  switch (e) {
    case 'integer':
      return 'number'
    case 'array':
      if (items?.type) {
        return formatType(items?.type) + '[]' || 'any[]'
      } else if (items?.$ref) {
        return getSchemaName(items.$ref) + '[]'
      }
      return 'any[]'
    default:
      break
  }
  return e
}

//去掉汉字
const removeChinese = (strValue: string | null) => {
  if (strValue != null && strValue != '') {
    const reg = /[\u4e00-\u9fa5]/g
    return strValue.replace(reg, '')
  } else return ''
}

/**
 * 获取schema 名称
 * @param e Swigger.Schema
 * @returns string
 */
const getSchemaName = (e: string): string => {
  const key = '#/components/schemas/'
  if (e?.includes(key)) {
    const ref = e.split(key)
    if (ref.length > 1) {
      return ref.at(-1) || e
    }
    return ''
  } else {
    return e
  }
}

/**
 * 获取参数
 * @param e schema字符串
 * @param conponents schema对象
 * @returns 字段数组
 */
const getItem = (e: string, conponents: Swigger.Components): Item[] => {
  if (!(e && conponents)) return []

  const schema = getSchemaName(e)

  const arr: Item[] = []
  const data = conponents[schema]

  if (data.properties) {
    for (const key in data.properties) {
      if (Object.prototype.hasOwnProperty.call(data.properties, key)) {
        const e = data.properties[key]
        const i: Item = {
          name: key,
          description: e.description || '',
          required: data.required?.includes(key) ?? false,
          type: e?.$ref ? getSchemaName(e?.$ref) : formatType(e.type, e.items),
          schema: e?.$ref ? getSchemaName(e?.$ref) : e.items?.$ref ? getSchemaName(e.items?.$ref) : ''
        }
        if (e.$ref) {
          i.children = getItem(e.$ref, conponents)
        } else if (e.items?.$ref) {
          if (getSchemaName(e.items.$ref) !== schema) {
            i.children = getItem(e.items?.$ref, conponents)
          }
        }
        arr.push(i)
      }
    }
  }
  return arr
}

/**
 * 格式化数据
 */
export const formatData = (source: Swigger.Model) => {
  const pathMap: Record<string, PathMap[]> = {}

  // 遍历接口地址
  for (const path in source.paths) {
    if (Object.prototype.hasOwnProperty.call(source.paths, path)) {
      const record = source.paths[path]

      // 遍历method
      for (const method in record) {
        if (Object.prototype.hasOwnProperty.call(record, method)) {
          const data = record[method]
          const tags = data.tags

          // 添加至新列表
          for (const tag of tags) {
            pathMap[tag] ??= []
            const item: PathMap = {
              label: data.summary,
              method: method,
              data: data,
              path: path,
              req: getItem(data?.requestBody?.content?.['application/json']?.schema?.$ref, source?.components?.schemas),
              res: getItem(data?.responses?.['200']?.content?.['*/*']?.schema?.$ref, source?.components?.schemas)
            }

            pathMap[tag].push(item)
          }
        }
      }
    }
  }

  return pathMap
}

export interface PathMap {
  label: string
  method: string
  data: Swigger.Paths
  path: string
  req: Item[]
  res: Item[]
}
export interface Item {
  name: string
  description: string
  required: boolean
  type: string
  schema?: string
  children?: Item[]
  hasChildren?: boolean
  enum?: string[]
}
