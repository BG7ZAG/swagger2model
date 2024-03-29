/*
 * @Autor: Jason
 * @Date: 2021-10-12 10:09:33
 * @LastEditors: Jason hlbj105@qq.com
 * @LastEditTime: 2022-10-20
 * @FilePath: /src/utils/convert2TSModel.ts
 * @description: description
 */

import { Item } from './formatData'

/**
 * 获取单个model
 */
const getItemModel = (source: Item, type: DataType): string => {
  let item = ''
  const arr: string[] = []
  if (source.children) {
    // 添加头
    item += `/** ${source.description || ''} */\r\n`
    item += `export interface ${source.schema || source.type || source.name || 'Example'} {`

    // 添加内容
    source.children?.forEach(v => {
      item += `\r\n    /** ${v.description || ''} */`
      item += `\r\n    ${v.name}${type === 'req' && !v.required ? '?' : ''}: ${v.type};`

      // 子项
      if (v.children) {
        arr.push(getItemModel(v, type))
      }
    })

    // 尾
    item += '\r\n}'
    item += '\r\n'

    for (const i of arr) {
      item += i
    }
  }
  return item
}

/**
 * json转ts
 * @param source 数据源
 * @returns ts model 代码字符串
 */
export const convert2TSModel = (source: Item, type: DataType): string => {
  if (!source) return ''
  return getItemModel(source, type)
}

export type DataType = 'req' | 'res'
