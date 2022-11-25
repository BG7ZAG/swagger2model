/*
 * @Autor: Jason
 * @Date: 2021-10-11 16:28:26
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-11-25
 * @description: 数据结构转换
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
 * 获取请求或者响应类型
 * @param item
 * @param type req res
 */
const getReqType = (item: Swigger.Paths, method: string, type: 'req' | 'res') => {
  let reqType = 'application/json'
  switch (method?.toLocaleUpperCase()) {
    case 'GET':
      reqType = Object.keys(item?.requestBody?.content ?? {})?.[0] || reqType
      break
    case 'POST':
      if (type === 'req') {
        reqType = Object.keys(item?.requestBody?.content ?? {})?.[0] || reqType
      } else if (type === 'res') {
        reqType = Object.keys(item?.responses?.['200']?.content ?? {})?.[0] || reqType
      }
      break
    default:
      break
  }
  return reqType
}

/**
 * 转换get parameters请求参数
 * @param item
 * @returns
 */
const getMethodGetReq = (item: Swigger.Paths): Item[] => {
  const arr: Item[] = []
  for (const i of item.parameters) {
    arr.push({
      name: i.name || '',
      description: i.description || '',
      required: i.required,
      type: i?.schema?.type || '',
      example: i.example || ''
    })
  }
  return arr
}

/**
 * 根据schemaName获取schema数据
 * @param schemaName
 * @param schema
 * @returns
 */
const getSchemaData = (schemaName: string, schema: Swigger.Components): Item[] => {
  const schemaData = schema[schemaName]
  if (!schemaData) return []

  const itemList: Item[] = []
  for (const key in schemaData.properties ?? {}) {
    if (Object.prototype.hasOwnProperty.call(schemaData.properties, key)) {
      const e = schemaData.properties[key]
      const item: Item = {
        name: key,
        description: e.description || '',
        required: schemaData?.required?.includes(key) ?? false,
        type: e?.$ref ? getSchemaName(e?.$ref) : formatType(e.type, e.items),
        schema: e?.$ref ? getSchemaName(e?.$ref) : e.items?.$ref ? getSchemaName(e.items?.$ref) : ''
      }

      if (e.$ref) {
        item.children = getSchemaData(getSchemaName(e?.$ref), schema)
      } else if (e.items?.$ref) {
        if (getSchemaName(e.items.$ref) !== schemaName) {
          item.children = getSchemaData(getSchemaName(e.items?.$ref), schema)
        }
      }

      itemList.push(item)
    }
  }

  return itemList
}

/**
 * 转换post schema请求参数
 * @param item
 * @returns
 */
const getMethodPostReq = (item: Swigger.Paths, schema: Swigger.Model['components']['schemas']): Item[] => {
  const arr: Item[] = []
  const schemaStr = Object.values(item?.requestBody?.content ?? {})?.[0]?.schema?.$ref ?? ''
  if (!schemaStr) return arr
  const schemaName = getSchemaName(schemaStr)
  const schemaData = getSchemaData(schemaName, schema)

  return schemaData
}

/**
 * 转换请求参数
 * @param item
 * @param method
 * @returns
 */
const getReq = (item: Swigger.Paths, method: string, schema: Swigger.Model['components']['schemas']): Item[] => {
  if (!item) return []

  let request: Item[] = []
  switch (method?.toLocaleUpperCase()) {
    case 'GET':
      request = getMethodGetReq(item)
      break
    case 'POST':
      request = getMethodPostReq(item, schema)
      break
    default:
      break
  }
  return request
}

/**
 * 转换响应数据
 * @param responses 响应数据
 * @param schemas schemas
 * @returns
 */
const getRes = (responses: Swigger.Paths['responses'], schemas: Swigger.Components): Item[] => {
  if (!responses) return []
  const resList: Item[] = []
  for (const key in responses) {
    if (Object.prototype.hasOwnProperty.call(responses, key)) {
      const itemData = responses[key]
      const children: Item[] = []
      for (const i of Object.values(itemData?.content ?? {})) {
        const schemaName = getSchemaName(i?.schema?.$ref)
        if (schemaName) {
          children.push(...getSchemaData(schemaName, schemas))
        }
      }

      const item: Item = {
        name: key,
        description: '响应code',
        required: false,
        type: 'IResponse',
        children
      }
      resList.push(item)
    }
  }
  return resList
}

/**
 * 转换单个接口
 */
const convertItem = (
  item: Swigger.Paths,
  method: string,
  path: string,
  schemas: Swigger.Model['components']['schemas']
): PathMap => {
  const itemMap: PathMap = {
    label: item.summary || path,
    method,
    data: item,
    path,
    reqType: getReqType(item, method, 'req'),
    resType: getReqType(item, method, 'res'),
    req: [
      {
        name: '请求参数',
        description: '请求参数',
        required: true,
        type: 'IRequest',
        children: getReq(item, method, schemas)
      }
    ],
    res: getRes(item.responses, schemas)
  }

  return itemMap
}

/**
 * 格式化数据
 */
export const formatData = (source: Swigger.Model) => {
  const pathMap: Record<string, PathMap[]> = {}
  // 遍历接口地址
  for (const key in source.paths) {
    if (Object.prototype.hasOwnProperty.call(source.paths, key)) {
      const record = source.paths[key]
      // 遍历请求方式
      for (const method in record) {
        if (Object.prototype.hasOwnProperty.call(record, method)) {
          const item = record[method]
          // 根据分类排放
          for (const tag of item.tags ?? []) {
            // 转换单个接口数据
            const itemData = convertItem(item, method, key, source?.components?.schemas ?? {})
            pathMap[tag] ??= []
            pathMap[tag].push(itemData)
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
  parameters?: Item[]
  /** 请求数据类型 */
  reqType: string
  /** 响应数据类型 */
  resType: string
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
  example?: unknown
}
