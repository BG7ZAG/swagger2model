/*
 * @Autor: Jason
 * @Date: 2021-10-11 16:28:26
 * @LastEditors: Jason
 * @LastEditTime: 2021-10-12 15:08:11
 * @FilePath: /src/utils/formatData.ts
 * @description: description
 */
import { Swigger } from "../swiggerTypes";

/**
 * 转化类型
 * @param e
 * @returns
 */
const formatType = (e: string, format: string): string => {
  if (!e) return "";

  switch (e) {
    case "integer":
      return "number";
    case "number":
      if (format === "double") {
        return "double";
      }
      return e;
    default:
      break;
  }
  return e;
};

//去掉汉字
const removeChinese = (strValue: string | null) => {
  if (strValue != null && strValue != "") {
    var reg = /[\u4e00-\u9fa5]/g;
    return strValue.replace(reg, "");
  } else return "";
};

/**
 * 获取schema数据
 * @param schema string
 * @returns reqList
 */
const getSchemaData = (
  schema: string,
  definitions: Swigger.Definitions
): Item[] => {
  if (!schema) return [];
  const item = definitions[schema];
  const arr: Item[] = [];

  if (item) {
    for (const key in item.properties) {
      if (Object.prototype.hasOwnProperty.call(item.properties, key)) {
        const e = item.properties[key];
        let i: Item = {
          name: key,
          description: e.description ?? "",
          required: item?.required?.includes(key) ?? false,
          type: formatType(e?.type ?? "", e?.format ?? ""),
        };

        // 枚举
        if (e.enum) {
          i.enum = e.enum;
        }

        // 实体类
        let sa: Swigger.Schema = {
          $ref: e.$ref ?? "",
          originalRef: e.originalRef ?? "",
        };
        if (e.$ref) {
          i.type = removeChinese(getSchemaName(sa));
          i.children = getSchemaData(i.type, definitions);
        }

        //
        if (e.items) {
          if (e.items?.$ref) {
            let s = getSchemaName({
              $ref: e.items?.$ref ?? "",
              originalRef: e.items.originalRef ?? "",
            });

            if (s && s !== schema) {
              i.type = removeChinese(s);
              i.children = getSchemaData(s, definitions);
            }
          } else if (e.items?.items) {
            let eiis = getSchemaName({
              $ref: e.items.items?.$ref ?? "",
              originalRef: e.items.items?.originalRef ?? "",
            });
            if (eiis && eiis !== schema) {
              i.type = removeChinese(eiis);
              i.children = getSchemaData(eiis, definitions);
            }
          }
        }

        arr.push(i);
      }
    }
  }

  return arr;
};

/**
 * 获取schema 名称
 * @param e Swigger.Schema
 * @returns string
 */
const getSchemaName = (e: Swigger.Schema): string => {
  const key = "#/definitions/";
  if (e?.originalRef?.includes(key)) {
    let ref = e.originalRef.split(key);
    if (ref.length > 1) {
      return ref[1];
    }
    return "";
  } else {
    return e.originalRef;
  }
};

/**
 * 获取请求参数
 */
const getItem = (
  e: Swigger.Parameter[],
  definitions: Swigger.Definitions
): Item[] => {
  if (!e) return [];

  const arr: Item[] = [];
  for (const i of e) {
    let item: Item = {
      name: i?.name ?? "",
      description: i?.description ?? "",
      required: i?.required ?? false,
      type: formatType(i?.type ?? "", i.format ?? ""),
    };
    if (i.schema) {
      item.schema = getSchemaName(i.schema);
      item.children = getSchemaData(item.schema, definitions);
      item.type = removeChinese(item.schema);
    }
    arr.push(item);
  }
  return arr;
};

/**
 * 格式化数据
 */
export const formatData = (source: Swigger.Model) => {
  const pathMap: Record<string, PathMap[]> = {};

  // 遍历接口地址
  for (const path in source.paths) {
    if (Object.prototype.hasOwnProperty.call(source.paths, path)) {
      const record = source.paths[path];

      // 遍历method
      for (const method in record) {
        if (Object.prototype.hasOwnProperty.call(record, method)) {
          const data = record[method];
          const tags = data.tags;

          // 添加至新列表
          for (const tag of tags) {
            pathMap[tag] ??= [];
            let item: PathMap = {
              label: data.summary,
              method: method,
              data: data,
              path: path,
              req: getItem(data.parameters, source.definitions),
              res: [],
            };

            let res = [];
            for (const k in data.responses) {
              if (Object.prototype.hasOwnProperty.call(data.responses, k)) {
                let e = data.responses[k];
                e.name = e.name ?? k;
                res.push(e);
              }
            }
            item.res = getItem(res, source.definitions);

            pathMap[tag].push(item);
          }
        }
      }
    }
  }

  return pathMap;
};

export interface PathMap {
  label: string;
  method: string;
  data: Swigger.Paths;
  path: string;
  req: Item[];
  res: Item[];
}
export interface Item {
  name: string;
  description: string;
  required: boolean;
  type: string;
  schema?: string;
  children?: Item[];
  hasChildren?: boolean;
  enum?: string[];
}
